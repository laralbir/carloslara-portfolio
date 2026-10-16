# Portfolio Carlos Lara Albir - Reglas de Proyecto

Este proyecto opera bajo **SDD (Spec Driven Development)** y despliegue en **Cloudflare Pages**.
Consulta la guía completa de gobernanza, roles de agentes y flujo de trabajo en [AGENTS.md](file:///Users/carlos/Projects/carloslara-portfolio/AGENTS.md).

### Reglas Esenciales
- **Fase Actual:** `01-analisis` (Requisitos y posicionamiento de Carlos Lara Albir).
- **Prohibido:** Implementar código en `src/` antes de que las fases `01-analisis`, `02-plan` y `03-task` estén aprobadas.
- **TDD Obligatorio:** Todo desarrollo de código sigue Test-Driven Development (Red -> Green -> Refactor) con Vitest (`npm test`).
- **Servidor Web:** Cloudflare Pages configurado mediante `wrangler.jsonc`, `public/_headers`, y `public/_routes.json`.
- **Git Consent:** En rama `preview` el agente tiene autorización para commit y push autónomos; en rama `main` sigue siendo PROHIBIDO sin consentimiento explícito.
- **Rama de Trabajo:** Todo el desarrollo se realiza en la rama `preview` hasta tener versión funcional.

