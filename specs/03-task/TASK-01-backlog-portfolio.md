# TASK-01: Backlog de Tareas y Criterios de Aceptación (DoD)

- **Proyecto:** Portfolio Profesional Web — Carlos Lara Albir
- **Fase SDD:** `03-task`
- **Estado:** Backlog Aprobado para Implementación
- **Fecha:** 2026-10-14
- **Autor:** Agente Tasker (`tasker`)
- **Revisor:** Carlos Lara Albir
- **Referencias:** `specs/01-analisis/SPEC-01-analisis-portfolio.md` y `specs/02-plan/PLAN-01-arquitectura-portfolio.md`
- **Rama de Trabajo:** `preview`

---

## 1. Definición de Terminado (Definition of Done - DoD)
Cada tarea atómica se considerará completa únicamente cuando:
1. **Código limpio y tipado estricto:** TypeScript compilando sin errores (`tsc --noEmit`), sin dependencias superfluas.
2. **Mandato TDD y Pruebas Unitarias Automatizadas:** Todo módulo TypeScript, lógica de interactividad o manipulación de estado debe contar con pruebas unitarias en `tests/*.test.ts` con Vitest desarrolladas bajo el ciclo TDD (Red -> Green -> Refactor), pasando al 100% con `npm test`.
3. **Accesibilidad Semántica:** Estructura HTML5 con contraste verificado, estados focus visibles y atributos ARIA donde aplique (WCAG 2.1 AA/AAA).
4. **Multi-idioma e i18n:** Todas las cadenas de texto extraídas a los tres diccionarios (`es.json`, `en.json`, `va.json`).
5. **Respeto a Temas:** Soporte para modo Claro (predeterminado) y Oscuro, sin parpadeos ni fondos opacos.
6. **Rendimiento:** Animaciones a 60 FPS con respeto estricto a `prefers-reduced-motion`.
7. **Verificación Cloudflare:** Build exitoso en `./dist` compatible con `wrangler.jsonc` (`npm run build`).
8. **Regla Git:** En rama `preview` el agente tiene autorización para commit y push tras validar pruebas y build; en rama `main` queda estrictamente prohibido sin consentimiento previo explícito de Carlos Lara Albir.

---

## 2. Paquetes de Trabajo (Work Packages) y Tareas Atómicas

### WP1: Configuración del Entorno de Construcción y Cloudflare
- [ ] **TASK-1.1: Configuración de Vite, TypeScript y Scripts**
  - Instalar `vite` y `typescript` como devDependencies.
  - Crear `tsconfig.json` con configuración estricta.
  - Actualizar `package.json` con scripts: `"dev": "vite"`, `"build": "vite build"`, `"preview": "wrangler dev"`.
  - **AC:** `npm run build` genera la salida compilada en `./dist`.

- [ ] **TASK-1.2: Ajuste de Configuración Cloudflare (`wrangler.jsonc`)**
  - Configurar `wrangler.jsonc` para servir los assets desde `./dist`.
  - Configurar copia de `public/_headers`, `public/_redirects` y `public/robots.txt` a `./dist`.
  - **AC:** `npx wrangler deploy --dry-run` lee correctamente el directorio `./dist`.

---

### WP2: Arquitectura de Estilos, Temas y Layout One-Page
- [x] **TASK-2.1: Sistema de Tokens CSS y Modo Claro (Predeterminado) / Oscuro**
  - Crear `src/styles/themes.css` con variables CSS para paleta técnica moderna (Teal/Cyan `#00bba7`, fondos claros `#ffffff` / oscuros `#111113`, bordes y sombras con blur).
  - Configurar reglas CSS para `:root`, `[data-theme="light"]` (default) y `[data-theme="dark"]`.
  - **AC:** Cambio instantáneo de colores mediante el atributo `data-theme` con tema claro predeterminado.

