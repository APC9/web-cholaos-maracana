# Guía de edición: Cholaos Maracaná

Bar café venezolano en Estepona: desayunos, tapas venezolanas y comida venezolana por encargo. Los cholaos ya no se venden, pero el nombre "Cholaos Maracaná" se mantiene.

Web estática (HTML + CSS + JS, sin compilación) publicada en Netlify desde la raíz del repositorio. Léela antes de hacer cualquier cambio.

## Mapa de archivos

| Archivo | Qué contiene |
|---|---|
| `index.html` | Página principal. Todas las secciones están marcadas con `<!-- SECCIÓN: … -->` y `<!-- FIN SECCIÓN: … -->`. |
| `css/style.css` | Estilos de la web. Los colores y las tipografías están en variables en el `:root` del principio del archivo. |
| `css/tema.css` | Tema activo y colores personalizados. **Único archivo que se toca para temas y colores.** |
| `css/temas/*.css` | Un archivo por tema, solo con variables. No se editan. |
| `css/fonts/` | Tipografías alojadas en la web (Bricolage Grotesque y Figtree). No se editan. |
| `data/carta.json`, `data/sugerencia.json` | Carta y sugerencia del día. Los reescribe la automatización (ver abajo). |
| `js/datos-web.js` | Pinta la carta y la sugerencia a partir de los JSON. No se edita. |
| `js/carta-libro.js` | Convierte la carta en un libro: paso de página animado, miniaturas, deslizar con el dedo y visor ampliado. No se edita. |
| `favicon.ico`, `img/favicon/` | Icono de la pestaña y del acceso directo en el móvil, sacado de `img/logo.jpeg`. Enlazado en el `<head>` de las 4 páginas. |
| `img/web/` | Fotos de la web, ya optimizadas. Cada foto tiene dos tamaños: `<nombre>-1400.jpg` y `<nombre>-760.jpg`. Para cambiar una foto por otra, usa las de esta carpeta. |
| `img/` | Logo (`logo.jpeg`) y logo de Zihkon. `img/carta/` e `img/sugerencia/` son de la automatización. |
| `aviso-legal.html`, `politica-de-privacidad.html`, `politica-de-cookies.html` | Páginas legales, con su propio estilo `css/legal.css` y sin tema. |
| `css/fontawesome-free-6.2.0-web/` | Librería de iconos. No se edita. |
| `scss/`, `css/img/`, `css/general/`, `css/style.css.map` | Restos de una plantilla antigua. **No se usan**: no editar ni compilar `scss/` (sobrescribiría `css/style.css`). |
| `netlify.toml` | Configuración de Netlify. Protegido: no se toca. |

## Secciones de `index.html`

| Sección (comentario) | `id` | Qué hay |
|---|---|---|
| Menú de navegación | — | Logo, enlaces (Nosotros, La barra, Sugerencia, Carta, Encargos, Catering, Contacto) y botón "Cómo llegar". En el móvil se ocultan los enlaces con clase `nav-opcional` y `nav-movil-oculto`. |
| Portada | `#inicio` | Banner con el logo y el loro (`img/web/banner-1200.webp` y `banner-640.webp`, fondo transparente), antetítulo, titular `<h1>`, frase (`.hero-copy`), botones "Ver la carta" y "Hacer un encargo", y la foto `img/web/arepa-carne-mechada-*.jpg` con las rayas de la fachada. |
| Nosotros | `#nosotros` | Foto de la dueña (`img/web/duena-760.jpg`), titular y dos párrafos. |
| Productos destacados ("La barra") | `#productos-destacados` | Tres columnas, una por momento del día (`<article class="momento">`): foto, hora (`.momento-hora`), título y lista de productos (`.momento-lista`, un `<li>` por producto). |
| Sugerencia del día | `#sugerencia` | **No editar a mano**: ver "Carta y sugerencia del día". |
| Carta | `#menu` | **No editar a mano**: ver "Carta y sugerencia del día". |
| Encargos | `#encargos` | Comida por encargo: titular, texto, lista de productos que se pueden encargar (`.encargo-lista`, un `<li>` por producto), tres pasos (`.encargo-pasos`), botón de WhatsApp y foto de tostones. |
| Catering | `#catering` | Servicio de catering: titular, lista de menús (`.catering-menus`), páginas del menú de catering en fila deslizable (`.catering-paginas`, imágenes en `img/catering/2026-11-09/`), botón de presupuesto por WhatsApp y descarga del PDF (`menu-catering.pdf`). Para cambiar el menú, sustituye las imágenes y el PDF y actualiza las rutas en el HTML. |
| Contacto | `#contacto` | Dirección en grande, foto de la fachada, dirección, teléfono, WhatsApp, redes sociales, horario y mapa. |
| Visor ampliado de la carta | `#menu-viewer` | Ventana que amplía una página de la carta. |
| Pie de página | — | Rayas, logo, frase, enlaces legales y créditos. |
| Botón de WhatsApp y aviso de cookies | `#cookie-banner` | Botón flotante de WhatsApp y aviso de cookies. |

## Dónde está cada dato

