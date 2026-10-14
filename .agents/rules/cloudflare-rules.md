# Reglas de Infraestructura y Despliegue en Cloudflare

1. **Configuración de Wrangler:**
   - La configuración oficial del proyecto reside en `wrangler.jsonc`.
   - Se debe mantener `pages_build_output_dir` apuntando al directorio compilado (`./dist` o el que corresponda al stack seleccionado).

2. **Cabeceras de Seguridad y Edge:**
   - Todas las cabeceras personalizadas deben registrarse en `public/_headers`.
   - Incluir siempre cabeceras de seguridad: CSP, HSTS, X-Content-Type-Options, Referrer-Policy y Permissions-Policy.
   - Los assets estáticos en `/assets/*` deben tener cache inmutable (`max-age=31536000, immutable`).

3. **Compatibilidad Edge:**
   - Si se crean Cloudflare Pages Functions en `functions/`, asegurarse de que utilicen APIs compatibles con el runtime de Cloudflare Workers (V8 isolates), evitando APIs exclusivas de Node.js no soportadas salvo con `nodejs_compat`.

4. **Testing Local:**
   - Utilizar siempre `wrangler pages dev` para emular con fidelidad el comportamiento de Cloudflare en local antes de desplegar.

