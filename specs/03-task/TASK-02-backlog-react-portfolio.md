# TASK-02: Desglose de Tareas y Backlog - Refactor React Portfolio

- **Estado:** En Revisión (Propuesta para Aprobación Gate 3)
- **Fecha:** 2026-10-18
- **Autor / Agente:** `tasker`
- **Revisor:** Carlos Lara Albir
- **Referencias:** `specs/01-analisis/SPEC-02-refactor-react-portfolio.md` y `specs/02-plan/PLAN-02-arquitectura-react-portfolio.md`
- **Rama de Trabajo:** `refactor/react-portfolio`

---

## 1. Definición de Terminado (Definition of Done - DoD)
Cada tarea debe cumplir con:
1. **TypeScript estricto:** Tipado completo sin `any` injustificado y libre de errores de linter.
2. **TDD:** Tests unitarios pasando en verde con Vitest (`npm test`).
3. **i18n Trilingüe:** Textos disponibles y reactivos en Español, Valenciano e Inglés.
4. **Accesibilidad:** WCAG 2.1 AA (semántica, aria-labels, navegación por teclado y contraste).
5. **Responsividad:** Perfecto renderizado en Mobile (375px), Tablet (768px) y Desktop (1280px+).
6. **Build verificado:** `npm run build` sin errores, listo para GitHub Pages.

---

## 2. Paquetes de Trabajo (Work Packages)

### WP1: Configuración de Dependencias y Tooling React
- [ ] **TASK-1.1:** Instalar React 18, React DOM, Tailwind CSS v4 / Vite plugin, Framer Motion, Lucide React y Radix UI en `package.json`.
- [ ] **TASK-1.2:** Configurar `vite.config.ts` con plugins de React y Tailwind CSS, y alias `@/`.
- [ ] **TASK-1.3:** Configurar `index.css` con variables de tema oscuro/claro y utilidades cósmicas del template.

### WP2: Contextos de Estado Global (i18n & Theme)
- [ ] **TASK-2.1:** Implementar `LanguageContext` consumiendo los JSONs de i18n (`es`, `en`, `va`) con persistencia en `localStorage`.
- [ ] **TASK-2.2:** Implementar `ThemeContext` gestionando modo claro/oscuro y modo alto contraste (a11y).
- [ ] **TASK-2.3:** Redactar tests unitarios para ambos contextos en `tests/`.

### WP3: Componentes de Shell, Navegación y Efectos Cósmicos
- [ ] **TASK-3.1:** Implementar `WelcomeScreen` (pantalla de carga cinemática agéntica/terminal).
- [ ] **TASK-3.2:** Implementar `StarBackground` (partículas, meteoros y halos cósmicos).
- [ ] **TASK-3.3:** Implementar `Navbar` con `TelemetryTicker`, selectores de idioma, contraste y tema.
- [ ] **TASK-3.4:** Implementar `Footer` con enlaces a `llms.txt`, `cv.md` y badge de GitHub Pages.

### WP4: Secciones de Contenido Principal
- [ ] **TASK-4.1:** Implementar `HeroSection` con avatar iluminado, badges flotantes y CTAs.
- [ ] **TASK-4.2:** Implementar `AboutSection` con los 4 Pilares de Maestría, métricas y descarga de CV.
- [ ] **TASK-4.3:** Implementar `SkillsSection` interactiva con barras de nivel y filtros por categorías.
- [ ] **TASK-4.4:** Implementar `ProjectsSection` con filtrado (`Empresa`, `Personales IA`), tarjetas con Problema/Solución/Impacto y modal de detalle.
- [ ] **TASK-4.5:** Implementar `SddSection` (visualización del Pipeline de 4 Gates SDD).
- [ ] **TASK-4.6:** Implementar `ExperienceTimeline` cronológico e interactivo.
- [ ] **TASK-4.7:** Implementar `ContactSection` con copia de email en un clic y toast animado.

### WP5: Portado de Easter Eggs Off-Topic
- [ ] **TASK-5.1:** Portar minijuego balístico de Tiro con Arco (viento, pulso, ratón y touch drag-to-aim).
- [ ] **TASK-5.2:** Portar estación HiFi Ámbar (vinilo interactivo 33/45 RPM + VU-metro reactivo).
- [ ] **TASK-5.3:** Portar tacómetro de moto y visor fotográfico.

### WP6: Verificación, Tests y Preparación de Despliegue
- [ ] **TASK-6.1:** Batería completa de pruebas unitarias con Vitest pasando al 100%.
- [ ] **TASK-6.2:** Verificación de build de producción (`npm run build`) generando `dist/` con `CNAME`.
- [ ] **TASK-6.3:** Validación visual en localhost y reporte de refactor a Carlos Lara Albir.
