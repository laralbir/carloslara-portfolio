# SPEC-02: Especificación y Análisis de Requisitos - Refactor React Portfolio

- **Estado:** En Revisión (Propuesta para Aprobación Gate 1)
- **Fecha:** 2026-10-18
- **Autor / Agente:** `analyst`
- **Revisor:** Carlos Lara Albir
- **Rama de Trabajo:** `refactor/react-portfolio`
- **Template de Referencia:** [Sahilmd01/React-Portfolio](https://github.com/Sahilmd01/React-Portfolio)

---

## 1. Visión y Objetivos del Refactor

### 1.1. Propósito
Transformar el frontend actual del portfolio personal de **Carlos Lara Albir** en una Single Page Application (SPA) modular y visualmente vanguardista basada en **React 18 + Vite + Tailwind CSS v4 + Framer Motion + Lucide React**, tomando como referencia estética y compositiva el repositorio de código abierto `Sahilmd01/React-Portfolio`.

### 1.2. Principios Inmutables
1. **Preservación Integral del Contenido y Posicionamiento:**
   - Rol profesional: **Agentic Engineer & Senior Backend Architect**.
   - Mantenimiento riguroso de todos los logros cuantificables (341 PRs, 0 reverts, 211 empresas migradas en 11 días, +20 años de experiencia).
   - Catálogo completo de proyectos empresariales (Servidor MCP, Fixeador de Disponibilidad, Sincronización OTA, Ingesta E-Commerce) y personales orquestados por IA (`md-gh-navigator`, `agroAi`, `ambar-kodi-launcher`, `hyundai-kia-gen5w-navi-firmware`).
2. **Preservación de la Reactividad Multilingüe (i18n):**
   - Soporte nativo para 3 idiomas: **Español (ES)**, **Valenciano (VA)** e **Inglés (EN)** sin recargar la página.
3. **Preservación de Accesibilidad y Modos de Visualización:**
   - Soporte para Tema Claro / Oscuro (`dark` / `light`).
   - Modo de Alto Contraste para daltonismo y baja visión (A11y).
4. **Preservación de los Easter Eggs Interactivos (Off-Topic):**
   - Minijuego balístico de Tiro con Arco (viento, temblor muscular, respiración, interacción ratón y táctil).
   - Simulador HiFi vintage (vinilo animado con VU-metro reactivo a 33/45 RPM).
   - Tacómetro de moto con sonido/animación.
   - Visor de fotografía analógica.
5. **Compatibilidad de Despliegue:**
   - Despliegue estático 100% optimizado para **GitHub Pages** mediante GitHub Actions.

---

## 2. Análisis Comparativo: Template vs Portfolio Actual

| Componente del Template | Implementación en Template | Adaptación para Carlos Lara Albir |
| :--- | :--- | :--- |
| **`WelcomeScreen`** | Intro con cuenta atrás y código hacker animado. | Pantalla de inicio estilo terminal nerd/agéntico (`agy --sdd-mode`, inicialización de agentes, carga de specs). |
| **`StarBackground`** | Canvas con estrellas, meteoros y halos degradados. | Fondo cósmico/espacial interactivo con partículas suaves y efecto de haz reactivo al cursor. |
| **`Navbar`** | Barra flotante con blur, logo y toggle de tema. | Barra con logo `CLA`, telemetría técnica (`carlos@edge:~$`, `STATUS: 200 OK`, `RUNTIME: GITHUB_PAGES`), toggle A11y, selector segmentado de idioma (ES/EN/VA) y switch Dark/Light. |
| **`HeroSection`** | Título animado con chips flotantes y CTA. | Titular `Carlos Lara Albir` + `Agentic Engineer & Senior Backend Architect`, avatar con aura difusa, chips flotantes (`AWS SQS/SNS`, `Node.js`, `Event-Driven`, `Claude Code`, `MCP`, `Kotlin/Compose`, `SDD`), badges de disponibilidad y CTAs. |
| **`AboutSection`** | Pestañas (Personal/Profesional) y contadores. | 4 Pilares de Maestría técnica + contadores cuantificados reales (+20 años, 341 PRs, 0 reverts, 211 empresas). Pestañas de enfoque agéntico y descarga de CV/llms.txt. |
| **`SkillsSection`** | Pestañas con barras de nivel y logos. | Clasificación por dominios: *Arquitectura & EDA*, *Ingeniería Agéntica & Tooling*, *Bases de Datos & Cloud*, *Android & Embebidos*, *Metodologías*. |
| **`ProjectsSection`** | Tarjetas con tags, filtro de categorías y preview. | Filtros (`Todos`, `Producción / Backend Crítico`, `Proyectos Personales con IA`), tarjetas con Problema/Solución/Impacto, enlaces a GitHub y demos interactivas. |
| **`Methodology (MyApproach)`**| Bloque vacío en el template. | **Explicador del Pipeline SDD (Los 4 Gates)** con modal detallado e interactivo de cómo se parió el código. |
| **`ExperienceTimeline`** | N/A en template (o en About). | Timeline cronológico enriquecido desde 2006 hasta la actualidad (Avantio, Orca, Blue Solutions, Binn, FBCV, Serolo). |
| **`OffTopicSection`** | No existe en template. | Integración nativa como sección lúdica en React con los 4 easter eggs interactivos. |
| **`ContactSection`** | Formulario y enlaces a redes. | Enlaces rápidos, copia de email en un clic con toast animado, perfiles de LinkedIn y GitHub. |
| **`Footer`** | Copyright y redes. | Copyright, nota de autoría 100% agéntica y enlaces a `llms.txt` y `cv.md`. |

---

## 3. Requisitos No Funcionales (NFR)

1. **Rendimiento:** Core Web Vitals en verde (LCP < 1.5s, CLS < 0.05, FID/INP < 100ms).
2. **SEO & Metadatos:**
   - Meta tags OpenGraph y Twitter Card completos.
   - Schema.org JSON-LD para `Person` y `ProfilePage`.
   - Soporte para `public/llms.txt`, `public/cv.md`, `public/CNAME`.
3. **Calidad de Código y TDD:**
   - Suite de tests unitarios con Vitest y Testing Library para componentes críticos (i18n, cambio de tema, reducers/estado).
   - Cobertura mínima del 90% en la lógica de negocio.
4. **Bundle Size:**
   - División de código (`code-splitting`) dinámica para librerías pesadas si las hubiera.
   - Cero dependencias superfluas de runtime.

---

## 4. Criterios de Aceptación de la Fase 01 (Gate 1)

- [x] Template base clonado y analizado en `/tmp/template-react-portfolio`.
- [x] Especificación de requisitos y mapeo de secciones completada en `SPEC-02`.
- [ ] Validación y aprobación del análisis por parte de Carlos Lara Albir para avanzar a la Fase `02-plan`.
