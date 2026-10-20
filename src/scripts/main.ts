import { site } from '../data/site';

const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector(s) as T;
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll<T>(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const { a, b } = site.couple;
const { year, month, day, hour, minute } = site.date;
const wedding = new Date(year, month - 1, day, hour, minute);

let tt: number | undefined;
function toast(m: string) {
  const t = $('#toast');
  t.textContent = m;
  t.classList.add('on');
  clearTimeout(tt);
  tt = window.setTimeout(() => t.classList.remove('on'), 2200);
}

/* sobre */
const gate = $('#gate');
document.documentElement.classList.add('lock');
$('#openBtn').addEventListener('click', () => {
  gate.classList.add('opening');
  setTimeout(() => {
    gate.classList.add('open');
    document.documentElement.classList.remove('lock');
    $('#music').hidden = false;
    $('#dock').classList.add('on');
    startReveals();
  }, reduce ? 0 : 900);
  music(true);
});

/* música */
let audio: HTMLAudioElement | null = null;
function music(on: boolean) {
  const btn = $('#music');
  try {
    if (!audio) { audio = new Audio(site.song); audio.loop = true; audio.volume = 0.5; }
    on ? audio.play().catch(() => {}) : audio.pause();
  } catch { /* sin audio */ }
  btn.classList.toggle('on', on);
  btn.setAttribute('aria-pressed', String(on));
  btn.setAttribute('aria-label', on ? 'Pausar la música' : 'Activar la música');
}
$('#music').addEventListener('click', () => music(!$('#music').classList.contains('on')));

/* precios: se marca el tramo vigente según la fecha del día */
(function () {
  const today = new Date(); today.setHours(12);
  $$('#tiers .tier').forEach((t) => {
    const from = new Date(t.dataset.from + 'T00:00'), to = new Date(t.dataset.to + 'T23:59');
    const st = today >= from && today <= to ? 'now' : today > to ? 'past' : '';
    if (st) t.classList.add(st);
    if (st === 'now') t.insertAdjacentHTML('afterbegin', '<span class="badge">Precio actual</span>');
  });
})();

/* carrusel */
(function () {
  const imgs = $$('#frame img'), dots = $$('#dots button');
  let i = 0, timer: number | undefined;
  const go = (n: number) => {
    i = (n + imgs.length) % imgs.length;
    imgs.forEach((im, k) => im.classList.toggle('on', k === i));
    dots.forEach((d, k) => d.setAttribute('aria-current', String(k === i)));
  };
  const auto = () => { clearInterval(timer); if (!reduce) timer = window.setInterval(() => go(i + 1), 4200); };
  dots.forEach((d, k) => d.addEventListener('click', () => { go(k); auto(); }));
  let x0: number | null = null;
  const f = $('#frame');
  f.addEventListener('pointerdown', (e) => { x0 = e.clientX; });
  f.addEventListener('pointerup', (e) => {
    if (x0 == null) return;
    const dx = e.clientX - x0;
    if (Math.abs(dx) > 40) { go(i + (dx < 0 ? 1 : -1)); auto(); }
    x0 = null;
  });
  auto();
})();

/* copiar alias */
document.addEventListener('click', (e) => {
  const btn = (e.target as Element).closest<HTMLElement>('[data-copy]');
  if (!btn) return;
  const value = btn.dataset.copy ?? '';
  const label = btn.querySelector('span')!;
  const done = () => {
    btn.classList.add('ok'); label.textContent = 'Copiado'; toast('Alias copiado');
    setTimeout(() => { btn.classList.remove('ok'); label.textContent = 'Copiar'; }, 2000);
  };
  if (navigator.clipboard) navigator.clipboard.writeText(value).then(done, () => toast('Alias: ' + value));
  else toast('Alias: ' + value);
});

/* modal de regalos */
const modal = $('#gifts');
let lastF: HTMLElement | null = null;
function openGifts() {
  lastF = document.activeElement as HTMLElement | null;
  modal.hidden = false;
  document.documentElement.classList.add('lock');
  $('.x', modal).focus();
}
function closeModal() {
  modal.hidden = true;
  document.documentElement.classList.remove('lock');
  lastF?.focus();
}
['#giftsBtn', '#moreIdeas'].forEach((id) => $(id).addEventListener('click', openGifts));
$('#moreIdeas').addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openGifts(); } });
modal.addEventListener('click', (e) => { const t = e.target as Element; if (t === modal || t.closest('[data-close]')) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !modal.hidden) closeModal(); });

