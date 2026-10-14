# TASK-01: Desglose de Tareas y Backlog - Portfolio Carlos Lara Albir

- **Estado:** [Borrador | En Revisión | Aprobado]
- **Fecha:** AAAA-MM-DD
- **Autor / Agente:** `tasker`
- **Revisor:** Carlos Lara Albir
- **Referencias:** `specs/01-analisis/` y `specs/02-plan/`

---

## 1. Definición de Terminado (Definition of Done - DoD)
Cada tarea debe cumplir con:
1. Código limpio, tipado estricto si aplica, y libre de advertencias de linter.
2. Cumplimiento de accesibilidad semántica (HTML5, alt texts, aria-* donde proceda).
3. Responsive verificado en móvil (375px), tablet (768px) y escritorio (1280px+).
4. Build de producción exitoso compatible con Cloudflare Pages.
5. Verificación de criterios de aceptación específicos de la tarea.

---

## 2. Paquetes de Trabajo (Work Packages)

### WP1: Configuración Base del Entorno y Build
- [ ] **TASK-1.1:** Inicializar dependencias y scripts de construcción en `package.json`.
- [ ] **TASK-1.2:** Configurar sistema de estilos / tokens CSS y layout global.
- [ ] **TASK-1.3:** Verificar previsualización local con `wrangler pages dev`.

### WP2: Estructura de Datos y Modelo de Contenido
- [ ] **TASK-2.1:** Crear esquemas y ficheros de datos con la información de Carlos Lara Albir.
- [ ] **TASK-2.2:** Integrar utilidades para carga y tipado de datos.

### WP3: Desarrollo de Componentes UI
- [ ] **TASK-3.1:** Implementar componente de Cabecera y Navegación Responsive.
- [ ] **TASK-3.2:** Implementar Sección Hero y llamada a la acción principal.
- [ ] **TASK-3.3:** Implementar Sección Sobre Mí y Experiencia.
- [ ] **TASK-3.4:** Implementar Sección de Proyectos / Showcase.
- [ ] **TASK-3.5:** Implementar Sección de Habilidades (Skills) y Contacto.
- [ ] **TASK-3.6:** Implementar Pie de página (Footer) con redes sociales.

### WP4: Optimización, SEO y Cloudflare Deployment
- [ ] **TASK-4.1:** Configurar meta tags (OpenGraph, Twitter Cards, JSON-LD Schema.org).
- [ ] **TASK-4.2:** Configurar cabeceras de seguridad y caché en Cloudflare (`_headers`).
- [ ] **TASK-4.3:** Ejecutar auditoría Lighthouse (Performance, A11y, Best Practices, SEO).
- [ ] **TASK-4.4:** Verificar comando de despliegue `wrangler pages deploy`.
