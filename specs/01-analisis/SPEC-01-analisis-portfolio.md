# SPEC-01: Documento de Análisis de Requisitos y Posicionamiento

- **Proyecto:** Portfolio Profesional Web — Carlos Lara Albir
- **Fase SDD:** `01-analisis`
- **Estado:** Actualizado con nuevos requisitos (Listo para Aprobación)
- **Fecha:** 2026-10-14
- **Autor:** Agente Analyst (`analyst`)
- **Revisor Principal:** Carlos Lara Albir
- **Rama de Trabajo:** `preview`

---

## 1. Visión y Objetivos Estratégicos

### 1.1. Propósito del Portfolio
Crear una plataforma web de alto impacto profesional en formato **One Page** orientada a la **búsqueda activa y captación de nuevas oportunidades laborales de nivel Senior / Staff / Tech Lead**, demostrando que Carlos Lara Albir combina:
1. **Más de 20 años de solidez en ingeniería backend:** Sistemas distribuidos de misión crítica, alta disponibilidad, sincronización en tiempo real con gigantes globales (Booking.com, Airbnb, Expedia, Vrbo), seguridad de pagos PCI-DSS y arquitectura orientada a eventos.
2. **Pionero y referente en desarrollo agéntico asistido por IA (AI-Augmented Engineering):** Adopción avanzada de herramientas punteras como **Claude Code**, **Antigravity**, **Model Context Protocol (MCP)** y **Spec-Driven Development (SDD)**, logrando multiplicar el rendimiento y la calidad con métricas auditadas (341 PRs mergeadas, 0 reverts, 1.2% hotfixes).
3. **Transparencia técnica total (Meta-Portfolio):** La propia web sirve como prueba viva del dominio de la IA y el SDD, invitando al visitante a auditar las especificaciones y el código fuente en GitHub.
4. **Ownership técnico de punta a punta:** Capacidad demostrada para asumir épicas complejas en equipos sin Project Manager, desde la especificación con producto hasta la puesta en producción y creación de tooling operativo interno.

### 1.2. Público Objetivo (Target Audience)
- **CTOs, VPs of Engineering y Directores Técnicos:** Buscan líderes técnicos capaces de entregar código robusto, diseñar arquitecturas escalables y modernizar la productividad de sus equipos mediante IA y buenas prácticas.
- **Engineering Managers y Tech Leads:** Buscan ingenieros con alto rigor técnico, referentes en code reviews, con cero problemas de calidad en producción y mentalidad de producto.
- **Technical Recruiters & Headhunters:** Necesitan identificar en menos de 5 segundos la propuesta de valor única, las tecnologías clave (TypeScript, Node.js, Cloud, IA, Event-Driven) y datos de contacto directos.

### 1.3. Propuesta de Valor Única (UVP)
> *"Ingeniero Backend Senior con más de dos décadas diseñando sistemas de alta disponibilidad e integraciones críticas, potenciado por flujos de desarrollo agéntico con IA (Claude Code, MCP, SDD) para entregar software con velocidad exponencial y cero defectos en producción."*

---

## 2. Perfil y Datos Biográficos

