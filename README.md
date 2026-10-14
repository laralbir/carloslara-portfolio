# Portfolio Web - Carlos Lara Albir

Repositorio oficial del portfolio personal de **Carlos Lara Albir**, desarrollado bajo la metodología **Spec Driven Development (SDD)** y optimizado para su despliegue y ejecución en la red global de **Cloudflare Pages**.

---

## Metodología de Desarrollo: SDD (Spec Driven Development)

Este proyecto sigue un flujo riguroso donde el código es el resultado final de especificaciones verificadas en 4 fases:

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│   01. ANÁLISIS  │  ──>  │    02. PLAN     │  ──>  │    03. TASK     │  ──>  │ 04. IMPLEMENT   │
└─────────────────┘       └─────────────────┘       └─────────────────┘       └─────────────────┘
  Requisitos, perfil,       Arquitectura, stack,      Desglose en tareas        Desarrollo de
  proyectos y valor         diseño de componentes     atómicas y criterios      código, pruebas y
  diferencial.              y Cloudflare edge.        DoD verificables.         Core Web Vitals.
```

Para más detalles, consulta [specs/README.md](file:///Users/carlos/Projects/carloslara-portfolio/specs/README.md).

---

## Estructura del Repositorio

```
carloslara-portfolio/
├── .agents/                    # Configuración de agentes, reglas y habilidades
│   ├── roles/                  # Definición de roles de agentes
│   │   ├── analyst.md          # Agente para Fase 01 (Análisis)
│   │   ├── planner.md          # Agente para Fase 02 (Plan)
│   │   ├── tasker.md           # Agente para Fase 03 (Task)
│   │   └── implementer.md      # Agente para Fase 04 (Implement)
│   ├── rules/                  # Reglas del proyecto
│   │   ├── sdd-governance.md   # Reglas de flujo y phase gates
│   │   └── cloudflare-rules.md # Reglas de despliegue en Cloudflare
│   └── skills/                 # Habilidades descubiertas por el agente
│       └── sdd-workflow/       # Runbook de orquestación SDD
├── specs/                      # Especificaciones del proyecto
│   ├── README.md               # Guía metodológica SDD
│   ├── templates/              # Plantillas estandarizadas para cada fase
│   ├── 01-analisis/            # Documentos de análisis de requisitos
│   ├── 02-plan/                # Decisiones de arquitectura y UI
│   ├── 03-task/                # Backlog y desglose de tareas
│   └── 04-implement/           # Logs y registro de avance
├── public/                     # Archivos estáticos y configuración Cloudflare
│   ├── _headers                # Cabeceras HTTP de seguridad (CSP, HSTS) y caché
│   ├── _redirects              # Redirecciones en Cloudflare Pages
│   ├── _routes.json            # Enrutamiento de Cloudflare Pages
│   ├── robots.txt              # Reglas de rastreo SEO
│   └── favicon.svg             # Monograma de Carlos Lara Albir
├── functions/                  # Cloudflare Pages Functions (serverless endpoints)
├── src/                        # Código fuente del portfolio (componentes, páginas)
├── AGENTS.md                   # Instrucciones maestras de agentes
├── GEMINI.md                   # Compatibilidad de reglas de workspace
├── wrangler.jsonc              # Configuración moderna de Cloudflare Pages/Workers
├── package.json                # Scripts y dependencias
└── .gitignore                  # Exclusiones de control de versiones
```

---

## Servidor Web: Cloudflare Pages

El proyecto está preparado para el ecosistema de Cloudflare:
- **`wrangler.jsonc`**: Configuración de Cloudflare Pages con compatibilidad Node.js y directorio de salida `./dist`.
- **`public/_headers`**: Cabeceras de seguridad estrictas (Content Security Policy, HSTS, X-Content-Type-Options) y caché inmutable de 1 año para assets estáticos.
- **`public/_routes.json`**: Configuración de enrutamiento estático vs endpoints dinámicos en edge functions.
- **`functions/`**: Directorio listo para Cloudflare Pages Functions si se requieren APIs edge (ej. formulario de contacto).

---

## Comandos Disponibles

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo con Cloudflare Pages
npm run dev

# Compilar proyecto (se configurará según el stack seleccionado en la fase 02-plan)
npm run build

# Previsualizar el build compilado emulando el entorno Cloudflare
npm run preview

# Desplegar directamente a Cloudflare Pages
npm run deploy
```

---

## Estado Actual del Proyecto

- **Fase Actual:** `01-analisis` (Requisitos y propuesta de valor de Carlos Lara Albir).
- **Siguiente paso:** Completar la entrevista de análisis o rellenar `specs/01-analisis/SPEC-01-analisis-portfolio.md`.
