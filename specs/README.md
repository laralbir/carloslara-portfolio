# Metodología SDD (Spec Driven Development) - Portfolio Carlos Lara Albir

Este proyecto sigue una metodología estricta de desarrollo guiado por especificaciones (**Spec Driven Development**). Ninguna línea de código de producción se escribe sin antes haber completado y validado las fases previas.

---

## Fases del Flujo SDD

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│ 01. Análisis │ ──> │   02. Plan   │ ──> │   03. Task   │ ──> │04. Implement│
└──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
  (Requisitos y        (Arquitectura y      (Desglose de tareas   (Ejecución y
  Posicionamiento)     Diseño Técnico)      y Criterios DoD)      Verificación)
```

### 1. `01-analisis/` (Análisis de Requisitos)
- **Responsable:** Agente Analista (`analyst`)
- **Objetivo:** Definir la identidad profesional, audiencia objetivo (reclutadores, clientes, colaboradores), propuesta de valor de Carlos Lara Albir, catálogo de secciones y contenidos, y requisitos no funcionales (rendimiento, SEO, accesibilidad, Cloudflare).
- **Entregable:** `specs/01-analisis/SPEC-01-analisis-portfolio.md`
- **Quality Gate:** Aprobación del usuario antes de pasar a la fase de Plan.

### 2. `02-plan/` (Planificación Técnica y Arquitectura)
- **Responsable:** Agente Arquitecto / Planificador (`planner`)
- **Objetivo:** Definir la arquitectura de software, selección del stack óptimo para Cloudflare Pages, jerarquía de componentes, sistema de diseño (tokens, estilos, tipografía, paleta), modelo de datos/proyectos y configuración de edge caching.
- **Entregable:** `specs/02-plan/PLAN-01-arquitectura-portfolio.md`
- **Quality Gate:** Aprobación técnica y visual antes del desglose de tareas.

### 3. `03-task/` (Desglose de Tareas de Trabajo)
- **Responsable:** Agente Gestor de Tareas (`tasker`)
- **Objetivo:** Descomponer el plan en paquetes de trabajo y tareas atómicas, secuenciadas, con criterios de aceptación claros y definición de terminado (DoD - Definition of Done).
- **Entregable:** `specs/03-task/TASK-01-backlog-portfolio.md`
- **Quality Gate:** Validación de dependencias y cobertura 100% de los requisitos.

### 4. `04-implement/` (Implementación y Verificación)
- **Responsable:** Agente Implementador (`implementer`)
- **Objetivo:** Escribir el código siguiendo las tareas atómicas, cumplir estándares web modernos, optimizar para Cloudflare, auditar accesibilidad y Core Web Vitals, y preparar el despliegue.
- **Entregables:** Código en `src/`, `public/`, `functions/` y registro de ejecución en `specs/04-implement/LOG-01-implementacion.md`.

---

## Estructura de Directorios

```
specs/
├── README.md               # Esta guía
├── templates/              # Plantillas estandarizadas para cada fase
│   ├── 01-analisis-template.md
│   ├── 02-plan-template.md
│   ├── 03-task-template.md
│   └── 04-implement-template.md
├── 01-analisis/            # Documentos de análisis aprobados
├── 02-plan/                # Planes de arquitectura aprobados
├── 03-task/                # Desglose de tareas y seguimiento
└── 04-implement/           # Logs de implementación y verificación
```