| Dato | Dónde |
|---|---|
| Teléfono (662 102 911) | `index.html`, sección Contacto: `tel:+34662102911` y el texto visible. También en el bloque `application/ld+json` del `<head>`. |
| WhatsApp | `index.html`: enlaces `wa.me/34662102911` en la sección Contacto, en el botón de Encargos, en el botón de Catering **y** en el botón flotante (`.whatsapp-fab`). Cambia los cuatro. |
| Dirección (C. San Roque, 19, Loc 2, 29680 Estepona) | `index.html`, sección Contacto: título grande (`.direccion-grande`), texto, enlace "Cómo llegar" y `data-src` del mapa. También en el `application/ld+json` del `<head>`. |
| Horario | `index.html`, sección Contacto, `#horario`. Si cambia, cambia también `openingHoursSpecification` en el `application/ld+json` del `<head>` y la hora "desde las 11:00" de la portada y la del primer bloque de "La barra". |
| Redes sociales y perfil de Google | `index.html`, sección Contacto, `.social-links`. |
| Textos de la portada y de Nosotros | `index.html`, secciones Portada y Nosotros. |
| Productos de "La barra" | `index.html`, sección Productos destacados: la lista `.momento-lista` de cada momento. |
| Productos por encargo | `index.html`, sección Encargos: la lista `.encargo-lista`. |
| Título y descripción para Google | `index.html`, `<title>` y `<meta name="description">`. |
| Año del pie | Se pone solo con JavaScript. |

## Tipografías

- Títulos: **Bricolage Grotesque** (`--display`). Texto: **Figtree** (`--sans`). Están en `css/fonts/` y se cargan siempre, sin depender de las cookies.
- Para cambiar la tipografía de los títulos o del texto, cambia `--display` o `--sans` en el `:root` de `css/style.css`. Una fuente nueva hay que añadirla primero a `css/fonts/` con su `@font-face`.

## Temas y colores

- **Cambiar de tema** ("pon la web de Navidad"): cambia solo la primera línea de `css/tema.css` a `@import url("temas/navidad.css");`. No toques nada más.
- **Volver a la web normal**: `@import url("temas/original.css");` y deja vacío el bloque `:root` de `css/tema.css`.
- **Temas disponibles**: `original`, `primavera`, `verano`, `otono`, `invierno`, `reyes`, `rebajas`, `san-valentin`, `dia-del-padre`, `pascua`, `dia-de-la-madre`, `vuelta-al-cole`, `halloween`, `black-friday`, `navidad`, `nochevieja`.
- **Cambiar un color concreto** ("pon los botones en rojo"): añádelo en el bloque `:root` de `css/tema.css` (por ejemplo, `--color-boton: #c62828;`). Manda sobre el tema.
- **No borres nunca** los comentarios ni el bloque de decoración de `css/tema.css`.
- **Cambiar solo el texto de la franja de anuncio** ("pon en el anuncio: Hallacas por encargo hasta el 20 de diciembre"): añade `--tema-anuncio: "Hallacas por encargo hasta el 20 de diciembre";` en el bloque `:root` de `css/tema.css`. Se quita borrando esa línea. Con el tema `original` no hay franja.

### Qué cambia cada tema de temporada

Los temas no usan emojis. Cada tema (salvo `original`) pone:

- **Franja de anuncio** bajo el menú, con icono, que enlaza a la sección Encargos (`<a class="tema-anuncio">` en `index.html`; no se edita a mano).
- **Sello circular** sobre la foto de la portada con el nombre de la fiesta y "Maracaná".
- **Bandas con el motivo del tema** en lugar de las rayas rosa y lima (portada, Encargos y pie).
- **Icono grande** junto a la dirección, en la sección Contacto.
- Su **paleta de colores**, con contraste comprobado (mínimo 4.5:1).

Las ilustraciones están en `img/temas/<nombre>/` (`sello.svg`, `icono.svg`, `banda.svg`, `banda-v.svg`) y no se editan a mano. Variables de decoración de cada archivo de `css/temas/`: `--tema-activo`, `--tema-anuncio`, `--tema-anuncio-fondo`, `--tema-anuncio-texto`, `--tema-sello`, `--tema-icono`, `--tema-banda`, `--tema-banda-vertical` y `--tema-banda-alto`.

| Variable | Dónde se ve en esta web |
|---|---|
| `--color-primario` | Etiquetas de contacto, iconos sociales, enlaces "Cómo llegar" y "Abrir en Google Maps" |
| `--color-primario-oscuro` | Fondo de la sección Encargos, del pie, del marco del libro de la carta, del recuadro de la sugerencia y del visor ampliado |
| `--color-acento` | Antetítulos, palabra destacada del titular, horas de "La barra", **rayas de la fachada** (color 1), subrayados del menú |
| `--color-detalle` | **Rayas de la fachada** (color 2), botón "Encargar por WhatsApp", números de los pasos de Encargos, antetítulo de Encargos |
| `--color-fondo` / `--color-fondo-alterno` | Fondo de la página y del menú / bandas de "La barra" y Contacto |
| `--color-superficie`, `--color-fondo-icono`, `--color-borde` | Páginas de la carta / fondo de los iconos sociales / líneas finas, bordes y separadores |
| `--color-boton`, `--color-boton-hover`, `--color-boton-activo`, `--color-boton-texto` | Botones "Ver la carta", "Cargar Google Maps" y "Aceptar cookies" |
| `--color-boton-destacado-hover`, `--color-boton-destacado-activo` | Botón "Encargar por WhatsApp" al pulsarlo |
| `--color-texto-invertido` | Texto sobre fondos oscuros: Encargos, pie, visor y recuadro de la sugerencia |

Colores fijos que **no** cambian con los temas (en `css/style.css`): `--ink` (texto), `--muted` (texto secundario), `--brand-pink` (rosa del logo) y `--whatsapp` (verde de WhatsApp).

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
