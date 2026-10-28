// Spartakos offers: static app in /public, data API under /api/*.
// All data (PIN, catalogue, settings, saved offers, uploaded photos) lives in one
// SQLite-backed Durable Object, so nothing private is ever committed to the repo.
import { DurableObject } from 'cloudflare:workers';
import { SEED_CATEGORIES, SEED_MATERIALS, SEED_SETTINGS, SEED_EN, SEED_TEMPLATES, SEED_SETTINGS_EN } from './seed.js';
import { PREV_DESC } from './seed_prev.js';

const SEED_VERSION = 9;

const json = (data, status = 200) => new Response(JSON.stringify(data), {
  status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
});

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith('/api/')) {
      const stub = env.STORE.get(env.STORE.idFromName('main'));
      return stub.fetch(request);
    }
    return env.ASSETS.fetch(request);
  },
};

async function sha256(text) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}
const newId = (p) => p + '_' + crypto.randomUUID().replace(/-/g, '').slice(0, 12);

export class Store extends DurableObject {
  async fetch(request) {
    try {
      return await this.route(request);
    } catch (e) {
      return json({ error: 'server', message: String(e && e.message || e) }, 500);
    }
  }

  async authed(request) {
    const h = request.headers.get('authorization') || '';
    const token = h.startsWith('Bearer ') ? h.slice(7) : '';
    if (!token) return false;
    const tokens = (await this.ctx.storage.get('tokens')) || {};
    return Boolean(tokens[await sha256(token)]);
  }

  async issueToken() {
    const token = crypto.randomUUID() + crypto.randomUUID();
    const tokens = (await this.ctx.storage.get('tokens')) || {};
    tokens[await sha256(token)] = Date.now();
    await this.ctx.storage.put('tokens', tokens);
    return token;
  }

  async seed() {
    await this.ctx.storage.put('categories', SEED_CATEGORIES);
    await this.ctx.storage.put('settings', SEED_SETTINGS);
    const batch = {};
    SEED_MATERIALS.forEach((m, i) => { batch['mat:' + m.id] = { ...m, order: i }; });
    await this.ctx.storage.put(batch);
    await this.ctx.storage.put('seedVersion', SEED_VERSION);
  }

  // Brings a catalogue created by an older version up to date without touching the owner's edits.
  async migrate() {
    const S = this.ctx.storage;
    const v = (await S.get('seedVersion')) || 1;
    if (v >= SEED_VERSION || !(await S.get('categories'))) return;
    if (v < 2) {
      const settings = (await S.get('settings')) || {};
      for (const [k, val] of Object.entries(SEED_SETTINGS_EN)) if (settings[k] == null) settings[k] = val;
      if (!settings.templates) settings.templates = SEED_TEMPLATES;
      await S.put('settings', settings);
      const mats = await S.list({ prefix: 'mat:' });
      const batch = {};
      for (const [key, m] of mats) {
        const e = SEED_EN[m.id];
        if (e && !m.en) batch[key] = { ...m, en: e[0], desc_en: e[1] };
      }
      if (Object.keys(batch).length) await S.put(batch);
    }
    if (v < 3) {
      // templates rebuilt to match the example offers item by item; owner-made templates stay
      const settings = (await S.get('settings')) || {};
      const seedIds = SEED_TEMPLATES.map((x) => x.id);
      settings.templates = [...SEED_TEMPLATES, ...(settings.templates || []).filter((x) => !seedIds.includes(x.id))];
      await S.put('settings', settings);
    }
    if (v < 4) {
      // KARPA pump added at the end of the salt template; fuller descriptions where the owner kept the seeded text
      const settings = (await S.get('settings')) || {};
      const t = (settings.templates || []).find((x) => x.id === 'hydro_salt');
      if (t && !t.materials.some((x) => (x.id || x) === 'karpa')) { t.materials.push('karpa'); await S.put('settings', settings); }
      const same = (a, b) => JSON.stringify(a || []) === JSON.stringify(b || []);
      const batch = {};
      if (!(await S.get('mat:karpa'))) batch['mat:karpa'] = { ...SEED_MATERIALS.find((x) => x.id === 'karpa'), order: SEED_MATERIALS.length };
      for (const [key, m] of await S.list({ prefix: 'mat:' })) {
        const prev = PREV_DESC[m.id], seed = SEED_MATERIALS.find((x) => x.id === m.id);
        if (!prev || !seed) continue;
        const upd = { ...m };
        if (same(m.desc_el, prev.el)) upd.desc_el = seed.desc_el;
        if (same(m.desc_en, prev.en)) upd.desc_en = seed.desc_en;
        if (upd.desc_el !== m.desc_el || upd.desc_en !== m.desc_en) batch[key] = upd;
      }
      if (Object.keys(batch).length) await S.put(batch);
    }
    if (v < 5) {
      // owner: the Hayward pH pump is replaced by the Mr. Pure (Aquark) chlorinator in every template
      if (!(await S.get('mat:aquark'))) await S.put('mat:aquark', { ...SEED_MATERIALS.find((x) => x.id === 'aquark'), order: SEED_MATERIALS.length + 1 });
      const settings = (await S.get('settings')) || {};
      (settings.templates || []).forEach((t) => { t.materials = t.materials.map((x) => (x === 'phpump' ? 'aquark' : x && x.id === 'phpump' ? { ...x, id: 'aquark' } : x)); });
      await S.put('settings', settings);
    }
    if (v < 6) {
      // owner changed their mind: Hayward is the default again, Mr. Pure is picked from the same dropdown
      const settings = (await S.get('settings')) || {};
      (settings.templates || []).forEach((t) => { t.materials = t.materials.map((x) => (x === 'aquark' ? 'phpump' : x && x.id === 'aquark' ? { ...x, id: 'phpump' } : x)); });
      await S.put('settings', settings);
    }
    if (v < 8) {
      // newer Hayward photo from the owner (new file name so browsers don't show the cached old one)
      const m = await S.get('mat:phpump');
      if (m && ['/img/ph.jpg', '/img/ph2.jpg'].includes(m.image)) await S.put('mat:phpump', { ...m, image: '/img/ph3.jpg' });
    }
    if (v < 9) {
      // owner: template contents are fixed, line edits in an offer are one-off; undo any earlier "replace template"
      const settings = (await S.get('settings')) || {};
      const own = (settings.templates || []).filter((x) => !SEED_TEMPLATES.some((y) => y.id === x.id));
      settings.templates = [...SEED_TEMPLATES.map((x) => ({ ...x, ...(settings.templates || []).filter((y) => y.id === x.id).map((y) => ({ ru: y.ru, el: y.el }))[0] })), ...own];
      await S.put('settings', settings);
    }
    await S.put('seedVersion', SEED_VERSION);
  }

