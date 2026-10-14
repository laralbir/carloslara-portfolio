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

### ADR-02: Sistema de Temas (Claro / Oscuro / Sistema)
- **Decisión:** Implementar el selector de tema mediante atributos `data-theme="light|dark"` en el elemento raíz `<html>`, controlando todas las variables de color con CSS Custom Properties.
- **Lógica:**
  - Si el usuario selecciona `system` (por defecto), se suscribe a `window.matchMedia('(prefers-color-scheme: dark)')`.
  - Se inyecta un micro-script bloqueante en el `<head>` antes del renderizado visual para leer `localStorage.getItem('user_theme')` y evitar cualquier parpadeo de color (*FOUC - Flash of Unstyled Content*).

### ADR-03: Sistema de Internacionalización (i18n: ES / EN / VA)
- **Decisión:** Dicionarios JSON estructurados (`es.json`, `en.json`, `va.json`) con micro-motor de traducción en TypeScript sin recarga de página.
- **Lógica:**
  - Los elementos de la UI llevan atributos `data-i18n="clave.subclave"`.
  - Al cambiar de idioma en el selector, el motor actualiza los nodos en memoria instantáneamente y guarda la preferencia en `localStorage.getItem('user_lang')`.
  - Fallback automático al idioma del navegador (`navigator.language`).

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
src/
├── index.html                   # Documento principal semántico One-Page
├── styles/
│   ├── main.css                 # Reset, tipografía y layout general
│   ├── themes.css               # Variables CSS para Light, Dark y System
│   └── components.css           # Estilos modulares de componentes
├── scripts/
│   ├── main.ts                  # Punto de entrada de la aplicación
│   ├── theme-switcher.ts        # Lógica de Claro/Oscuro/Sistema + LocalStorage
│   ├── i18n/
│   │   ├── engine.ts            # Motor reactivo de traducción
│   │   ├── es.json              # Textos en Español
│   │   ├── en.json              # Textos en Inglés
│   │   └── va.json              # Textos en Valenciano
│   ├── visual/
│   │   ├── canvas-background.ts # Red de nodos 2D interactiva de fondo
│   │   ├── tech-avatar.ts       # Holograma 3D/2D para versión inicial sin foto
│   │   └── counter-animator.ts  # Animación de contadores de métricas
│   └── components/
│       ├── navbar.ts            # Scrollspy, menú móvil responsive
│       └── sdd-modal.ts         # Modal interactivo explicativo del flujo IA/SDD
└── assets/                      # Iconos SVG, monograma y futuro espacio para foto
```

---

## 5. Mapeo de Secciones de la One-Page

| ID Sección | Componente | Elementos Clave |
| :--- | :--- | :--- |
| `#hero` | **HeroSection** | Titular, subtítulo, Banner IA/SDD, `TechAvatar` (versión inicial sin foto), CTAs principales. |
| `#metrics` | **MetricsGrid** | 5 tarjetas con contadores animados (341 PRs, 0 reverts, 211 empresas, 27 usuarios ops, 25+ tools MCP). |
| `#ai-sdd` | **AiEngineeringSection** | El factor diferencial: Claude Code, Antigravity, MCP Server, Spec-Driven Development y guardarraíles. |
| `#projects` | **ProjectsShowcase** | 4 Casos de estudio (MCP Diagnóstico, Migración Expedia, Conectividad OTAs, Big Data E-commerce) con filtros interactivos. |
| `#experience`| **ExperienceTimeline** | Línea temporal interactiva (Avantio 2018-hoy, Orca, Blue Solutions, Binn, FBCV, Serolo). |
| `#skills` | **SkillsMatrix** | Grid de competencias técnicas clasificadas por área técnica con buscador/filtro. |
| `#education` | **EducationSection** | Especialización IA/Big Data, Ingeniería Informática UPV, DAI y liderazgo en Tiro con Arco. |
| `#contact` | **ContactSection** | Botón para agendar reunión, descarga directa de CV, enlaces directos a LinkedIn, GitHub, email y teléfono. |
| `footer` | **Footer** | Copyright, enlace a GitHub, mención a Cloudflare Edge y créditos de construcción con IA. |

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

