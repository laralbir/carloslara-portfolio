---
name: sdd-workflow
description: >-
  Guía y orquesta el ciclo de vida de desarrollo guiado por especificaciones (Spec Driven Development)
  en 4 fases: 01-analisis, 02-plan, 03-task y 04-implement para el portfolio de Carlos Lara Albir en Cloudflare.
---

# SDD Workflow Skill - Portfolio Carlos Lara Albir

Esta habilidad permite al agente identificar la fase activa de desarrollo, verificar el cumplimiento de los Phase Gates y ejecutar las acciones correspondientes a cada etapa de la metodología SDD.

## Fases y Comandos de Ejecución

### Fase 1: Análisis (`analisis`)
- **Rol:** `analyst` ([.agents/roles/analyst.md](file:///.agents/roles/analyst.md))
- **Objetivo:** Definir requisitos, público objetivo, propuesta de valor y catálogo de contenidos.
- **Acción:**
  1. Revisar si existe `specs/01-analisis/SPEC-01-analisis-portfolio.md`.
  2. Si no existe, interactuar con Carlos Lara Albir para responder las preguntas clave del perfil.
  3. Redactar el documento usando `specs/templates/01-analisis-template.md`.
  4. Solicitar aprobación explícita.

### Fase 2: Plan (`plan`)
- **Rol:** `planner` ([.agents/roles/planner.md](file:///.agents/roles/planner.md))
- **Objetivo:** Definir arquitectura, stack tecnológico, sistema visual y diseño de componentes para Cloudflare.
- **Acción:**
  1. Verificar que `specs/01-analisis/SPEC-01-analisis-portfolio.md` está aprobado.
  2. Analizar el stack web idóneo para Cloudflare Pages (ej. Astro, Vite+TS, etc.).
  3. Redactar `specs/02-plan/PLAN-01-arquitectura-portfolio.md` usando la plantilla `specs/templates/02-plan-template.md`.
  4. Validar el plan con el usuario.

### Fase 3: Task (`task`)
- **Rol:** `tasker` ([.agents/roles/tasker.md](file:///.agents/roles/tasker.md))
- **Objetivo:** Descomponer el plan en paquetes de trabajo y tareas atómicas con criterios de aceptación (AC) y DoD.
- **Acción:**
  1. Verificar que `specs/02-plan/PLAN-01-arquitectura-portfolio.md` está aprobado.
  2. Generar el backlog en `specs/03-task/TASK-01-backlog-portfolio.md`.
  3. Confirmar que cubre todos los requisitos.

### Fase 4: Implementación (`implement`)
- **Rol:** `implementer` ([.agents/roles/implementer.md](file:///.agents/roles/implementer.md))
- **Objetivo:** Desarrollar el código paso a paso, auditar calidad y verificar funcionamiento con Cloudflare.
- **Acción:**
  1. Tomar las tareas secuencialmente desde `specs/03-task/TASK-01-backlog-portfolio.md`.
  2. Implementar componentes en `src/`, funciones en `functions/` y assets en `public/`.
  3. Ejecutar `npm run dev` / `wrangler pages dev` y validar en el navegador.
  4. Actualizar el log de implementación en `specs/04-implement/LOG-01-implementacion.md`.

