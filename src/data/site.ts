/**
 * Datos de la invitación. Todo lo que cambia de un evento a otro vive acá:
 * nombres, fecha, lugar, precios, itinerario, regalos y WhatsApp.
 * (Los datos actuales son de ejemplo.)
 */

export const site = {
  lang: 'es-AR',
  title: 'Violeta & León · Nos casamos',
  description:
    'Violeta y León se casan el 20 de marzo de 2027 en Estancia Los Aromos. Confirmá tu asistencia.',
  /** true = no aparece en buscadores (recomendado para invitaciones privadas). */
  noindex: true,
  themeColor: '#161d12',

  couple: { a: 'Violeta', b: 'León' },
  /** Fecha y hora de inicio: año, mes (1-12), día, hora, minutos. */
  date: { year: 2027, month: 3, day: 20, hour: 18, minute: 0 },
  dateShort: '20.03.2027',
  dateNumeric: '20/03/2027',
  dateLong: 'Sábado 20 de marzo',
  monthName: 'Marzo',
  timeLabel: '18:00 h',
  familyName: 'familia Ferrero Vidal',

  verse: {
    text: 'Por encima de todo, vístanse de amor, que es el vínculo perfecto.',
    cite: 'Colosenses 3:14 · NVI',
  },

  venue: {
    name: 'Estancia Los Aromos',
    address: 'Villa Allende, Córdoba',
    hours: 'De 18:00 a 01:00 h',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Villa+Allende,+C%C3%B3rdoba',
  },

  photos: [
    { src: '/img/foto-1.webp', alt: 'Foto de la pareja 1' },
    { src: '/img/foto-2.webp', alt: 'Foto de la pareja 2' },
    { src: '/img/foto-3.webp', alt: 'Foto de la pareja 3' },
  ],
  coverPhoto: { src: '/img/foto-portada.webp', alt: 'Foto de la pareja' },

  /** Número con código de país, sin + ni espacios (número de ejemplo). */
  whatsapp: '5493510000000',
  alias: 'VIOLETAYLEON',
  rsvpDeadline: 'Hasta el 5 de marzo',

  /** Tramos de precio: el vigente se marca solo según la fecha del día. */
  tiers: [
    { range: '1 de octubre al 30 de noviembre', from: '2026-10-01', to: '2026-11-30', amount: '$78.000', kid: '$39.000' },
    { range: '1 de diciembre al 31 de enero', from: '2026-12-01', to: '2027-01-31', amount: '$88.000', kid: '$44.000' },
    { range: '1 de febrero al 5 de marzo', from: '2027-02-01', to: '2027-03-05', amount: '$99.000', kid: '$49.500' },
  ],
  priceNotes: ['Menores de 3 años no abonan', 'Niños de 3 a 10 años, tarjeta reducida', 'Desde 11 años, tarjeta completa'],

  /** icon: iti1 copas · iti2 anillos · iti3 cena · iti4 torta · iti5 baile */
  itinerary: [
    { icon: 'iti1', title: 'Bienvenida', time: '18:00' },
    { icon: 'iti2', title: 'Ceremonia', time: '18:30' },
    { icon: 'iti1', title: 'Recepción', time: '19:15' },
    { icon: 'iti3', title: 'Cena', time: '20:30' },
    { icon: 'iti4', title: 'Brindis y torta', time: '22:30' },
    { icon: 'iti5', title: 'Baile', time: '23:00' },
    { icon: 'iti5', title: 'Fin de la fiesta', time: '01:00' },
  ],

  gifts: [
    'Vasos', 'Ensaladeras', 'Utensilios de cocina', 'Set de cubiertos', 'Cafetera',
    'Juego de sábanas 2 plazas', 'Cubrecama / mantas', 'Juego de toallones', 'Plantas', 'Plancha',
    'Copas de vino / agua', 'Bowls medianos', 'Especieros', 'Frascos de vidrio con tapa', 'Pava',
    'Licuadora o minipimer', 'Microondas', 'Freidora de aire',
  ],
  /** Cuántas ideas se ven en la tarjeta antes del botón "+N ideas más". */
  giftsPreview: 7,

  dress: {
    styles: ['Elegante', 'Relajado', 'Romántico'],
    palette: [
      { color: '#d98a92', name: 'Rosa' },
      { color: '#e3a389', name: 'Durazno' },
      { color: '#e8cf7a', name: 'Amarillo' },
      { color: '#8fc1dc', name: 'Celeste' },
      { color: '#b6a0d6', name: 'Lavanda' },
      { color: '#a3c98a', name: 'Verde claro' },
    ],
    reserved: [
      { color: '#fbfaf6', name: 'Blanco y similares' },
      { color: '#4a3426', name: 'Marrón oscuro (hombres)' },
      { color: '#6b7340', name: 'Verde oliva' },
    ],
    note: 'Reservados: blanco y similares, marrón oscuro en hombres y verde oliva (otros verdes, sí).',
  },

  /** Canción de fondo: poné el archivo en public/audio/ con este nombre. */
  song: '/audio/cancion.mp3',
} as const;

export type Site = typeof site;
