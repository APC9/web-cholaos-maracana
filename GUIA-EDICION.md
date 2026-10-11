# Guía de edición: Cholaos Maracaná

Web estática (HTML + CSS + JS, sin compilación) publicada en Netlify desde la raíz del repositorio. Léela antes de hacer cualquier cambio.

## Mapa de archivos

| Archivo | Qué contiene |
|---|---|
| `index.html` | Página principal. Todas las secciones están marcadas con `<!-- SECCIÓN: … -->` y `<!-- FIN SECCIÓN: … -->`. |
| `css/style.css` | Estilos de la web. Los colores están en variables en el `:root` que hay tras `/*# sourceMappingURL=style.css.map */`. |
| `css/tema.css` | Tema activo y colores personalizados. **Único archivo que se toca para temas y colores.** |
| `css/temas/*.css` | Un archivo por tema, solo con variables. No se editan. |
| `data/carta.json`, `data/sugerencia.json` | Carta y sugerencia del día. Los reescribe la automatización (ver abajo). |
| `js/datos-web.js` | Pinta la carta y la sugerencia a partir de los JSON. No se edita. |
| `js/carta-libro.js` | Convierte la carta en un libro: paso de página animado, miniaturas, deslizar con el dedo y visor ampliado. No se edita. |
| `favicon.ico`, `img/favicon/` | Icono de la pestaña y del acceso directo en el móvil, sacado de `img/logo.jpeg`. Enlazado en el `<head>` de las 4 páginas. |
| `img/` | Imágenes de la web. `img/carta/` e `img/sugerencia/` son de la automatización. |
| `aviso-legal.html`, `politica-de-privacidad.html`, `politica-de-cookies.html` | Páginas legales, con su propio estilo `css/legal.css` y sin tema. |
| `css/fontawesome-free-6.2.0-web/` | Librería de iconos. No se edita. |
| `scss/`, `css/img/`, `css/general/`, `css/style.css.map` | Restos de una plantilla antigua. **No se usan**: no editar ni compilar `scss/` (sobrescribiría `css/style.css`). |
| `netlify.toml` | Configuración de Netlify. Protegido: no se toca. |

## Secciones de `index.html`

| Sección (comentario) | `id` | Qué hay |
|---|---|---|
| Menú de navegación | — | Logo y enlaces: Nosotros, Sugerencia (solo visible si hay sugerencia), Menú, Contacto, botón "Ver menú". |
| Portada | `#inicio` | Foto `img/bubble-teas.jpeg`, título "Cholaos Maracaná", frase y botón. |
| Nosotros | `#nosotros` | Texto de presentación y foto `img/arepa.jpeg`. |
| Productos destacados | `#productos-destacados` | 8 tarjetas (imagen, categoría y nombre). |
| Sugerencia del día | `#sugerencia` | **No editar a mano**: ver "Carta y sugerencia del día". |
| Carta | `#menu` | **No editar a mano**: ver "Carta y sugerencia del día". |
| Contacto | `#contacto` | Dirección, teléfono, WhatsApp, redes sociales y mapa. |
| Visor ampliado de la carta | `#menu-viewer` | Ventana que amplía una página de la carta. |
| Pie de página | — | Logo, frase, enlaces legales y créditos. |
| Botón de WhatsApp y aviso de cookies | `#cookie-banner` | Botón flotante de WhatsApp y aviso de cookies. |

## Dónde está cada dato

| Dato | Dónde |
|---|---|
| Teléfono (662 102 911) | `index.html`, sección Contacto: `tel:+34662102911` y el texto visible. |
| WhatsApp | `index.html`: enlace `wa.me/34662102911` en la sección Contacto **y** en el botón flotante (`.whatsapp-fab`). Cambia los dos. |
| Dirección (C. San Roque, 19, Loc 2, 29680 Estepona) | `index.html`, sección Contacto: texto, enlace "Cómo llegar" y `data-src` del mapa. |
| Redes sociales | `index.html`, sección Contacto, `.social-links`. |
| Textos de la portada y de Nosotros | `index.html`, secciones Portada y Nosotros. |
| Productos destacados | `index.html`, sección Productos destacados: cada `<article class="menu-item">`. |
| Título y descripción para Google | `index.html`, `<title>` y `<meta name="description">`. |
| Año del pie | Se pone solo con JavaScript. |

