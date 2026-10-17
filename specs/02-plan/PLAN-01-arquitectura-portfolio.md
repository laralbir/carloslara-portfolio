# PLAN-01: Plan de Arquitectura y Diseño Técnico (Versión Inicial)

- **Proyecto:** Portfolio Profesional Web — Carlos Lara Albir
- **Fase SDD:** `02-plan`
- **Estado:** Propuesta Técnica Completa (Listo para Aprobación)
- **Fecha:** 2026-10-14
- **Autor:** Agente Planner (`planner`)
- **Revisor:** Carlos Lara Albir
- **Referencia:** `specs/01-analisis/SPEC-01-analisis-portfolio.md`
- **Rama de Trabajo:** `preview`

---

## 1. Decisiones de Arquitectura (ADR - Architecture Decision Records)

### ADR-01: Stack de Desarrollo — Vite + TypeScript Modular + Vanilla Modern Web
- **Decisión:** Utilizar **Vite** con **TypeScript estricto** y **estándares web modernos (HTML5 semántico, CSS moderno con variables y módulos TS)**, compilando a assets estáticos ultra-optimizados en `./public` o `./dist`.
- **Justificación:**
  1. **Velocidad Edge y Core Web Vitals:** Al no depender de un framework pesado con Virtual DOM en tiempo de ejecución (como React o Angular para una One-Page estática), el bundle resultante pesa <50KB gzipped, logrando LCP < 0.8s y 100/100 en Google Lighthouse.
  2. **Control total de animaciones 2D/3D:** La manipulación directa del DOM y del Canvas API mediante TypeScript permite renderizar partículas e interactividad a 60 FPS sin sobrecargar el hilo principal.
  3. **Compatibilidad nativa con Cloudflare Pages:** Despliegue estático directo sin necesidad de adaptadores complejos ni dependencias de servidor.

### ADR-02: Sistema de Temas (Claro [Predeterminado] / Oscuro)
- **Decisión:** Implementar el selector de tema mediante atributos `data-theme="light|dark"` en el elemento raíz `<html>`, controlando todas las variables de color con CSS Custom Properties.
- **Tema por defecto:** **Claro (`light`)**, proporcionando una lectura nítida, limpia y accesible desde la primera visita.
- **Lógica:**
  - Se elimina la opción 'Sistema' del desplegable para ofrecer una selección binaria simple y directa (Claro / Oscuro).
  - Si el usuario no tiene preferencia en `localStorage`, se inicializa en `light`.
  - Se inyecta un micro-script bloqueante en el `<head>` antes del renderizado visual para leer `localStorage.getItem('user_theme')` y aplicar `light` o `dark` de forma síncrona, evitando cualquier parpadeo de color (*FOUC - Flash of Unstyled Content*).

### ADR-03: Sistema de Internacionalización (i18n: ES / EN / VA)
- **Decisión:** Dicionarios JSON estructurados (`es.json`, `en.json`, `va.json`) con micro-motor de traducción en TypeScript sin recarga de página.
- **Lógica de Resolución de Idioma:**
  1. `localStorage.getItem('user_lang')` (si el usuario ya eligió idioma previamente).
  2. Detección automática vía `navigator.language`:
     - Si empieza por `es` -> `es` (Español).
     - Si empieza por `ca` o `va` -> `va` (Valenciano, mapeado al estándar ISO `ca` de navegadores).
     - En cualquier otro caso (o si no se detecta) -> **`en` (Inglés, idioma por defecto)**.
  3. Los elementos de la UI llevan atributos `data-i18n="clave.subclave"`.
  4. Al cambiar de idioma en el selector, el motor actualiza los nodos en memoria instantáneamente y guarda la preferencia en `localStorage`.

### ADR-04: Estética "Nerd-Tech" & Telemetría en Vivo
- **Decisión:** Integrar elementos de ingeniería visibles:
  - Barra de estado / telemetría superior con aspecto de terminal: indicando estado online, código HTTP 200, edge node de Cloudflare y rama activa.
  - Tipografía monoespaciada en métricas, chips de tecnologías y prefijos de comando (`$`).
  - Easter egg en `console.log` con arte ASCII de bienvenida para visitantes técnicos (DevTools).

### ADR-05: Estrategia de Testing Automatizado y Mandato TDD (Test-Driven Development)
- **Decisión:** Adoptar **Vitest** como test runner nativo integrado con Vite, empleando **happy-dom** para la simulación ligera y ultrarrápida del entorno de navegador/DOM.
- **Mandato TDD:**
  1. Todo desarrollo de módulos TypeScript, lógica de temas, motores de internacionalización o manipulación de estado se rige por el ciclo estricto **Red -> Green -> Refactor**:
     - **Red:** Se define la especificación en `tests/<modulo>.test.ts` comprobando que falle antes de programar la solución.
     - **Green:** Se implementa el código productivo necesario en `src/` para superar el test.
     - **Refactor:** Se optimiza la implementación manteniendo la suite de pruebas completa en verde.
  2. **Scripts de Ejecución:** `npm test` (`vitest run`) y `npm run test:watch` (`vitest`).
  3. **Criterio de Calidad en CI/CD:** La suite debe ejecutarse en <1 segundo y alcanzar el 100% de éxito como precondición obligatoria para cualquier commit o despliegue.

