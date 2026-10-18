# PLAN-02: Plan de Arquitectura Técnica - Refactor React Portfolio

- **Estado:** En Revisión (Propuesta para Aprobación Gate 2)
- **Fecha:** 2026-10-18
- **Autor / Agente:** `planner`
- **Revisor:** Carlos Lara Albir
- **Referencia:** `specs/01-analisis/SPEC-02-refactor-react-portfolio.md`
- **Rama de Trabajo:** `refactor/react-portfolio`

---

## 1. Decisiones de Arquitectura (ADRs)

### ADR-01: Migración a React 18 + TypeScript + Vite
- **Decisión:** Reemplazar la renderización directa mediante manipulación DOM imperativa en TypeScript por una arquitectura declarativa en componentes **React 18 con TypeScript**.
- **Justificación:** Facilita la adopción del template `Sahilmd01/React-Portfolio`, mejora la mantenibilidad de componentes interactivos (pestañas, modales, easter eggs) y mantiene tiempos de compilación ultrarrápidos con Vite (<150ms).

### ADR-02: Sistema de Estilos con Tailwind CSS + Framer Motion
- **Decisión:** Integrar **Tailwind CSS v4** (`@tailwindcss/vite`) junto con **Framer Motion** para transiciones fluidas de entrada, scroll-driven animations y microinteracciones.
- **Justificación:** Réplica fiel del diseño visual del template de referencia manteniendo la flexibilidad para personalizar tokens de color, bordes luminosos y animaciones espaciales.

### ADR-03: Internacionalización Reactiva mediante `LanguageContext`
- **Decisión:** Crear un proveedor de contexto de React (`LanguageContext`) que reutilice directamente los diccionarios JSON existentes (`src/i18n/{es,va,en}.json`).
- **Justificación:** Cero pérdida de contenido y traducciones ya pulidas; permite cambiar el idioma al vuelo sin recargar la página y sincroniza con `localStorage('user_lang')`.

### ADR-04: Gestión de Accesibilidad (A11y) y Modo Oscuro
- **Decisión:** Implementar un `ThemeContext` que controle tanto el tema visual (`dark` / `light`) como el flag de alto contraste (`a11y_contrast`), inyectando las clases en `<html>`.
- **Justificación:** Cumplimiento continuo de WCAG 2.1 AA y preservación de la accesibilidad para usuarios con baja visión o daltonismo.

### ADR-05: Preservación de Easter Eggs como Componentes React Autónomos
- **Decisión:** Portar la lógica de los minijuegos (Tiro con arco balístico, Reproductor HiFi Ámbar con vinilo y VU-meter, tacómetro de moto y visor de fotos) a componentes dedicados en `src/components/offtopic/`.
- **Justificación:** Mantiene intacto el valor diferencial y la personalidad de Carlos Lara Albir dentro de la nueva interfaz moderna.

---

## 2. Jerarquía de Componentes

```
App
├── StarBackground (Efecto de estrellas y halos de fondo)
├── Navbar
│   ├── TelemetryTicker (Indicador técnico con prompt de terminal)
│   ├── NavLinks (Smooth scroll navigation)
│   ├── LanguageSelector (Segmented control ES | EN | VA)
│   ├── A11yContrastToggle (Switch de alto contraste)
│   └── ThemeToggle (Switch Dark / Light)
├── WelcomeScreen (Intro cinemática agéntica / terminal hacker)
├── Main
│   ├── HeroSection (Avatar con ambient glow, chips flotantes, CTA)
│   ├── AboutSection (4 Pilares de maestría, métricas auditadas, descarga CV)
│   ├── SkillsSection (Filtros por dominios: Backend, IA, Cloud, Android)
│   ├── ProjectsSection (Filtros: Empresa / Personales IA, Modal de detalle)
│   ├── SddMethodologySection (Pipeline interactivo de 4 Gates SDD)
│   ├── ExperienceTimeline (Timeline enriquecido de trayectoria)
│   ├── OffTopicSection (Arco, HiFi Vinilo, Moto, Fotografía)
│   └── ContactSection (Email copy toast, LinkedIn, GitHub)
└── Footer (Copyright, badge GitHub Pages, links llms.txt & cv.md)
```

---

## 3. Estructura de Archivos Propuesta

```
src/
├── assets/                  # Imágenes, avatares, fotos off-topic y audio
├── components/
│   ├── ui/                  # Componentes base (Button, Card, Badge, Modal, Toast)
│   ├── Navbar.tsx
│   ├── TelemetryTicker.tsx
│   ├── StarBackground.tsx
│   ├── WelcomeScreen.tsx
│   ├── HeroSection.tsx
│   ├── AboutSection.tsx
│   ├── SkillsSection.tsx
│   ├── ProjectsSection.tsx
│   ├── SddSection.tsx
│   ├── ExperienceTimeline.tsx
│   ├── ContactSection.tsx
│   ├── Footer.tsx
│   └── offtopic/
│       ├── ArcheryGame.tsx
│       ├── HifiPlayer.tsx
│       ├── MotoThrottle.tsx
│       └── PhotoViewer.tsx
├── context/
│   ├── LanguageContext.tsx  # i18n reactivo (ES, EN, VA)
│   └── ThemeContext.tsx     # Dark/Light & High Contrast
├── i18n/
│   ├── es.json
│   ├── en.json
│   └── va.json
├── index.css                # Tailwind imports y utilidades cósmicas
├── main.tsx                 # Punto de entrada React
└── App.tsx                  # Enrutador y layout principal
```

---

## 4. Estrategia de Pruebas (TDD)
- **Vitest + React Testing Library:**
  - Pruebas unitarias de cambio de idioma y renderizado de claves HTML (`tests/i18n.test.tsx`).
  - Pruebas de alternancia de tema y accesibilidad (`tests/theme.test.tsx`).
  - Pruebas de componentes interactivos (pestañas de proyectos, timeline y easter eggs).
- **Validación de Build:**
  - `npm test` al 100% verde.
  - `npm run build` sin errores de compilación ni advertencias de tipos TypeScript.

---

## 5. Criterios de Aceptación del Plan (Gate 2)

- [x] Decisiones de arquitectura documentadas y justificadas.
- [x] Jerarquía de componentes y estructura de archivos definida.
- [ ] Aprobación de Carlos Lara Albir para pasar a la Fase `03-task` (Desglose de tareas con DoD).