- [x] **TASK-2.2: Módulo Theme Switcher con Persistencia (`theme-switcher.ts`)**
  - Implementar lógica de alternancia binaria entre `light` (predeterminado) y `dark`.
  - Eliminar la opción "Sistema" del selector para garantizar una experiencia visual clara y consistente.
  - Script bloqueante en `<head>` para leer `localStorage.getItem('user_theme')` y evitar FOUC.
  - **AC:** Al recargar la página se conserva el tema elegido; por defecto inicia en `light`.

- [ ] **TASK-2.3: Esqueleto Semántico One-Page en `index.html`**
  - Maquetar la estructura HTML5 con `header`, `main` con sus secciones (`#hero`, `#metrics`, `#ai-sdd`, `#projects`, `#experience`, `#skills`, `#education`, `#contact`) y `footer`.
  - **AC:** Navegación por anclas con scroll suave (*smooth scroll*).

---

### WP3: Sistema de Internacionalización (i18n: ES / EN / VA)
- [ ] **TASK-3.1: Diccionarios de Traducción (`es.json`, `en.json`, `va.json`)**
  - Redactar todos los contenidos y textos en los 3 idiomas (Español, Inglés y Valenciano).
  - Incluir todos los títulos, subtítulos, métricas, descripciones de proyectos, biografía y llamadas a la acción.
  - **AC:** Cobertura del 100% de las cadenas visibles en los tres archivos.

- [ ] **TASK-3.2: Motor de Traducción Reactivo (`engine.ts`)**
  - Crear motor que itere sobre elementos con `data-i18n="clave"` y actualice `textContent` o `placeholder`.
  - Lógica de fallback: si no hay preferencia en `localStorage`, detectar navegador (`navigator.language`). Si es español (`es`) usar `es`; si es catalán/valenciano (`ca` / `va` / `ca-ES`) usar `va`; si no se detecta o es cualquier otro idioma, usar **Inglés (`en`) por defecto**.
  - Guardar preferencia en `localStorage.getItem('user_lang')`.
  - **AC:** Al seleccionar otro idioma, todos los textos se actualizan de inmediato sin recarga; fallback por defecto comprobado en inglés.

- [ ] **TASK-3.3: Componente Selector de Idioma en la Barra de Navegación**
  - Dropdown o grupo de botones accesible con indicador visual del idioma activo (`EN`, `ES`, `VA`).
  - **AC:** Accesible mediante teclado (`Tab` y `Enter`).

---

### WP4: Experiencia Visual, Fondo 2D/3D y Avatar Sin Foto
- [ ] **TASK-4.1: Fondo Interactivo de Nodos y Eventos (`canvas-background.ts`)**
  - Implementar canvas 2D/3D a pantalla completa que dibuja una red de microservicios/eventos flotantes conectados por líneas de pulso.
  - Reacción suave a la posición del ratón.
  - Apagado cuando `prefers-reduced-motion` está activo o cuando la pestaña no es visible (`visibilitychange`).
  - **AC:** Rendimiento constante a 60 FPS sin bloquear el scroll.

- [ ] **TASK-4.2: Componente `TechAvatar` para Versión Inicial Sin Foto (`tech-avatar.ts`)**
  - Renderizar en canvas interactivo un poliedro geométrico 3D con halo neón y el monograma `CLA` en el centro.
  - Interacción de rotación tridimensional según el cursor (*tilt*).
  - Envoltorio CSS `.hero-avatar-wrapper` preparado para admitir `<img>` tan pronto como se disponga de la foto real.
  - **AC:** Se visualiza con acabado futurista premium sin sensación de elemento incompleto.

- [ ] **TASK-4.3: Animaciones de Scroll y Contadores Numéricos (`counter-animator.ts`)**
  - Utilizar `IntersectionObserver` para disparar animaciones al entrar en viewport.
  - Contador ascendente para las cifras clave (341 PRs, 211 empresas, etc.).
  - **AC:** Las cifras cuentan fluidamente una sola vez al visualizarse.

---

