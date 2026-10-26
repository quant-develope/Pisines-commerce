'use strict';
// Spartakos offers app. Views: offer editor, materials catalogue, archive, settings.
// Data comes from /api (Durable Object); the current draft is also kept in localStorage.

// ---------- i18n ----------
const T = {
  ru: {
    appName: 'Коммерческие предложения', tabOffer: 'Предложение', tabMaterials: 'Материалы', tabArchive: 'Архив', tabSettings: 'Настройки',
    loginTitle: 'Вход', setupTitle: 'Придумайте PIN-код', setupHint: 'PIN нужен, чтобы цены и клиентов видели только вы. Минимум 4 цифры. Его спросят один раз на каждом телефоне.',
    pin: 'PIN-код', pin2: 'Повторите PIN', enter: 'Войти', create: 'Создать', wrongPin: 'Неверный PIN', locked: 'Слишком много попыток, подождите 5 минут', pinMismatch: 'PIN-коды не совпадают', shortPin: 'Минимум 4 цифры',
    client: 'Клиент', offerNo: 'Номер', date: 'Дата', clientName: 'Имя клиента', phone: 'Телефон', email: 'Email', site: 'Место работ',
    pool: 'Бассейн', len: 'Длина, м', wid: 'Ширина, м', dmin: 'Глубина мин., м', dmax: 'Глубина макс., м', turn: 'Оборот воды, ч', color: 'Цвет мембраны',
    area: 'Площадь', meanDepth: 'Средняя глубина', volume: 'Объём', perimeter: 'Периметр',
    composition: 'Состав предложения', compHint: 'Нажмите на поле, чтобы выбрать материал из списка. Цена берётся из справочника.',
    qty: 'Кол-во', unitPrice: 'Цена за ед., €', changePrice: 'Поменять цену', catalogPrice: 'Цена из справочника', customPrice: 'своя цена', noPrice: 'Нет цены в справочнике: впишите её в «Материалы» или нажмите «Поменять цену»',
    addLine: '+ Добавить позицию', chooseCat: 'Категория', chooseMat: 'Материал', add: 'Добавить', cancel: 'Отмена', remove: 'Убрать',
    included: 'входит', lineSum: 'Сумма',
    terms: 'Условия', validDays: 'Действует, дней', vatRate: 'НДС, %', delivery: 'Срок поставки', place: 'Место поставки', payment: 'Оплата', notIncluded: 'Не входит в цену', discount: 'Скидка, €',
    net: 'Без НДС', vat: 'НДС', total: 'Итого с НДС',
    pdf: 'PDF', save: 'Сохранить', saved: 'Сохранено', newOffer: 'Новое', duplicate: 'Копия',
    newConfirm: 'Нажмите ещё раз: начнётся новое предложение.', pdfMissing: 'Нет цены у позиций: ', pdfReady: 'PDF готов', pdfLoading: 'Генератор PDF ещё загружается, подождите пару секунд',
    share: 'Отправить',
    materials: 'Справочник материалов', matHint: 'Здесь хранятся материалы и их цены. В предложении цена подставится сама.', search: 'Поиск', newMaterial: '+ Новый материал', editCategories: 'Категории',
    matEdit: 'Материал', category: 'Категория', nameEl: 'Название (греч.) — идёт в PDF', nameRu: 'Название (рус.)', unit: 'Единица', defQty: 'Кол-во по умолч.', price: 'Цена за ед. без НДС, €', warranty: 'Гарантия (греч.)', desc: 'Описание для PDF (греч.). Пустая строка = новый абзац. {color} = цвет мембраны', photo: 'Фото', uploadPhoto: 'Загрузить фото', removePhoto: 'Убрать фото', isDefault: 'Добавлять в новое предложение автоматически', del: 'Удалить', delConfirm: 'Нажмите ещё раз для удаления', back: '← Назад',
    units: { pcs: 'шт.', set: 'компл.', m: 'м', m2: 'м²', perim: 'м (периметр, считается сам)', area: 'м² (площадь воды, считается сам)' },
    catName: 'Название', catGroup: 'Раздел', groups: { A: 'А. Конструкция', B: 'Б. Оборудование', C: 'В. Опции' }, newCategory: '+ Категория', saveCategories: 'Сохранить категории', up: '↑', down: '↓',
    archive: 'Сохранённые предложения', archiveEmpty: 'Пока пусто. Нажмите «Сохранить» на экране предложения.', open: 'Открыть',
    settings: 'Настройки', company: 'Компания (шапка PDF)', companyName: 'Название', tagline: 'Подпись', address: 'Адрес', phones: 'Телефоны', sites: 'Сайты', signatory: 'Подписант', subtitle: 'Подзаголовок предложения',
    defaults: 'Условия по умолчанию', colors: 'Цвета мембраны (через запятую)', nextNo: 'Следующий номер', changePin: 'Сменить PIN', newPin: 'Новый PIN', saveSettings: 'Сохранить настройки', logout: 'Выйти на этом телефоне',
    netErr: 'Нет связи с сервером. Изменения сохранены на телефоне.', unsavedPrice: 'нет цены',
  },
  el: {
    appName: 'Οικονομικές προσφορές', tabOffer: 'Προσφορά', tabMaterials: 'Υλικά', tabArchive: 'Αρχείο', tabSettings: 'Ρυθμίσεις',
    loginTitle: 'Είσοδος', setupTitle: 'Ορίστε PIN', setupHint: 'Το PIN προστατεύει τιμές και πελάτες. Τουλάχιστον 4 ψηφία. Ζητείται μία φορά σε κάθε κινητό.',
    pin: 'PIN', pin2: 'Επανάληψη PIN', enter: 'Είσοδος', create: 'Δημιουργία', wrongPin: 'Λάθος PIN', locked: 'Πολλές προσπάθειες, περιμένετε 5 λεπτά', pinMismatch: 'Τα PIN δεν ταιριάζουν', shortPin: 'Τουλάχιστον 4 ψηφία',
    client: 'Πελάτης', offerNo: 'Αριθμός', date: 'Ημερομηνία', clientName: 'Ονοματεπώνυμο', phone: 'Τηλέφωνο', email: 'Email', site: 'Τόπος έργου',
    pool: 'Πισίνα', len: 'Μήκος, m', wid: 'Πλάτος, m', dmin: 'Βάθος ελάχ., m', dmax: 'Βάθος μέγ., m', turn: 'Ανακυκλοφορία, ώρες', color: 'Χρώμα μεμβράνης',
    area: 'Επιφάνεια', meanDepth: 'Μέσο βάθος', volume: 'Όγκος', perimeter: 'Περίμετρος',
    composition: 'Περιεχόμενο προσφοράς', compHint: 'Πατήστε στο πεδίο για να διαλέξετε υλικό. Η τιμή έρχεται από τον κατάλογο.',
    qty: 'Ποσότ.', unitPrice: 'Τιμή μονάδας, €', changePrice: 'Αλλαγή τιμής', catalogPrice: 'Τιμή καταλόγου', customPrice: 'δική σας τιμή', noPrice: 'Δεν υπάρχει τιμή στον κατάλογο: συμπληρώστε τη στα «Υλικά» ή πατήστε «Αλλαγή τιμής»',
    addLine: '+ Προσθήκη θέσης', chooseCat: 'Κατηγορία', chooseMat: 'Υλικό', add: 'Προσθήκη', cancel: 'Άκυρο', remove: 'Αφαίρεση',
    included: 'περιλαμβάνεται', lineSum: 'Σύνολο',
    terms: 'Όροι', validDays: 'Ισχύς, ημέρες', vatRate: 'ΦΠΑ, %', delivery: 'Χρόνος παράδοσης', place: 'Τόπος παράδοσης', payment: 'Τρόπος πληρωμής', notIncluded: 'Δεν περιλαμβάνονται', discount: 'Έκπτωση, €',
    net: 'Καθαρή αξία', vat: 'ΦΠΑ', total: 'Σύνολο με ΦΠΑ',
    pdf: 'PDF', save: 'Αποθήκευση', saved: 'Αποθηκεύτηκε', newOffer: 'Νέα', duplicate: 'Αντίγραφο',
    newConfirm: 'Πατήστε ξανά για νέα προσφορά.', pdfMissing: 'Χωρίς τιμή: ', pdfReady: 'Το PDF είναι έτοιμο', pdfLoading: 'Η δημιουργία PDF φορτώνει, περιμένετε λίγο',
    share: 'Αποστολή',
    materials: 'Κατάλογος υλικών', matHint: 'Εδώ φυλάσσονται τα υλικά και οι τιμές τους. Στην προσφορά η τιμή μπαίνει αυτόματα.', search: 'Αναζήτηση', newMaterial: '+ Νέο υλικό', editCategories: 'Κατηγορίες',
    matEdit: 'Υλικό', category: 'Κατηγορία', nameEl: 'Όνομα (ελληνικά) — στο PDF', nameRu: 'Όνομα (ρωσικά)', unit: 'Μονάδα', defQty: 'Προεπιλ. ποσότητα', price: 'Τιμή μονάδας χωρίς ΦΠΑ, €', warranty: 'Εγγύηση', desc: 'Περιγραφή για το PDF. Κενή γραμμή = νέα παράγραφος. {color} = χρώμα μεμβράνης', photo: 'Φωτογραφία', uploadPhoto: 'Ανέβασμα φωτογραφίας', removePhoto: 'Αφαίρεση φωτογραφίας', isDefault: 'Μπαίνει αυτόματα σε νέα προσφορά', del: 'Διαγραφή', delConfirm: 'Πατήστε ξανά για διαγραφή', back: '← Πίσω',
    units: { pcs: 'τεμ.', set: 'σετ', m: 'm', m2: 'm²', perim: 'm (περίμετρος, αυτόματα)', area: 'm² (επιφάνεια νερού, αυτόματα)' },
    catName: 'Όνομα', catGroup: 'Ενότητα', groups: { A: 'Α. Κατασκευή', B: 'Β. Εξοπλισμός', C: 'Γ. Επιπλέον' }, newCategory: '+ Κατηγορία', saveCategories: 'Αποθήκευση κατηγοριών', up: '↑', down: '↓',
    archive: 'Αποθηκευμένες προσφορές', archiveEmpty: 'Κενό. Πατήστε «Αποθήκευση» στην προσφορά.', open: 'Άνοιγμα',
    settings: 'Ρυθμίσεις', company: 'Εταιρεία (κεφαλίδα PDF)', companyName: 'Όνομα', tagline: 'Υπότιτλος', address: 'Διεύθυνση', phones: 'Τηλέφωνα', sites: 'Ιστοσελίδες', signatory: 'Υπογράφων', subtitle: 'Υπότιτλος προσφοράς',
    defaults: 'Προεπιλεγμένοι όροι', colors: 'Χρώματα μεμβράνης (με κόμμα)', nextNo: 'Επόμενος αριθμός', changePin: 'Αλλαγή PIN', newPin: 'Νέο PIN', saveSettings: 'Αποθήκευση ρυθμίσεων', logout: 'Έξοδος σε αυτό το κινητό',
    netErr: 'Δεν υπάρχει σύνδεση. Οι αλλαγές κρατήθηκαν στο κινητό.', unsavedPrice: 'χωρίς τιμή',
  },
};
const UNIT_EL = { pcs: 'τεμ.', set: 'σετ', m: 'm', m2: 'm²', perim: 'm', area: 'm²' };
const GROUP_EL = { A: 'Α. Κατασκευή πισίνας', B: 'Β. Μηχανολογικός εξοπλισμός', C: 'Γ. Επιπλέον εξοπλισμός' };

