# PLAN-01: Plan de Arquitectura y Diseño Técnico - Portfolio Carlos Lara Albir

- **Estado:** [Borrador | En Revisión | Aprobado]
- **Fecha:** AAAA-MM-DD
- **Autor / Agente:** `planner`
- **Revisor:** Carlos Lara Albir
- **Referencia:** `specs/01-analisis/SPEC-01-analisis-portfolio.md`

---

## 1. Decisiones de Arquitectura (ADR - Architecture Decision Records)
- **Stack seleccionado:** (ej. Astro, Next.js / Static Export, HTML+Vanilla Modern JS, Vite + React / TypeScript).
  - *Justificación:* Compatibilidad nativa con Cloudflare Pages, zero-JS por defecto donde aplique, puntuación perfecta en CWV.
- **Estrategia de Renderizado:** SSG (Static Site Generation) pre-renderizado para máximo rendimiento en la red Edge de Cloudflare.
- **Herramientas de Estilo:** (ej. Tailwind CSS, CSS Modules, Modern Vanilla CSS con variables y container queries).

## 2. Jerarquía de Componentes y Páginas
- `Layouts`: BaseLayout (meta tags, cabeceras, pie de página, skip links).
- `Componentes`:
  - `Navbar` / Navegación responsive
  - `HeroSection`
  - `AboutSection`
  - `SkillsGrid` / `SkillBadge`
  - `ProjectCard` / `ProjectList`
  - `ExperienceTimeline`
  - `ContactForm` / `ContactCTA`
  - `Footer`
  - `ThemeToggle` (si aplica modo oscuro/claro)

## 3. Modelo de Datos y Contenido
- Estructura de archivos de contenido (ej. Markdown / JSON en `src/data/` o Content Collections):
  - `profile.json` (datos personales, biografía, enlaces).
  - `projects.json` (proyectos, imágenes, tags, repositorios).
  - `experience.json` (historial profesional).
  - `skills.json` (skills categorizadas con niveles o tags).

## 4. Diseño Visual y UI System
- **Paleta de Colores:** Tokens CSS para temas claro / oscuro.
- **Tipografía:** Fuentes del sistema o webfonts de alto rendimiento con `font-display: swap`.
- **Efectos y Microinteracciones:** Transiciones CSS suaves, reduced-motion accesible.

## 5. Infraestructura y Despliegue en Cloudflare
- Configuración `wrangler.jsonc`.
- Salida de build: `./dist`.
- Cabeceras de seguridad y caché (`public/_headers`).
- Routing y fallbacks (`public/_routes.json`, `public/_redirects`).

## 6. Criterios de Aceptación del Plan
- [ ] Arquitectura y stack aprobados.
- [ ] Estructura de componentes y datos definida sin ambigüedades.
- [ ] Plan listo para desglose en tareas en `03-task`.

