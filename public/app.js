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
    share: 'Отправить', download: 'Скачать', sendApps: 'Отправить',
    appCard: 'Приложение', appHint: 'Установите сайт как приложение: оно откроется с иконки на экране, на весь экран, и покажет последний каталог даже без интернета.', appInstall: 'Установить приложение', appInstalled: 'Приложение установлено ✓', appIos: 'На iPhone: откройте сайт в Safari → кнопка «Поделиться» → «На экран Домой».', appOther: 'Если кнопки нет: меню браузера (⋮) → «Установить приложение» или «Добавить на главный экран».',
    materials: 'Справочник материалов', matHint: 'Здесь хранятся материалы и их цены. В предложении цена подставится сама.', search: 'Поиск', newMaterial: '+ Новый материал', editCategories: 'Категории',
    matEdit: 'Материал', category: 'Категория', nameEl: 'Название (греч.) — идёт в PDF', nameRu: 'Название (рус.)', unit: 'Единица', defQty: 'Кол-во по умолч.', price: 'Цена за ед. без НДС, €', warranty: 'Гарантия (греч.)', desc: 'Описание для PDF (греч.). Пустая строка = новый абзац. {color} = цвет мембраны', photo: 'Фото', uploadPhoto: 'Загрузить фото', dropPhoto: 'или перетащите файл с фото сюда', dropBad: 'Это не картинка', removePhoto: 'Убрать фото', isDefault: 'Добавлять в новое предложение автоматически', del: 'Удалить', delConfirm: 'Нажмите ещё раз для удаления', back: '← Назад',
    units: { pcs: 'шт.', set: 'компл.', m: 'м', m2: 'м²', perim: 'м (периметр, считается сам)', area: 'м² (площадь воды, считается сам)' },
    catName: 'Название', catGroup: 'Раздел', groups: { A: 'А. Конструкция', B: 'Б. Оборудование', C: 'В. Опции' }, newCategory: '+ Категория', saveCategories: 'Сохранить категории', up: '↑', down: '↓',
    archive: 'Сохранённые предложения', archiveEmpty: 'Пока пусто. Нажмите «Сохранить» на экране предложения.', open: 'Открыть',
    signCard: 'Подпись в PDF', signHint: 'Сфотографируйте подпись на белом листе. Фон уберётся сам, подпись встанет в PDF над строкой «Για την εταιρεία — Υπογραφή».', signUpload: 'Загрузить подпись', signDrop: 'или перетащите файл сюда', signRemove: 'Убрать подпись', settings: 'Настройки', company: 'Компания (шапка PDF)', companyName: 'Название', tagline: 'Подпись', address: 'Адрес', phones: 'Телефоны', sites: 'Сайты', signatory: 'Подписант', subtitle: 'Подзаголовок предложения',
    defaults: 'Условия по умолчанию', colors: 'Цвета мембраны (через запятую)', nextNo: 'Следующий номер', changePin: 'Сменить PIN', newPin: 'Новый PIN', saveSettings: 'Сохранить настройки', logout: 'Выйти на этом телефоне',
    netErr: 'Нет связи с сервером. Изменения сохранены на телефоне.', unsavedPrice: 'нет цены',
    fixedTotal: 'Указать итоговую цену вручную (без цен по материалам)', fixedNet: 'Итоговая цена без НДС, €', fixedHint: 'НДС добавится сам. В PDF будут позиции без цен и итог.',
    chooseTemplate: 'Выберите шаблон', chooseTemplateHint: 'Состав и подзаголовок подставятся из шаблона. Позиции можно добавлять и удалять, но только в этом предложении: шаблон не меняется.', emptyTemplate: 'Новое предложение (заполнить самостоятельно)', emptyTemplateHint: 'Без позиций: добавьте их сами кнопкой «+ Добавить позицию»', continueDraft: 'Продолжить начатое', positions: 'позиций',
    saveAsTemplate: 'Сохранить состав как шаблон', tplOverwrite: 'Заменить шаблон', tplNew: 'Новый шаблон', tplName: 'Название шаблона', tplSaved: 'Шаблон сохранён', templates: 'Шаблоны', tplDelete: 'Удалить шаблон', template: 'Шаблон',
    pdfLang: 'Язык PDF', pdfSign: 'Подпись в PDF', fmtEdit: '✎ Изменить', fmtDone: 'Готово', fmtReset: 'Вернуть как было', fmtHint: 'Правки только для этого предложения и для PDF на {L}. Каталог и шаблоны не меняются.', fmtLangs: { el: 'греческом', en: 'английском' },
    fmtTitle: 'Заголовок', fmtSubtitle: 'Подзаголовок', fmtNote: 'Примечание (под данными клиента)', fmtShow: 'Показывать в PDF', secPool: 'Бассейн', secDescr: 'Описание материалов', secPhotos: 'Фото материалов', secTerms: 'Условия', secNotIncl: '«Не включено в цену»',
    fmtItems: 'Позиции', fmtName: 'Название', fmtDesc: 'Описание (пустая строка = новый абзац)', signShort: 'Подпись', english: 'Английский (для PDF на EN)', nameEn: 'Название (англ.) — для PDF на английском', descEn: 'Описание для PDF на английском', subtitleOffer: 'Подзаголовок (греч.)', subtitleEn: 'Подзаголовок (англ.)',
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
    share: 'Αποστολή', download: 'Λήψη', sendApps: 'Αποστολή',
    appCard: 'Εφαρμογή', appHint: 'Εγκαταστήστε τον ιστότοπο ως εφαρμογή: ανοίγει από εικονίδιο, σε πλήρη οθόνη, και δείχνει τον τελευταίο κατάλογο και χωρίς internet.', appInstall: 'Εγκατάσταση εφαρμογής', appInstalled: 'Η εφαρμογή είναι εγκατεστημένη ✓', appIos: 'Σε iPhone: ανοίξτε τον ιστότοπο στο Safari → «Κοινοποίηση» → «Προσθήκη στην οθόνη Αφετηρίας».', appOther: 'Αν δεν υπάρχει κουμπί: μενού του browser (⋮) → «Εγκατάσταση εφαρμογής».',
    materials: 'Κατάλογος υλικών', matHint: 'Εδώ φυλάσσονται τα υλικά και οι τιμές τους. Στην προσφορά η τιμή μπαίνει αυτόματα.', search: 'Αναζήτηση', newMaterial: '+ Νέο υλικό', editCategories: 'Κατηγορίες',
    matEdit: 'Υλικό', category: 'Κατηγορία', nameEl: 'Όνομα (ελληνικά) — στο PDF', nameRu: 'Όνομα (ρωσικά)', unit: 'Μονάδα', defQty: 'Προεπιλ. ποσότητα', price: 'Τιμή μονάδας χωρίς ΦΠΑ, €', warranty: 'Εγγύηση', desc: 'Περιγραφή για το PDF. Κενή γραμμή = νέα παράγραφος. {color} = χρώμα μεμβράνης', photo: 'Φωτογραφία', uploadPhoto: 'Ανέβασμα φωτογραφίας', dropPhoto: 'ή σύρετε εδώ το αρχείο της φωτογραφίας', dropBad: 'Δεν είναι εικόνα', removePhoto: 'Αφαίρεση φωτογραφίας', isDefault: 'Μπαίνει αυτόματα σε νέα προσφορά', del: 'Διαγραφή', delConfirm: 'Πατήστε ξανά για διαγραφή', back: '← Πίσω',
    units: { pcs: 'τεμ.', set: 'σετ', m: 'm', m2: 'm²', perim: 'm (περίμετρος, αυτόματα)', area: 'm² (επιφάνεια νερού, αυτόματα)' },
    catName: 'Όνομα', catGroup: 'Ενότητα', groups: { A: 'Α. Κατασκευή', B: 'Β. Εξοπλισμός', C: 'Γ. Επιπλέον' }, newCategory: '+ Κατηγορία', saveCategories: 'Αποθήκευση κατηγοριών', up: '↑', down: '↓',
    archive: 'Αποθηκευμένες προσφορές', archiveEmpty: 'Κενό. Πατήστε «Αποθήκευση» στην προσφορά.', open: 'Άνοιγμα',
    signCard: 'Υπογραφή στο PDF', signHint: 'Φωτογραφίστε την υπογραφή σε λευκό χαρτί. Το φόντο αφαιρείται αυτόματα και η υπογραφή μπαίνει στο PDF, στο «Για την εταιρεία — Υπογραφή».', signUpload: 'Ανέβασμα υπογραφής', signDrop: 'ή σύρετε το αρχείο εδώ', signRemove: 'Αφαίρεση υπογραφής', settings: 'Ρυθμίσεις', company: 'Εταιρεία (κεφαλίδα PDF)', companyName: 'Όνομα', tagline: 'Υπότιτλος', address: 'Διεύθυνση', phones: 'Τηλέφωνα', sites: 'Ιστοσελίδες', signatory: 'Υπογράφων', subtitle: 'Υπότιτλος προσφοράς',
    defaults: 'Προεπιλεγμένοι όροι', colors: 'Χρώματα μεμβράνης (με κόμμα)', nextNo: 'Επόμενος αριθμός', changePin: 'Αλλαγή PIN', newPin: 'Νέο PIN', saveSettings: 'Αποθήκευση ρυθμίσεων', logout: 'Έξοδος σε αυτό το κινητό',
    netErr: 'Δεν υπάρχει σύνδεση. Οι αλλαγές κρατήθηκαν στο κινητό.', unsavedPrice: 'χωρίς τιμή',
    fixedTotal: 'Συνολική τιμή χειροκίνητα (χωρίς τιμές ανά υλικό)', fixedNet: 'Συνολική τιμή χωρίς ΦΠΑ, €', fixedHint: 'Ο ΦΠΑ προστίθεται αυτόματα. Στο PDF εμφανίζονται οι θέσεις χωρίς τιμές και το σύνολο.',
    chooseTemplate: 'Επιλέξτε πρότυπο', chooseTemplateHint: 'Το περιεχόμενο και ο υπότιτλος έρχονται από το πρότυπο. Οι αλλαγές ισχύουν μόνο για αυτή την προσφορά: το πρότυπο δεν αλλάζει.', emptyTemplate: 'Νέα προσφορά (συμπλήρωση από την αρχή)', emptyTemplateHint: 'Χωρίς θέσεις: προσθέστε τις με «+ Προσθήκη θέσης»', continueDraft: 'Συνέχεια της τρέχουσας', positions: 'θέσεις',
    saveAsTemplate: 'Αποθήκευση ως πρότυπο', tplOverwrite: 'Αντικατάσταση προτύπου', tplNew: 'Νέο πρότυπο', tplName: 'Όνομα προτύπου', tplSaved: 'Το πρότυπο αποθηκεύτηκε', templates: 'Πρότυπα', tplDelete: 'Διαγραφή προτύπου', template: 'Πρότυπο',
    pdfLang: 'Γλώσσα PDF', pdfSign: 'Υπογραφή στο PDF', fmtEdit: '✎ Επεξεργασία', fmtDone: 'Έτοιμο', fmtReset: 'Επαναφορά', fmtHint: 'Οι αλλαγές ισχύουν μόνο για αυτή την προσφορά και για το PDF στα {L}. Ο κατάλογος και τα πρότυπα δεν αλλάζουν.', fmtLangs: { el: 'ελληνικά', en: 'αγγλικά' },
    fmtTitle: 'Τίτλος', fmtSubtitle: 'Υπότιτλος', fmtNote: 'Σημείωση (κάτω από τα στοιχεία πελάτη)', fmtShow: 'Εμφάνιση στο PDF', secPool: 'Πισίνα', secDescr: 'Περιγραφή υλικών', secPhotos: 'Φωτογραφίες υλικών', secTerms: 'Όροι', secNotIncl: '«Δεν περιλαμβάνονται»',
    fmtItems: 'Θέσεις', fmtName: 'Όνομα', fmtDesc: 'Περιγραφή (κενή γραμμή = νέα παράγραφος)', signShort: 'Υπογρ.', english: 'Αγγλικά (για PDF στα αγγλικά)', nameEn: 'Όνομα (αγγλικά) — για PDF στα αγγλικά', descEn: 'Περιγραφή για PDF στα αγγλικά', subtitleOffer: 'Υπότιτλος (ελληνικά)', subtitleEn: 'Υπότιτλος (αγγλικά)',
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
let editing = store.get('editing', false); // offer form open (vs. template list)
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
const tplItem = (x) => (typeof x === 'string' ? { id: x, qty: null } : x);
function newOffer(tplId) {
  const s = DB.settings;
  const tpl = (s.templates || []).find((x) => x.id === tplId);
  const lines = [];
  if (tpl) tpl.materials.map(tplItem).forEach(({ id, qty }) => { const m = matById(id); if (!m) return; const l = lineFromMaterial(m); if (qty != null) { l.qty = qty; l.qtyManual = true; } lines.push(l); });
  return {
    id: null, template: tpl ? tpl.id : '', subtitle_el: tpl ? tpl.subtitle_el : (s.subtitle || ''), subtitle_en: tpl ? tpl.subtitle_en : (s.subtitle_en || ''),
    no: offerNo(s.nextNo || 1), date: today(), client: '', phone: '', email: '', site: '',
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
    if (o.fixedTotal) return;
    if (!hasNum(l.price)) { const m = matById(l.matId); missing.push(m ? nameOf(m) : '?'); return; }
    net += num(l.price) * num(l.qty);
  });
  if (o.fixedTotal) net = num(o.fixedNet); else net -= num(o.discount);
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
  offer = store.get('draft', null);
  $('#tabs').hidden = false;
  show(view);
}
function applyLang() {
  document.documentElement.lang = lang;
  $$('[data-t]').forEach((el) => { el.textContent = t(el.dataset.t); });
  $$('[data-lang]').forEach((b) => b.classList.toggle('on', b.dataset.lang === lang));
}
$$('[data-lang]').forEach((b) => b.addEventListener('click', () => { lang = b.dataset.lang; store.set('lang', lang); applyLang(); if (token && DB.categories.length) show(view); else boot(); }));
$$('#tabs button').forEach((b) => b.addEventListener('click', () => show(b.dataset.view, true)));