const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
  del(k) { try { localStorage.removeItem(k); } catch {} },
};
let lang = store.get('lang', 'ru');
const t = (k) => T[lang][k] ?? T.ru[k] ?? k;
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

// ---------- numbers ----------
function num(v) {
  if (typeof v === 'number') return isFinite(v) ? v : 0;
  let s = String(v ?? '').replace(/[\s€]/g, '');
  if (!s) return 0;
  if (s.includes(',')) s = s.replace(/\./g, '').replace(',', '.');
  else if (/^\d{1,3}(\.\d{3})+$/.test(s)) s = s.replace(/\./g, '');
  const n = parseFloat(s);
  return isFinite(n) ? n : 0;
}
const hasNum = (v) => v !== null && v !== undefined && String(v).trim() !== '';
const money = (n) => (Math.round(n * 100) / 100).toLocaleString('el-GR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const dec = (n, d = 1) => n.toLocaleString('el-GR', { minimumFractionDigits: d, maximumFractionDigits: 2 });

// ---------- api ----------
let token = store.get('token', null);
async function api(path, opts = {}) {
  const res = await fetch('/api' + path, {
    method: opts.method || 'GET',
    headers: { 'content-type': 'application/json', ...(token ? { authorization: 'Bearer ' + token } : {}) },
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (res.status === 401 && data.error === 'auth') { token = null; store.del('token'); renderLogin(); throw Object.assign(new Error('auth'), { code: 'auth' }); }
  if (!res.ok) throw Object.assign(new Error(data.error || res.status), { code: data.error, status: res.status });
  return data;
}

// ---------- state ----------
let DB = { categories: [], materials: [], settings: {}, offers: [] };
let view = store.get('view', 'offer');
let offer = null; // current draft
const catById = (id) => DB.categories.find((c) => c.id === id);
const matById = (id) => DB.materials.find((m) => m.id === id);
const nameOf = (m) => (lang === 'ru' && m.ru ? m.ru : m.el);
const catName = (c) => (c ? (lang === 'ru' && c.ru ? c.ru : c.el) : '');

function toast(msg, err) {
  const el = $('#toast'); el.textContent = msg; el.className = 'toast' + (err ? ' err' : ''); el.hidden = false;
  clearTimeout(toast.tm); toast.tm = setTimeout(() => { el.hidden = true; }, err ? 4500 : 2200);
}
function confirmTap(btn, label, action) {
  if (btn.dataset.armed) { delete btn.dataset.armed; btn.classList.remove('armed'); action(); return; }
  btn.dataset.armed = '1'; btn.classList.add('armed'); const old = btn.textContent; btn.textContent = label;
  setTimeout(() => { if (btn.dataset.armed) { delete btn.dataset.armed; btn.classList.remove('armed'); btn.textContent = old; } }, 4000);
}

// ---------- offer model ----------
function today() { return new Date().toISOString().slice(0, 10); }
function offerNo(n) { return `${String(n).padStart(3, '0')}/${today().slice(0, 4)}`; }
function lineFromMaterial(m) {
  return { key: Math.random().toString(36).slice(2), matId: m.id, category: m.category, qty: m.qty ?? 1, qtyManual: false, price: m.price ?? null, custom: false };
}
function newOffer() {
  const s = DB.settings;
  const lines = [];
  DB.categories.forEach((c) => DB.materials.filter((m) => m.category === c.id && m.default).forEach((m) => lines.push(lineFromMaterial(m))));
  return {
    id: null, no: offerNo(s.nextNo || 1), date: today(), client: '', phone: '', email: '', site: '',
    pool: { len: '6', wid: '3', dmin: '1,5', dmax: '1,5', turn: '4', color: (s.colors || [])[0] || '' },
    lines, discount: '',
    terms: { validDays: s.validDays ?? 30, vatRate: s.vatRate ?? 24, delivery: s.delivery || '', place: s.place || '', payment: s.payment || '', notIncluded: s.notIncluded || '' },
  };
}
function poolCalc(p) {
  const L = num(p.len), W = num(p.wid), a = num(p.dmin), b = num(p.dmax);
  const mean = (a + b) / 2;
  return { L, W, a, b, mean, area: L * W, vol: L * W * mean, perim: 2 * (L + W) };
}
function autoQty(line, pc) {
  const m = matById(line.matId) || line.snap || {};
  if (line.qtyManual) return line.qty;
  if (m.unit === 'perim') return Math.round(pc.perim * 100) / 100;
  if (m.unit === 'area') return Math.round(pc.area * 100) / 100;
  return line.qty;
}
function totals(o) {
  const pc = poolCalc(o.pool);
  let net = 0; const missing = [];
  o.lines.forEach((l) => {
    l.qty = autoQty(l, pc);
    if (!hasNum(l.price)) { const m = matById(l.matId); missing.push(m ? nameOf(m) : '?'); return; }
    net += num(l.price) * num(l.qty);
  });
  net -= num(o.discount);
  const rate = num(o.terms.vatRate);
  const vat = Math.round(net * rate) / 100;
  return { pc, net, rate, vat, total: net + vat, missing };
}
function saveDraft() { store.set('draft', offer); }

// ---------- boot ----------
async function boot() {
  applyLang();
  if (!token) {
    try { const st = await (await fetch('/api/status')).json(); return st.setup ? renderLogin() : renderSetup(); }
    catch { $('#app').innerHTML = `<p class="hint">${esc(t('netErr'))}</p>`; return; }
  }
  try { DB = await api('/data'); } catch (e) { if (e.code === 'auth') return; $('#app').innerHTML = `<p class="hint">${esc(t('netErr'))}</p>`; return; }
  offer = store.get('draft', null) || newOffer();
  $('#tabs').hidden = false;
  show(view);
}
function applyLang() {
  document.documentElement.lang = lang;
  $$('[data-t]').forEach((el) => { el.textContent = t(el.dataset.t); });
  $$('.lang button').forEach((b) => b.classList.toggle('on', b.dataset.lang === lang));
}
$$('.lang button').forEach((b) => b.addEventListener('click', () => { lang = b.dataset.lang; store.set('lang', lang); applyLang(); if (token && DB.categories.length) show(view); else boot(); }));
$$('#tabs button').forEach((b) => b.addEventListener('click', () => show(b.dataset.view)));

function show(v) {
  view = v; store.set('view', v);
  $$('#tabs button').forEach((b) => b.classList.toggle('on', b.dataset.view === v));
  ({ offer: renderOffer, materials: renderMaterials, archive: renderArchive, settings: renderSettings }[v] || renderOffer)();
  window.scrollTo(0, 0);
}

// ---------- login ----------
function renderSetup() {
  $('#tabs').hidden = true;
  $('#app').innerHTML = `<section class="card login"><h2>${esc(t('setupTitle'))}</h2><p class="hint">${esc(t('setupHint'))}</p>
    <label class="f">${esc(t('pin'))}<input id="pin1" type="password" inputmode="numeric" autocomplete="new-password"></label>
    <label class="f">${esc(t('pin2'))}<input id="pin2" type="password" inputmode="numeric" autocomplete="new-password"></label>
    <button class="btn main" id="go">${esc(t('create'))}</button></section>`;
  $('#go').onclick = async () => {
    const a = $('#pin1').value.trim(), b = $('#pin2').value.trim();
    if (a.length < 4) return toast(t('shortPin'), true);
    if (a !== b) return toast(t('pinMismatch'), true);
    try { const r = await api('/setup', { method: 'POST', body: { pin: a } }); token = r.token; store.set('token', token); boot(); }
    catch (e) { toast(e.code === 'already_setup' ? t('loginTitle') : t('netErr'), true); if (e.code === 'already_setup') renderLogin(); }
  };
}
function renderLogin() {
  $('#tabs').hidden = true;
  $('#app').innerHTML = `<section class="card login"><h2>${esc(t('loginTitle'))}</h2>
    <label class="f">${esc(t('pin'))}<input id="pin" type="password" inputmode="numeric" autocomplete="current-password"></label>
    <button class="btn main" id="go">${esc(t('enter'))}</button></section>`;
  const go = async () => {
    try { const r = await api('/login', { method: 'POST', body: { pin: $('#pin').value.trim() } }); token = r.token; store.set('token', token); boot(); }
    catch (e) { toast(e.code === 'locked' ? t('locked') : e.code === 'wrong_pin' ? t('wrongPin') : t('netErr'), true); }
  };
  $('#go').onclick = go;
  $('#pin').addEventListener('keydown', (e) => { if (e.key === 'Enter') go(); });
}

// ---------- offer view ----------
function fld(id, label, value, attrs = '') {
  return `<label class="f">${esc(label)}<input id="${id}" value="${esc(value)}" ${attrs}></label>`;
}
function matOptions(catId, selected) {
  return DB.materials.filter((m) => m.category === catId).map((m) =>
    `<option value="${esc(m.id)}" ${m.id === selected ? 'selected' : ''}>${esc(nameOf(m))}${hasNum(m.price) ? ' — ' + money(num(m.price)) + ' €' : ' — ' + t('unsavedPrice')}</option>`).join('');
}
function lineHtml(l) {
  const m = matById(l.matId) || l.snap || { el: '?', unit: 'pcs' };
  const c = catById(l.category);
  const unit = T[lang].units[m.unit] ? (lang === 'ru' ? { pcs: 'шт.', set: 'компл.', m: 'м', m2: 'м²', perim: 'м', area: 'м²' } : UNIT_EL)[m.unit] : '';
  const priceSet = hasNum(l.price);
  const sum = priceSet ? num(l.price) * num(l.qty) : 0;
  const sumTxt = priceSet ? (sum === 0 ? t('included') : money(sum) + ' €') : '';
  return `<div class="line" data-key="${l.key}">
    <div class="cat"><span>${esc(catName(c))}</span><span class="sum">${esc(sumTxt)}</span><button type="button" data-act="rm" aria-label="${esc(t('remove'))}">×</button></div>
    <select data-act="mat" aria-label="${esc(t('chooseMat'))}">${matOptions(l.category, l.matId)}</select>
    <div class="nums">
      <label class="f">${esc(t('qty'))}${unit ? ', ' + esc(unit) : ''}<input data-act="qty" class="num" inputmode="decimal" value="${esc(String(l.qty).replace('.', ','))}"></label>
      <label class="f">${esc(t('unitPrice'))}${l.custom ? ` <span class="custom-tag">· ${esc(t('customPrice'))}</span>` : ''}
        <input data-act="price" class="num" inputmode="decimal" ${l.custom ? '' : 'readonly'} value="${priceSet ? esc(money(num(l.price))) : ''}" placeholder="—"></label>
      ${l.custom ? `<button type="button" class="btn small" data-act="reset">${esc(t('catalogPrice'))}</button>` : `<button type="button" class="btn small" data-act="custom">${esc(t('changePrice'))}</button>`}
    </div>
    ${priceSet ? '' : `<div class="noprice">${esc(t('noPrice'))}</div>`}
  </div>`;
}
function renderOffer() {
  const o = offer, s = DB.settings;
  const groups = ['A', 'B', 'C'];
  const ordered = [];
  groups.forEach((g) => DB.categories.filter((c) => c.group === g).forEach((c) => o.lines.filter((l) => l.category === c.id).forEach((l) => ordered.push(l))));
  o.lines.filter((l) => !ordered.includes(l)).forEach((l) => ordered.push(l));
  let html = `<h1 class="page">${esc(t('tabOffer'))} ${esc(o.no)}</h1>
  <section class="card"><h2>${esc(t('client'))}</h2><div class="grid">
    ${fld('o_no', t('offerNo'), o.no)}${fld('o_date', t('date'), o.date, 'type="date"')}
    <div class="full">${fld('o_client', t('clientName'), o.client)}</div>
    ${fld('o_phone', t('phone'), o.phone, 'inputmode="tel"')}${fld('o_email', t('email'), o.email, 'inputmode="email"')}
    <div class="full">${fld('o_site', t('site'), o.site)}</div></div></section>
  <section class="card"><h2>${esc(t('pool'))}</h2><div class="grid three">
    ${fld('p_len', t('len'), o.pool.len, 'inputmode="decimal"')}${fld('p_wid', t('wid'), o.pool.wid, 'inputmode="decimal"')}${fld('p_turn', t('turn'), o.pool.turn, 'inputmode="decimal"')}
    ${fld('p_dmin', t('dmin'), o.pool.dmin, 'inputmode="decimal"')}${fld('p_dmax', t('dmax'), o.pool.dmax, 'inputmode="decimal"')}
    <label class="f">${esc(t('color'))}<select id="p_color">${(s.colors || []).concat((s.colors || []).includes(o.pool.color) || !o.pool.color ? [] : [o.pool.color]).map((c) => `<option ${c === o.pool.color ? 'selected' : ''}>${esc(c)}</option>`).join('')}</select></label>
  </div><div class="calc" id="poolCalc"></div></section>
  <section class="card"><h2>${esc(t('composition'))}</h2><p class="hint">${esc(t('compHint'))}</p><div id="lines">`;
  let lastGroup = null;
  ordered.forEach((l) => {
    const g = catById(l.category)?.group || 'C';
    if (g !== lastGroup) { html += `<div class="group-title">${esc(T[lang].groups[g])}</div>`; lastGroup = g; }
    html += lineHtml(l);
  });
  html += `</div>
    <div id="adder" hidden class="grid"><label class="f">${esc(t('chooseCat'))}<select id="addCat">${DB.categories.map((c) => `<option value="${esc(c.id)}">${esc(catName(c))}</option>`).join('')}</select></label>
      <label class="f">${esc(t('chooseMat'))}<select id="addMat"></select></label>
      <div class="row full"><button class="btn main" id="addOk" type="button">${esc(t('add'))}</button><button class="btn" id="addNo" type="button">${esc(t('cancel'))}</button></div></div>
    <div class="row"><button class="btn" id="addLine" type="button">${esc(t('addLine'))}</button></div>
  </section>
  <section class="card"><h2>${esc(t('terms'))}</h2><div class="grid">
    ${fld('t_valid', t('validDays'), o.terms.validDays, 'inputmode="numeric"')}${fld('t_vat', t('vatRate'), o.terms.vatRate, 'inputmode="decimal"')}
    ${fld('t_delivery', t('delivery'), o.terms.delivery)}${fld('t_place', t('place'), o.terms.place)}
    <div class="full">${fld('t_payment', t('payment'), o.terms.payment)}</div>
    ${fld('o_discount', t('discount'), o.discount, 'inputmode="decimal" placeholder="0"')}
    <label class="f full">${esc(t('notIncluded'))}<textarea id="t_notinc">${esc(o.terms.notIncluded)}</textarea></label>
  </div></section>
  <div class="row"><button class="btn" id="saveBtn" type="button">${esc(t('save'))}</button><button class="btn" id="dupBtn" type="button">${esc(t('duplicate'))}</button><button class="btn" id="newBtn" type="button">${esc(t('newOffer'))}</button></div>
  <div class="bar"><div class="in"><div class="tot"><span id="totSub"></span><b id="totVal"></b></div>
    <button class="btn" id="shareBtn" type="button" hidden>${esc(t('share'))}</button>
    <button class="btn main" id="pdfBtn" type="button">${esc(t('pdf'))}</button></div></div>`;
  $('#app').innerHTML = html;
  if (navigator.canShare && navigator.canShare({ files: [new File(['x'], 'x.pdf', { type: 'application/pdf' })] })) $('#shareBtn').hidden = false;

  const bind = (id, fn) => $('#' + id).addEventListener('input', (e) => { fn(e.target.value); saveDraft(); updateTotals(); });
  bind('o_no', (v) => { o.no = v; }); bind('o_date', (v) => { o.date = v; }); bind('o_client', (v) => { o.client = v; });
  bind('o_phone', (v) => { o.phone = v; }); bind('o_email', (v) => { o.email = v; }); bind('o_site', (v) => { o.site = v; });
  ['len', 'wid', 'turn', 'dmin', 'dmax'].forEach((k) => bind('p_' + k, (v) => { o.pool[k] = v; refreshAutoQty(); }));
  $('#p_color').addEventListener('change', (e) => { o.pool.color = e.target.value; saveDraft(); });
  bind('t_valid', (v) => { o.terms.validDays = v; }); bind('t_vat', (v) => { o.terms.vatRate = v; });
  bind('t_delivery', (v) => { o.terms.delivery = v; }); bind('t_place', (v) => { o.terms.place = v; });
  bind('t_payment', (v) => { o.terms.payment = v; }); bind('o_discount', (v) => { o.discount = v; });
  bind('t_notinc', (v) => { o.terms.notIncluded = v; });

  const linesEl = $('#lines');
  const lineOf = (el) => o.lines.find((l) => l.key === el.closest('.line').dataset.key);
  linesEl.addEventListener('change', (e) => {
    const act = e.target.dataset.act; if (!act) return;
    const l = lineOf(e.target);
    if (act === 'mat') { const m = matById(e.target.value); Object.assign(l, { matId: m.id, price: m.price ?? null, custom: false, qtyManual: false, qty: m.qty ?? 1 }); saveDraft(); rerenderLine(l); }
  });
  linesEl.addEventListener('input', (e) => {
    const act = e.target.dataset.act; if (!act) return;
    const l = lineOf(e.target);
    if (act === 'qty') { l.qty = num(e.target.value); l.qtyManual = true; }
    if (act === 'price' && l.custom) { l.price = e.target.value.trim() === '' ? null : num(e.target.value); }
    saveDraft(); updateLineSum(l); updateTotals();
  });
  linesEl.addEventListener('click', (e) => {
    const act = e.target.dataset.act; if (!act || !['rm', 'custom', 'reset'].includes(act)) return;
    const l = lineOf(e.target);
    if (act === 'rm') { o.lines = o.lines.filter((x) => x !== l); saveDraft(); renderOffer(); return; }
    if (act === 'custom') { l.custom = true; saveDraft(); rerenderLine(l); $(`.line[data-key="${l.key}"] [data-act=price]`).focus(); return; }
    if (act === 'reset') { const m = matById(l.matId); l.custom = false; l.price = m ? m.price ?? null : l.price; saveDraft(); rerenderLine(l); }
  });

  const fillAddMat = () => { $('#addMat').innerHTML = matOptions($('#addCat').value, null); };
  $('#addLine').onclick = () => { $('#adder').hidden = false; $('#addLine').hidden = true; fillAddMat(); };
  $('#addCat').onchange = fillAddMat;
  $('#addNo').onclick = () => { $('#adder').hidden = true; $('#addLine').hidden = false; };
  $('#addOk').onclick = () => { const m = matById($('#addMat').value); if (!m) return; o.lines.push(lineFromMaterial(m)); saveDraft(); renderOffer(); };

  $('#saveBtn').onclick = () => saveOffer();
  $('#dupBtn').onclick = () => { offer = { ...structuredClone(o), id: null, no: offerNo(DB.settings.nextNo || 1), date: today(), client: '', phone: '', email: '', site: '' }; saveDraft(); renderOffer(); toast(t('duplicate') + ' ✓'); };
  $('#newBtn').onclick = (e) => confirmTap(e.currentTarget, t('newConfirm'), () => { offer = newOffer(); saveDraft(); renderOffer(); });
  $('#pdfBtn').onclick = () => makePdf('download');
  $('#shareBtn').onclick = () => makePdf('share');
  updateTotals();
}
function rerenderLine(l) {
  const el = $(`.line[data-key="${l.key}"]`); if (!el) return;
  el.outerHTML = lineHtml(l); updateTotals();
}
function updateLineSum(l) {
  const el = $(`.line[data-key="${l.key}"] .sum`); if (!el) return;
  if (!hasNum(l.price)) { el.textContent = ''; return; }
  const sum = num(l.price) * num(l.qty);
  el.textContent = sum === 0 ? t('included') : money(sum) + ' €';
}
function refreshAutoQty() {
  const pc = poolCalc(offer.pool);
  offer.lines.forEach((l) => {
    const before = l.qty; l.qty = autoQty(l, pc);
    if (before !== l.qty) { const inp = $(`.line[data-key="${l.key}"] [data-act=qty]`); if (inp) inp.value = String(l.qty).replace('.', ','); updateLineSum(l); }
  });
}
function updateTotals() {
  const c = totals(offer);
  const pc = $('#poolCalc');
  if (pc) pc.innerHTML = `<span>${esc(t('area'))} <b>${dec(c.pc.area)} m²</b></span><span>${esc(t('meanDepth'))} <b>${dec(c.pc.mean, 2)} m</b></span><span>${esc(t('volume'))} <b>${dec(c.pc.vol)} m³</b></span><span>${esc(t('perimeter'))} <b>${dec(c.pc.perim)} m</b></span>`;
  if ($('#totVal')) { $('#totVal').textContent = money(c.total) + ' €'; $('#totSub').textContent = `${t('net')} ${money(c.net)} € · ${t('vat')} ${dec(c.rate, 0)}% ${money(c.vat)} €`; }
}
function snapshotLines(o) {
  o.lines.forEach((l) => { const m = matById(l.matId); if (m) l.snap = { el: m.el, ru: m.ru, unit: m.unit, warranty: m.warranty, desc_el: m.desc_el, image: m.image }; });
}
async function saveOffer(silent) {
  const c = totals(offer);
  snapshotLines(offer);
  const isNew = !offer.id;
  try {
    const r = await api('/offers', { method: 'POST', body: { offer: { ...offer, total: c.total } } });
    offer.id = r.offer.id; saveDraft();
    if (isNew) {
      const m = String(offer.no).match(/^(\d+)\//);
      const used = m ? +m[1] : 0;
      if (used >= (DB.settings.nextNo || 1)) { DB.settings.nextNo = used + 1; await api('/settings', { method: 'PUT', body: { settings: DB.settings } }); }
    }
    const idx = DB.offers.findIndex((x) => x.id === offer.id);
    const row = { id: offer.id, no: offer.no, date: offer.date, client: offer.client, total: c.total, updated: Date.now() };
    if (idx >= 0) DB.offers[idx] = row; else DB.offers.unshift(row);
    if (!silent) toast(t('saved'));
    return true;
  } catch (e) { if (e.code !== 'auth') toast(t('netErr'), true); return false; }
}

// ---------- PDF ----------
const NAVY = '#123a8c', ORANGE = '#e8771e', GREY = '#666666', LIGHT = '#eaf2fc', LINE = '#b8c7e0';
const imgCache = {};
async function dataUrl(src) {
  if (!src) return null;
  if (imgCache[src]) return imgCache[src];
  try {
    const blob = await (await fetch(src)).blob();
    const bmp = await createImageBitmap(blob);
    const k = Math.min(1, 480 / bmp.width, 360 / bmp.height);
    const cv = document.createElement('canvas'); cv.width = Math.round(bmp.width * k); cv.height = Math.round(bmp.height * k);
    const cx = cv.getContext('2d'); cx.fillStyle = '#fff'; cx.fillRect(0, 0, cv.width, cv.height); cx.drawImage(bmp, 0, 0, cv.width, cv.height);
    return (imgCache[src] = cv.toDataURL('image/jpeg', 0.85));
  } catch { return null; }
}
const greekCaps = (s) => s.normalize('NFD').replace(/́/g, '').normalize('NFC').toUpperCase();
const fmtDate = (iso) => { const m = String(iso).match(/^(\d{4})-(\d{2})-(\d{2})$/); return m ? `${m[3]}.${m[2]}.${m[1]}` : iso; };
const lay = { hLineWidth: () => 0.6, vLineWidth: () => 0.6, hLineColor: () => LINE, vLineColor: () => LINE, paddingLeft: () => 5, paddingRight: () => 5, paddingTop: () => 3.5, paddingBottom: () => 3.5 };
const kv = (k, v) => [{ text: k, color: GREY, fillColor: LIGHT, fontSize: 8.5 }, { text: v || '—', bold: true }];
function heading(n, txt) {
  return { margin: [0, 14, 0, 6], table: { widths: ['*'], body: [[{ text: [{ text: n + '  ', color: ORANGE }, { text: txt, color: NAVY }], bold: true, fontSize: 12 }]] },
    layout: { hLineWidth: (i) => (i === 1 ? 1.2 : 0), vLineWidth: () => 0, hLineColor: () => ORANGE, paddingLeft: () => 0, paddingBottom: () => 3 } };
}
async function buildDoc(o) {
  const s = DB.settings, c = totals(o), pc = c.pc;
  const logo = await dataUrl('/logo.png');
  const items = [];
  ['A', 'B', 'C'].forEach((g) => DB.categories.filter((cat) => cat.group === g).forEach((cat) => o.lines.filter((l) => l.category === cat.id).forEach((l) => items.push({ l, g }))));
  o.lines.filter((l) => !items.some((x) => x.l === l)).forEach((l) => items.push({ l, g: 'C' }));
  for (const it of items) {
    const m = matById(it.l.matId) || it.l.snap || {};
    it.m = m; it.img = await dataUrl(m.image);
  }
  items.forEach((it, i) => { it.n = i + 1; });
  const content = [];
  content.push({ text: 'ΟΙΚΟΝΟΜΙΚΗ ΠΡΟΣΦΟΡΑ', fontSize: 20, bold: true, color: NAVY });
  content.push({ text: s.subtitle || '', color: GREY, fontSize: 11, margin: [0, 0, 0, 10] });
  content.push({ table: { widths: [70, '*', 65, '*'], body: [
    [...kv('Αρ. προσφοράς', o.no), ...kv('Ημερομηνία', fmtDate(o.date))],
    [...kv('Πελάτης', o.client), ...kv('Τηλέφωνο', o.phone)],
    [...kv('Τόπος έργου', o.site), ...kv('Email', o.email)],
  ] }, layout: lay });
  content.push(heading('1', 'Η ΠΙΣΙΝΑ ΣΑΣ'));
  const depth = pc.a === pc.b ? `${dec(pc.mean, 2)} m` : `${dec(pc.mean, 2)} m (${dec(pc.a, 2)} – ${dec(pc.b, 2)} m)`;
  content.push({ table: { widths: [150, '*'], body: [
    kv('Σχήμα και διαστάσεις', `Ορθογωνική ${dec(pc.L)} × ${dec(pc.W)} m`), kv('Μέσο βάθος', depth),
    kv('Επιφάνεια νερού', `${dec(pc.area)} m²`), kv('Όγκος νερού', `${dec(pc.vol)} m³`),
    kv('Ανακυκλοφορία νερού', `${dec(num(o.pool.turn))} ώρες`), kv('Χρώμα μεμβράνης', o.pool.color),
  ] }, layout: lay });

  content.push(heading('2', 'ΤΙ ΠΕΡΙΛΑΜΒΑΝΕΙ Η ΠΡΟΣΦΟΡΑ'));
  const H = (x, al) => ({ text: x, bold: true, color: '#ffffff', fillColor: NAVY, fontSize: 8, alignment: al });
  const body = [[H('Α/Α', 'center'), H('Περιγραφή'), H('Ποσότ.', 'center'), H('Εγγύηση', 'center'), H('Τιμή (€)', 'right')]];
  let lastG = null;
  items.forEach((it) => {
    if (it.g !== lastG) { body.push([{ text: GROUP_EL[it.g], colSpan: 5, bold: true, color: NAVY, fillColor: LIGHT }, {}, {}, {}, {}]); lastG = it.g; }
    const sum = num(it.l.price) * num(it.l.qty);
    const q = `${dec(num(it.l.qty), 0)} ${UNIT_EL[it.m.unit] || ''}`.trim();
    body.push([{ text: String(it.n), alignment: 'center' }, it.m.el || '', { text: q, alignment: 'center' }, { text: it.m.warranty || '—', alignment: 'center' },
      sum === 0 ? { text: 'περιλαμβάνεται', italics: true, color: GREY, alignment: 'right' } : { text: money(sum), alignment: 'right' }]);
  });
  const tot = (l, v, big) => body.push([{ text: l, colSpan: 4, bold: true, alignment: 'right', fontSize: big ? 11 : 9, color: big ? '#ffffff' : undefined, fillColor: big ? NAVY : undefined }, {}, {}, {},
    { text: v, bold: true, alignment: 'right', fontSize: big ? 11 : 9, color: big ? '#ffffff' : undefined, fillColor: big ? NAVY : undefined }]);
  if (num(o.discount)) tot('Έκπτωση', '−' + money(num(o.discount)));
  tot('Καθαρή αξία', money(c.net));
  tot(`ΦΠΑ ${dec(c.rate, 0)}%`, money(c.vat));
  tot('ΣΥΝΟΛΟ ΜΕ ΦΠΑ', money(c.total) + ' €', true);
  content.push({ table: { headerRows: 1, dontBreakRows: true, widths: [24, '*', 52, 62, 78], body }, layout: lay, fontSize: 8.5 });

  content.push(heading('3', 'ΟΡΟΙ ΤΗΣ ΠΡΟΣΦΟΡΑΣ'));
  content.push({ table: { widths: [150, '*'], body: [
    kv('Ισχύς προσφοράς', `${o.terms.validDays} ημέρες`), kv('Χρόνος παράδοσης', o.terms.delivery),
    kv('Τόπος παράδοσης', o.terms.place), kv('Τρόπος πληρωμής', o.terms.payment),
  ] }, layout: lay });
  if (o.terms.notIncluded) {
    content.push({ text: 'Δεν περιλαμβάνονται στην τιμή:', bold: true, margin: [0, 8, 0, 2] });
    content.push({ text: o.terms.notIncluded, fontSize: 8.5 });
  }
  content.push({ stack: [
    heading('4', 'ΑΠΟΔΟΧΗ ΤΗΣ ΠΡΟΣΦΟΡΑΣ'),
    { text: 'Για να έχει η προσφορά ισχύ παραγγελίας, παρακαλούμε να μας επιστραφεί υπογεγραμμένη (με μονογραφή σε κάθε σελίδα). Για οποιαδήποτε πληροφορία είμαστε στη διάθεσή σας.', fontSize: 8.5, margin: [0, 0, 0, 8] },
    { table: { widths: ['*', '*'], body: [[
      { stack: [{ text: 'Για την εταιρεία', bold: true, color: NAVY, margin: [0, 0, 0, 8] }, { text: s.signatory || '', margin: [0, 0, 0, 14] }, 'Υπογραφή: ____________________'], margin: [2, 4, 2, 6] },
      { stack: [{ text: 'Ο πελάτης', bold: true, color: NAVY, margin: [0, 0, 0, 8] }, { text: 'Ονοματεπώνυμο: ______________', margin: [0, 0, 0, 10] }, { text: 'Ημερομηνία: ______________', margin: [0, 0, 0, 10] }, 'Υπογραφή: ____________________'], margin: [2, 4, 2, 6] },
    ]] }, layout: lay },
  ], unbreakable: true });

  const described = items.filter((it) => (it.m.desc_el || []).length || it.img);
  if (described.length) {
    content.push({ text: '', pageBreak: 'after' });
    content.push(heading('5', 'ΠΕΡΙΓΡΑΦΗ ΥΛΙΚΩΝ ΚΑΙ ΕΞΟΠΛΙΣΜΟΥ'));
    content.push({ text: 'Οι αριθμοί αντιστοιχούν στον πίνακα της ενότητας 2.', fontSize: 8, color: GREY, margin: [0, 0, 0, 8] });
    described.forEach((it) => {
      const paras = (it.m.desc_el || []).map((p) => p.replace(/\{color\}/g, o.pool.color || ''));
      const left = { stack: [
        { text: [{ text: it.n + '.  ', color: ORANGE }, { text: greekCaps(it.m.el || ''), color: NAVY }], bold: true, fontSize: 9.5, margin: [0, 0, 0, 5] },
        ...paras.map((p) => ({ text: p, fontSize: 8.5, margin: [0, 0, 0, 3] })),
      ] };
      const row = it.img ? [left, { image: it.img, fit: [140, 85], alignment: 'center' }] : [{ ...left, colSpan: 2 }, {}];
      content.push({ table: { widths: ['*', 150], body: [row] }, layout: lay, unbreakable: true, margin: [0, 0, 0, 7] });
    });
  }
  return {
    pageSize: 'A4', pageMargins: [40, 82, 40, 50],
    info: { title: `Οικονομική προσφορά ${o.no}`, author: s.company || '' },
    defaultStyle: { font: 'Roboto', fontSize: 9, lineHeight: 1.15 },
    header: () => ({ margin: [40, 22, 40, 0], stack: [
      { columns: [
        logo ? { image: logo, width: 36, height: 36 } : { text: '', width: 36 },
        { stack: [{ text: s.company || '', bold: true, fontSize: 15, color: NAVY }, { text: s.tagline || '', fontSize: 8.5, color: GREY }], margin: [8, 3, 0, 0], width: '*' },
        { stack: [
          { text: s.address || '', fontSize: 7.5, color: GREY }, { text: s.phones || '', fontSize: 7.5, bold: true, color: NAVY },
          { text: s.email || '', fontSize: 7.5, color: GREY }, { text: s.sites || '', fontSize: 7.5, color: NAVY },
        ], alignment: 'right', width: 'auto' },
      ] },
      { canvas: [{ type: 'line', x1: 0, y1: 6, x2: 515, y2: 6, lineWidth: 1.2, lineColor: NAVY }] },
    ] }),
    footer: (cur, total) => ({ margin: [40, 14, 40, 0], stack: [
      { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 0.5, lineColor: LINE }] },
      { columns: [
        { text: `Προσφορά αρ. ${o.no} · Σελίδα ${cur} από ${total}`, fontSize: 7.5, color: GREY },
        { text: 'Μονογραφή πελάτη: __________', fontSize: 7.5, color: GREY, alignment: 'right' },
      ], margin: [0, 4, 0, 0] },
    ] }),
    content,
  };
}
function pdfName(o) {
  const who = (o.client || 'pelatis').trim().replace(/[\\/:*?"<>|]+/g, '').replace(/\s+/g, '_');
  return `Prosfora_${String(o.no || '').replace(/\//g, '-')}_${who}.pdf`;
}
async function makePdf(mode) {
  if (!window.pdfMake) return toast(t('pdfLoading'), true);
  const c = totals(offer);
  if (c.missing.length) return toast(t('pdfMissing') + c.missing.join(', '), true);
  const btn = $(mode === 'share' ? '#shareBtn' : '#pdfBtn'); btn.disabled = true;
  try {
    await saveOffer(true);
    const doc = await buildDoc(offer);
    const blob = await new Promise((res) => pdfMake.createPdf(doc).getBlob(res));
    const name = pdfName(offer);
    if (mode === 'share') {
      try { await navigator.share({ files: [new File([blob], name, { type: 'application/pdf' })], title: name }); } catch (e) { if (e.name !== 'AbortError') toast(String(e.message || e), true); }
    } else {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 30000);
      toast(t('pdfReady'));
    }
  } catch (e) { toast(String(e.message || e), true); } finally { btn.disabled = false; }
}

// ---------- materials view ----------
let matFilter = '';
function renderMaterials() {
  const q = matFilter.toLowerCase();
  let html = `<h1 class="page">${esc(t('materials'))}</h1><p class="hint">${esc(t('matHint'))}</p>
    <div class="row"><input id="mSearch" placeholder="${esc(t('search'))}" value="${esc(matFilter)}" style="flex:1"><button class="btn main" id="mNew" type="button">${esc(t('newMaterial'))}</button></div>`;
  DB.categories.forEach((c) => {
    const mats = DB.materials.filter((m) => m.category === c.id && (!q || (m.el + ' ' + (m.ru || '')).toLowerCase().includes(q)));
    if (q && !mats.length) return;
    html += `<section class="card"><h2>${esc(catName(c))} <small>${esc(T[lang].groups[c.group] || '')}</small></h2><div>`;
    mats.forEach((m) => {
      html += `<button type="button" class="mat" data-id="${esc(m.id)}">${m.image ? `<img src="${esc(m.image)}" alt="" loading="lazy">` : '<span class="ph"></span>'}
        <span class="t"><b>${esc(nameOf(m))}</b><span>${esc(lang === 'ru' ? m.el : (m.ru || ''))}</span></span>
        <span class="p">${hasNum(m.price) ? money(num(m.price)) + ' €' : `<span class="noprice">${esc(t('unsavedPrice'))}</span>`}</span></button>`;
    });
    html += `</div></section>`;
  });
  html += `<div class="row"><button class="btn" id="mCats" type="button">${esc(t('editCategories'))}</button></div>`;
  $('#app').innerHTML = html;
  $('#mSearch').addEventListener('input', (e) => { matFilter = e.target.value; const pos = e.target.selectionStart; renderMaterials(); const s = $('#mSearch'); s.focus(); s.setSelectionRange(pos, pos); });
  $('#mNew').onclick = () => renderMaterialEdit({ category: DB.categories[0]?.id, el: '', ru: '', unit: 'pcs', qty: 1, price: null, warranty: '', desc_el: [], image: '', default: false });
  $('#mCats').onclick = renderCategories;
  $$('.mat').forEach((b) => b.addEventListener('click', () => renderMaterialEdit(structuredClone(matById(b.dataset.id)))));
}
function renderMaterialEdit(m) {
  const units = T[lang].units;
  $('#app').innerHTML = `<button class="btn link" id="back" type="button">${esc(t('back'))}</button>
  <section class="card"><h2>${esc(t('matEdit'))}</h2><div class="grid">
    <label class="f full">${esc(t('category'))}<select id="e_cat">${DB.categories.map((c) => `<option value="${esc(c.id)}" ${c.id === m.category ? 'selected' : ''}>${esc(catName(c))}</option>`).join('')}</select></label>
    <label class="f full">${esc(t('nameEl'))}<input id="e_el" value="${esc(m.el)}"></label>
    <label class="f full">${esc(t('nameRu'))}<input id="e_ru" value="${esc(m.ru || '')}"></label>
    <label class="f full">${esc(t('price'))}<input id="e_price" class="num" inputmode="decimal" value="${hasNum(m.price) ? esc(money(num(m.price))) : ''}" placeholder="—"></label>
    <label class="f">${esc(t('unit'))}<select id="e_unit">${Object.keys(units).map((u) => `<option value="${u}" ${u === m.unit ? 'selected' : ''}>${esc(units[u])}</option>`).join('')}</select></label>
    <label class="f">${esc(t('defQty'))}<input id="e_qty" class="num" inputmode="decimal" value="${esc(String(m.qty ?? 1).replace('.', ','))}"></label>
    <label class="f full">${esc(t('warranty'))}<input id="e_war" value="${esc(m.warranty || '')}" placeholder="2 χρόνια"></label>
    <label class="f full">${esc(t('desc'))}<textarea id="e_desc" rows="5">${esc((m.desc_el || []).join('\n\n'))}</textarea></label>
    <div class="full"><div class="f" style="font-size:12.5px;color:var(--muted);margin-bottom:6px">${esc(t('photo'))}</div>
      <div class="photo"><img id="e_img" src="${esc(m.image || '')}" alt="" ${m.image ? '' : 'hidden'}>
        <div class="row"><label class="btn small">${esc(t('uploadPhoto'))}<input id="e_file" type="file" accept="image/*" hidden></label>
        <button class="btn small" id="e_noimg" type="button" ${m.image ? '' : 'hidden'}>${esc(t('removePhoto'))}</button></div></div></div>
    <label class="check full"><input type="checkbox" id="e_def" ${m.default ? 'checked' : ''}>${esc(t('isDefault'))}</label>
  </div>
  <div class="row"><button class="btn main" id="e_save" type="button">${esc(t('save'))}</button>${m.id ? `<button class="btn danger" id="e_del" type="button">${esc(t('del'))}</button>` : ''}</div></section>`;
  $('#back').onclick = renderMaterials;
  $('#e_file').onchange = async (e) => {
    const f = e.target.files[0]; if (!f) return;
    try {
      const bmp = await createImageBitmap(f);
      const k = Math.min(1, 640 / bmp.width, 480 / bmp.height);
      const cv = document.createElement('canvas'); cv.width = Math.round(bmp.width * k); cv.height = Math.round(bmp.height * k);
      const cx = cv.getContext('2d'); cx.fillStyle = '#fff'; cx.fillRect(0, 0, cv.width, cv.height); cx.drawImage(bmp, 0, 0, cv.width, cv.height);
      const r = await api('/images', { method: 'POST', body: { data: cv.toDataURL('image/jpeg', 0.82) } });
      m.image = r.url; $('#e_img').src = r.url; $('#e_img').hidden = false; $('#e_noimg').hidden = false;
    } catch (err) { toast(t('netErr'), true); }
  };
  $('#e_noimg').onclick = () => { m.image = ''; $('#e_img').hidden = true; $('#e_noimg').hidden = true; };
  $('#e_save').onclick = async () => {
    const pv = $('#e_price').value.trim();
    Object.assign(m, {
      category: $('#e_cat').value, el: $('#e_el').value.trim(), ru: $('#e_ru').value.trim(), unit: $('#e_unit').value,
      qty: num($('#e_qty').value) || 1, price: pv === '' ? null : num(pv), warranty: $('#e_war').value.trim(),
      desc_el: $('#e_desc').value.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean), default: $('#e_def').checked,
    });
    if (!m.el) return toast(t('nameEl'), true);
    try {
      const r = await api('/materials', { method: 'POST', body: { material: m } });
      const i = DB.materials.findIndex((x) => x.id === r.material.id);
      if (i >= 0) DB.materials[i] = r.material; else DB.materials.push(r.material);
      toast(t('saved')); renderMaterials();
    } catch (e) { if (e.code !== 'auth') toast(t('netErr'), true); }
  };
  if (m.id) $('#e_del').onclick = (e) => confirmTap(e.currentTarget, t('delConfirm'), async () => {
    try { await api('/materials/' + m.id, { method: 'DELETE' }); DB.materials = DB.materials.filter((x) => x.id !== m.id); renderMaterials(); }
    catch (err) { toast(t('netErr'), true); }
  });
}
function renderCategories() {
  const cats = structuredClone(DB.categories);
  const draw = () => {
    $('#app').innerHTML = `<button class="btn link" id="back" type="button">${esc(t('back'))}</button>
    <section class="card"><h2>${esc(t('editCategories'))}</h2>
    ${cats.map((c, i) => `<div class="grid" data-i="${i}" style="border-top:1px solid var(--line);padding-top:10px">
      <label class="f">${esc(t('catName'))} (ελ)<input data-k="el" value="${esc(c.el)}"></label>
      <label class="f">${esc(t('catName'))} (рус)<input data-k="ru" value="${esc(c.ru || '')}"></label>
      <label class="f">${esc(t('catGroup'))}<select data-k="group">${['A', 'B', 'C'].map((g) => `<option value="${g}" ${g === c.group ? 'selected' : ''}>${esc(T[lang].groups[g])}</option>`).join('')}</select></label>
      <div class="row end"><button class="btn small" data-mv="-1" type="button">${t('up')}</button><button class="btn small" data-mv="1" type="button">${t('down')}</button></div>
    </div>`).join('')}
    <div class="row"><button class="btn" id="cAdd" type="button">${esc(t('newCategory'))}</button><button class="btn main" id="cSave" type="button">${esc(t('saveCategories'))}</button></div></section>`;
    $('#back').onclick = renderMaterials;
    $$('[data-i]').forEach((row) => {
      const c = cats[+row.dataset.i];
      $$('[data-k]', row).forEach((inp) => inp.addEventListener('input', () => { c[inp.dataset.k] = inp.value; }));
      $$('[data-mv]', row).forEach((b) => b.addEventListener('click', () => {
        const i = +row.dataset.i, j = i + +b.dataset.mv; if (j < 0 || j >= cats.length) return;
        [cats[i], cats[j]] = [cats[j], cats[i]]; draw();
      }));
    });
    $('#cAdd').onclick = () => { cats.push({ id: 'c' + Date.now().toString(36), el: '', ru: '', group: 'C' }); draw(); };
    $('#cSave').onclick = async () => {
      try { await api('/categories', { method: 'PUT', body: { categories: cats.filter((c) => c.el || c.ru) } }); DB.categories = cats.filter((c) => c.el || c.ru); toast(t('saved')); renderMaterials(); }
      catch (e) { toast(t('netErr'), true); }
    };
  };
  draw();
}

// ---------- archive ----------
function renderArchive() {
  const list = DB.offers;
  $('#app').innerHTML = `<h1 class="page">${esc(t('archive'))}</h1>
    <section class="card">${list.length ? list.map((o) => `<div class="offer-row"><div><b>${esc(o.no)} · ${esc(o.client || '—')}</b><br><span>${esc(fmtDate(o.date))} · ${money(num(o.total))} €</span></div>
      <div class="row end"><button class="btn small" data-open="${esc(o.id)}" type="button">${esc(t('open'))}</button><button class="btn small danger" data-del="${esc(o.id)}" type="button">${esc(t('del'))}</button></div></div>`).join('')
      : `<p class="hint">${esc(t('archiveEmpty'))}</p>`}</section>`;
  $$('[data-open]').forEach((b) => b.addEventListener('click', async () => {
    try { const r = await api('/offers/' + b.dataset.open); offer = r.offer; saveDraft(); show('offer'); } catch (e) { toast(t('netErr'), true); }
  }));
  $$('[data-del]').forEach((b) => b.addEventListener('click', (e) => confirmTap(e.currentTarget, t('delConfirm'), async () => {
    try { await api('/offers/' + b.dataset.del, { method: 'DELETE' }); DB.offers = DB.offers.filter((o) => o.id !== b.dataset.del); if (offer && offer.id === b.dataset.del) offer.id = null; renderArchive(); }
    catch (err) { toast(t('netErr'), true); }
  })));
}

// ---------- settings ----------
function renderSettings() {
  const s = DB.settings;
  const f = (k, label, attrs = '') => `<label class="f full">${esc(label)}<input data-s="${k}" value="${esc(s[k] ?? '')}" ${attrs}></label>`;
  $('#app').innerHTML = `<h1 class="page">${esc(t('settings'))}</h1>
  <section class="card"><h2>${esc(t('company'))}</h2><div class="grid">
    ${f('company', t('companyName'))}${f('tagline', t('tagline'))}${f('address', t('address'))}${f('phones', t('phones'))}${f('email', t('email'))}${f('sites', t('sites'))}${f('signatory', t('signatory'))}${f('subtitle', t('subtitle'))}
  </div></section>
  <section class="card"><h2>${esc(t('defaults'))}</h2><div class="grid">
    ${f('validDays', t('validDays'), 'inputmode="numeric"')}${f('vatRate', t('vatRate'), 'inputmode="decimal"')}${f('delivery', t('delivery'))}${f('place', t('place'))}${f('payment', t('payment'))}
    <label class="f full">${esc(t('notIncluded'))}<textarea data-s="notIncluded">${esc(s.notIncluded || '')}</textarea></label>
    <label class="f full">${esc(t('colors'))}<input id="s_colors" value="${esc((s.colors || []).join(', '))}"></label>
    ${f('nextNo', t('nextNo'), 'inputmode="numeric"')}
  </div><div class="row"><button class="btn main" id="sSave" type="button">${esc(t('saveSettings'))}</button></div></section>
  <section class="card"><h2>${esc(t('changePin'))}</h2><div class="grid">
    <label class="f">${esc(t('newPin'))}<input id="np1" type="password" inputmode="numeric" autocomplete="new-password"></label>
    <label class="f">${esc(t('pin2'))}<input id="np2" type="password" inputmode="numeric" autocomplete="new-password"></label></div>
    <div class="row"><button class="btn" id="pSave" type="button">${esc(t('changePin'))}</button><button class="btn danger" id="logout" type="button">${esc(t('logout'))}</button></div></section>`;
  $('#sSave').onclick = async () => {
    const ns = { ...s };
    $$('[data-s]').forEach((i) => { ns[i.dataset.s] = i.value; });
    ns.vatRate = num(ns.vatRate); ns.validDays = num(ns.validDays); ns.nextNo = Math.max(1, Math.round(num(ns.nextNo)) || 1);
    ns.colors = $('#s_colors').value.split(',').map((x) => x.trim()).filter(Boolean);
    try { await api('/settings', { method: 'PUT', body: { settings: ns } }); DB.settings = ns; toast(t('saved')); } catch (e) { toast(t('netErr'), true); }
  };
  $('#pSave').onclick = async () => {
    const a = $('#np1').value.trim(), b = $('#np2').value.trim();
    if (a.length < 4) return toast(t('shortPin'), true);
    if (a !== b) return toast(t('pinMismatch'), true);
    try { const r = await api('/pin', { method: 'POST', body: { pin: a } }); token = r.token; store.set('token', token); toast(t('saved')); } catch (e) { toast(t('netErr'), true); }
  };
  $('#logout').onclick = (e) => confirmTap(e.currentTarget, t('logout') + '?', () => { token = null; store.del('token'); boot(); });
}

boot();