## Temas y colores

- **Cambiar de tema** ("pon la web de Navidad"): cambia solo la primera línea de `css/tema.css` a `@import url("temas/navidad.css");`. No toques nada más.
- **Volver a la web normal**: `@import url("temas/original.css");` y deja vacío el bloque `:root` de `css/tema.css`.
- **Temas disponibles**: `original`, `primavera`, `verano`, `otono`, `invierno`, `reyes`, `rebajas`, `san-valentin`, `dia-del-padre`, `pascua`, `dia-de-la-madre`, `vuelta-al-cole`, `halloween`, `black-friday`, `navidad`, `nochevieja`.
- **Cambiar un color concreto** ("pon los botones en rojo"): añádelo en el bloque `:root` de `css/tema.css` (por ejemplo, `--color-boton: #c62828;`). Manda sobre el tema.
- **No borres nunca** los comentarios ni el bloque de decoración de `css/tema.css`.

| Variable | Dónde se ve en esta web |
|---|---|
| `--color-primario` | Pie de página, etiquetas y enlaces de contacto, iconos, fondo de las tarjetas, scroll del carrusel |
| `--color-primario-oscuro` | Fondo del visor ampliado de la carta y de la portada mientras carga la foto |
| `--color-acento` | Antetítulos ("Qué gusto tenerte aquí"), palabra destacada de los títulos, subrayado de enlaces |
| `--color-detalle` | Marco detrás de la foto de Nosotros, categoría de las tarjetas, enlaces al pasar el ratón |
| `--color-fondo` / `--color-fondo-alterno` | Fondo de la página / bandas de Productos destacados y Contacto |
| `--color-superficie`, `--color-fondo-icono`, `--color-borde` | Páginas de la carta, botones redondos y pie de foto / fondo de los iconos sociales / su borde |
| `--color-boton`, `--color-boton-hover`, `--color-boton-activo`, `--color-boton-texto` | Botones "Cargar Google Maps" y "Aceptar cookies" |
| `--color-boton-destacado-hover`, `--color-boton-destacado-activo` | Botón "Descubre el menú" de la portada al pasar el ratón / al pulsarlo |
| `--color-texto-invertido` | Texto sobre fondos oscuros: portada, pie, tarjetas, visor y botones de WhatsApp |

Colores fijos que **no** cambian con los temas (en `css/style.css`): `--ink` (texto), `--muted` (texto secundario), `--brand-pink` (rosa del logo en "Maracaná") y `--whatsapp` (verde de WhatsApp).

## Carta y sugerencia del día

La carta y la sugerencia **no se editan en el HTML** ni con el comando `WEB`. Las gestionan los comandos `CARTA`, `CARTA ANTERIOR`, `SUGERENCIA` y `QUITAR SUGERENCIA`, que solo escriben en estos archivos:

| Archivo | Qué es |
|---|---|
| `data/carta.json` | Páginas de la carta (`paginas`), PDF opcional (`pdf`) y carta previa (`anterior`). |
| `data/sugerencia.json` | Sugerencia del día: `visible`, `imagenes`, `texto` y `pdf`. Con `"visible": false` la sección y su enlace del menú se ocultan. |
| `img/carta/AAAA-MM-DD/` | Imágenes de cada versión de la carta. |
| `img/sugerencia/AAAA-MM-DD/` | Imágenes de cada sugerencia. |

- `js/datos-web.js` pinta la carta en `[data-carta]` y lanza el evento `carta:lista`. `js/carta-libro.js` usa esas imágenes para el libro (dos páginas en escritorio, una en el móvil) y las deja como miniaturas.
- El contador de páginas (`[data-carta-contador]`) se calcula solo.
- La sugerencia no caduca: se queda hasta que el cliente mande otra o la quite.