### WP5: Implementación de Secciones y Contenido
- [ ] **TASK-5.1: Barra de Navegación (`Navbar`) con Scrollspy y Glassmorphism**
  - Menú fijo superior con efecto desenfoque (*backdrop-filter*).
  - Selector de tema (2 estados: Claro / Oscuro), selector de idioma (ES/EN/VA) y enlace al repositorio de GitHub.
  - Menú hamburguesa accesible para dispositivos móviles.
  - **AC:** Responsive impecable y resalta la sección activa al hacer scroll.

- [ ] **TASK-5.2: Sección Hero y Meta-Callout "100% IA + SDD"**
  - Titular principal, subtítulo de posicionamiento, botones CTA ("Ver Proyectos", "Contactar", "Descargar CV").
  - Inserción del componente `TechAvatar`.
  - Banner interactivo con badge brillante:
    *"Desarrollado al 100% con IA Agéntica & SDD. Inspecciona el repo en GitHub ➔"*.
  - **AC:** Enlace funcional al repositorio y diseño que atrapa la atención en los primeros 3 segundos.

- [ ] **TASK-5.3: Modal Explicativo del Flujo SDD**
  - Diálogo modal accesible (`<dialog>`) al pulsar en el callout de IA, mostrando el esquema de las 4 fases y enlaces a `specs/`.
  - **AC:** Se abre con animación suave y se puede cerrar con botón o tecla `Escape`.

- [ ] **TASK-5.4: Grid de Métricas Auditadas (`MetricsGrid`)**
  - 5 tarjetas interactivas: 341 PRs mergeadas, 0 reverts, 211 empresas migradas en 11 días, 27 usuarios activos de OPS, 25+ herramientas MCP.
  - **AC:** Contadores animados y microinteracción hover.

- [ ] **TASK-5.5: Sección de Ingeniería con IA (`AiEngineering`)**
  - 4 bloques interactivos detallando:
    1. Claude Code con skills y guardarraíles.
    2. Servidor propio MCP de diagnóstico con arquitectura hexagonal.
    3. Metodología Spec-Driven Development (SDD) rigurosa.
    4. Estimación ágil calibrada en Story Points.
  - **AC:** Contenido técnico claro con diagramas visuales en CSS.

- [ ] **TASK-5.6: Showcase de Casos de Estudio (`ProjectsShowcase`)**
  - Tarjetas de los 4 proyectos destacados (MCP, Fixeador de periodos, Conectividad OTAs en Tiempo Real, Ingesta Big Data).
  - Estructura *Problema → Solución Técnica → Impacto en Negocio*.
  - Filtro por categoría tecnológica.
  - **AC:** Visualización limpia y tipada con etiquetas de stack.

- [ ] **TASK-5.7: Línea Temporal de Trayectoria (`ExperienceTimeline`) y Matriz de Habilidades (`SkillsMatrix`)**
  - Timeline vertical interactivo desde Avantio (2018-hoy) hasta 2006.
  - Píldoras de habilidades categorizadas (Backend, IA, Cloud, Datos, Arquitectura).
  - **AC:** Visualización clara de 20 años de evolución técnica.

- [ ] **TASK-5.8: Formación, Liderazgo (`EducationSection`) y Contacto (`ContactSection`)**
  - Especialización IA/Big Data, Ingeniería Informática UPV, y el bloque de liderazgo en Tiro con Arco (Campeón Universitario).
  - Botón para copiar email al portapapeles con confirmación visual (*toast*), enlace a LinkedIn, teléfono y descarga de CV.
  - **AC:** Fácil contacto en 1 clic.

- [ ] **TASK-5.9: Pie de Página (`Footer`)**
  - Copyright, enlaces a redes, mención al hosting en Cloudflare Edge y enlace a la auditoría del repositorio.

