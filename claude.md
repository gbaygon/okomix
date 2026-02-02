# Ökomix — Guía de Proyecto

## Descripción

Landing page para **Ökomix**, cantera de yeso agrícola (94% pureza) y dolomita premium ubicada en Argentina.

## Público objetivo

- **Primario**: Productores agropecuarios argentinos — gente de campo que necesita información clara, directa y sin tecnicismos innecesarios. Valoran datos concretos (rendimiento, pureza, dosis por hectárea).
- **Secundario**: Distribuidores y revendedores de fertilizantes e insumos agrícolas en Argentina y MERCOSUR (Brasil, Uruguay, Paraguay, Chile).

La página debe ser accesible para personas que la ven desde el teléfono en zonas rurales con conexiones lentas. Esto es prioritario.

## Stack técnico

- **Sitio estático puro** — sin build process, sin package.json, sin bundler
- HTML5 + Tailwind CSS (CDN) + Alpine.js (CDN) + AOS (CDN)
- Hosting: GitHub Pages con dominio custom `okomix.com`
- Archivo principal: `index.html` (single page con secciones ancla)

## Estructura del proyecto

```
├── CNAME              → Dominio custom (okomix.com)
├── index.html         → Página principal completa
├── css/styles.css     → CSS custom (animaciones, texturas)
├── js/main.js         → Inicialización AOS + loader
├── images/            → Imágenes locales del sitio
└── claude.md          → Este archivo
```

## Reglas de estilo y convenciones

### Imágenes

- **SIEMPRE** descargar imágenes al directorio `images/` del repo. **NUNCA** linkear a proveedores externos (Unsplash, Pexels, etc. vía URL).
- Optimizar imágenes con herramientas locales (`sips`, `cjpeg`, `ImageOptim`).
- Usar formatos eficientes: JPEG para fotos, PNG solo si hay transparencia.
- Achicar dimensiones al tamaño real de uso (no servir imágenes de 4000px para un slot de 800px).
- Siempre sugerir y aplicar optimizaciones de tamaño/peso en imágenes.

### Paleta de colores

Definida en el config de Tailwind inline en `index.html`:
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

- Preload de recursos críticos (`hero-bg.jpg`, `styles.css`)
- Fonts async con técnica `media="print"` → swap on load
- Scripts con `defer`
- **Lazy loading** (`loading="lazy"`) en todas las imágenes no-críticas
- Imágenes comprimidas y dimensionadas correctamente
- Cache-control: no-cache (para desarrollo en GitHub Pages)
- Siempre buscar oportunidades de optimizar peso y velocidad de carga

## Notas sobre el negocio

- **Productos**: Yeso Agrícola (94% pureza) y Dolomita
- Registrado en **SENASA**
- Contacto: WhatsApp y formulario (sin backend real aún)
- Email: info@okomix.com.ar
- Idioma del sitio: español (es)

## Al hacer cambios

1. Verificar que el sitio se ve bien en mobile (375px) y desktop
2. Mantener las imágenes optimizadas — si se agrega una imagen nueva, comprimirla
3. No romper el lazy loading ni el preload de recursos
4. Probar que la navegación por anclas funciona
5. El archivo CNAME no debe modificarse (configura el dominio custom)
