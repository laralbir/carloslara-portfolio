---
name: publish-preview
description: >-
  Automatiza la verificación, compilación, commit con consentimiento y despliegue/publicación
  directa en la rama preview de Cloudflare Pages para el portfolio de Carlos Lara Albir.
---

# Skill: Publicar en Preview (Cloudflare Pages)

Esta habilidad automatiza y estandariza el flujo de publicación hacia la rama **`preview`** de Cloudflare Pages, asegurando que se cumplan las reglas de gobernanza del proyecto.

## Flujo de Ejecución

1. **Verificación de Entorno:**
   - Comprobar que la rama actual es `preview` (`git branch --show-current`).
   - Comprobar estado del árbol de trabajo (`git status`).

2. **Verificación de Calidad y Compilación:**
   - Ejecutar `npm run build` para validar que Vite compila sin errores a `./dist`.
   - Validar que `package-lock.json` y `package.json` están en sincronía.

3. **Consentimiento Obligatorio (Regla de Gobernanza):**
   - Solicitar confirmación explícita a Carlos Lara Albir antes de realizar cualquier commit o push.

4. **Publicación Remota:**
   - Tras el consentimiento, ejecutar:
     ```bash
     git add .
     git commit -m "<mensaje de cambio descriptivo>"
     git push origin preview
     ```

5. **Despliegue Directo Opcional (CLI):**
   - Si se desea publicar inmediatamente sin esperar al CI/CD de GitHub, ejecutar:
     ```bash
     npm run deploy:preview
     ```
   - Proporcionar el enlace de previsualización al usuario.
