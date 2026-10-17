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
1. **Más de 20 años de maestría en arquitectura distribuida y backend:** Sistemas de alta disponibilidad y concurrencia masiva, arquitectura orientada a eventos (Event-Driven: AWS SQS, SNS, EventBridge), tolerancia a fallos, consistencia eventual, idempotencia estricta, colas DLQ, sincronización en tiempo real con gigantes globales (Booking.com, Airbnb, Expedia, Vrbo) y seguridad de pagos PCI-DSS.
2. **Pionero y referente en desarrollo agéntico asistido por IA (AI-Augmented Engineering):** Adopción avanzada de herramientas punteras como **Claude Code**, **Antigravity**, **Model Context Protocol (MCP)** y **Spec-Driven Development (SDD)**, logrando multiplicar el rendimiento y la calidad con métricas auditadas (341 PRs mergeadas, 0 reverts, 1.2% hotfixes).
3. **Transparencia técnica total (Meta-Portfolio):** La propia web sirve como prueba viva del dominio de la IA y el SDD, invitando al visitante a auditar las especificaciones y el código fuente en GitHub.
4. **Ownership técnico de punta a punta:** Capacidad demostrada para asumir épicas complejas en equipos sin Project Manager, desde la especificación con producto hasta la puesta en producción y creación de tooling operativo interno.

### 1.2. Público Objetivo (Target Audience)
- **CTOs, VPs of Engineering y Directores Técnicos:** Buscan líderes técnicos capaces de entregar código robusto, diseñar arquitecturas escalables y modernizar la productividad de sus equipos mediante IA y buenas prácticas.
- **Engineering Managers y Tech Leads:** Buscan ingenieros con alto rigor técnico, referentes en code reviews, con cero problemas de calidad en producción y mentalidad de producto.
- **Technical Recruiters & Headhunters:** Necesitan identificar en menos de 5 segundos la propuesta de valor única, las tecnologías clave (TypeScript, Node.js, Cloud, IA, Event-Driven) y datos de contacto directos.
- **Bots de IA de Reclutamiento, Crawlers LLM y Sistemas ATS (Applicant Tracking Systems):** Agentes autónomos de búsqueda y cribado curricular (LinkedIn AI Recruiter, Eightfold, Greenhouse AI, SeekOut, Paradox, y prompts de Claude/ChatGPT). Requieren ingesta machine-readable sin fricción de DOM/CSS, extracción determinista de entidades, métricas cuantificables, taxonomía de habilidades y verificación instantánea de requisitos excluyentes.

### 1.3. Propuesta de Valor Única (UVP)
> *"Ingeniero Backend Senior con más de dos décadas diseñando sistemas de alta disponibilidad e integraciones críticas, potenciado por flujos de desarrollo agéntico con IA (Claude Code, MCP, SDD) para entregar software con velocidad exponencial y cero defectos en producción."*

---

## 2. Perfil y Datos Biográficos