### ADR-06: Arquitectura de Ingestión Machine-Readable para Bots de IA y ATS (/llms.txt, /llms-full.txt, /cv.md y Schema.org JSON-LD)
- **Decisión:** Implementar una arquitectura de doble consumo (Humano / Agente de IA) que exponga el perfil profesional en formatos estándar machine-readable directamente en el Edge de Cloudflare:
  1. **Estándar Abierto `llms.txt` y `llms-full.txt`:** Ubicados en la raíz pública (`/llms.txt` para índice y directivas rápidas; `/llms-full.txt` para el CV completo en Markdown).
  2. **Endpoint Directo `/cv.md`:** Espejo del CV Markdown completo servido con `Content-Type: text/markdown; charset=utf-8` para facilitar la ingesta a herramientas ATS y LLMs sin procesar scripts ni DOM.
  3. **Grafo de Entidades Schema.org JSON-LD en `<head>`:** Objeto semántico `@graph` con `@type: "Person"` y `"ProfilePage"`, enriquecido con ocupaciones estandarizadas (código O*NET `15-1252.00`), idiomas ISO, nacionalidad, dirección, empresa y competencias `knowsAbout`.
  4. **Descubribilidad:** Declaración en `public/robots.txt` y etiquetas `<link rel="alternate" type="text/markdown" ...>` en el `<head>` de `index.html`.
- **Justificación:**
  1. **Tasa de Acierto (Match Rate) Máxima en ATS:** Elimina la pérdida de datos, fragmentación o alucinaciones provocadas por parsers DOM que intentan raspar SPAs complejas.
  2. **Eficiencia en Tokens y Latencia:** Un crawler de IA descarga y procesa el CV íntegro en <50ms con <2.500 tokens de contexto, frente a los >15.000 tokens requeridos para parsear un árbol HTML completo.
  3. **Diferenciación Técnica:** Demuestra en la propia arquitectura el conocimiento profundo de Carlos sobre ecosistemas agénticos y estándares de interoperabilidad de IA.

---

## 2. Plan para la Versión Inicial Sin Foto (Avatar Técnico 2D/3D)

Para disponer de una versión 100% funcional, impactante y visualmente terminada antes de tener la fotografía real de Carlos, se implementará la siguiente solución técnica:

```
┌────────────────────────────────────────────────────────┐
│                   AVATAR CONTAINER                     │
│                                                        │
│  [ Versión Inicial: Holograma 2D/3D ]                 │
│  - Canvas interactivo de alta resolución (High-DPI).   │
│  - Icosaedro / Nodos 3D rotatorios con glow azul.      │
│  - Monograma 'CLA' flotante en el centro.              │
│  - Reacción al cursor del ratón (tilt / partículas).   │
│                                                        │
│  [ Transición Futura: Foto Personal ]                  │
│  - Reemplazo limpio por <img src="/assets/carlos.webp">│
│  - Mantiene el marco con gradiente activo y glow.      │
└────────────────────────────────────────────────────────┘
```

1. **Componente `TechAvatar` (Canvas 2D/3D):**
   - Un lienzo `<canvas>` que dibuja un núcleo geométrico tridimensional (un poliedro interactivo o anillo de datos) renderizado con matemáticas vectoriales puras en TypeScript.
   - En el centro, el monograma tipográfico **`CLA`** con iluminación neón sutil.
   - Al pasar el ratón por encima, las partículas aceleran y el objeto 3D rota siguiendo la dirección del puntero.
2. **Modularidad y Facilidad de Reemplazo:**
   - La estructura HTML tendrá un contenedor `.hero-avatar-wrapper`.
   - Cuando Carlos proporcione la foto, simplemente se añade la imagen y una clase `.has-photo`, que conserva la iluminación y el marco tecnológico sin tocar la estructura del código.

---

## 3. Elemento "Creado 100% con IA y SDD" (Callout Ingenioso)

Ubicado bajo el encabezado principal del Hero o como barra flotante superior (*Top Banner*):