// «Предложение» starts at the template list; the form opens after a template (or an empty offer) is picked.
function show(v, fresh) {
  view = v; store.set('view', v);
  $$('#tabs button').forEach((b) => b.classList.toggle('on', b.dataset.view === v));
  const offerView = () => (fresh || !editing || !offer ? renderTemplatePicker() : renderOffer());
  ({ offer: offerView, materials: renderMaterials, archive: renderArchive, settings: renderSettings }[v] || renderOffer)();
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
    <div class="cat"><span>${esc(catName(c))}</span><span class="sum pp">${esc(sumTxt)}</span><button type="button" data-act="rm" aria-label="${esc(t('remove'))}">×</button></div>
    <select data-act="mat" aria-label="${esc(t('chooseMat'))}">${matOptions(l.category, l.matId)}</select>
    <div class="nums">
      <label class="f">${esc(t('qty'))}${unit ? ', ' + esc(unit) : ''}<input data-act="qty" class="num" inputmode="decimal" value="${esc(String(l.qty).replace('.', ','))}"></label>
      <label class="f pp">${esc(t('unitPrice'))}${l.custom ? ` <span class="custom-tag">· ${esc(t('customPrice'))}</span>` : ''}
        <input data-act="price" class="num" inputmode="decimal" ${l.custom ? '' : 'readonly'} value="${priceSet ? esc(money(num(l.price))) : ''}" placeholder="—"></label>
      ${l.custom ? `<button type="button" class="btn small pp" data-act="reset">${esc(t('catalogPrice'))}</button>` : `<button type="button" class="btn small pp" data-act="custom">${esc(t('changePrice'))}</button>`}
    </div>
    ${priceSet ? '' : `<div class="noprice pp">${esc(t('noPrice'))}</div>`}
  </div>`;
}
function renderTemplatePicker() {
  editing = false; store.set('editing', false);
  const tpls = DB.settings.templates || [];
  $('#app').innerHTML = `<h1 class="page">${esc(t('chooseTemplate'))}</h1><p class="hint">${esc(t('chooseTemplateHint'))}</p>
    ${tpls.map((x) => `<button type="button" class="card tpl" data-tpl="${esc(x.id)}"><b>${esc(lang === 'ru' ? x.ru || x.el : x.el)}</b><span>${esc(x.subtitle_el || '')}</span><span>${x.materials.filter((y) => matById(tplItem(y).id)).length} ${esc(t('positions'))}</span></button>`).join('')}
    <button type="button" class="card tpl" data-tpl=""><b>${esc(t('emptyTemplate'))}</b><span>${esc(t('emptyTemplateHint'))}</span></button>
    ${offer ? `<button type="button" class="card tpl" id="tplBack"><b>${esc(t('continueDraft'))}: ${esc(offer.no || '')}${offer.client ? ' · ' + esc(offer.client) : ''}</b></button>` : ''}`;
  $$('[data-tpl]').forEach((b) => b.addEventListener('click', () => { offer = newOffer(b.dataset.tpl); saveDraft(); renderOffer(); window.scrollTo(0, 0); }));
  if ($('#tplBack')) $('#tplBack').onclick = renderOffer;
}
function renderOffer() {
  if (!offer) return renderTemplatePicker();
  editing = true; store.set('editing', true);
  const o = offer, s = DB.settings;
  totals(o); // fills auto quantities (perimeter / area) before drawing
  const groups = ['A', 'B', 'C'];
  const ordered = [];
  groups.forEach((g) => DB.categories.filter((c) => c.group === g).forEach((c) => o.lines.filter((l) => l.category === c.id).forEach((l) => ordered.push(l))));
  o.lines.filter((l) => !ordered.includes(l)).forEach((l) => ordered.push(l));
  const tplName = (() => { const x = (s.templates || []).find((y) => y.id === o.template); return x ? (lang === 'ru' ? x.ru || x.el : x.el) : ''; })();
  let html = `<h1 class="page">${esc(t('tabOffer'))} ${esc(o.no)}</h1>${tplName ? `<p class="hint">${esc(t('template'))}: ${esc(tplName)}</p>` : ''}
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
  <section class="card"><h2>${esc(t('composition'))}</h2>
    <label class="check"><input type="checkbox" id="fixedOn" ${o.fixedTotal ? 'checked' : ''}>${esc(t('fixedTotal'))}</label>
    <div id="fixedBox" ${o.fixedTotal ? '' : 'hidden'}>${fld('fixedNet', t('fixedNet'), o.fixedNet ?? '', 'inputmode="decimal" class="num" placeholder="0"')}<p class="hint">${esc(t('fixedHint'))}</p></div>
    <p class="hint">${esc(t('compHint'))}</p><div id="lines" class="${o.fixedTotal ? 'fixed' : ''}">`;
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
    <div class="full">${fld('o_sub', t('subtitleOffer'), o.subtitle_el ?? s.subtitle ?? '')}</div>
    <div class="full">${fld('o_sub_en', t('subtitleEn'), o.subtitle_en ?? s.subtitle_en ?? '')}</div>
  </div></section>
  <div class="row"><button class="btn" id="saveBtn" type="button">${esc(t('save'))}</button><button class="btn" id="dupBtn" type="button">${esc(t('duplicate'))}</button><button class="btn" id="newBtn" type="button">${esc(t('newOffer'))}</button></div>
  <div class="bar"><div class="in"><div class="tot"><span id="totSub"></span><b id="totVal"></b></div>
    <button class="btn main" id="pdfBtn" type="button">${esc(t('pdf'))}</button></div></div>`;
  $('#app').innerHTML = html;

  const bind = (id, fn) => $('#' + id).addEventListener('input', (e) => { fn(e.target.value); saveDraft(); updateTotals(); });
  bind('o_no', (v) => { o.no = v; }); bind('o_date', (v) => { o.date = v; }); bind('o_client', (v) => { o.client = v; });
  bind('o_phone', (v) => { o.phone = v; }); bind('o_email', (v) => { o.email = v; }); bind('o_site', (v) => { o.site = v; });
  ['len', 'wid', 'turn', 'dmin', 'dmax'].forEach((k) => bind('p_' + k, (v) => { o.pool[k] = v; refreshAutoQty(); }));
  $('#p_color').addEventListener('change', (e) => { o.pool.color = e.target.value; saveDraft(); });
  bind('t_valid', (v) => { o.terms.validDays = v; }); bind('t_vat', (v) => { o.terms.vatRate = v; });
  bind('t_delivery', (v) => { o.terms.delivery = v; }); bind('t_place', (v) => { o.terms.place = v; });
  bind('t_payment', (v) => { o.terms.payment = v; }); bind('o_discount', (v) => { o.discount = v; });
  bind('t_notinc', (v) => { o.terms.notIncluded = v; });
  bind('fixedNet', (v) => { o.fixedNet = v; });
  $('#fixedOn').addEventListener('change', (e) => {
    o.fixedTotal = e.target.checked; saveDraft();
    $('#fixedBox').hidden = !o.fixedTotal; $('#lines').classList.toggle('fixed', o.fixedTotal);
    $('#o_discount').closest('label').hidden = o.fixedTotal; updateTotals();
  });
  $('#o_discount').closest('label').hidden = !!o.fixedTotal;
  bind('o_sub', (v) => { o.subtitle_el = v; }); bind('o_sub_en', (v) => { o.subtitle_en = v; });

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
  $('#newBtn').onclick = () => renderTemplatePicker();
  $('#pdfBtn').onclick = openPreview;
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
// PDF wording in Greek and English
const PDF_T = {
  el: {
    title: 'ΟΙΚΟΝΟΜΙΚΗ ΠΡΟΣΦΟΡΑ', no: 'Αρ. προσφοράς', date: 'Ημερομηνία', client: 'Πελάτης', phone: 'Τηλέφωνο', site: 'Τόπος έργου', email: 'Email',
    pool: 'Η ΠΙΣΙΝΑ ΣΑΣ', shape: 'Σχήμα και διαστάσεις', rect: 'Ορθογωνική', depth: 'Μέσο βάθος', area: 'Επιφάνεια νερού', vol: 'Όγκος νερού', turn: 'Ανακυκλοφορία νερού', hours: 'ώρες', color: 'Χρώμα μεμβράνης',
    incl: 'ΤΙ ΠΕΡΙΛΑΜΒΑΝΕΙ Η ΠΡΟΣΦΟΡΑ', n: 'Α/Α', desc: 'Περιγραφή', qty: 'Ποσότ.', war: 'Εγγύηση', price: 'Τιμή (€)', included: 'περιλαμβάνεται',
    groups: GROUP_EL, units: UNIT_EL, discount: 'Έκπτωση', net: 'Καθαρή αξία', vat: 'ΦΠΑ', total: 'ΣΥΝΟΛΟ ΜΕ ΦΠΑ',
    terms: 'ΟΡΟΙ ΤΗΣ ΠΡΟΣΦΟΡΑΣ', valid: 'Ισχύς προσφοράς', days: 'ημέρες', delivery: 'Χρόνος παράδοσης', place: 'Τόπος παράδοσης', payment: 'Τρόπος πληρωμής', notIncl: 'Δεν περιλαμβάνονται στην τιμή:',
    accept: 'ΑΠΟΔΟΧΗ ΤΗΣ ΠΡΟΣΦΟΡΑΣ', acceptText: 'Για να έχει η προσφορά ισχύ παραγγελίας, παρακαλούμε να μας επιστραφεί υπογεγραμμένη (με μονογραφή σε κάθε σελίδα). Για οποιαδήποτε πληροφορία είμαστε στη διάθεσή σας.',
    forCo: 'Για την εταιρεία', forClient: 'Ο πελάτης', sign: 'Υπογραφή: ____________________', name: 'Ονοματεπώνυμο: ______________', dateL: 'Ημερομηνία: ______________',
    descr: 'ΠΕΡΙΓΡΑΦΗ ΥΛΙΚΩΝ ΚΑΙ ΕΞΟΠΛΙΣΜΟΥ', descrHint: 'Οι αριθμοί αντιστοιχούν στον πίνακα της ενότητας {n}.', offerNo: 'Προσφορά αρ.', page: 'Σελίδα', of: 'από', initials: 'Μονογραφή πελάτη: __________', docTitle: 'Οικονομική προσφορά',
  },
  en: {
    title: 'COMMERCIAL OFFER', no: 'Offer no.', date: 'Date', client: 'Client', phone: 'Phone', site: 'Project site', email: 'Email',
    pool: 'YOUR POOL', shape: 'Shape and size', rect: 'Rectangular', depth: 'Average depth', area: 'Water surface', vol: 'Water volume', turn: 'Water turnover', hours: 'hours', color: 'Liner colour',
    incl: 'WHAT THE OFFER INCLUDES', n: 'No.', desc: 'Description', qty: 'Qty', war: 'Warranty', price: 'Price (€)', included: 'included',
    groups: { A: 'A. Pool construction', B: 'B. Pool equipment', C: 'C. Extra equipment' }, units: { pcs: 'pcs', set: 'set', m: 'm', m2: 'm²', perim: 'm', area: 'm²' },
    discount: 'Discount', net: 'Net amount', vat: 'VAT', total: 'TOTAL INCL. VAT',
    terms: 'TERMS OF THE OFFER', valid: 'Offer valid for', days: 'days', delivery: 'Delivery time', place: 'Place of delivery', payment: 'Payment', notIncl: 'Not included in the price:',
    accept: 'ACCEPTANCE OF THE OFFER', acceptText: 'To place an order, please return this offer signed (with your initials on every page). We are at your disposal for any further information.',
    forCo: 'For the company', forClient: 'The client', sign: 'Signature: ____________________', name: 'Full name: ______________', dateL: 'Date: ______________',
    descr: 'MATERIALS AND EQUIPMENT', descrHint: 'Numbers refer to the table in section {n}.', offerNo: 'Offer no.', page: 'Page', of: 'of', initials: 'Client initials: __________', docTitle: 'Commercial offer',
  },
};
const COLOR_EN = { 'μπλε': 'blue', 'μπεζ': 'beige', 'λευκό': 'white', 'γαλάζιο': 'light blue', 'ανοιχτό γκρι': 'light grey', 'σκούρο γκρι': 'dark grey', 'πράσινο': 'green', 'άμμου': 'sand', 'ψηφίδα': 'mosaic' };
function warEn(w) {
  const m = String(w || '').match(/^(\d+)\s*(χρόνια|χρόνος|έτη|έτος)/);
  if (m) return `${m[1]} ${+m[1] === 1 ? 'year' : 'years'}`;
  return w || '—';
}
const paras = (txt) => String(txt).split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
// catalogue name and description of a line in the PDF language, before any one-off edit
function lineText(l, L, color) {
  const m = matById(l.matId) || l.snap || {}, EN = L === 'en';
  return {
    name: EN ? (m.en || m.el || '') : (m.el || ''),
    paras: ((EN && m.desc_en && m.desc_en.length) ? m.desc_en : (m.desc_el || [])).map((x) => x.replace(/\{color\}/g, color || '')),
  };
}
async function buildDoc(o, L = 'el', withSign = false) {
  const P = PDF_T[L], EN = L === 'en';
  const s = DB.settings, c = totals(o), pc = c.pc;
  // a Greek default term prints as its English default; anything typed by hand prints as typed
  const term = (val, key) => (EN && s[key + '_en'] && String(val).trim() === String(s[key] || '').trim() ? s[key + '_en'] : val);
  const sx = (key) => (EN && s[key + '_en'] ? s[key + '_en'] : s[key] || '');
  const color = EN ? (COLOR_EN[o.pool.color] || o.pool.color) : o.pool.color;
  const logo = await dataUrl('/logo.png');
  const items = [];
  ['A', 'B', 'C'].forEach((g) => DB.categories.filter((cat) => cat.group === g).forEach((cat) => o.lines.filter((l) => l.category === cat.id).forEach((l) => items.push({ l, g }))));
  o.lines.filter((l) => !items.some((x) => x.l === l)).forEach((l) => items.push({ l, g: 'C' }));
  // one-off edits made in the preview («Изменить»): o.fmt[L] texts, o.fmt.hide sections, o.fmt.lines[key][L] names/descriptions
  const F = o.fmt || {}, FL = F[L] || {}, HIDE = F.hide || {};
  for (const it of items) {
    const m = matById(it.l.matId) || it.l.snap || {};
    const def = lineText(it.l, L, color), ov = ((F.lines || {})[it.l.key] || {})[L] || {};
    it.m = m; it.img = HIDE.photos ? null : await dataUrl(m.image);
    it.name = ov.name ?? def.name;
    it.paras = ov.desc != null ? paras(ov.desc) : def.paras;
  }
  items.forEach((it, i) => { it.n = i + 1; });
  const subtitle = EN ? (o.subtitle_en || s.subtitle_en || '') : (o.subtitle_el ?? s.subtitle ?? '');
  const content = [];
  content.push({ text: FL.title || P.title, fontSize: 20, bold: true, color: NAVY });
  content.push({ text: FL.subtitle ?? subtitle, color: GREY, fontSize: 11, margin: [0, 0, 0, 10] });
  content.push({ table: { widths: [70, '*', 65, '*'], body: [
    [...kv(P.no, o.no), ...kv(P.date, fmtDate(o.date))],
    [...kv(P.client, o.client), ...kv(P.phone, o.phone)],
    [...kv(P.site, o.site), ...kv(P.email, o.email)],
  ] }, layout: lay });
  const d = (n, k = 1) => (EN ? n.toLocaleString('en-GB', { minimumFractionDigits: k, maximumFractionDigits: 2 }) : dec(n, k));
  const mon = (n) => (EN ? (Math.round(n * 100) / 100).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : money(n));
  // owner's order: pool → materials with photos → terms → what the offer includes (prices) → acceptance
  if (FL.note) content.push({ text: FL.note, fontSize: 9, margin: [0, 10, 0, 0] });
  let sec = 0;
  if (!HIDE.pool) {
    content.push(heading(String(++sec), P.pool));
    const depth = pc.a === pc.b ? `${d(pc.mean, 2)} m` : `${d(pc.mean, 2)} m (${d(pc.a, 2)} – ${d(pc.b, 2)} m)`;
    content.push({ table: { widths: [150, '*'], body: [
      kv(P.shape, `${P.rect} ${d(pc.L)} × ${d(pc.W)} m`), kv(P.depth, depth),
      kv(P.area, `${d(pc.area)} m²`), kv(P.vol, `${d(pc.vol)} m³`),
      kv(P.turn, `${d(num(o.pool.turn))} ${P.hours}`), kv(P.color, color),
    ] }, layout: lay });
  }

  const showDescr = !HIDE.descr && items.some((it) => it.paras.length || it.img);
  const inclNo = sec + (showDescr ? 1 : 0) + (HIDE.terms ? 0 : 1) + 1;
  const described = showDescr ? items.filter((it) => it.paras.length || it.img) : [];
  if (described.length) {
    content.push(heading(String(++sec), P.descr));
    content.push({ text: P.descrHint.replace('{n}', inclNo), fontSize: 8, color: GREY, margin: [0, 0, 0, 8] });
    described.forEach((it) => {
      const left = { stack: [
        { text: [{ text: it.n + '.  ', color: ORANGE }, { text: EN ? it.name.toUpperCase() : greekCaps(it.name), color: NAVY }], bold: true, fontSize: 9.5, margin: [0, 0, 0, 5] },
        ...it.paras.map((x) => ({ text: x, fontSize: 8.5, margin: [0, 0, 0, 3] })),
      ] };
      const row = it.img ? [left, { image: it.img, fit: [140, 85], alignment: 'center' }] : [{ ...left, colSpan: 2 }, {}];
      content.push({ table: { widths: ['*', 150], body: [row] }, layout: lay, unbreakable: true, margin: [0, 0, 0, 7] });
    });
  }
  if (!HIDE.terms) {
    content.push(heading(String(++sec), P.terms));
    content.push({ table: { widths: [150, '*'], body: [
      kv(P.valid, `${o.terms.validDays} ${P.days}`), kv(P.delivery, term(o.terms.delivery, 'delivery')),
      kv(P.place, term(o.terms.place, 'place')), kv(P.payment, term(o.terms.payment, 'payment')),
    ] }, layout: lay });
    if (o.terms.notIncluded && !HIDE.notIncl) {
      content.push({ text: P.notIncl, bold: true, margin: [0, 8, 0, 2] });
      content.push({ text: term(o.terms.notIncluded, 'notIncluded'), fontSize: 8.5 });
    }
  }
  sec = inclNo;
  content.push({ ...heading(String(inclNo), P.incl), ...(showDescr ? { pageBreak: 'before' } : {}) }); // price table + acceptance together on fresh pages
  const H = (x, al) => ({ text: x, bold: true, color: '#ffffff', fillColor: NAVY, fontSize: 8, alignment: al });
  // no price column when the total is typed by hand or no line has a price; lines without a price print «—»
  const priced = o.lines.some((l) => hasNum(l.price));
  const FX = !!o.fixedTotal || !priced, showTot = o.fixedTotal ? num(o.fixedNet) > 0 : priced;
  const body = [[H(P.n, 'center'), H(P.desc), H(P.qty, 'center'), H(P.war, 'center'), ...(FX ? [] : [H(P.price, 'right')])]];
  let lastG = null;
  items.forEach((it) => {
    if (it.g !== lastG) { body.push([{ text: P.groups[it.g], colSpan: FX ? 4 : 5, bold: true, color: NAVY, fillColor: LIGHT }, {}, {}, {}, ...(FX ? [] : [{}])]); lastG = it.g; }
    const sum = num(it.l.price) * num(it.l.qty);
    const q = `${d(num(it.l.qty), 0)} ${P.units[it.m.unit] || ''}`.trim();
    body.push([{ text: String(it.n), alignment: 'center' }, it.name, { text: q, alignment: 'center' }, { text: EN ? warEn(it.m.warranty) : (it.m.warranty || '—'), alignment: 'center' },
      ...(FX ? [] : [!hasNum(it.l.price) ? { text: '—', alignment: 'right' } : sum === 0 ? { text: P.included, italics: true, color: GREY, alignment: 'right' } : { text: mon(sum), alignment: 'right' }])]);
  });
  const tot = (l, v, big) => body.push([{ text: l, colSpan: FX ? 3 : 4, bold: true, alignment: 'right', fontSize: big ? 11 : 9, color: big ? '#ffffff' : undefined, fillColor: big ? NAVY : undefined }, {}, {}, ...(FX ? [] : [{}]),
    { text: v, bold: true, alignment: 'right', fontSize: big ? 11 : 9, color: big ? '#ffffff' : undefined, fillColor: big ? NAVY : undefined }]);
  if (showTot) {
    if (!o.fixedTotal && num(o.discount)) tot(P.discount, '−' + mon(num(o.discount)));
    tot(P.net, mon(c.net));
    tot(`${P.vat} ${d(c.rate, 0)}%`, mon(c.vat));
    tot(P.total, mon(c.total) + ' €', true);
  }
  content.push({ table: { headerRows: 1, dontBreakRows: true, widths: FX ? [24, '*', 60, 90] : [24, '*', 52, 62, 78], body }, layout: lay, fontSize: 8.5 });

  content.push({ stack: [
    heading(String(++sec), P.accept),
    { text: P.acceptText, fontSize: 8.5, margin: [0, 0, 0, 8] },
    { table: { widths: ['*', '*'], body: [[
      { stack: [{ text: P.forCo, bold: true, color: NAVY, margin: [0, 0, 0, 8] }, { text: sx('signatory'), margin: [0, 0, 0, DB.settings.signImg && withSign ? 34 : 14] }, P.sign,
        // owner's signature sits on the line without moving it
        ...(DB.settings.signImg && withSign ? [{ image: DB.settings.signImg, fit: [130, 44], relativePosition: { x: 58, y: -38 } }] : [])], margin: [2, 4, 2, 6] },
      { stack: [{ text: P.forClient, bold: true, color: NAVY, margin: [0, 0, 0, 8] }, { text: P.name, margin: [0, 0, 0, 10] }, { text: P.dateL, margin: [0, 0, 0, 10] }, P.sign], margin: [2, 4, 2, 6] },
    ]] }, layout: lay },
  ], unbreakable: true });

  return {
    pageSize: 'A4', pageMargins: [40, 82, 40, 50],
    info: { title: `${P.docTitle} ${o.no}`, author: sx('company') },
    defaultStyle: { font: 'Roboto', fontSize: 9, lineHeight: 1.15 },
    header: () => ({ margin: [40, 22, 40, 0], stack: [
      { columns: [
        logo ? { image: logo, width: 36, height: 36 } : { text: '', width: 36 },
        { stack: [{ text: sx('company'), bold: true, fontSize: 15, color: NAVY }, { text: sx('tagline'), fontSize: 8.5, color: GREY }], margin: [8, 3, 0, 0], width: '*' },
        { stack: [
          { text: sx('address'), fontSize: 7.5, color: GREY }, { text: s.phones || '', fontSize: 7.5, bold: true, color: NAVY },
          { text: s.email || '', fontSize: 7.5, color: GREY }, { text: s.sites || '', fontSize: 7.5, color: NAVY },
        ], alignment: 'right', width: 'auto' },
      ] },
      { canvas: [{ type: 'line', x1: 0, y1: 6, x2: 515, y2: 6, lineWidth: 1.2, lineColor: NAVY }] },
    ] }),
    footer: (cur, total) => ({ margin: [40, 14, 40, 0], stack: [
      { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 0.5, lineColor: LINE }] },
      { columns: [
        { text: `${P.offerNo} ${o.no} · ${P.page} ${cur} ${P.of} ${total}`, fontSize: 7.5, color: GREY },
        { text: P.initials, fontSize: 7.5, color: GREY, alignment: 'right' },
      ], margin: [0, 4, 0, 0] },
    ] }),
    content,
  };
}
function pdfName(o, L) {
  const who = (o.client || (L === 'en' ? 'client' : 'pelatis')).trim().replace(/[\\/:*?"<>|]+/g, '').replace(/\s+/g, '_');
  return `${L === 'en' ? 'Offer' : 'Prosfora'}_${String(o.no || '').replace(/\//g, '-')}_${who}.pdf`;
}
// ---------- PDF preview and sending ----------
// The PDF button opens a full-screen preview; language and signature are switched there, then download or share.
let pv = null, pvRun = 0;
const canShareFiles = () => Boolean(navigator.canShare && navigator.canShare({ files: [new File(['x'], 'x.pdf', { type: 'application/pdf' })] }));

async function openPreview() {
  if (!window.pdfMake) return toast(t('pdfLoading'), true);
  try { await saveOffer(true); } catch (e) { /* saving is best effort; the PDF is built from the screen */ }
  $('#pvSignBox').hidden = !DB.settings.signImg;
  $('#pvSign').checked = store.get('pdfSign', true) !== false;
  $('#pv').hidden = false; document.body.style.overflow = 'hidden';
  history.pushState({ pv: 1 }, '');
  renderPreview();
}
function closePreview(fromHistory) {
  if ($('#pv').hidden) return;
  closeFmt(); $('#pv').hidden = true; document.body.style.overflow = ''; pv = null; pvRun++;
  $('#pvPages').innerHTML = '';
  if (!fromHistory && history.state && history.state.pv) history.back();
}
async function renderPreview() {
  const run = ++pvRun, L = store.get('pdfLang', 'el'), sign = Boolean(DB.settings.signImg) && $('#pvSign').checked;
  $$('[data-pvlang]').forEach((b) => b.classList.toggle('on', b.dataset.pvlang === L));
  ['#pvDl', '#pvShare'].forEach((x) => { $(x).disabled = true; });
  const box = $('#pvPages'); box.innerHTML = '<p class="loading">…</p>';
  try {
    const doc = await buildDoc(offer, L, sign);
    const blob = await new Promise((res) => pdfMake.createPdf(doc).getBlob(res));
    if (run !== pvRun) return;
    pv = { blob, name: pdfName(offer, L), L };
    if (window.pdfjsLib) {
      pdfjsLib.GlobalWorkerOptions.workerSrc = '/vendor/pdf.worker.min.js';
      const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(await blob.arrayBuffer()) }).promise;
      const w = Math.min(box.clientWidth - 24, 820), dpr = Math.min(window.devicePixelRatio || 1, 2.5);
      const pages = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i), vp = page.getViewport({ scale: (w / page.getViewport({ scale: 1 }).width) * dpr });
        const cv = document.createElement('canvas'); cv.width = vp.width; cv.height = vp.height; cv.style.width = w + 'px';
        await page.render({ canvasContext: cv.getContext('2d'), viewport: vp }).promise;
        if (run !== pvRun) return;
        pages.push(cv);
      }
      box.innerHTML = ''; pages.forEach((cv) => box.appendChild(cv));
    } else {
      box.innerHTML = `<iframe title="PDF" src="${URL.createObjectURL(blob)}"></iframe>`;
    }
    ['#pvDl', '#pvShare'].forEach((x) => { $(x).disabled = false; });
  } catch (e) { if (run === pvRun) box.innerHTML = `<p class="hint">${esc(String(e.message || e))}</p>`; }
}
function pvDownload() {
  const url = URL.createObjectURL(pv.blob);
  const a = document.createElement('a'); a.href = url; a.download = pv.name; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30000);
}
async function pvShare() {
  const file = new File([pv.blob], pv.name, { type: 'application/pdf' });
  try { await navigator.share({ files: [file], title: pv.name }); }
  catch (e) { if (e.name !== 'AbortError') toast(String(e.message || e), true); }
}
// One-off formatting of this offer's PDF: texts per PDF language, sections on/off. Stored in offer.fmt.
function pdfLines(o) {
  const out = [];
  ['A', 'B', 'C'].forEach((g) => DB.categories.filter((c) => c.group === g).forEach((c) => o.lines.filter((l) => l.category === c.id).forEach((l) => out.push(l))));
  o.lines.filter((l) => !out.includes(l)).forEach((l) => out.push(l));
  return out;
}
function openFmt() {
  const o = offer, L = store.get('pdfLang', 'el'), EN = L === 'en';
  const F = o.fmt || {}, FL = F[L] || {}, HIDE = F.hide || {}, P = PDF_T[L], s = DB.settings;
  const color = EN ? (COLOR_EN[o.pool.color] || o.pool.color) : o.pool.color;
  const sub = EN ? (o.subtitle_en || s.subtitle_en || '') : (o.subtitle_el ?? s.subtitle ?? '');
  const chk = (k, label) => `<label class="check"><input type="checkbox" data-show="${k}" ${HIDE[k] ? '' : 'checked'}>${esc(label)}</label>`;
  const lines = pdfLines(o).filter((l) => matById(l.matId) || l.snap);
  $('#pvEdit').innerHTML = `<div class="pv-form">
    <p class="hint">${esc(t('fmtHint').replace('{L}', T[lang].fmtLangs[L]))}</p>
    <section class="card"><div class="grid">
      <label class="f full">${esc(t('fmtTitle'))}<input id="fx_title" value="${esc(FL.title || P.title)}"></label>
      <label class="f full">${esc(t('fmtSubtitle'))}<input id="fx_sub" value="${esc(FL.subtitle ?? sub)}"></label>
      <label class="f full">${esc(t('fmtNote'))}<textarea id="fx_note" rows="3">${esc(FL.note || '')}</textarea></label>
    </div></section>
    <section class="card"><h2>${esc(t('fmtShow'))}</h2>
      ${chk('pool', t('secPool'))}${chk('descr', t('secDescr'))}${chk('photos', t('secPhotos'))}${chk('terms', t('secTerms'))}${chk('notIncl', t('secNotIncl'))}
    </section>
    <section class="card"><h2>${esc(t('fmtItems'))}</h2>
      ${lines.map((l, i) => { const def = lineText(l, L, color), ov = ((F.lines || {})[l.key] || {})[L] || {};
        return `<div class="grid fx-line" data-key="${esc(l.key)}">
          <label class="f full"><span><b>${i + 1}.</b> ${esc(t('fmtName'))}</span><input data-fx="name" value="${esc(ov.name ?? def.name)}"></label>
          <label class="f full">${esc(t('fmtDesc'))}<textarea data-fx="desc" rows="4">${esc(ov.desc ?? def.paras.join('\n\n'))}</textarea></label></div>`; }).join('')}
    </section>
    <div class="row pv-form-bar"><button class="btn" id="fx_reset" type="button">${esc(t('fmtReset'))}</button><button class="btn main" id="fx_done" type="button">${esc(t('fmtDone'))}</button></div>
  </div>`;
  $('#pvPages').hidden = true; $('#pvBot').hidden = true; $('#pvEdit').hidden = false; $('#pvEdit').scrollTop = 0;
  $('#fx_reset').onclick = () => {
    const nf = structuredClone(o.fmt || {}); delete nf[L]; delete nf.hide;
    Object.values(nf.lines || {}).forEach((x) => { delete x[L]; });
    o.fmt = nf; saveDraft(); openFmt();
  };
  $('#fx_done').onclick = () => {
    // keep only what differs from the catalogue / defaults, so later catalogue edits still show up
    const nf = structuredClone(o.fmt || {}), cur = {};
    const title = $('#fx_title').value.trim(), subv = $('#fx_sub').value, note = $('#fx_note').value.trim();
    if (title && title !== P.title) cur.title = title;
    if (subv !== sub) cur.subtitle = subv;
    if (note) cur.note = note;
    nf[L] = cur;
    nf.hide = {}; $$('[data-show]').forEach((c) => { if (!c.checked) nf.hide[c.dataset.show] = true; });
    nf.lines = nf.lines || {};
    $$('.fx-line').forEach((row) => {
      const l = o.lines.find((x) => x.key === row.dataset.key); if (!l) return;
      const def = lineText(l, L, color), ov = {};
      const name = $('[data-fx=name]', row).value.trim(), desc = $('[data-fx=desc]', row).value.trim();
      if (name && name !== def.name) ov.name = name;
      if (desc !== def.paras.join('\n\n')) ov.desc = desc;
      nf.lines[l.key] = { ...(nf.lines[l.key] || {}), [L]: ov };
      if (!Object.keys(ov).length) delete nf.lines[l.key][L];
    });
    o.fmt = nf; saveDraft(); saveOffer(true).catch(() => {});
    closeFmt(); renderPreview();
  };
}
function closeFmt() { $('#pvEdit').hidden = true; $('#pvEdit').innerHTML = ''; $('#pvPages').hidden = false; $('#pvBot').hidden = false; }

