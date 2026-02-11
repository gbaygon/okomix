/* ==========================================================================
   Ökomix — Shared Web Components (nav, footer, WhatsApp)
   No Shadow DOM — Tailwind classes work directly in light DOM.
   Load with defer BEFORE Alpine so directives are in the DOM on init.
   ========================================================================== */

const WHATSAPP_NUMBER = '5491131845820';
const WHATSAPP_PHONE = '+54 9 11 3184-5820';

const WHATSAPP_SVG = '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>';

/* ---------- Footer data per page ---------------------------------------- */
const FOOTER_DATA = {
    home: {
        logoHref: '#',
        description: 'Producción de minerales de alta pureza para la agricultura. Yeso Agrícola y Dolomita de alta pureza para maximizar el rendimiento de sus cultivos.',
        links: [
            { text: 'Productos', href: '#productos' },
            { text: 'Beneficios', href: '#beneficios' },
            { text: 'Exportación', href: '#exportacion' },
            { text: 'Análisis', href: 'analisis.html' },
            { text: 'Contacto', href: '#contacto' }
        ]
    },
    analisis: {
        logoHref: 'index.html',
        description: 'Yeso Agrícola de alta pureza para maximizar el rendimiento de sus cultivos. Mineral 100% natural de origen argentino.',
        links: [
            { text: 'Productos', href: 'index.html#productos' },
            { text: 'Beneficios', href: 'index.html#beneficios' },
            { text: 'Exportación', href: 'index.html#exportacion' },
            { text: 'Análisis', href: 'analisis.html' },
            { text: 'Contacto', href: 'index.html#contacto' }
        ]
    },
    'analisis-dolomita': {
        logoHref: 'index.html',
        description: 'Dolomita premium y Yeso Agrícola de alta pureza para maximizar el rendimiento de sus cultivos. Minerales 100% naturales de origen argentino.',
        links: [
            { text: 'Productos', href: 'index.html#productos' },
            { text: 'Beneficios', href: 'index.html#beneficios' },
            { text: 'Exportación', href: 'index.html#exportacion' },
            { text: 'Análisis Yeso', href: 'analisis.html' },
            { text: 'Análisis Dolomita', href: 'analisis-dolomita.html' },
            { text: 'Contacto', href: 'index.html#contacto' }
        ]
    }
};

/* =========================================================================
   <okomix-nav page="home|analisis|analisis-dolomita" color="oro|campo">
   ========================================================================= */
class OkomixNav extends HTMLElement {
    connectedCallback() {
        const page  = this.getAttribute('page') || 'home';
        const color = this.getAttribute('color') || 'oro';

        const isHome      = page === 'home';
        const logoHref    = isHome ? '#' : 'index.html';
        const anchor      = (id) => isHome ? '#' + id : 'index.html#' + id;

        /* Color-dependent tokens */
        const hoverCls   = 'hover:text-' + color + '-400';
        const ctaClasses = color === 'oro'
            ? 'bg-oro-500 hover:bg-oro-600 text-mineral-900'
            : 'bg-campo-500 hover:bg-campo-600 text-white';
        const mobileCtaClasses = color === 'oro'
            ? 'bg-oro-500 text-mineral-900'
            : 'bg-campo-500 text-white';

        this.innerHTML = '<nav class="fixed top-0 inset-x-0 z-50 bg-mineral-900/95 backdrop-blur-md border-b border-mineral-800" x-data="{ mobileMenuOpen: false }">'
            + '<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">'
            + '<div class="flex justify-between items-center h-24">'
            /* Logo */
            + '<a href="' + logoHref + '" data-umami-event="nav-logo" class="flex items-center gap-3">'
            +   '<div class="w-16 h-16 relative">'
            +     '<img src="images/logo.png" alt="Ökomix" class="w-full h-full object-contain relative bottom-[3px]">'
            +   '</div>'
            +   '<div class="flex flex-col leading-none">'
            +     '<span class="font-display text-4xl text-white tracking-wide">ÖKOMIX</span>'
            +     '<span class="text-xs text-campo-400 tracking-[0.2em] font-medium">MINERALES AGRÍCOLAS</span>'
            +   '</div>'
            + '</a>'
            /* Desktop menu */
            + '<div class="hidden md:flex items-center gap-8">'
            +   '<a href="' + anchor('productos') + '" data-umami-event="nav-click" data-umami-event-item="productos" class="text-mineral-300 ' + hoverCls + ' transition-colors font-medium">Productos</a>'
            +   '<a href="' + anchor('beneficios') + '" data-umami-event="nav-click" data-umami-event-item="beneficios" class="text-mineral-300 ' + hoverCls + ' transition-colors font-medium">Beneficios</a>'
            +   '<a href="' + anchor('exportacion') + '" data-umami-event="nav-click" data-umami-event-item="exportacion" class="text-mineral-300 ' + hoverCls + ' transition-colors font-medium">Exportación</a>'
            +   '<a href="' + anchor('contacto') + '" data-umami-event="nav-click" data-umami-event-item="contacto" class="' + ctaClasses + ' px-6 py-2.5 rounded-lg font-semibold transition-all hover:scale-105">Contactar</a>'
            + '</div>'
            /* Mobile hamburger */
            + '<button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden p-2 text-white">'
            +   '<svg x-show="!mobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>'
            +   '<svg x-show="mobileMenuOpen" x-cloak class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>'
            + '</button>'
            + '</div></div>'
            /* Mobile menu panel */
            + '<div x-show="mobileMenuOpen" x-cloak'
            + ' x-transition:enter="transition ease-out duration-200"'
            + ' x-transition:enter-start="opacity-0 -translate-y-4"'
            + ' x-transition:enter-end="opacity-100 translate-y-0"'
            + ' x-transition:leave="transition ease-in duration-150"'
            + ' x-transition:leave-start="opacity-100 translate-y-0"'
            + ' x-transition:leave-end="opacity-0 -translate-y-4"'
            + ' class="mobile-menu md:hidden bg-mineral-800/98 border-b border-mineral-700">'
            + '<div class="px-4 py-4 space-y-3">'
            +   '<a href="' + anchor('productos') + '" @click="mobileMenuOpen = false" data-umami-event="nav-click" data-umami-event-item="productos" class="block py-3 px-4 text-mineral-200 hover:bg-mineral-700 rounded-lg">Productos</a>'
            +   '<a href="' + anchor('beneficios') + '" @click="mobileMenuOpen = false" data-umami-event="nav-click" data-umami-event-item="beneficios" class="block py-3 px-4 text-mineral-200 hover:bg-mineral-700 rounded-lg">Beneficios</a>'
            +   '<a href="' + anchor('exportacion') + '" @click="mobileMenuOpen = false" data-umami-event="nav-click" data-umami-event-item="exportacion" class="block py-3 px-4 text-mineral-200 hover:bg-mineral-700 rounded-lg">Exportación</a>'
            +   '<a href="' + anchor('contacto') + '" @click="mobileMenuOpen = false" data-umami-event="nav-click" data-umami-event-item="contacto" class="block py-3 px-4 ' + mobileCtaClasses + ' rounded-lg text-center font-semibold">Contactar</a>'
            + '</div></div>'
            + '</nav>';
    }
}

