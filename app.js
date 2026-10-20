(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- data ---------- */
  var S = function (n) { return 'assets/shots/' + n + '.jpg'; };
  var PROJECTS = [
    { id: 'sunna3', cat: 'ai', em: '🎬', name: 'صُنّاع Sunna3', hue: '#6a4cff', hue2: '#c04cff',
      desc: 'منصة لصناعة فيديوهات الموشن بالذكاء الاصطناعي من فكرة واحدة، مع نشر تلقائي على فيسبوك وإنستغرام وتيك توك.',
      tags: ['Flutter', 'Node.js', 'PocketBase', 'AI'],
      feat: ['سيناريو جديد لكل فيديو بلهجات عراقية (بغدادية، جنوبية، موصلية، فراتية)', 'نصوص متحركة وانتقالات وموسيقى وتعليق صوتي', 'جدولة النشر أو النشر الفوري تلقائياً', 'إشعارات بحالة النشر'],
      shots: ['sunna3-1', 'sunna3-2', 'sunna3-3', 'sunna3-4', 'sunna3-5'].map(S) },
    { id: 'niroz', cat: 'rent', em: '🏡', name: 'ريفايف (نيروز)', hue: '#0d3b78', hue2: '#e8a33d',
      desc: 'تطبيق عراقي لتأجير الشاليهات والفلل والشقق: بحث، حجز، مفضلة، محادثات وعروض.',
      tags: ['Flutter', 'PocketBase'],
      feat: ['بحث بالاسم أو المدينة', 'حجوزاتي والمفضلة والمحادثات', 'عروض خاصة بالوحدات'],
      shots: ['niroz-01_home', 'niroz-02_details', 'niroz-03_offers', 'niroz-04_login'].map(S) },
    { id: 'sawla', cat: 'field', em: '📍', name: 'صولة Sawla', hue: '#ff7a3d', hue2: '#ff3d71',
      desc: 'تطبيق متابعة المروجين الميدانيين: تتبع GPS لحظي، طلبات انضمام للمتاجر، تسجيل المبيعات وأهداف شهرية.',
      tags: ['Flutter', 'PocketBase', 'GPS'],
      feat: ['ثلاثة أدوار: مروّج، صاحب متجر، مشرف', 'موافقة/رفض/فصل المروّجين من صاحب المتجر', 'تسجيل عمليات البيع وأهداف شهرية'] },
    { id: 'waslli', cat: 'delivery', em: '🚚', name: 'وصلي Waslli', hue: '#10b981', hue2: '#0ea5e9',
      desc: 'تطبيق توصيل طلبات بين المحافظات بواجهة واحدة لثلاثة أدوار.',
      tags: ['Flutter', 'PocketBase'],
      feat: ['مرسل (Sender)', 'تاجر (Merchant)', 'مندوب توصيل (Driver)'] },
    { id: 'safsaf', cat: 'cafe', em: '☕', name: 'صفصاف كافيه SAFSAF', hue: '#16a34a', hue2: '#84cc16',
      desc: 'تطبيق واحد لإدارة المقهى كاملاً: الكابتن يرسل الطلب، والباريستا والمطبخ يستلمونه فوراً مع إشعار حتى لو كان التطبيق مغلقاً.',
      tags: ['Flutter', 'PocketBase', 'Firebase FCM', 'Android / iOS / Windows'],
      feat: ['توجيه الطلب للباريستا أو المطبخ', 'إدارة العاملين والمنيو والعروض', 'متابعة كل الطلبات من الأدمن'] },
    { id: 'almulqa', cat: 'cafe', em: '🍵', name: 'المُلتقى Almulqa Coffee', hue: '#b45309', hue2: '#f59e0b',
      desc: 'تطبيق إدارة لصالة قهوة: لوحة معلومات، قائمة طعام، وتتبع الديون.',
      tags: ['Flutter', 'PocketBase'],
      feat: ['لوحة تحكم Dashboard', 'قائمة المنيو', 'شاشة الديون', 'لوحة إدارة'] },
    { id: 'sif', cat: 'cafe', em: '🥤', name: 'سيف كوفي Sif Coffee', hue: '#0f766e', hue2: '#22d3ee',
      desc: 'تطبيق لإدارة المقهى بأدوار الأدمن والكابتن والموظف، يعمل على الموبايل والويب وماك.',
      tags: ['Flutter', 'PocketBase', 'iOS / Android / macOS / Web'],
      feat: ['شاشات للأدمن والكابتن والموظف', 'تسجيل دخول وصلاحيات', 'أصوات تنبيه للطلبات'] },
    { id: 'hassan', cat: 'shop', em: '💄', name: 'حسن الجشعمي للتجميل', hue: '#db2777', hue2: '#f472b6',
      desc: 'تطبيق متجر مستحضرات تجميل مع إدارة المخزون والمبيعات والعروض والتقارير.',
      tags: ['Flutter', 'PocketBase'],
      feat: ['متجر ومنتجات وسلة طلبات', 'مخزون ومبيعات وتقارير', 'عروض وإشعارات'] },
    { id: 'nomor', cat: 'field', em: '🛰️', name: 'نمور – تطبيق الفنيين', hue: '#2563eb', hue2: '#7c3aed',
      desc: 'تطبيق متابعة الفنيين: حضور وانصراف، مناطق جغرافية، تنبيهات الخروج منها، وسجل المكالمات.',
      tags: ['Flutter', 'Firebase', 'Geofencing'],
      feat: ['تسجيل الحضور والانصراف', 'مناطق عمل وتنبيه عند الخروج منها', 'متابعة الأجهزة والمكالمات'] },
    { id: 'fawateer', cat: 'shop', em: '🧾', name: 'فواتير Fawateer', hue: '#0891b2', hue2: '#6366f1',
      desc: 'تطبيق لإدارة الفواتير بأدوار مدير ومشرف وساكن، مع موافقة على الحسابات الجديدة.',
      tags: ['Flutter', 'PocketBase'],
      feat: ['شاشات للأدمن والمدير والساكن', 'حسابات بانتظار الموافقة', 'ملف شخصي وإشعارات'] },
    { id: 'media', cat: 'web', em: '📸', name: 'Media – حجز المودلز', hue: '#9333ea', hue2: '#ec4899',
      desc: 'منصة ويب عربية RTL لحجز المودلز والمصورين مع لوحة إدارة.',
      tags: ['Web', 'PocketBase'],
      feat: ['حجز المودلز والمصورين', 'حساب مشرف ولوحة PocketBase', 'واجهة عربية RTL'] },
    { id: 'todo', cat: 'web', em: '✅', name: 'TodoApp', hue: '#4f46e5', hue2: '#06b6d4',
      desc: 'تطبيق مهام بـ .NET: مكتبة Core مشتركة مع واجهة ويب Blazor وتطبيق سطح مكتب WPF.',
      tags: ['.NET', 'Blazor', 'WPF'],
      feat: ['نواة مشتركة TodoApp.Core', 'نسخة ويب Blazor', 'نسخة سطح مكتب WPF'] }
  ];
  var CATS = { all: 'الكل', cafe: 'مقاهٍ ومطاعم', field: 'متابعة ميدانية', rent: 'حجوزات', delivery: 'توصيل', shop: 'متاجر وفواتير', ai: 'ذكاء اصطناعي', web: 'ويب وسطح المكتب' };

  var CONTACTS = [
    { k: 'اتصال', v: '0780 965 5527', href: 'tel:+9647809655527', c: '#2563eb', icon: 'M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11 11 0 0 0 3.6.6 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.6 3.6a1 1 0 0 1-.25 1z' },
    { k: 'واتساب', v: '0780 965 5527', href: 'https://wa.me/9647809655527', c: '#16a34a', icon: 'M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.5A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .5l-.4.6-.3.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.4.3.1.4.1.6-.1l.8-1c.2-.3.4-.2.6-.1l2 .9c.3.1.5.2.5.3.1.2.1.7-.1 1.3z' },
    { k: 'فيسبوك', v: 'صفحتي على فيسبوك', href: 'https://www.facebook.com/profile.php?id=61594507494387', c: '#1877f2', icon: 'M13.5 21v-8h2.7l.4-3.2h-3.1V7.8c0-.9.3-1.5 1.6-1.5h1.7V3.4A22 22 0 0 0 14.4 3c-2.4 0-4 1.5-4 4.1v2.7H7.7V13h2.7v8z' },
    { k: 'تيك توك', v: '@chara.tec', href: 'https://www.tiktok.com/@chara.tec', c: '#111827', icon: 'M16.6 3a5 5 0 0 0 3.9 4.4v3.2a8 8 0 0 1-3.9-1.2v6.2a6 6 0 1 1-6-6c.3 0 .6 0 .9.1v3.3a2.8 2.8 0 1 0 1.9 2.6V3z' },
    { k: 'إنستغرام', v: '@chara.tec', href: 'https://www.instagram.com/chara.tec', c: '#d62976', icon: 'M7.5 3h9A4.5 4.5 0 0 1 21 7.5v9a4.5 4.5 0 0 1-4.5 4.5h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3zm0 1.8A2.7 2.7 0 0 0 4.8 7.5v9a2.7 2.7 0 0 0 2.7 2.7h9a2.7 2.7 0 0 0 2.7-2.7v-9a2.7 2.7 0 0 0-2.7-2.7zM12 7.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm0 1.8a2.7 2.7 0 1 0 0 5.4 2.7 2.7 0 0 0 0-5.4zm5-2.6a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1z' }
  ];

  /* ---------- theme ---------- */
  $('#themeBtn').addEventListener('click', function () {
    var t = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = t;
    try { localStorage.setItem('theme', t); } catch (e) {}
    var m = document.querySelector('meta[name=theme-color]'); if (m) m.content = t === 'dark' ? '#0b1020' : '#f4f6ff';
  });

  /* ---------- ripple on all floating buttons ---------- */
  document.addEventListener('pointerdown', function (e) {
    var b = e.target.closest && e.target.closest('.fbtn'); if (!b) return;
    var r = b.getBoundingClientRect(), d = Math.max(r.width, r.height), s = document.createElement('span');
    s.className = 'ripple'; s.style.cssText = 'width:' + d + 'px;height:' + d + 'px;left:' + (e.clientX - r.left - d / 2) + 'px;top:' + (e.clientY - r.top - d / 2) + 'px';
    b.appendChild(s); setTimeout(function () { s.remove(); }, 650);
  });

  /* ---------- filters + grid ---------- */
  var cur = 'all', grid = $('#grid'), filters = $('#filters');
  Object.keys(CATS).forEach(function (k) {
    var b = document.createElement('button'); b.className = 'fbtn' + (k === 'all' ? ' on' : ''); b.textContent = CATS[k]; b.dataset.k = k;
    b.onclick = function () { cur = k; $$('.fbtn', filters).forEach(function (x) { x.classList.toggle('on', x === b); }); render(); };
    filters.appendChild(b);
  });
  function el(tag, cls, txt) { var e = document.createElement(tag); if (cls) e.className = cls; if (txt) e.textContent = txt; return e; }
  function render() {
    grid.innerHTML = '';
    PROJECTS.filter(function (p) { return cur === 'all' || p.cat === cur; }).forEach(function (p) {
      var c = el('button', 'pcard'); c.style.setProperty('--hue', p.hue); c.style.setProperty('--hue2', p.hue2); c.setAttribute('aria-label', 'معاينة ' + p.name);
      var pic = el('div', 'pic');
      if (p.shots) { var im = new Image(); im.src = p.shots[0]; im.alt = ''; im.loading = 'lazy'; pic.appendChild(im); } else pic.appendChild(el('span', 'em', p.em));
      c.appendChild(pic); c.appendChild(el('h3', '', p.name)); c.appendChild(el('p', '', p.desc));
      var ul = el('ul', 'chips'); p.tags.forEach(function (t) { ul.appendChild(el('li', '', t)); }); c.appendChild(ul);
      c.appendChild(el('span', 'more', 'معاينة ←'));
      c.onclick = function () { openModal(p); };
      tilt(c, 9); grid.appendChild(c);
    });
  }
  render();

  /* ---------- tilt ---------- */
  function tilt(node, max) {
    if (reduce) return;
    node.addEventListener('pointermove', function (e) {
      if (e.pointerType === 'touch') return;
      var r = node.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      node.style.setProperty('--ry', ((x - .5) * max * 2).toFixed(2) + 'deg');
      node.style.setProperty('--rx', ((.5 - y) * max * 2).toFixed(2) + 'deg');
      node.style.setProperty('--mx', (x * 100) + '%'); node.style.setProperty('--my', (y * 100) + '%');
    });
    node.addEventListener('pointerleave', function () { node.style.removeProperty('--ry'); node.style.removeProperty('--rx'); });
  }
  var photo = $('.photo'); if (photo) { tilt($('#hero3d'), 0); $('#hero3d').addEventListener('pointermove', function (e) {
    if (reduce || e.pointerType === 'touch') return;
    var r = this.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    photo.style.setProperty('--ry', (x * 26) + 'deg'); photo.style.setProperty('--rx', (-y * 18) + 'deg');
  }); $('#hero3d').addEventListener('pointerleave', function () { photo.style.removeProperty('--ry'); photo.style.removeProperty('--rx'); }); }

  /* ---------- contacts ---------- */
  var cg = $('#contactGrid');
  CONTACTS.forEach(function (c) {
    var a = el('a', 'fbtn ct'); a.href = c.href; a.target = '_blank'; a.rel = 'noopener'; a.setAttribute('data-reveal', '');
    a.innerHTML = '<span class="ic" style="--c:' + c.c + '"><svg viewBox="0 0 24 24"><path d="' + c.icon + '"/></svg></span><small>' + c.k + '</small><b></b>';
    $('b', a).textContent = c.v; cg.appendChild(a);
  });

  /* ---------- modal / preview ---------- */
  var modal = $('#modal'), screen = $('#screen'), dots = $('#dots'), idx = 0, slides = [], lastFocus = null, proj = null;
  function buildSlides(p) {
    if (p.shots) return p.shots.map(function (s) { return { img: s }; });
    var out = [{ big: p.em, title: p.name, items: [p.desc] }];
    for (var i = 0; i < p.feat.length; i += 2) out.push({ big: '✦', title: 'المزايا', items: p.feat.slice(i, i + 2) });
    out.push({ big: '🛠️', title: 'التقنيات', items: p.tags });
    return out;
  }
  function show(n, dir) {
    idx = (n + slides.length) % slides.length;
    var s = slides[idx], d = el('div', 'slide' + (dir > 0 ? '' : ' from-r'));
    if (s.img) { var im = new Image(); im.src = s.img; im.alt = proj.name + ' – شاشة ' + (idx + 1); d.appendChild(im); }
    else { d.className += ' txt'; d.appendChild(el('div', 'big', s.big)); d.appendChild(el('h4', '', s.title)); var u = el('ul'); s.items.forEach(function (t) { u.appendChild(el('li', '', t)); }); d.appendChild(u); }
    screen.innerHTML = ''; screen.appendChild(d);
    $$('button', dots).forEach(function (b, i) { b.classList.toggle('on', i === idx); });
  }
  function openModal(p) {
    proj = p; slides = buildSlides(p); lastFocus = document.activeElement;
    modal.style.setProperty('--hue', p.hue); modal.style.setProperty('--hue2', p.hue2);
    $('#mTitle').textContent = p.name; $('#mDesc').textContent = p.desc;
    var t = $('#mTags'); t.innerHTML = ''; p.tags.forEach(function (x) { t.appendChild(el('li', '', x)); });
    var f = $('#mFeat'); f.innerHTML = ''; p.feat.forEach(function (x) { f.appendChild(el('li', '', x)); });
    dots.innerHTML = ''; slides.forEach(function (_, i) { var b = el('button'); b.setAttribute('aria-label', 'شاشة ' + (i + 1)); b.onclick = function () { show(i, i > idx ? 1 : -1); }; dots.appendChild(b); });
    modal.hidden = false; document.body.style.overflow = 'hidden'; show(0, 1); $('.close', modal).focus();
  }
  function closeModal() { modal.hidden = true; document.body.style.overflow = ''; if (lastFocus) lastFocus.focus(); }
  // RTL: "next" slides in from the left, "prev" from the right
  $('#nextBtn').onclick = function () { show(idx + 1, 1); };
  $('#prevBtn').onclick = function () { show(idx - 1, -1); };
  $$('[data-close]', modal).forEach(function (b) { b.onclick = closeModal; });
  document.addEventListener('keydown', function (e) {
    if (modal.hidden) return;
    if (e.key === 'Escape') closeModal();
    else if (e.key === 'ArrowLeft') show(idx + 1, 1);
    else if (e.key === 'ArrowRight') show(idx - 1, -1);
    else if (e.key === 'Tab') { var f = $$('button,a[href]', modal).filter(function (x) { return x.offsetParent; }); if (!f.length) return; var a = f[0], z = f[f.length - 1]; if (e.shiftKey && document.activeElement === a) { z.focus(); e.preventDefault(); } else if (!e.shiftKey && document.activeElement === z) { a.focus(); e.preventDefault(); } }
  });
  var sx = null, phone = $('#phone');
  phone.addEventListener('pointerdown', function (e) { sx = e.clientX; });
  phone.addEventListener('pointerup', function (e) { if (sx === null) return; var dx = e.clientX - sx; sx = null; if (Math.abs(dx) > 40) { if (dx < 0) show(idx + 1, 1); else show(idx - 1, -1); } });
  tilt(phone, 10);

  /* ---------- reveal + counters ---------- */
  var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: .12 });
  function watch() { $$('[data-reveal]:not(.in)').forEach(function (n) { io.observe(n); }); }
  watch();
  $$('[data-count]').forEach(function (n) {
    var to = +n.dataset.count, t0 = performance.now();
    (function tick(t) { var k = Math.min(1, (t - t0) / 1200); n.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(tick); })(t0);
  });
  $('#yr').textContent = new Date().getFullYear();

  /* ---------- background particles ---------- */
  var cv = $('#bg'), cx = cv.getContext('2d'), W, H, pts = [], mx = 0, my = 0;
  function size() { W = cv.width = innerWidth; H = cv.height = innerHeight; pts = []; var n = Math.min(70, Math.round(W * H / 22000)); for (var i = 0; i < n; i++) pts.push({ x: Math.random() * W, y: Math.random() * H, z: Math.random() * .8 + .2, vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25 }); }
  size(); addEventListener('resize', size);
  addEventListener('pointermove', function (e) { mx = e.clientX / W - .5; my = e.clientY / H - .5; });
  function frame() {
    cx.clearRect(0, 0, W, H);
    var dark = document.documentElement.dataset.theme === 'dark', col = dark ? '150,160,255' : '80,90,220';
    pts.forEach(function (p) { p.x += p.vx; p.y += p.vy; if (p.x < 0) p.x = W; if (p.x > W) p.x = 0; if (p.y < 0) p.y = H; if (p.y > H) p.y = 0; });
    for (var i = 0; i < pts.length; i++) {
      var a = pts[i], ax = a.x + mx * 40 * a.z, ay = a.y + my * 40 * a.z;
      cx.fillStyle = 'rgba(' + col + ',' + (.25 + a.z * .4) + ')'; cx.beginPath(); cx.arc(ax, ay, 1.2 + a.z * 1.8, 0, 6.3); cx.fill();
      for (var j = i + 1; j < pts.length; j++) { var b = pts[j], bx = b.x + mx * 40 * b.z, by = b.y + my * 40 * b.z, d = Math.hypot(ax - bx, ay - by); if (d < 130) { cx.strokeStyle = 'rgba(' + col + ',' + (.16 * (1 - d / 130)) + ')'; cx.beginPath(); cx.moveTo(ax, ay); cx.lineTo(bx, by); cx.stroke(); } }
    }
    requestAnimationFrame(frame);
  }
  if (!reduce) frame();
})();
