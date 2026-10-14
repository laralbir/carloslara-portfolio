# AGENTS.md - Portfolio Carlos Lara Albir (SDD Framework & Cloudflare)

Bienvenido al espacio de trabajo del portfolio web personal de **Carlos Lara Albir**.
Todo el desarrollo en este repositorio se rige por la metodología **SDD (Spec Driven Development)** y está diseñado para desplegarse de manera óptima en **Cloudflare**.

---

## 1. Principio Fundamental: Spec Driven Development (SDD)

Bajo SDD, **el código es el resultado final de especificaciones verificadas**, no el punto de partida.
No se escribe código de producción sin haber completado rigurosamente las etapas previas:

```
[01-Análisis] ──(Aprobado)──> [02-Plan] ──(Aprobado)──> [03-Task] ──(Aprobado)──> [04-Implement]
```

### Reglas de Calidad y Transición de Fases (Phase Gates)
1. **Gate 1 (Análisis -> Plan):**
   - Requiere documento `specs/01-analisis/SPEC-01-analisis-portfolio.md` completo.
   - El usuario (Carlos Lara Albir) debe dar el visto bueno al perfil, secciones y objetivos antes de iniciar la arquitectura.
2. **Gate 2 (Plan -> Task):**
   - Requiere documento `specs/02-plan/PLAN-01-arquitectura-portfolio.md` completo.
   - Decisiones de arquitectura (ADR), stack y jerarquía de componentes aprobadas.
3. **Gate 3 (Task -> Implement):**
   - Requiere documento `specs/03-task/TASK-01-backlog-portfolio.md` completo.
   - Cada tarea debe contar con Criterios de Aceptación (AC) y Definición de Terminado (DoD).
4. **Gate 4 (Implement -> Deploy):**
   - Validación del build con Cloudflare (`npm run build` / `npm run preview`).
   - Verificación de accesibilidad, SEO y Core Web Vitals (LCP < 1.5s, CLS < 0.05).

---

## 2. Roles de Agentes Especializados

Para cada fase del SDD existe un rol de agente con responsabilidades, artefactos y directrices específicas:

| Rol / Agente | Archivo de Especificación | Fase SDD | Misión Principal |
| :--- | :--- | :--- | :--- |
| **`analyst`** | [analyst.md](file:///.agents/roles/analyst.md) | `01-analisis` | Elicitar requisitos, perfil profesional, catálogo de proyectos y valor diferencial de Carlos. |
| **`planner`** | [planner.md](file:///.agents/roles/planner.md) | `02-plan` | Diseñar la arquitectura técnica, jerarquía de UI, stack compatible con Cloudflare y sistema visual. |
| **`tasker`** | [tasker.md](file:///.agents/roles/tasker.md) | `03-task` | Descomponer el plan en paquetes de trabajo y tareas atómicas con criterios DoD verificables. |
| **`implementer`** | [implementer.md](file:///.agents/roles/implementer.md) | `04-implement` | Desarrollar el código con estándares web modernos, auditar calidad y preparar para Cloudflare. |

---

## 3. Normas de Servidor Web y Despliegue en Cloudflare

1. **Configuración declarativa:** Toda configuración de Cloudflare reside en `wrangler.jsonc`.
2. **Seguridad y Caching:**
   - Cabeceras HTTP estrictas en `public/_headers` (HSTS, CSP, X-Content-Type-Options, Cache-Control).
   - Rutas y fallbacks en `public/_routes.json` y `public/_redirects`.
3. **Optimización Edge:**
   - Cero dependencias innecesarias en tiempo de ejecución.
   - Activos estáticos cacheados de forma inmutable (`/assets/*`).
   - Soporte para Cloudflare Pages Functions en `functions/` si se requieren endpoints dinámicos (ej. formulario de contacto).

---

## 4. Instrucción de Inicio

Al comenzar cualquier sesión de trabajo, el agente debe:
1. Verificar en qué fase del SDD se encuentra el proyecto revisando la carpeta `specs/`.
2. Asumir el rol correspondiente a esa fase (o consultar al usuario qué fase desea abordar).
3. Nunca saltarse fases sin confirmación explícita del usuario.