function initPreview() {
  $('#pvEditBtn').onclick = () => ($('#pvEdit').hidden ? openFmt() : (closeFmt(), renderPreview()));
  $('#pvClose').onclick = () => closePreview();
  $$('[data-pvlang]').forEach((b) => b.addEventListener('click', () => { store.set('pdfLang', b.dataset.pvlang); if (!$('#pvEdit').hidden) openFmt(); renderPreview(); }));
  $('#pvSign').onchange = (e) => { store.set('pdfSign', e.target.checked); renderPreview(); };
  $('#pvDl').onclick = () => { pvDownload(); toast(t('pdfReady')); };
  $('#pvShare').onclick = () => (canShareFiles() ? pvShare() : (pvDownload(), toast(t('pdfReady'))));
  window.addEventListener('popstate', () => closePreview(true));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closePreview(); });
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
    <label class="f full">${esc(t('nameEn'))}<input id="e_en" value="${esc(m.en || '')}"></label>
    <label class="f full">${esc(t('price'))}<input id="e_price" class="num" inputmode="decimal" value="${hasNum(m.price) ? esc(money(num(m.price))) : ''}" placeholder="—"></label>
    <label class="f">${esc(t('unit'))}<select id="e_unit">${Object.keys(units).map((u) => `<option value="${u}" ${u === m.unit ? 'selected' : ''}>${esc(units[u])}</option>`).join('')}</select></label>
    <label class="f">${esc(t('defQty'))}<input id="e_qty" class="num" inputmode="decimal" value="${esc(String(m.qty ?? 1).replace('.', ','))}"></label>
    <label class="f full">${esc(t('warranty'))}<input id="e_war" value="${esc(m.warranty || '')}" placeholder="2 χρόνια"></label>
    <label class="f full">${esc(t('desc'))}<textarea id="e_desc" rows="5">${esc((m.desc_el || []).join('\n\n'))}</textarea></label>
    <label class="f full">${esc(t('descEn'))}<textarea id="e_desc_en" rows="4">${esc((m.desc_en || []).join('\n\n'))}</textarea></label>
    <div class="full"><div class="f" style="font-size:12.5px;color:var(--muted);margin-bottom:6px">${esc(t('photo'))}</div>
      <div class="photo drop" id="e_drop"><img id="e_img" src="${esc(m.image || '')}" alt="" ${m.image ? '' : 'hidden'}>
        <div class="row"><label class="btn small">${esc(t('uploadPhoto'))}<input id="e_file" type="file" accept="image/*" hidden></label>
        <button class="btn small" id="e_noimg" type="button" ${m.image ? '' : 'hidden'}>${esc(t('removePhoto'))}</button>
        <span class="hint">${esc(t('dropPhoto'))}</span></div></div></div>
    <label class="check full"><input type="checkbox" id="e_def" ${m.default ? 'checked' : ''}>${esc(t('isDefault'))}</label>
  </div>
  <div class="row"><button class="btn main" id="e_save" type="button">${esc(t('save'))}</button>${m.id ? `<button class="btn danger" id="e_del" type="button">${esc(t('del'))}</button>` : ''}</div></section>`;
  $('#back').onclick = renderMaterials;
  const setPhoto = async (f) => {
    if (!f) return;
    if (!/^image\//.test(f.type)) return toast(t('dropBad'), true);
    try {
      const bmp = await createImageBitmap(f);
      const k = Math.min(1, 640 / bmp.width, 480 / bmp.height);
      const cv = document.createElement('canvas'); cv.width = Math.round(bmp.width * k); cv.height = Math.round(bmp.height * k);
      const cx = cv.getContext('2d'); cx.fillStyle = '#fff'; cx.fillRect(0, 0, cv.width, cv.height); cx.drawImage(bmp, 0, 0, cv.width, cv.height);
      const r = await api('/images', { method: 'POST', body: { data: cv.toDataURL('image/jpeg', 0.82) } });
      m.image = r.url; $('#e_img').src = r.url; $('#e_img').hidden = false; $('#e_noimg').hidden = false;
    } catch (err) { toast(t('netErr'), true); }
  };
  $('#e_file').onchange = (e) => setPhoto(e.target.files[0]);
  dropZone($('#e_drop').closest('section'), $('#e_drop'), setPhoto);
  $('#e_noimg').onclick = () => { m.image = ''; $('#e_img').hidden = true; $('#e_noimg').hidden = true; };
  $('#e_save').onclick = async () => {
    const pv = $('#e_price').value.trim();
    Object.assign(m, {
      category: $('#e_cat').value, el: $('#e_el').value.trim(), ru: $('#e_ru').value.trim(), unit: $('#e_unit').value,
      qty: num($('#e_qty').value) || 1, price: pv === '' ? null : num(pv), warranty: $('#e_war').value.trim(),
      desc_el: $('#e_desc').value.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean), default: $('#e_def').checked,
      en: $('#e_en').value.trim(), desc_en: $('#e_desc_en').value.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean),
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
    try { const r = await api('/offers/' + b.dataset.open); offer = r.offer; saveDraft(); editing = true; show('offer'); } catch (e) { toast(t('netErr'), true); }
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
  <section class="card"><h2>${esc(t('english'))}</h2><div class="grid">
    ${f('company_en', t('companyName'))}${f('tagline_en', t('tagline'))}${f('address_en', t('address'))}${f('signatory_en', t('signatory'))}${f('subtitle_en', t('subtitle'))}
    ${f('delivery_en', t('delivery'))}${f('place_en', t('place'))}${f('payment_en', t('payment'))}
    <label class="f full">${esc(t('notIncluded'))}<textarea data-s="notIncluded_en">${esc(s.notIncluded_en || '')}</textarea></label>
  </div></section>
  <section class="card"><h2>${esc(t('templates'))}</h2>
    ${(s.templates || []).map((x, i) => `<div class="grid" style="border-top:1px solid var(--line);padding-top:10px">
      <label class="f">${esc(t('tplName'))} (рус)<input data-tpl-ru="${i}" value="${esc(x.ru || '')}"></label>
      <label class="f">${esc(t('tplName'))} (ελ)<input data-tpl-el="${i}" value="${esc(x.el || '')}"></label>
      <p class="hint full">${x.materials.map((y) => matById(tplItem(y).id)).filter(Boolean).map((m) => esc(nameOf(m))).join(' · ')}</p>
      <div class="row full end"><button class="btn small danger" data-tpl-del="${i}" type="button">${esc(t('tplDelete'))}</button></div></div>`).join('')}
  </section>
  <section class="card"><h2>${esc(t('defaults'))}</h2><div class="grid">
    ${f('validDays', t('validDays'), 'inputmode="numeric"')}${f('vatRate', t('vatRate'), 'inputmode="decimal"')}${f('delivery', t('delivery'))}${f('place', t('place'))}${f('payment', t('payment'))}
    <label class="f full">${esc(t('notIncluded'))}<textarea data-s="notIncluded">${esc(s.notIncluded || '')}</textarea></label>
    <label class="f full">${esc(t('colors'))}<input id="s_colors" value="${esc((s.colors || []).join(', '))}"></label>
    ${f('nextNo', t('nextNo'), 'inputmode="numeric"')}
  </div><div class="row"><button class="btn main" id="sSave" type="button">${esc(t('saveSettings'))}</button></div></section>
  <section class="card" id="signCard"><h2>${esc(t('signCard'))}</h2><p class="hint">${esc(t('signHint'))}</p>
    <div class="photo drop" id="signDrop"><img id="signImg" src="${esc(s.signImg || '')}" alt="" ${s.signImg ? '' : 'hidden'}>
      <div class="row"><label class="btn small">${esc(t('signUpload'))}<input id="signFile" type="file" accept="image/*" hidden></label>
      <button class="btn small" id="signDel" type="button" ${s.signImg ? '' : 'hidden'}>${esc(t('signRemove'))}</button>
      <span class="hint">${esc(t('signDrop'))}</span></div></div></section>
  <section class="card"><h2>${esc(t('appCard'))}</h2><p class="hint">${esc(t('appHint'))}</p>
    ${standalone() ? `<p><b>${esc(t('appInstalled'))}</b></p>` : `<div class="row"><button class="btn main" id="appInstall" type="button" ${installEvt ? '' : 'hidden'}>${esc(t('appInstall'))}</button></div>
    <p class="hint" ${installEvt ? 'hidden' : ''}>${esc(/iphone|ipad|ipod/i.test(navigator.userAgent) ? t('appIos') : t('appOther'))}</p>`}</section>
  <section class="card"><h2>${esc(t('changePin'))}</h2><div class="grid">
    <label class="f">${esc(t('newPin'))}<input id="np1" type="password" inputmode="numeric" autocomplete="new-password"></label>
    <label class="f">${esc(t('pin2'))}<input id="np2" type="password" inputmode="numeric" autocomplete="new-password"></label></div>
    <div class="row"><button class="btn" id="pSave" type="button">${esc(t('changePin'))}</button><button class="btn danger" id="logout" type="button">${esc(t('logout'))}</button></div></section>`;
  $('#sSave').onclick = async () => {
    const ns = { ...DB.settings };
    $$('[data-s]').forEach((i) => { ns[i.dataset.s] = i.value; });
    ns.vatRate = num(ns.vatRate); ns.validDays = num(ns.validDays); ns.nextNo = Math.max(1, Math.round(num(ns.nextNo)) || 1);
    ns.colors = $('#s_colors').value.split(',').map((x) => x.trim()).filter(Boolean);
    ns.templates = (s.templates || []).map((x, i) => ({ ...x, ru: $(`[data-tpl-ru="${i}"]`).value.trim() || x.ru, el: $(`[data-tpl-el="${i}"]`).value.trim() || x.el }));
    try { await api('/settings', { method: 'PUT', body: { settings: ns } }); DB.settings = ns; toast(t('saved')); } catch (e) { toast(t('netErr'), true); }
  };
  $$('[data-tpl-del]').forEach((b) => b.addEventListener('click', (e) => confirmTap(e.currentTarget, t('delConfirm'), async () => {
    const ns = { ...DB.settings, templates: (DB.settings.templates || []).filter((x, i) => i !== +b.dataset.tplDel) };
    try { await api('/settings', { method: 'PUT', body: { settings: ns } }); DB.settings = ns; renderSettings(); } catch (err) { toast(t('netErr'), true); }
  })));
  $('#pSave').onclick = async () => {
    const a = $('#np1').value.trim(), b = $('#np2').value.trim();
    if (a.length < 4) return toast(t('shortPin'), true);
    if (a !== b) return toast(t('pinMismatch'), true);
    try { const r = await api('/pin', { method: 'POST', body: { pin: a } }); token = r.token; store.set('token', token); toast(t('saved')); } catch (e) { toast(t('netErr'), true); }
  };
  $('#logout').onclick = (e) => confirmTap(e.currentTarget, t('logout') + '?', () => { token = null; store.del('token'); boot(); });
  const putSign = async (img) => {
    const ns = { ...DB.settings, signImg: img };
    try { await api('/settings', { method: 'PUT', body: { settings: ns } }); DB.settings = ns; toast(t('saved')); } catch (e) { return toast(t('netErr'), true); }
    $('#signImg').src = img; $('#signImg').hidden = !img; $('#signDel').hidden = !img;
  };
  const setSign = async (f) => {
    if (!f) return;
    if (!/^image\//.test(f.type)) return toast(t('dropBad'), true);
    try { await putSign(signPng(await createImageBitmap(f))); } catch (e) { toast(t('dropBad'), true); }
  };
  $('#signFile').onchange = (e) => setSign(e.target.files[0]);
  $('#signDel').onclick = () => putSign('');
  dropZone($('#signCard'), $('#signDrop'), setSign);
  if ($('#appInstall')) $('#appInstall').onclick = install;
}