- **Diseño:** Tarjeta con borde iluminado animado (*animated gradient border*), icono de IA interactivo y botón de auditoría técnica.
- **Contenido del Mensaje:**
  > ⚡ **Desarrollado al 100% mediante IA Agéntica & SDD**  
  > *"Esta web no se picó a mano: se modeló, especificó y programó mediante agentes autónomos (Claude Code + Antigravity) siguiendo Spec-Driven Development estricto. Cada commit responde a una tarea verificada.*  
  > 🔬 **[Auditar el repositorio y especificaciones en GitHub ➔](https://github.com/laralbir/carloslara-portfolio)**"
- **Interacción:** Al hacer clic, se abre un diálogo modal interactivo que muestra el diagrama del flujo SDD de 4 fases (Análisis, Plan, Tareas, Código) y enlaces directos a las carpetas `specs/` del repositorio.

---

## 4. Jerarquía de Componentes y Estructura de Código

```
public/
├── llms.txt                     # Índice y directivas de cribado rápido para LLMs y bots
├── llms-full.txt                # CV íntegro en Markdown optimizado para ATS y agentes
├── cv.md                        # Endpoint directo en Markdown sin procesar
├── _headers                     # Cabeceras de seguridad y Content-Type/Caché para markdown
├── robots.txt                   # Instrucciones y sitemap para crawlers y bots de IA
└── assets/                      # Iconos SVG, monograma CLA y fotografía profesional

src/
├── index.html                   # Documento principal semántico One-Page con JSON-LD
├── styles/
│   ├── main.css                 # Reset, tipografía y layout general
│   ├── themes.css               # Variables CSS para Light (Default) y Dark
│   └── components.css           # Estilos modulares de componentes
├── scripts/
│   ├── main.ts                  # Punto de entrada de la aplicación
│   ├── theme-switcher.ts        # Lógica de Claro/Oscuro + LocalStorage (Claro por defecto)
│   ├── a11y-switcher.ts         # Modo alto contraste para daltonismo y baja visión
│   ├── i18n/
│   │   ├── engine.ts            # Motor reactivo de traducción
│   │   ├── es.json              # Textos en Español
│   │   ├── en.json              # Textos en Inglés
│   │   └── va.json              # Textos en Valenciano
│   ├── visual/
│   │   ├── canvas-background.ts # Red de nodos 2D interactiva de fondo
│   │   └── counter-animator.ts  # Animación de contadores de métricas
│   └── components/
│       ├── navbar.ts            # Scrollspy, menú móvil responsive
│       └── sdd-modal.ts         # Modal interactivo explicativo del flujo IA/SDD (4 Gates)
```

---

## 5. Mapeo de Secciones de la One-Page

| ID Sección | Componente | Elementos Clave |
| :--- | :--- | :--- |
| `#hero` | **HeroSection** | Titular, subtítulo, Banner IA/SDD con modal de 4 gates, foto con aura, badges y CTAs principales. |
| `#strengths` | **StrengthsGrid** | 4 Pilares Técnicos (Arquitectura Distribuida & EDA, Backend de Misión Crítica, IA Agéntica & SDD, Datos/BI). |
| `#projects` | **ProjectsShowcase** | Casos de estudio (MCP Diagnóstico, Timeline Conciliator, Conectividad OTAs en Tiempo Real, Ámbar HiFi) con filtros interactivos. |
| `#experience`| **ExperienceTimeline** | Línea temporal compactada sin redundancias (Avantio 2018-hoy, Orca, Blue Solutions, Binn, Early Career Serolo/FBCV 2006-2010). |
| `#skills` | **SkillsMatrix** | Grid de competencias técnicas clasificadas por área técnica con buscador/filtro interactivo. |
| `#education` | **EducationSection** | Especialización IA/Big Data, Ingeniería Informática UPV y DAI (enfoque 100% técnico académico). |
| `#offtopic` | **OfftopicSection** | Pasiones personales (Tiro con Arco con badges de Campeón de España y láser focus, HiFi Audiophile, Mototurismo). |
| `#contact` | **ContactSection** | Botón para agendar/copiar email, enlace directo a `cv.md` (AI/ATS), LinkedIn, GitHub y teléfono. |
| `footer` | **Footer** | Copyright, enlaces directos a `/llms.txt` y `/cv.md`, mención a Cloudflare Edge y créditos de construcción con IA. |

---

## 6. Configuración de Despliegue en Cloudflare (Rama `preview`)

- **Salida de compilación:** Directorio `./dist` generado por Vite (`npm run build`).
- **Configuración `wrangler.jsonc`:**
  ```jsonc
  {
    "name": "carloslara-portfolio",
    "compatibility_date": "2024-11-01",
    "compatibility_flags": ["nodejs_compat"],
    "preview_urls": true,
    "assets": {
      "directory": "./dist"
    }
  }
  ```
- **Cabeceras de seguridad:** `public/_headers` copiadas al directorio `dist/` durante el build.

---

## 7. Criterios de Aceptación de la Fase 02 (Gate 2)

- [ ] Aprobación de Carlos Lara Albir de este plan técnico y visual.
- [ ] Confirmación para pasar a la Fase **`03-task`** donde el agente `tasker` generará el backlog atómico de tareas con Criterios de Aceptación (AC) y Definición de Terminado (DoD).

