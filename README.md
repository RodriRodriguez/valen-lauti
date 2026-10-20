# Invitación digital · Violeta & León

Invitación de boda en Astro (sitio estático). Diseño: Rodri Rodríguez · sistema rr.
Todos los nombres, fechas, números y datos son de ejemplo.

## Comandos

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # genera dist/
npm run preview   # sirve dist/ para probar el build
```

Requiere Node 22.22 o superior.

## Personalizar para otro evento

Todo lo que cambia de un evento a otro está en **`src/data/site.ts`**:

- nombres, fecha y hora (la cuenta regresiva y el calendario salen solos);
- lugar, horario y link de Google Maps;
- fotos del carrusel y de la portada;
- WhatsApp para confirmar y alias para transferir;
- tramos de precio (el vigente se marca solo según la fecha);
- itinerario, ideas de regalos y código de vestimenta;
- canción de fondo.

Fotos: reemplazá los archivos en `public/img/` (`foto-1.webp`, `foto-2.webp`, `foto-3.webp`, `foto-portada.webp`). Usá formato vertical 3:4, de unos 760×1013 px. La foto de portada se recorta en círculo.

Música: poné `cancion.mp3` en `public/audio/`.

Antes de publicar, cambiá `site` en `astro.config.mjs` por el dominio real; se usa para la imagen al compartir el link (`public/og.jpg`).

## Estructura

```
src/
  data/site.ts          datos del evento
  layouts/Base.astro    <head>, fuentes, metadatos
  pages/index.astro     página completa
  pages/404.astro
  components/           Gate (sobre), Dock, Cover, Welcome, Fiesta, Itinerary,
                        Gifts, Rsvp, Closing, Footer, GiftsModal, Alias, Icon, MusicButton
  scripts/main.ts       sobre, música, carrusel, precios, RSVP por WhatsApp, cuenta regresiva
  styles/global.css     estilos
public/
  img/                  imágenes en webp
  audio/                canción
```

## Publicar

Es un sitio 100% estático: sirve en Cloudflare Pages, Netlify o Vercel.

- Comando de build: `npm run build`
- Carpeta de salida: `dist`

`robots.txt` y la etiqueta `noindex` evitan que la invitación aparezca en buscadores. Para cambiarlo, editá `noindex` en `site.ts`.
