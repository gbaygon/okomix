# Ökomix — Guía de Proyecto

## Descripción

Landing page para **Ökomix**, cantera de yeso agrícola (94% pureza) y dolomita premium ubicada en Argentina.

## Público objetivo

- **Primario**: Productores agropecuarios argentinos — gente de campo que necesita información clara, directa y sin tecnicismos innecesarios. Valoran datos concretos (rendimiento, pureza, dosis por hectárea).
- **Secundario**: Distribuidores y revendedores de fertilizantes e insumos agrícolas en Argentina y MERCOSUR (Brasil, Uruguay, Paraguay, Chile).

La página debe ser accesible para personas que la ven desde el teléfono en zonas rurales con conexiones lentas. Esto es prioritario.

## Stack técnico

- HTML5 + Tailwind CSS (compilado) + Alpine.js + AOS — todo bundleado localmente
- **Build**: esbuild (JS bundle) + Tailwind CLI (CSS) + Node script (HTML processing)
- **Deploy**: GitHub Actions → GitHub Pages con dominio custom `okomix.com`
- **Dev**: `npm run dev` para watch de Tailwind, `npm run build` para build completo
- 0 CDNs externos para funcionalidad (solo Umami analytics y Google Fonts)

## Estructura del proyecto

```
├── CNAME                          → Dominio custom (okomix.com)
├── index.html                     → Página principal (fuente)
├── analisis.html                  → Análisis yeso agrícola (fuente)
├── analisis-dolomita.html         → Análisis dolomita (fuente)
├── css/
│   ├── tailwind-input.css         → Input Tailwind (importa AOS CSS)
│   ├── tailwind.css               → Output Tailwind (dev local)
│   └── styles.css                 → CSS custom (animaciones, texturas)
├── js/
│   ├── entry.js                   → Entry point del bundle (importa todo)
│   ├── components.js              → Web Components (nav, footer, WhatsApp)
│   └── main.js                    → Inicialización AOS + loader + Umami tracking
├── scripts/
│   └── build-html.js              → Procesa HTMLs para dist/
├── images/                        → Imágenes locales del sitio
├── tailwind.config.js             → Config Tailwind (paleta custom)
├── package.json                   → Deps y scripts de build
├── .github/workflows/deploy.yml   → CI/CD: build + deploy a GH Pages
└── CLAUDE.md                      → Este archivo
```

### Directorio `dist/` (generado, gitignored)

```
dist/
├── *.html           → HTMLs procesados (sin CDNs, con bundle refs)
├── css/styles.min.css  → Tailwind + AOS CSS + styles.css concatenados
├── js/bundle.min.js    → Alpine + AOS + components + main bundleados
├── images/          → Copia de images/
└── CNAME            → Copia de CNAME
```

## Build y desarrollo

### Comandos

```bash
npm run dev          # Watch Tailwind (desarrollo local con archivos fuente)
npm run build        # Build completo → dist/
npx serve dist       # Servir dist/ para verificar build
```

### Cómo funciona el build

1. **build:css** — Tailwind CLI compila + minifica, concatena con styles.css → `dist/css/styles.min.css`
2. **build:js** — esbuild bundlea entry.js (Alpine + AOS + components + main) → `dist/js/bundle.min.js`
3. **build:html** — Node script elimina 7 tags de CSS/JS individuales, inyecta 2 refs al bundle
4. **build:assets** — Copia images/ y CNAME a dist/

### Orden de carga en entry.js (crítico)

```
AOS (window.AOS) → components.js (registra Web Components) → main.js (event listeners) → Alpine.start()
```

Los Web Components inyectan `x-data`/`x-show` en el DOM. Alpine.start() debe correr **después** para encontrar esas directivas. Si se invierte el orden, el menú mobile no funciona.

### Deploy

GitHub Actions (`.github/workflows/deploy.yml`) en cada push a `main`:
1. Checkout → Node 20 → `npm ci` → `npm run build`
2. Upload `dist/` → Deploy a GitHub Pages

**Config requerida en GitHub**: Settings → Pages → Source → **GitHub Actions**

