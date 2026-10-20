export interface Invitation {
  couple: {
    partnerOne: string;
    partnerTwo: string;
  };
  weddingDate: Date;
  welcome: {
    /** Saludo en script, ej. "¡Queridos amigos y familiares!" */
    greeting: string;
    /** Párrafo de bienvenida. Puede tener varias líneas separadas por "\n". */
    message: string;
    /** Versículo bíblico debajo del párrafo, con comillas incluidas. */
    verse: string;
    /** Cita del versículo, ej. "Colosenses 3:14 NVI". */
    verseReference: string;
  };
  giftRegistry: {
    message: string;
    eventNumber: string;
    storeName: string;
    buttonText: string;
    /** URL real de la mesa de regalos. */
    buttonUrl: string;
    /** Ideas de regalo que se listan en el modal. */
    items: string[];
    /** Texto que acompaña al alias, debajo de la lista. */
    aliasMessage: string;
    /** Alias para transferencia (con botón de copiar en el modal). */
    alias: string;
  };
  dressCode: {
    /** Párrafos separados por "\n\n" (una línea en blanco entre cada uno). */
    message: string;
    buttonText: string;
    /** URL o ancla con ejemplos de vestimenta. */
    buttonUrl: string;
    /** Paleta de colores sugerida, en el orden que se muestra. */
    palette: string[];
  };
  itinerary: {
    items: {
      /** Ruta del ícono (public/img/photos/iti-N). */
      icon: string;
      title: string;
      time: string;
    }[];
  };
  location: {
    /** Ej. "Horario de nuestra fiesta" — va arriba del título, dentro de la misma tarjeta. */
    scheduleLabel: string;
    /** Ej. "De 17:30 a 23:30hs" */
    scheduleTime: string;
    venueName: string;
    address: string;
    buttonText: string;
    /** URL real del mapa (Google Maps, etc.). */
    buttonUrl: string;
    /** Fotos del lugar para el carrousel. Por ahora, placeholder. */
    photos: string[];
  };
  pricing: {
    title: string;
    subtitle: string;
    tiers: {
      range: string;
      amount: string;
      /** Precio de la tarjeta de niños (3 a 10 años) para ese mismo tramo. */
      childAmount: string;
    }[];
    /** Aclaraciones sueltas, ej. exenciones por edad. */
    notes: string[];
    /** Alias bancario para transferencias. */
    alias: string;
  };
  rsvp: {
    intro: string;
    /** Un solo campo para todos los que confirman (incluidos niños). */
    namesLabel: string;
    namesPlaceholder: string;
    /** Opciones de asistencia, en orden: [va, no va]. */
    attendanceOptions: string[];
    dietaryQuestion: string;
    /** Casillas de restricciones; con detailPlaceholder, al marcarla aparece un campo para detallar. */
    dietaryOptions: { label: string; detailPlaceholder?: string }[];
    submitLabel: string;
    warningNote: string;
    /** Texto de agradecimiento tras enviar — "{nombre}" se reemplaza por el nombre cargado. */
    thanksMessage: string;
    /** Número que recibe las confirmaciones por WhatsApp, formato internacional sin "+" (ej. 5493511234567). */
    whatsappNumber: string;
  };
}