/* confirmación por WhatsApp */
const form = $<HTMLFormElement>('#rsvp');
$$<HTMLInputElement>('.diet input').forEach((c) => c.addEventListener('change', () => {
  $('#details').innerHTML = $$<HTMLInputElement>('.diet input[data-detail]:checked')
    .map((x) => `<input type="text" data-for="${x.value}" placeholder="${x.value}: ${x.dataset.detail}" aria-label="${x.value}: ${x.dataset.detail}">`)
    .join('');
}));
form.addEventListener('change', (e) => {
  const t = e.target as HTMLInputElement;
  if (t.name === 'att') $('#dietF').hidden = t.value === 'no';
});
const namesInline = (v: string) => v.split(/\n|,/).map((s) => s.trim()).filter(Boolean).join(', ');
const isGroup = (v: string) => /\bfamilia\b/i.test(v) || v.split(/\n|,|\s+y\s+|&|\+/i).filter((p) => p.trim()).length > 1;

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const n = $<HTMLTextAreaElement>('#guests');
  const att = form.querySelector<HTMLInputElement>('input[name="att"]:checked');
  const err = $('#err');
  n.setAttribute('aria-invalid', 'false');
  if (!n.value.trim()) { n.setAttribute('aria-invalid', 'true'); err.textContent = 'Escribí los nombres de quienes confirman.'; n.focus(); return; }
  if (!att) { err.textContent = 'Contanos si vienen o no.'; form.querySelector<HTMLInputElement>('input[name="att"]')!.focus(); return; }
  err.textContent = '';
  const names = namesInline(n.value), group = isGroup(n.value);
  const hi = `¡Hola ${a} y ${b}! 💍`;
  let lines: string[];
  if (att.value === 'no') {
    lines = [
      hi,
      group ? `Somos *${names}*. Lamentablemente no podremos asistir a su boda 😔` : `Soy *${names}*. Lamentablemente no podré asistir a su boda 😔`,
      group ? '¡Les deseamos lo mejor en este día tan especial! ❤️' : '¡Les deseo lo mejor en este día tan especial! ❤️',
    ];
  } else {
    lines = [
      hi,
      group
        ? `Somos *${names}* y confirmamos nuestra asistencia a su boda del ${site.dateNumeric}. ¡Vamos! 🥂`
        : `Soy *${names}* y confirmo mi asistencia a su boda del ${site.dateNumeric}. ¡Voy! 🥂`,
    ];
    const diet = $$<HTMLInputElement>('.diet input:checked').map((c) => {
      const d = form.querySelector<HTMLInputElement>(`[data-for="${c.value}"]`)?.value.trim();
      return d ? `${c.value} (${d})` : c.value;
    });
    if (diet.length) lines.push('', `🍽️ Restricciones alimentarias: ${diet.join(', ')}`);
  }
  $<HTMLAnchorElement>('#waLink').href = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`;
  const first = names.split(',')[0];
  $('#thanksT').textContent = att.value === 'no' ? `¡Gracias por avisar, ${first}!` : `¡Gracias por confirmar, ${first}!`;
  form.hidden = true;
  $('#thanks').hidden = false;
});
$('#again').addEventListener('click', () => { form.hidden = false; $('#thanks').hidden = true; });

/* cuenta regresiva */
function tick() {
  let s = Math.max(0, Math.floor((wedding.getTime() - Date.now()) / 1000));
  const d = Math.floor(s / 86400); s -= d * 86400;
  const h = Math.floor(s / 3600); s -= h * 3600;
  const m = Math.floor(s / 60); s -= m * 60;
  $('#cd-d').textContent = String(d);
  $('#cd-h').textContent = String(h).padStart(2, '0');
  $('#cd-m').textContent = String(m).padStart(2, '0');
  $('#cd-s').textContent = String(s).padStart(2, '0');
}
tick();
setInterval(tick, 1000);

/* revelado al hacer scroll y navegación */
function startReveals() {
  if (reduce || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver(
    (es) => es.forEach((x) => { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } }),
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  $$('.rv').forEach((el) => io.observe(el));
}
if (!reduce && 'IntersectionObserver' in window) document.documentElement.classList.add('js');

const links = $$<HTMLAnchorElement>('#dock a');
const coverBg = $('#coverBg');
function spy() {
  let cur = links[0];
  links.forEach((l) => {
    const el = document.getElementById(l.dataset.spy ?? '');
    if (el && el.getBoundingClientRect().top < innerHeight * 0.45) cur = l;
  });
  links.forEach((l) => l.setAttribute('aria-current', String(l === cur)));
  if (!reduce) coverBg.style.transform = `scale(1.06) translateY(${Math.min(scrollY, innerHeight) * 0.18}px)`;
}
addEventListener('scroll', () => requestAnimationFrame(spy), { passive: true });
spy();