/* =========================================================================
   <okomix-footer page="home|analisis|analisis-dolomita" color="oro|campo">
   ========================================================================= */
class OkomixFooter extends HTMLElement {
    connectedCallback() {
        const page  = this.getAttribute('page') || 'home';
        const color = this.getAttribute('color') || 'oro';
        const data  = FOOTER_DATA[page] || FOOTER_DATA.home;

        const hoverCls = 'hover:text-' + color + '-400';

        const linksHtml = data.links
            .map(function(l) { return '<li><a href="' + l.href + '" data-umami-event="footer-link" data-umami-event-item="' + l.text.toLowerCase().replace(/\s+/g, '-') + '" class="text-mineral-400 ' + hoverCls + ' transition-colors">' + l.text + '</a></li>'; })
            .join('');

        this.innerHTML = '<footer class="bg-mineral-800 border-t border-mineral-700 py-12">'
            + '<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">'
            + '<div class="grid md:grid-cols-4 gap-8 mb-8">'
            /* Logo + description */
            + '<div class="md:col-span-2">'
            +   '<a href="' + data.logoHref + '" class="flex items-center gap-3 mb-4">'
            +     '<div class="w-12 h-12 relative">'
            +       '<img src="images/logo.png" alt="Ökomix" class="w-full h-full object-contain relative bottom-[3px]">'
            +     '</div>'
            +     '<div class="flex flex-col leading-none">'
            +       '<span class="font-display text-2xl text-white tracking-wide">ÖKOMIX</span>'
            +       '<span class="text-[8px] text-campo-400 tracking-[0.2em] font-medium">MINERALES AGRÍCOLAS</span>'
            +     '</div>'
            +   '</a>'
            +   '<p class="text-mineral-400 max-w-md leading-relaxed">' + data.description + '</p>'
            + '</div>'
            /* Links */
            + '<div>'
            +   '<h4 class="font-semibold text-white mb-4">Enlaces</h4>'
            +   '<ul class="space-y-2">' + linksHtml + '</ul>'
            + '</div>'
            /* Contact */
            + '<div>'
            +   '<h4 class="font-semibold text-white mb-4">Contacto</h4>'
            +   '<ul class="space-y-2 text-mineral-400">'
            +     '<li>' + WHATSAPP_PHONE + '</li>'
            +     '<li>info@okomix.com.ar</li>'
            +     '<li>Argentina</li>'
            +   '</ul>'
            + '</div>'
            + '</div>'
            /* Bottom bar */
            + '<div class="border-t border-mineral-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">'
            +   '<p class="text-mineral-500 text-sm">&copy; 2024 Ökomix. Todos los derechos reservados.</p>'
            +   '<p class="text-mineral-500 text-sm">Minerales 100% naturales de origen argentino</p>'
            + '</div>'
            + '</div></footer>';
    }
}

/* =========================================================================
   <okomix-whatsapp message="Hola, quiero información...">
   ========================================================================= */
class OkomixWhatsapp extends HTMLElement {
    connectedCallback() {
        var msg = this.getAttribute('message') || 'Hola, quiero información sobre los productos de Ökomix';
        var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(msg);

        this.innerHTML = '<a href="' + url + '" target="_blank"'
            + ' data-umami-event="contact-whatsapp" data-umami-event-source="floating"'
            + ' class="fixed bottom-6 right-6 z-50 w-14 h-14 md:w-16 md:h-16 bg-[#25D366] hover:bg-[#20bd5a] rounded-full flex items-center justify-center shadow-lg whatsapp-pulse transition-transform hover:scale-110">'
            + '<svg class="w-7 h-7 md:w-8 md:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">'
            + WHATSAPP_SVG
            + '</svg></a>';
    }
}

/* ---------- Register ------------------------------------------------------ */
customElements.define('okomix-nav', OkomixNav);
customElements.define('okomix-footer', OkomixFooter);
customElements.define('okomix-whatsapp', OkomixWhatsapp);