- [ ] **TASK-5.10: Estética Nerd-Tech, Terminal Telemetry y Console Easter Egg**
  - Barra de telemetría superior estilo CLI con estado de red en tiempo real.
  - Tipografía monoespaciada en chips de tecnologías, métricas y prompt markers (`$`).
  - Script con Easter Egg en `console.log` con ASCII art y mensaje para reclutadores técnicos / CTOs.
  - Trama sutil de cuadrícula cibernética/blueprint en fondos tecnológicos.
  - **AC:** Al abrir DevTools (`F12`) se muestra el mensaje técnico; la barra de telemetría y elementos CLI transmiten inequívocamente la estética hacker/ingeniero.

---

### WP6: Auditoría de Calidad, Responsive y Despliegue en Cloudflare
- [ ] **TASK-6.1: Auditoría de Accesibilidad (a11y) y Core Web Vitals**
  - Verificación de contraste de color en temas claro y oscuro.
  - Verificación de navegación por teclado en todos los elementos interactivos.
  - Medición de rendimiento (LCP < 1.2s, CLS < 0.05).
  - **AC:** Lighthouse > 95 en todas las métricas.

- [ ] **TASK-6.2: Verificación Multi-pantalla**
  - Prueba en resoluciones móviles (320px, 375px, 414px), tablets (768px, 1024px) y pantallas de escritorio.
  - **AC:** Ningún desbordamiento horizontal ni elementos rotos.

- [ ] **TASK-6.3: Validación del Build y Despliegue en Cloudflare (Rama `preview`)**
  - Ejecución de `npm run build` y comprobación de salida en `./dist`.
  - Prueba con emulador de Cloudflare (`npx wrangler dev`).
  - **AC:** Despliegue listo para validación por Carlos Lara Albir.

---

### WP7: Optimización Integral para Bots de IA de Reclutamiento y ATS (Machine-Readable CV)
- [x] **TASK-7.1: Estándar Abierto `llms.txt` y `llms-full.txt` (llmstxt.org)**
  - Crear `public/llms.txt` como índice de resumen ejecutivo con directivas ATS (roles objetivo IC5/IC6, experiencia desglosada, stack y enlaces).
  - Crear `public/llms-full.txt` con el Curriculum Vitae íntegro en Markdown limpio, bloque de metadatos de cribado rápido, tabla de taxonomía y estructura CAR/STAR con métricas en negrita.
  - **AC:** Ambos archivos son accesibles vía HTTP en la raíz del dominio y conformes a llmstxt.org.

- [x] **TASK-7.2: Endpoint Directo en Markdown (`/cv.md`) y Enlaces en la UI**
  - Exponer `/cv.md` en `public/` para acceso directo y sin procesar a la versión completa del CV.
  - Integrar botón accesible en la sección de contacto (`CV Markdown (AI/ATS) ↗`) y enlaces directos en el footer.
  - **AC:** Acceso en 1 clic desde el navegador y descarga limpia para parsers ATS.

- [x] **TASK-7.3: Grafo Semántico Schema.org (JSON-LD en `<head>`)**
  - Integrar script `application/ld+json` con tipos `Person` y `ProfilePage`.
  - Enriquecer con código ocupacional O*NET (`15-1252.00`), idiomas ISO (`es`, `en`, `ca`), nacionalidad, dirección postal, ocupaciones objetivo, competencias (`knowsAbout`), educación (`alumniOf`) y empresa (`worksFor`).
  - Declarar etiquetas `<link rel="alternate" type="text/markdown">` para `llms.txt`, `llms-full.txt` y `cv.md`.
  - **AC:** Validación de datos estructurados Schema.org sin errores de sintaxis.

- [x] **TASK-7.4: Configuración de Cabeceras HTTP y Robots (`_headers` y `robots.txt`)**
  - Configurar en `public/_headers` las cabeceras `Content-Type: text/markdown; charset=utf-8` y `text/plain; charset=utf-8` con `Cache-Control: public, max-age=3600`.
  - Actualizar `public/robots.txt` declarando explícitamente los recursos machine-readable para crawlers de IA.
  - **AC:** Verificación mediante `curl -I` retornando 200 OK y tipos MIME correctos.


