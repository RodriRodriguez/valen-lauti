import { Invitation } from '../models/invitation';

// Datos reales de la boda, consumidos por las secciones (countdown,
// itinerario, etc.) en vez de tenerlos hardcodeados en cada componente.
// En "cover" el texto de fecha/nombres va como imagen (ver
// sections/cover), pero el Date real se mantiene acá como fuente de verdad.
export const INVITATION_CONFIG: Invitation = {
  couple: {
    partnerOne: 'Valentina',
    partnerTwo: 'Lautaro',
  },
  // 07/03/2027, arranca 17:30hs — fuente de verdad para el countdown final.
  weddingDate: new Date(2027, 2, 7, 17, 30),
  welcome: {
    greeting: '¡Querida familia\ny amigos!',
    message:
      'Estamos contentos de invitarlos a nuestra celebración ' +
      'como familia Luque Moyano\n' +
      'Acompáñennos a vivir uno de los días más importantes de nuestras vidas.\n' +
      '¡Nuestra Boda!',
    verse: '“Por encima de todo, vístanse de amor, que es el vínculo perfecto.”',
    verseReference: 'Colosenses 3:14 NVI',
  },
  giftRegistry: {
    message:
      'Celebrar este día junto a ustedes ' +
      'es un regalo para nosotros. \n\n' +
      'En el caso que quieran acompañarnos con un detalle, ' +
      'les dejamos algunas ideas.',
    eventNumber: 'xxxxxx',
    storeName: 'El Palacio de Hierro',
    buttonText: 'Ver mesa de regalos',
    buttonUrl: '#',
    items: [
      'Vasos',
      'Ensaladeras',
      'Utensilios de cocina',
      'Set de cubiertos',
      'Cafetera',
      'Juego de sábanas 2 plazas',
      'Cubrecama / mantas',
      'Juego de toallones',
      'Plantas',
      'Plancha',
      'Copas de vino/agua',
      'Bowls medianos',
      'Especieros',
      'Frascos para cocina, de vidrio con tapa',
      'Pava',
      'Licuadora o minipimer',
      'Microondas',
      'Freidora de aire',
    ],
    aliasMessage: 'Para nuestro futuro hogar o para la luna de miel. Te compartimos un alias:',
    alias: 'VALENYLAUTI27',
  },
  dressCode: {
    message:
      'Elegante - Relajado - Romántico\n\n' +
      'Colores reservados: Blanco y similares, Marrón oscuro en hombres y Verde Oliva (otros verdes se puede)',
    buttonText: 'Mira algunos ejemplos',
    buttonUrl: '#',
    palette: ['#d98a92', '#e3a389', '#e8cf7a', '#8fc1dc', '#b6a0d6', '#a3c98a'],
  },
  itinerary: {
    items: [
      // Hay 5 íconos para 7 momentos: "Inicio" repite el de la recepción y
      // "Baile" el del fin del evento.
      {
        icon: '/img/photos/iti-1.webp',
        title: 'Inicio del evento',
        time: '17:30',
      },
      {
        icon: '/img/photos/iti-2.webp',
        title: 'Ceremonia',
        time: '18:00',
      },
      {
        icon: '/img/photos/iti-1.webp',
        title: 'Recepción',
        time: '18:30',
      },
      {
        icon: '/img/photos/iti-3.webp',
        title: 'Cena informal',
        time: '20:00',
      },
      {
        icon: '/img/photos/iti-4.webp',
        title: 'Brindis + Torta',
        time: '21:30',
      },
      {
        icon: '/img/photos/iti-5.png',
        title: 'Baile',
        time: '22:00',
      },
      {
        icon: '/img/photos/iti-5.png',
        title: 'Fin del evento',
        time: '23:30',
      },
    ],
  },
  location: {
    scheduleLabel: 'Horario de nuestra fiesta',
    scheduleTime: 'De 17:30 a 23:30hs',
    venueName: 'La Quinta Casona',
    address: 'Córdoba, Argentina',
    buttonText: 'Ver ubicación',
    buttonUrl: 'https://maps.app.goo.gl/DHwKN7rjqaEuKpn8A?g_st=iw',
    // Fotos del carrousel enmarcado (rotan solas, también se pueden deslizar).
    photos: [
      '/img/vyl/CARROUSEL_UNO.JPG',
      '/img/vyl/CARROUSEL_DOS.JPG',
      '/img/vyl/CARROUSEL_TRES.JPG',
    ],
  },
  pricing: {
    title: 'Precios',
    subtitle: 'Reservá tu lugar con anticipación: el valor sube a medida que se acerca la fecha.',
    tiers: [
      { range: '15 de Octubre al 15 de Noviembre', amount: '$86.000', childAmount: '$43.000' },
      { range: '16 de Noviembre al 15 de Enero', amount: '$96.000', childAmount: '$48.000' },
      { range: '16 de Enero al 25 de Febrero', amount: '$110.000', childAmount: '$55.000' },
    ],
    notes: ['Menores de 3 años no abonan.', 'A partir de 11 años, tarjeta completa.'],
    alias: 'VALENYLAUTI27',
  },
  rsvp: {
    intro:
      'Para preparar cada detalle que tenemos pensado y garantizar la comodidad de todos, ' +
      'pedimos confirmar presencia hasta el 25 de febrero.',
    namesLabel: 'Nombres (incluidos niños)',
    namesPlaceholder: 'Ej: Martina Gómez, Juan Pérez, Sofi (5 años)',
    attendanceOptions: ['Voy / Vamos', 'Lamentablemente no podré asistir'],
    dietaryQuestion: '¿Alguna restricción o preferencia alimentaria que debamos tener en cuenta?',
    dietaryOptions: [
      { label: 'Vegetariano/a' },
      { label: 'Vegano/a' },
      { label: 'Celíaco/a' },
      { label: 'Alergia', detailPlaceholder: '¿A qué? ¿Quién?' },
      { label: 'Otro', detailPlaceholder: 'Contanos cuál' },
    ],
    submitLabel: 'Enviar',
    warningNote: 'Los nombres y la asistencia son obligatorios para poder enviar.',
    thanksMessage: '¡Gracias por confirmar, {nombre}!',
    // 351 234-0533 (Córdoba): 54 país + 9 celular + 351 área + número.
    whatsappNumber: '5493512340533',
  },
};
