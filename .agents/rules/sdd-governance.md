# Reglas de Gobernanza SDD (Spec Driven Development)

Estas reglas son de obligado cumplimiento para cualquier agente o desarrollador que opere en este repositorio:

1. **Orden Secuencial Estricto:**
   - La fase `01-analisis` precede a `02-plan`.
   - La fase `02-plan` precede a `03-task`.
   - La fase `03-task` precede a `04-implement`.
   - Está terminantemente prohibido escribir código de componentes o lógica en `src/` si no existen tareas aprobadas en `specs/03-task/`.

2. **Inmutabilidad de Fases Previas sin Aprobación:**
   - Si durante `04-implement` se descubre la necesidad de alterar un requisito o la arquitectura, debe actualizarse primero el documento de `specs/02-plan/` o `specs/01-analisis/` con justificación explícita.

3. **Criterios de Verificación (DoD):**
   - Ninguna tarea se da por concluida si no pasa el build sin errores y no se verifica en el entorno local de Cloudflare Pages.

4. **Consentimiento Explícito para Git (Commit & Push):**
   - Queda terminantemente PROHIBIDO ejecutar `git commit` o `git push` sin la instrucción o consentimiento explícito y previo de Carlos Lara Albir.
   - El agente debe preparar los cambios, verificar su corrección y solicitar aprobación antes de registrar cualquier commit o enviar al repositorio remoto.

5. **Estrategia de Ramas (Preview First):**
   - Todo el trabajo de desarrollo activo se realiza en la rama `preview` hasta disponer de una versión funcional validada.
   - La rama `main` permanece reservada exclusivamente para versiones estables listas para producción.

