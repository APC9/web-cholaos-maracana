// Carta en forma de libro: pasa páginas con animación, miniaturas y visor ampliado.
// js/datos-web.js mete en [data-carta] las imágenes de data/carta.json y lanza 'carta:lista'.
// En escritorio se ven dos páginas (libro abierto); en el móvil, una.
(() => {
     const libro = document.querySelector('.carta-libro');
     if (!libro) return;
     const escena = libro.querySelector('.carta-escena');
     const hojaIzq = escena.querySelector('.carta-hoja-izq');
     const hojaDer = escena.querySelector('.carta-hoja-der');
     const indicador = document.querySelector('.carta-indicador');
     const miniaturas = document.querySelector('[data-carta]');
     const anterior = document.querySelector('[data-pagina="-1"]');
     const siguiente = document.querySelector('[data-pagina="1"]');
     const viewer = document.querySelector('#menu-viewer');
     const viewerImage = viewer.querySelector('.viewer-image');
     const viewerCount = viewer.querySelector('.viewer-count');
     const doble = window.matchMedia('(min-width: 900px)');
     const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)');
     let paginas = [];
     let actual = 0;
     let girando = false;
     let paginaVisor = 0;

     const paso = () => (doble.matches ? 2 : 1);
     const inicioDe = (i) => (doble.matches ? i - (i % 2) : i);

     const pintarHoja = (hoja, i) => {
          const img = hoja.querySelector('img');
          const pagina = paginas[i];
          hoja.disabled = !pagina;
          hoja.dataset.indice = pagina ? i : '';
          if (pagina) {
               img.src = pagina.src;
               hoja.setAttribute('aria-label', `Ampliar página ${i + 1} de ${paginas.length}`);
          } else {
               img.removeAttribute('src');
               hoja.removeAttribute('aria-label');
          }
     };

     const pintarEstado = () => {
          const total = paginas.length;
          const ultima = Math.min(actual + paso(), total);
          indicador.textContent = !total ? '' : ultima - actual > 1 ? `Páginas ${actual + 1}–${ultima} de ${total}` : `Página ${actual + 1} de ${total}`;
          anterior.disabled = actual === 0;
          siguiente.disabled = actual + paso() >= total;
          miniaturas.querySelectorAll('.menu-page-open').forEach((boton, i) => {
               const visible = i >= actual && i < actual + paso();
               boton.classList.toggle('es-actual', visible);
               if (visible) boton.setAttribute('aria-current', 'page');
               else boton.removeAttribute('aria-current');
          });
     };

     const pintar = () => {
          libro.classList.toggle('es-doble', doble.matches);
          hojaDer.hidden = !doble.matches;
          pintarHoja(hojaIzq, actual);
          if (doble.matches) pintarHoja(hojaDer, actual + 1);
          pintarEstado();
     };

     // Hoja que gira: "frente" es la página que se ve al empezar y "dorso" la que aparece al terminar.
     const crearGiro = (clase, frente, dorso) => {
          const giro = document.createElement('div');
          giro.className = `carta-giro ${clase}`;
          [['frente', frente], ['dorso', dorso]].forEach(([cara, i]) => {
               if (i === null) return;
               const div = document.createElement('div');
               div.className = `carta-cara carta-cara-${cara}`;
               if (paginas[i]) div.append(Object.assign(document.createElement('img'), { src: paginas[i].src, alt: '' }));
               giro.append(div);
          });
          escena.append(giro);
          return giro;
     };

     const ir = (destino, animar = true) => {
          if (!paginas.length || girando) return;
          destino = inicioDe(Math.max(0, Math.min(destino, paginas.length - 1)));
          if (destino === actual) return;
          const desde = actual;
          const adelante = destino > desde;
          actual = destino;
          if (!animar || sinMovimiento.matches) {
               pintar();
               // Si el visitante pide menos movimiento, un fundido suave en lugar del giro.
               if (animar) escena.animate([{ opacity: 0.35 }, { opacity: 1 }], { duration: 250, easing: 'ease-out' });
               return;
          }
          girando = true;
          let giro;
          let angulos;
          if (doble.matches && adelante) {
               giro = crearGiro('carta-giro-der', desde + 1, destino);
               pintarHoja(hojaDer, destino + 1);
               angulos = ['0deg', '-180deg'];
          } else if (doble.matches) {
               giro = crearGiro('carta-giro-izq', desde, destino + 1);
               pintarHoja(hojaIzq, destino);
               angulos = ['0deg', '180deg'];
          } else if (adelante) {
               giro = crearGiro('carta-giro-unica', desde, null);
               pintarHoja(hojaIzq, destino);
               angulos = ['0deg', '-180deg'];
          } else {
               giro = crearGiro('carta-giro-unica', destino, null);
               angulos = ['-180deg', '0deg'];
          }
          pintarEstado();
          const animacion = giro.animate(
               [{ transform: `rotateY(${angulos[0]})` }, { transform: `rotateY(${angulos[1]})` }],
               { duration: 850, easing: 'cubic-bezier(.45, .05, .3, 1)' },
          );
          animacion.onfinish = animacion.oncancel = () => {
               pintar();
               giro.remove();
               girando = false;
          };
     };

     anterior.addEventListener('click', () => ir(actual - paso()));
     siguiente.addEventListener('click', () => ir(actual + paso()));
     escena.addEventListener('keydown', (event) => {
          if (event.key === 'ArrowLeft') ir(actual - paso());
          if (event.key === 'ArrowRight') ir(actual + paso());
     });

     // Deslizar con el dedo para pasar página.
     let inicioX = null;
     let deslizado = false;
     escena.addEventListener('pointerdown', (event) => {
          inicioX = event.clientX;
          deslizado = false;
     });
     escena.addEventListener('pointerup', (event) => {
          if (inicioX === null) return;
          const distancia = event.clientX - inicioX;
          inicioX = null;
          if (Math.abs(distancia) < 40) return;
          deslizado = true;
          ir(actual + (distancia < 0 ? paso() : -paso()));
     });
     escena.addEventListener('pointercancel', () => { inicioX = null; });

     // Visor ampliado.
     const mostrarEnVisor = (i) => {
          paginaVisor = (i + paginas.length) % paginas.length;
          viewerImage.src = paginas[paginaVisor].src;
          viewerImage.alt = `Carta, página ${paginaVisor + 1} de ${paginas.length}`;
          viewerCount.textContent = `Página ${paginaVisor + 1} de ${paginas.length}`;
     };
     [hojaIzq, hojaDer].forEach((hoja) => {
          hoja.addEventListener('click', () => {
               if (deslizado || hoja.dataset.indice === '') return;
               mostrarEnVisor(Number(hoja.dataset.indice));
               viewer.showModal();
          });
     });
     viewer.querySelector('.viewer-close').addEventListener('click', () => viewer.close());
     viewer.querySelectorAll('[data-view]').forEach((boton) => {
          boton.addEventListener('click', () => mostrarEnVisor(paginaVisor + Number(boton.dataset.view)));
     });
     viewer.addEventListener('click', (event) => {
          if (event.target === viewer) viewer.close();
     });
     viewer.addEventListener('keydown', (event) => {
          if (event.key === 'Escape') {
               event.preventDefault();
               viewer.close();
          }
          if (event.key === 'ArrowLeft') mostrarEnVisor(paginaVisor - 1);
          if (event.key === 'ArrowRight') mostrarEnVisor(paginaVisor + 1);
     });
     // Al cerrar el visor, el libro se queda abierto por la página que se estaba mirando.
     viewer.addEventListener('close', () => ir(paginaVisor, false));

     document.addEventListener('carta:lista', () => {
          const imagenes = [...miniaturas.querySelectorAll(':scope > img')];
          paginas = imagenes.map((img) => ({ src: img.src }));
          miniaturas.replaceChildren(...imagenes.map((img, i) => {
               const slide = document.createElement('div');
               const boton = document.createElement('button');
               const etiqueta = document.createElement('span');
               slide.className = 'menu-page-slide';
               boton.className = 'menu-page-open';
               boton.type = 'button';
               boton.setAttribute('aria-label', `Ir a la página ${i + 1}`);
               boton.addEventListener('click', () => ir(i));
               img.alt = '';
               boton.append(img);
               etiqueta.className = 'menu-page-label';
               etiqueta.textContent = String(i + 1).padStart(2, '0');
               etiqueta.setAttribute('aria-hidden', 'true');
               slide.append(boton, etiqueta);
               return slide;
          }));
          actual = 0;
          pintar();
     });
     doble.addEventListener('change', () => {
          actual = inicioDe(actual);
          pintar();
     });
     pintar();
})();