- **Nombre:** Carlos Lara Albir
- **Ubicación:** Torrent, Valencia (España)
- **Email:** laralbir@gmail.com
- **Teléfono:** (+34) 661 76 22 02
- **LinkedIn:** [linkedin.com/in/carlos-lara-albir](https://linkedin.com/in/carlos-lara-albir)
- **GitHub:** [github.com/laralbir](https://github.com/laralbir)
- **Repositorio del Portfolio:** [github.com/laralbir/carloslara-portfolio](https://github.com/laralbir/carloslara-portfolio)
- **Idiomas Soportados en la Web:** 
  - **Inglés (`en`) — Idioma por defecto** (si no se detecta preferencia del navegador o proviene de otra región).
  - **Español (`es`)** — Nativo.
  - **Valenciano (`va` / `ca`)** — Autonómico (técnicamente mapeado a códigos ISO `ca`, `ca-ES`, `ca-valencia` para detección de navegador).
- **Regla de Detección:** Si el navegador no reporta `es` ni `ca`/`va`, la web cargará automáticamente en **Inglés (`en`)**.
- **Disciplina & Liderazgo Extracurricular:** Entrenador y Juez Nacional de Tiro con Arco (certificado CSD); equipo dirigido a Campeón Universitario de España (enfoque, precisión, resiliencia y liderazgo bajo presión).

---

## 3. Experiencia de Usuario, Estética y Requisitos Funcionales

### 3.1. Arquitectura One-Page & Navegación Fluida
- Toda la experiencia se concentra en una **sola página continua (One Page)** con secciones bien diferenciadas y scroll suave (*smooth scroll*).
- **Barra de Navegación Flotante / Sticky (Glassmorphism):**
  - Enlaces a secciones principales (Inicio, Métricas, IA & SDD, Proyectos, Trayectoria, Skills, Contacto).
  - Indicador de sección activa (*scroll spy*).
  - **Selector de Idioma:** Selector desplegable accesible (Español `ES`, Inglés `EN`, Valenciano `VA`) con cambio dinámico de textos sin recarga y persistencia en almacenamiento local (`localStorage`).
  - **Selector de Tema:** Alternador de 3 estados: **Oscuro (Dark - por defecto)**, **Claro (Light)**, **Sistema (System)**, con persistencia en `localStorage`.

### 3.2. Estrategia Visual: Foto y Plan Inicial Sin Foto
- **Foto Personal:** La web está preparada para alojar una fotografía profesional de Carlos Lara Albir en el Hero / Sección Sobre Mí tan pronto esté disponible.
- **Plan Inicial Sin Foto (Placeholder Técnico de Alta Calidad):**
  - Mientras no se adjunte la foto definitiva, se implementará un **Avatar / Emblema Interactivo 2D/3D**:
    - Un núcleo geométrico o monograma de ingeniería `CLA` renderizado en Canvas / SVG interactivo con gradientes reactivos, efectos de brillo y partículas orbitales sutiles que reaccionan al movimiento del cursor.
    - Proporciona una apariencia moderna, pulida y deliberada ("AI/Tech Native"), evitando huecos vacíos o avatares genéricos de stock.

### 3.3. Elemento Diferencial: Meta-Callout "Creado 100% con IA y SDD"
Un elemento interactivo de alto impacto visual (banner dinámico / badge expandible con efecto neón/glow) ubicado de forma prominente:
- **Mensaje / Tip Ingenioso:**
  > 💡 *"Este portfolio no se escribió a mano línea a línea: fue concebido, diseñado e implementado al 100% mediante Agentes de IA (Claude Code & Antigravity) utilizando riguroso Spec-Driven Development (SDD). De la idea al despliegue en Cloudflare sin atajos.*  
  > 🔍 **[Inspecciona las especificaciones y el código en GitHub →](https://github.com/laralbir/carloslara-portfolio)**"
- Al pulsar el enlace, redirige directamente al repositorio abierto donde cualquier reclutador o CTO puede examinar las especificaciones de `specs/`, las reglas de `.agents/` y el historial de commits.

### 3.4. Recursos Visuales, Animaciones 2D y 3D
- **Fondo Interactivo 2D/3D (Canvas / WebGL ligero):**
  - Malla de nodos distribuidos o constelación de eventos (representando la arquitectura orientada a eventos y microservicios) con movimiento suave y respuesta sutil al movimiento del ratón.
  - Consumo mínimo de recursos (<60 FPS sostenidos, apagado cuando la pestaña está en segundo plano o si `prefers-reduced-motion` está activo).
- **Animaciones CSS/JS Modernas:**
  - *Scroll Reveals:* Aparición escalonada de tarjetas y bloques mediante `IntersectionObserver`.
  - *Contadores Numéricos Animados:* Las métricas (341 PRs, 211 empresas, etc.) inician en cero y cuentan rápidamente al entrar en el viewport.
  - *Microinteracciones:* Hover con efecto de elevación 3D (tilt effect sutil) en las tarjetas de proyectos.

### 3.5. Estética "Nerd-Tech" & Detalles de Ingeniería
La web debe transmitir inequívocamente la identidad de un ingeniero backend sénior y apasionado por la tecnología:
- **Barra de Telemetría / Terminal Header:** Una mini-barra con estética CLI que muestre el estado del sistema en tiempo real:
  `[SYS: ONLINE] · [HTTP: 200 OK] · [EDGE: CLOUDFLARE] · [BRANCH: preview] · [LATENCY: <15ms]`.
- **Tipografía y Acentos Monoespaciados:** Uso estratégico de fuentes monoespaciadas (`ui-monospace`, `JetBrains Mono`) en métricas, insignias de stack, snippets y encabezados de terminal (`~/carlos-portfolio $`).
- **Malla Cyber/Blueprint:** Trama milimétrica sutil en el fondo de las tarjetas y contenedores tecnológicos.
- **Easter Egg en Consola de DevTools:** Al abrir la consola del navegador (`F12`), se muestra un mensaje en formato ASCII art con bienvenida técnica para reclutadores y directores de ingeniería, invitándolos a revisar el repo y contactar.

---

## 4. Contenido Detallado de Secciones

### 4.1. Hero Section
- Titular, subtitular de impacto, callout de IA + SDD, avatar interactivo 2D/3D (o foto), botones CTA ("Explorar Proyectos", "Contactar", "Descargar CV").

### 4.2. Métricas de Impacto Auditadas (2026)
- **341 PRs mergeadas** con **0 reverts** y solo 1.2% hotfixes.
- **313 Revisiones de código** (#1 o #2 del equipo de forma consistente).
- **211 Empresas migradas en 11 días** (Expedia Channel PRO) con 0 errores.
- **27 Usuarios activos** en herramientas internas de operaciones (OPS).
- **25+ Herramientas MCP** en servidor de diagnóstico en lenguaje natural.

### 4.3. El Factor Diferencial: Desarrollo Agéntico con IA
- Cómo Carlos aplica **Spec-Driven Development (SDD)**: Trazabilidad completa Requisito → Plan → Tarea → Código.
- **Model Context Protocol (MCP):** Servidor propio de diagnóstico (Next.js + Hexagonal) que cruza MongoDB y SQL Server.
- **Claude Code & Antigravity:** Automatización con guardarraíles, TDD, análisis estático y hooks de calidad.
- **Estimación Ágil Asistida:** Calibración en Story Points y métricas cruzadas Jira-GitHub.

### 4.4. Proyectos y Casos de Estudio Destacados
1. **Servidor MCP de Diagnóstico Operativo:** Reducción de diagnósticos de 60 min a lenguaje natural.
2. **Herramienta de Migración Masiva Expedia Channel PRO:** 211 empresas en 11 días, rollback y cero downtime.
3. **Sincronización en Tiempo Real de OTAs (Avantio):** Arquitectura Event-Driven, colas SQS, prevención de overbooking y cumplimiento PCI-DSS.
4. **Arquitectura de Ingesta Big Data para E-commerce:** Streaming con Apache Kafka + Batch + Cloud Data Lake.

### 4.5. Trayectoria Profesional
- **Avantio (2018 – Actualidad):** Senior Backend Developer & Connectivity Tech Reference.
- **Orca Sistemas (2016 – 2018):** Analista Programador Backend (POSCRM, SQL optimizado).
- **Blue Solutions (2015 – 2016):** CEO y Analista-Programador Backend.
- **Binn (2014 – 2015):** Analista Backend y Cloud AWS.
- **FBCV (2010 – 2014):** Programador y Analista de Sistemas.
- **Servicios Taurinos Serolo (2006 – 2009):** Backend y Admin Sistemas.

### 4.6. Habilidades Técnicas
- Agrupadas por: *Desarrollo con IA*, *Lenguajes Core (TypeScript, Node.js, PHP)*, *Bases de Datos (MongoDB, SQL Server, MySQL)*, *Arquitectura (Event-Driven, Microservicios, Hexagonal)* y *Cloud/DevOps (AWS, Cloudflare, Kafka, Docker)*.

### 4.7. Formación y Liderazgo
- Especialización en IA y Big Data (CFGS - en curso).
- Ingeniería Informática (UPV - +80% créditos).
- Técnico Superior DAI y Técnico Especialista.
- Liderazgo en Tiro con Arco (Entrenador, Juez y Campeón Universitario).

### 4.8. Contacto y Enlaces
- Email, LinkedIn, GitHub, Teléfono, descarga de CV.

---

## 5. Requisitos No Funcionales (NFR)

1. **Plataforma:** Cloudflare Pages / Workers en `carloslara.dev` (producción) y rama `preview` para despliegues de prueba.
2. **Compatibilidad Total:** 100% responsive probado en móviles (320px–480px), tablets (768px–1024px), laptops (1280px–1440px) y pantallas ultra-wide (1920px–4K).
3. **Rendimiento:** Core Web Vitals en verde (LCP < 1.5s, CLS < 0.05, INP < 100ms) a pesar de los efectos 2D/3D.
4. **Accesibilidad:** WCAG 2.1 AA (contraste para modo oscuro y claro, navegación por teclado, soporte de lectores de pantalla).
5. **Persistencia de Preferencias:** Almacenamiento local para idioma y tema seleccionado.

---

## 6. Criterios de Aceptación de la Fase 01 (Gate 1)

- [ ] Aprobación de Carlos Lara Albir de este documento ampliado.
- [ ] Confirmación para pasar a la Fase **`02-plan`** con el plan técnico para la versión inicial sin foto.