## Reglas de estilo y convenciones

### Imágenes

- **SIEMPRE** descargar imágenes al directorio `images/` del repo. **NUNCA** linkear a proveedores externos (Unsplash, Pexels, etc. vía URL).
- Optimizar imágenes con herramientas locales (`sips`, `cjpeg`, `ImageOptim`).
- Usar formatos eficientes: JPEG para fotos, PNG solo si hay transparencia.
- Achicar dimensiones al tamaño real de uso (no servir imágenes de 4000px para un slot de 800px).
- Siempre sugerir y aplicar optimizaciones de tamaño/peso en imágenes.

### Paleta de colores

Definida en `tailwind.config.js`:
- **Tierra** (marrones): tonos del suelo y la roca
- **Campo** (verdes): vegetación, agricultura
- **Oro** (dorados): mineral, premium, cosecha
- **Mineral** (grises): piedra, seriedad, confianza

### Tipografías

- **Bebas Neue**: display/headings
- **Source Sans 3**: body text

### CSS

- 90%+ Tailwind utilities directamente en HTML
- CSS custom (`css/styles.css`) solo para animaciones y efectos especiales que no se logran con Tailwind

### JavaScript

- Minimal. Alpine.js para interactividad (menú mobile, toggles).
- AOS para animaciones on-scroll.
- Web Components nativos para nav, footer y WhatsApp (sin Shadow DOM, Tailwind funciona directo).
- No agregar frameworks ni librerías adicionales sin justificación clara.

### Responsive y mobile

- **Mobile-first**: la experiencia mobile es tan importante como desktop. Muchos usuarios son productores que acceden desde el celular en zonas rurales.
- Breakpoints de Tailwind: sm / md / lg / xl
- Testear siempre que el contenido se vea bien en pantallas de 375px+

### SVG Icons

- Siempre inline en el HTML. Nunca como archivos `.svg` separados.

## Estructura del index.html

Secciones con IDs de ancla para navegación:

```
Nav fijo (menú mobile con Alpine.js)
├── #hero           → Hero principal con CTA
├── #stats          → Estadísticas clave
├── #productos      → Yeso Agrícola y Dolomita
├── #beneficios     → Beneficios del producto
├── #como-funciona  → Proceso / cómo usar
├── #exportacion    → Mercados internacionales
├── #testimonial    → Testimonio / social proof
├── #contacto       → Formulario + WhatsApp
└── Footer
```

WhatsApp flotante con animación pulse (siempre visible).

## Performance y carga rápida

Esto es **crítico** — los usuarios están en conexiones rurales lentas.

- **2 requests de assets** por página (1 CSS + 1 JS, mismo dominio)
- **~33KB gzipped** total (CSS ~8.5KB + JS ~25KB)
- 0 CDNs externos para funcionalidad core
- Preload de recursos críticos (`hero-bg.jpg`, `styles.min.css`)
- Fonts async con técnica `media="print"` → swap on load
- Scripts con `defer`
- **Lazy loading** (`loading="lazy"`) en todas las imágenes no-críticas
- Imágenes comprimidas y dimensionadas correctamente
- Siempre buscar oportunidades de optimizar peso y velocidad de carga

## Notas sobre el negocio

- **Productos**: Yeso Agrícola (94% pureza) y Dolomita
- Registrado en **SENASA**
- Contacto: WhatsApp y formulario (sin backend real aún)
- Email: info@okomix.com.ar
- Idioma del sitio: español (es)

## Al hacer cambios

1. Editar archivos **fuente** (no dist/) — el build genera dist/ automáticamente
2. Correr `npm run build` para verificar que compila sin errores
3. Verificar que el sitio se ve bien en mobile (375px) y desktop
4. Mantener las imágenes optimizadas — si se agrega una imagen nueva, comprimirla
5. No romper el lazy loading ni el preload de recursos
6. Probar que la navegación por anclas funciona
7. El archivo CNAME no debe modificarse (configura el dominio custom)
8. No agregar CDNs externos — todo debe ir bundleado