  async listPrefix(prefix) {
    const map = await this.ctx.storage.list({ prefix });
    return [...map.values()];
  }

  async route(request) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/^\/api/, '');
    const method = request.method;
    const body = async () => { try { return await request.json(); } catch { return {}; } };
    const S = this.ctx.storage;

    // ---- public routes ----
    if (path === '/status' && method === 'GET') {
      return json({ setup: Boolean(await S.get('pin')) });
    }
    if (path === '/setup' && method === 'POST') {
      if (await S.get('pin')) return json({ error: 'already_setup' }, 409);
      const { pin } = await body();
      if (!pin || String(pin).length < 4) return json({ error: 'short_pin' }, 400);
      const salt = crypto.randomUUID();
      await S.put('pin', { salt, hash: await sha256(salt + pin) });
      if (!(await S.get('categories'))) await this.seed();
      return json({ token: await this.issueToken() });
    }
    if (path === '/login' && method === 'POST') {
      const rec = await S.get('pin');
      if (!rec) return json({ error: 'not_setup' }, 409);
      const fails = (await S.get('fails')) || { n: 0, t: 0 };
      if (fails.n >= 5 && Date.now() - fails.t < 5 * 60 * 1000) return json({ error: 'locked' }, 429);
      const { pin } = await body();
      if ((await sha256(rec.salt + pin)) !== rec.hash) {
        await S.put('fails', { n: fails.n + 1, t: Date.now() });
        return json({ error: 'wrong_pin' }, 401);
      }
      await S.delete('fails');
      return json({ token: await this.issueToken() });
    }
    // shared PDF (link sent through Viber from a computer); the long random id is the only key
    const shared = path.match(/^\/f\/([0-9a-f]{32})(?:\/[^/]*)?$/);
    if (shared && method === 'GET') {
      const meta = await S.get('file:' + shared[1]);
      if (!meta) return new Response('Not found', { status: 404 });
      const parts = await S.get([...Array(meta.n).keys()].map((i) => `filec:${shared[1]}:${i}`));
      const out = new Uint8Array(meta.size); let at = 0;
      for (let i = 0; i < meta.n; i++) { const c = parts.get(`filec:${shared[1]}:${i}`); out.set(c, at); at += c.length; }
      return new Response(out, { headers: {
        'content-type': 'application/pdf', 'cache-control': 'private, max-age=3600',
        'content-disposition': `inline; filename*=UTF-8''${encodeURIComponent(meta.name)}`,
      } });
    }
    const img = path.match(/^\/img\/([\w-]+)$/);
    if (img && method === 'GET') {
      const rec = await S.get('img:' + img[1]);
      if (!rec) return new Response('not found', { status: 404 });
      const bin = Uint8Array.from(atob(rec.data), (c) => c.charCodeAt(0));
      return new Response(bin, { headers: { 'content-type': rec.type || 'image/jpeg', 'cache-control': 'public, max-age=31536000, immutable' } });
    }

    // ---- everything else needs the PIN token ----
    if (!(await this.authed(request))) return json({ error: 'auth' }, 401);

    if (path === '/data' && method === 'GET') {
      await this.migrate();
      const offers = (await this.listPrefix('offer:')).map((o) => ({
        id: o.id, no: o.no, date: o.date, client: o.client, total: o.total, updated: o.updated,
      })).sort((a, b) => (b.updated || 0) - (a.updated || 0));
      const materials = (await this.listPrefix('mat:')).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      return json({ categories: (await S.get('categories')) || [], materials, settings: (await S.get('settings')) || {}, offers });
    }
    if (path === '/categories' && method === 'PUT') {
      const { categories } = await body();
      if (!Array.isArray(categories)) return json({ error: 'bad' }, 400);
      await S.put('categories', categories);
      return json({ ok: true });
    }
    if (path === '/settings' && method === 'PUT') {
      const { settings } = await body();
      await S.put('settings', settings || {});
      return json({ ok: true });
    }
    if (path === '/materials' && method === 'POST') {
      const { material } = await body();
      if (!material || !material.category) return json({ error: 'bad' }, 400);
      const m = { ...material, id: material.id || newId('m'), updated: Date.now() };
      if (m.order == null) m.order = Date.now();
      await S.put('mat:' + m.id, m);
      return json({ material: m });
    }
    const mat = path.match(/^\/materials\/([\w-]+)$/);
    if (mat && method === 'DELETE') {
      const m = await S.get('mat:' + mat[1]);
      if (m && m.imageId) await S.delete('img:' + m.imageId);
      await S.delete('mat:' + mat[1]);
      return json({ ok: true });
    }
    if (path === '/files' && method === 'POST') {
      // raw PDF body; kept 60 days, split in 1 MB pieces (storage value size limit)
      const buf = new Uint8Array(await request.arrayBuffer());
      if (!buf.length || buf.length > 20_000_000) return json({ error: 'bad_file' }, 400);
      const name = String(url.searchParams.get('name') || 'offer.pdf').replace(/[\\/:*?"<>|]+/g, '').slice(0, 120) || 'offer.pdf';
      const old = await S.list({ prefix: 'file:' });
      for (const [k, f] of old) {
        if (Date.now() - f.created < 60 * 864e5) continue;
        const fid = k.slice(5);
        await S.delete([k, ...[...Array(f.n).keys()].map((i) => `filec:${fid}:${i}`)]);
      }
      const id = crypto.randomUUID().replace(/-/g, ''), CH = 1_000_000, batch = {};
      const n = Math.ceil(buf.length / CH);
      for (let i = 0; i < n; i++) batch[`filec:${id}:${i}`] = buf.slice(i * CH, (i + 1) * CH);
      await S.put(batch);
      await S.put('file:' + id, { name, n, size: buf.length, created: Date.now() });
      return json({ url: `/api/f/${id}/${encodeURIComponent(name)}` });
    }
    if (path === '/images' && method === 'POST') {
      const { data } = await body(); // data:image/jpeg;base64,...
      const m = String(data || '').match(/^data:(image\/[\w+.-]+);base64,(.+)$/);
      if (!m || m[2].length > 1_500_000) return json({ error: 'bad_image' }, 400);
      const id = newId('i');
      await S.put('img:' + id, { type: m[1], data: m[2] });
      return json({ id, url: '/api/img/' + id });
    }
    if (path === '/offers' && method === 'POST') {
      const { offer } = await body();
      if (!offer) return json({ error: 'bad' }, 400);
      const o = { ...offer, id: offer.id || newId('o'), updated: Date.now() };
      await S.put('offer:' + o.id, o);
      return json({ offer: o });
    }
    const off = path.match(/^\/offers\/([\w-]+)$/);
    if (off && method === 'GET') {
      const o = await S.get('offer:' + off[1]);
      return o ? json({ offer: o }) : json({ error: 'not_found' }, 404);
    }
    if (off && method === 'DELETE') {
      await S.delete('offer:' + off[1]);
      return json({ ok: true });
    }
    if (path === '/pin' && method === 'POST') {
      const { pin } = await body();
      if (!pin || String(pin).length < 4) return json({ error: 'short_pin' }, 400);
      const salt = crypto.randomUUID();
      await S.put('pin', { salt, hash: await sha256(salt + pin) });
      await S.put('tokens', {});
      return json({ token: await this.issueToken() });
    }
    return json({ error: 'not_found' }, 404);
  }
}