- **Nombre:** Carlos Lara Albir
- **Ubicación:** Torrent, Valencia (España)
- **Email:** info@carloslara.dev
- **Teléfono:** (+34) 661 76 22 02
- **LinkedIn:** [linkedin.com/in/carlos-lara-albir-687277a4](https://www.linkedin.com/in/carlos-lara-albir-687277a4)
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
  - **Selector de Idioma:** Segmented Control (Toggle Group) accesible de 3 posiciones (`[ ES | EN | VA ]`) con pastilla deslizante activa, cambio dinámico instantáneo a 1 clic sin recarga y persistencia en almacenamiento local (`localStorage`).
  - **Selector de Accesibilidad Visual:** Switch toggle deslizable accesible (WAI-ARIA `role="switch"`) con icono de visión e indicador de modo alto contraste para daltonismo y baja visión.
  - **Selector de Tema:** Switch toggle interactivo y accesible (WAI-ARIA `role="switch"`): **Claro (Light - predeterminado por defecto)** y **Oscuro (Dark)**, con persistencia en `localStorage`. Interruptor deslizable fluido con iconos de sol/luna y microanimaciones sin modo sistema.

### 3.2. Estrategia Visual: Foto de Perfil y Marca Personal
- **Foto Personal:** Integrada oficialmente en el Hero con la fotografía profesional proporcionada por Carlos Lara Albir en formato WebP optimizado de alta fidelidad, enmarcada en una tarjeta de ingeniería con aura difusa y distintivo flotante de disponibilidad Senior / Staff.
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

### 4.2. Pilares Técnicos & Áreas de Fuerza (Core Strengths)
Sustituyendo métricas aisladas de una empresa por 4 pilares universales de maestría y especialización de alto impacto para reclutadores y CTOs:
1. **Arquitectura Distribuida & Event-Driven (Nivel Staff / Lead · +10 años):** Desacoplamiento asíncrono con AWS SQS, SNS y EventBridge; idempotencia estricta, colas DLQ y tolerancia a fallos bajo concurrencia masiva.
2. **Backend de Misión Crítica & Microservicios (Especialista Senior · +20 años):** Modernización de monolitos a microservicios en TypeScript/Node.js y PHP, arquitectura hexagonal, DDD, sincronización OTA en tiempo real y seguridad PCI-DSS.
3. **Ingeniería Agéntica & Tooling con IA (Referente & Early Adopter):** Claude Code en terminal, servidores MCP de diagnóstico en producción, Spec-Driven Development (SDD) y suites de TDD automatizado con 0 defectos.
4. **Modelado de Datos, Rendimiento & BI (Avanzado & Analítico · +15 años):** Indexación y agregaciones complejas en MongoDB y SQL Server, erradicación de escaneos masivos en gigabytes de datos, y visión analítica desde POSCRM y BI.

### 4.3. El Factor Diferencial: Desarrollo Agéntico con IA & Telemetría en Terminal
- Cómo Carlos aplica **Spec-Driven Development (SDD)**: Trazabilidad completa Requisito → Plan → Tarea → Código.
- **Model Context Protocol (MCP):** Servidor propio de diagnóstico (Next.js + Hexagonal) que cruza MongoDB y SQL Server en lenguaje natural.
- **Automatización de Imputación de Tiempos con Claude:** Automatización con Claude que concilia tickets activos de Jira, eventos y reuniones de Google Calendar y commits/PRs de GitHub para imputar horas diarias automáticamente en Tempo Timesheets sin fricción manual.
- **Consola de Desarrollo & Telemetría Agéntica (Widget Decorativo):** Elemento visual con estética de terminal CLI que renderiza telemetría figurativa de la arquitectura y el stack agéntico (prompt `carlos@edge:~$`, verificación de pipelines SNS/SQS, bridge MCP, auto-logging de tiempos y SDD zero reverts) sin exponer código propietario.
- **QA Autónomo & Testing (TDD con IA):** Redacción guiada por IA de suites completas de tests unitarios, de integración y fuzzing de casos límite antes de validar código; hooks con Opengrep para asegurar 0 reverts.
- **Observabilidad y Monitorización Proactiva:** Telemetría en Grafana, análisis automatizado de gigabytes de logs en clústeres distribuidos y detección predictiva de anomalías antes de impacto a usuario.
- **Claude Code & Antigravity:** Automatización con guardarraíles, ejecución en terminal y zero secrets.
- **Estimación Ágil Asistida:** Calibración en Story Points y métricas cruzadas Jira-GitHub.

### 4.4. Proyectos y Casos de Estudio Destacados
- **Casos de Estudio Empresariales:**
  1. **Servidor MCP de Diagnóstico Operativo:** Reducción de diagnósticos de 60 min a lenguaje natural.
  2. **Fixeador de periodos (Diagnóstico y reparación de periodos de disponibilidad):** Calendario visual interactivo, detección de solapamientos y resolución granular de conflictos.
  3. **Sincronización en Tiempo Real de OTAs (Avantio):** Arquitectura distribuida Event-Driven (EDA), desacoplamiento con colas AWS SQS y fan-out con SNS, idempotencia estricta, prevención de overbooking y cumplimiento PCI-DSS.
  4. **Ingesta Asíncrona de Alta Concurrencia para E-Commerce:** Arquitectura desacoplada de mensajería con AWS SNS/SQS (fan-out) y caché ultrarrápida con Redis.
- **Proyectos Personales & Open Source (Orquestados con IA):**
  1. **AgroAI (`laralbir/agroAi`):** App Android nativa (Kotlin) con LLM Google Gemma en local (Edge AI, 100% offline) para gestión agrícola.
  2. **Hyundai / Kia Gen5W Navigation Firmware RE (`laralbir/hyundai-kia-gen5w-navi-firmware`):** Ingeniería inversa de firmware de automoción, análisis de particiones y extracción asistida por Claude (`CLAUDE.md`).
  3. **Ámbar Kodi Launcher (`laralbir/ambar-kodi-launcher`):** Launcher táctil panorámico (1920x720) para estación HiFi integrando Kodi (JSON-RPC) y Spotify en Python/Flask/pywebview con estética retro VFD.

### 4.5. Trayectoria Profesional
- **Avantio (2018 – Actualidad):** Senior Backend Developer & Connectivity Tech Reference (Dominio de los principales portales de alquiler vacacional: **Booking.com, Airbnb, VRBO, Expedia, Homes & Villas by Marriott, Feratel y Google**; referente técnico en Arquitectura Distribuida y Event-Driven con AWS SQS/SNS, microservicios en TypeScript/Node.js, plataforma OPS, adopción pionera de IA/SDD e imputación de horas con Claude + Jira + Calendar + GitHub).
- **Orca Sistemas (2016 – 2018):** Analista Programador Backend & Business Intelligence (POSCRM, génesis en BI, optimización analítica de datos e impulso para la operativa e IA).
- **Blue Solutions (2015 – 2016):** Fundador & Ingeniero Full-Stack (Desarrollo integral de software PLM para fabricante de tapicerías automoción proveedor de Ford en Almussafes; gestión 360° y arquitectura cliente-servidor).
- **Binn (2014 – 2015):** Analista Backend y Cloud AWS.
- **FBCV (2010):** Programador de Software (Becario / Prácticas).
- **Servicios Taurinos Serolo (2006 – 2009):** Backend y Admin Sistemas (Venta online de entradas y control de tornos de acceso en tiempo real sobre Microsoft SQL Server para múltiples plazas de toros emblemáticas en España: **Valencia, El Puerto de Santa María, Albacete, Jaén y Palencia**, soportando picos masivos de concurrencia).

### 4.6. Habilidades Técnicas
- Agrupadas por: *Desarrollo con IA*, *Lenguajes Core (TypeScript, Node.js, PHP)*, *Bases de Datos (MongoDB, SQL Server, MySQL, Redis)*, *Arquitectura Distribuida & Patrones (Event-Driven EDA, AWS SQS/SNS/EventBridge, Idempotencia, DLQs, Consistencia Eventual, Hexagonal/DDD)* y *Cloud, Mensajería & DevOps (AWS SQS/SNS, Cloudflare, Docker, Actions)*.

### 4.7. Formación y Liderazgo
- Especialización en IA y Big Data (CFGS - en curso).
- Ingeniería Informática (UPV - +80% créditos).
- Técnico Superior DAI y Técnico Especialista.
- Liderazgo en Tiro con Arco (Entrenador, Juez y Campeón Universitario).

### 4.8. Sección Off-Topic & Pasiones Personales (Con Animaciones CSS/SVG)
1. **Tiro con Arco:** Deporte de alta concentración, respiración, postura milimétrica y serenidad bajo presión. Gráfico SVG animado de diana concéntrica con onda de choque pulsante en impacto (`@keyframes target-ring-pulse`).
2. **HiFi & Audiofilia Multiformato:** Pasión por el sonido en todos los formatos (Vinilo a 33 RPM, cintas de cassette, CD, streaming Hi-Res FLAC/DSD). Disco de vinilo animado giratorio en CSS (`@keyframes spin-vinyl`) + ecualizador gráfico VU-metro con barras dinámicas rebotando.
3. **Mototurismo & Rutas en Moto:** Viajes de media y larga distancia por carretera y puertos de montaña. Animación CSS de perspectiva de carretera con líneas discontinuas en movimiento continuo y silueta de moto rutera.

### 4.9. Accesibilidad Integral (A11y & Daltonismo)
- Enlace de salto inicial (*Skip Link*) accesible para lectores de pantalla.
- Selector de modo de alto contraste (`data-a11y="high-contrast"`) para personas con daltonismo y baja visión (paleta amarillo oro `#ffd700` y azul cian sobre fondo negro profundo).
- Soporte estricto para `prefers-reduced-motion` desconectando todas las animaciones.
- Foco visible `:focus-visible` de 3px para navegación completa por teclado.

### 4.10. Contacto y Enlaces
- Email, LinkedIn, GitHub, Teléfono, descarga de CV.

### 4.11. Optimización Integral para Bots de IA de Reclutamiento y Sistemas ATS (Machine-Readable Curriculum Vitae)
La web no solo debe servir a lectores humanos, sino actuar como un **Curriculum Vitae machine-readable de alta fidelidad** optimizado para agentes de selección basados en IA (LinkedIn AI Recruiter, Eightfold, Greenhouse AI, SeekOut, Moonhub, y prompts de cribado con Claude/ChatGPT):
1. **Adopción del estándar abierto `llms.txt` y `llms-full.txt` (llmstxt.org):**
   - `/llms.txt`: Índice de resumen ejecutivo estructurado con directivas de cribado rápido (roles objetivo IC5/IC6, años de experiencia desglosados, stack core y enlaces canónicos).
   - `/llms-full.txt`: Documento Markdown íntegro del CV con formateo limpio, tablas de competencias, hitos desglosados y métricas cuantificadas.
2. **Endpoint Directo de CV en Markdown (`/cv.md`):**
   - Proporciona un acceso directo sin procesar a la versión completa del CV en Markdown puro con cabecera `Content-Type: text/markdown; charset=utf-8`, permitiendo a los reclutadores e IAs copiar y pegar o ingerir el texto sin ruido de maquetación DOM ni scripts.
3. **Bloque de Metadatos ATS & Directivas de Cribado Rápido:**
   - Declaración explícita de puestos objetivo (*Senior Backend Engineer, Staff Software Engineer, Lead Backend Engineer, Distributed Systems Architect*).
   - Nivel de seniority equivalente estandarizado (*IC5 / IC6 / Staff*).
   - Años de experiencia desglosados por tecnología clave (para superar filtros numéricos automáticos).
   - Idiomas y niveles: Español (Nativo), Catalán/Valenciano (Nativo), Inglés (Competencia profesional B2/C1).
   - Permiso de trabajo: Ciudadanía de la Unión Europea (España) con plena disponibilidad para remoto global o híbrido (Valencia).
4. **Estructura CAR / STAR con Métricas Cuantificadas:**
   - Toda experiencia y caso de estudio debe redactarse bajo el esquema Contexto/Problema → Acción/Solución → Resultado Cuantificado (p.ej., *"98% reducción de tiempos de diagnóstico"*, *"Overbookings reducidos a prácticamente cero"*, *"27+ usuarios activos en OPS"*, *"0 reverts en producción"*).
5. **Índice de Taxonomía y Palabras Clave ATS:**
   - Cobertura exhaustiva de términos técnicos para motores de búsqueda semántica y embeddings (EDA, SQS, SNS, EventBridge, Hexagonal Architecture, DDD, Idempotency, DLQ, Microservices, CI/CD, Docker, TDD, Vitest, etc.).
6. **Grafo Semántico Schema.org (JSON-LD en `<head>`):**
   - Tipos `@type: ["Person", "ProfilePage"]` con código ocupacional O*NET (`15-1252.00`), idiomas ISO, nacionalidad, dirección, ocupaciones objetivo, competencias (`knowsAbout`), educación (`alumniOf`) y empleador actual (`worksFor`).

---

## 5. Requisitos No Funcionales (NFR)

1. **Plataforma:** Cloudflare Pages / Workers en `carloslara.dev` (producción) y rama `preview` para despliegues de prueba.
2. **Compatibilidad Total:** 100% responsive probado en móviles (320px–480px), tablets (768px–1024px), laptops (1280px–1440px) y pantallas ultra-wide (1920px–4K).
3. **Rendimiento:** Core Web Vitals en verde (LCP < 1.5s, CLS < 0.05, INP < 100ms) a pesar de los efectos 2D/3D.
4. **Accesibilidad:** WCAG 2.1 AA (contraste para modo oscuro y claro, navegación por teclado, soporte de lectores de pantalla).
5. **Persistencia de Preferencias:** Almacenamiento local para idioma y tema seleccionado.
6. **Metodología de Calidad de Software (SDD + TDD Mandatario):** Todo desarrollo técnico debe estar guiado por pruebas bajo el paradigma TDD (Test-Driven Development). Ningún módulo de scripting o componente funcional se considera válido sin tests unitarios y de integración automatizados con Vitest (`tests/*.test.ts`), validados en el ciclo Red -> Green -> Refactor.
7. **Procesamiento Óptimo por Bots de IA de Reclutamiento y ATS (RNF-AI-CV):** Los recursos `/llms.txt`, `/llms-full.txt` y `/cv.md` deben servirse directamente desde el Edge de Cloudflare con cabeceras de texto puro/markdown y caché (`Cache-Control: public, max-age=3600`), ser descubribles mediante `robots.txt` y enlaces `<link rel="alternate" type="text/markdown">` en el `<head>`, garantizando latencia <50ms y cero consumo superfluo de tokens para scrapers de IA.

---

## 6. Criterios de Aceptación de la Fase 01 (Gate 1)

- [ ] Aprobación de Carlos Lara Albir de este documento ampliado.
- [ ] Confirmación para pasar a la Fase **`02-plan`** con el plan técnico para la versión inicial sin foto.