// ---------- installable app ----------
let installEvt = null;
const standalone = () => window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
async function install() {
  if (!installEvt) return;
  installEvt.prompt(); await installEvt.userChoice; installEvt = null;
  if (view === 'settings') renderSettings();
}
window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); installEvt = e; if (view === 'settings') renderSettings(); });
window.addEventListener('appinstalled', () => { installEvt = null; });
if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => {}));

// Photo of a signature on paper -> trimmed PNG: light paper becomes transparent, ink becomes dark blue.
function signPng(bmp) {
  const k = Math.min(1, 1200 / bmp.width);
  const w = Math.round(bmp.width * k), h = Math.round(bmp.height * k);
  const cv = document.createElement('canvas'); cv.width = w; cv.height = h;
  const cx = cv.getContext('2d'); cx.drawImage(bmp, 0, 0, w, h);
  const im = cx.getImageData(0, 0, w, h), d = im.data;
  let sum = 0; for (let i = 0; i < d.length; i += 4) sum += d[i] * 0.3 + d[i + 1] * 0.59 + d[i + 2] * 0.11;
  const paper = sum / (d.length / 4), ink = paper * 0.62;   // pixels clearly darker than the average paper are ink
  let x0 = w, y0 = h, x1 = -1, y1 = -1;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = (y * w + x) * 4, l = d[i] * 0.3 + d[i + 1] * 0.59 + d[i + 2] * 0.11;
    const a = l >= paper * 0.85 ? 0 : l <= ink ? 255 : Math.round(255 * (paper * 0.85 - l) / (paper * 0.85 - ink));
    d[i] = 18; d[i + 1] = 42; d[i + 2] = 110; d[i + 3] = a;
    if (a > 60) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
  }
  if (x1 < 0) throw new Error('empty');
  cx.putImageData(im, 0, 0);
  const pad = 6; x0 = Math.max(0, x0 - pad); y0 = Math.max(0, y0 - pad); x1 = Math.min(w - 1, x1 + pad); y1 = Math.min(h - 1, y1 + pad);
  const s = Math.min(1, 600 / (x1 - x0 + 1), 220 / (y1 - y0 + 1));
  const out = document.createElement('canvas'); out.width = Math.round((x1 - x0 + 1) * s); out.height = Math.round((y1 - y0 + 1) * s);
  out.getContext('2d').drawImage(cv, x0, y0, x1 - x0 + 1, y1 - y0 + 1, 0, 0, out.width, out.height);
  return out.toDataURL('image/png');
}

// desktop: drop an image file anywhere on the card; the box lights up while dragging
function dropZone(card, box, onFile) {
  let depth = 0;
  card.ondragenter = (e) => { if (e.dataTransfer.types.includes('Files')) { e.preventDefault(); depth++; box.classList.add('over'); } };
  card.ondragover = (e) => { if (e.dataTransfer.types.includes('Files')) e.preventDefault(); };
  card.ondragleave = () => { if (--depth <= 0) { depth = 0; box.classList.remove('over'); } };
  card.ondrop = (e) => { e.preventDefault(); depth = 0; box.classList.remove('over'); onFile(e.dataTransfer.files[0]); };
}

initPreview();
boot();

// a file dropped outside the photo box must not make the browser leave the app
['dragover', 'drop'].forEach((ev) => window.addEventListener(ev, (e) => { if (e.dataTransfer && e.dataTransfer.types.includes('Files')) e.preventDefault(); }));
