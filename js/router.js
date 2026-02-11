/* ==========================================================================
   Ökomix — SPA Router (hash-based)
   Routes: #/analisis, #/analisis-dolomita → subpages
   Anchors: #productos, #beneficios, etc. → home + scroll
   ========================================================================== */

export function routerData() {
    return {
        currentPage: 'home',

        get navColor() {
            return this.currentPage === 'analisis-dolomita' ? 'campo' : 'oro';
        },

        get whatsappMessage() {
            var messages = {
                home: 'Hola, quiero información sobre los productos de Ökomix',
                analisis: 'Hola, quiero información sobre el yeso agrícola de Ökomix',
                'analisis-dolomita': 'Hola, quiero información sobre la dolomita de Ökomix'
            };
            return messages[this.currentPage] || messages.home;
        },

        init() {
            this._navigate(window.location.hash);
            window.addEventListener('hashchange', () => {
                this._navigate(window.location.hash);
            });
        },

        _navigate(hash) {
            var raw = hash.replace(/^#/, '');

            if (raw.startsWith('/')) {
                var page = raw.slice(1);
                this.currentPage = (page === 'analisis' || page === 'analisis-dolomita') ? page : 'home';
                this._onPageChange();
            } else {
                var wasHome = this.currentPage === 'home';
                this.currentPage = 'home';
                if (!wasHome) this._onPageChange();
                if (raw) {
                    this.$nextTick(() => {
                        var el = document.getElementById(raw);
                        if (el) {
                            el.scrollIntoView({ behavior: 'smooth' });
                            setTimeout(function() {
                                if (window.AOS) AOS.refresh();
                            }, 600);
                        }
                    });
                }
            }
            this._updateMeta();
        },

        _onPageChange() {
            // 'instant' overrides CSS scroll-behavior:smooth
            // so it doesn't fight with a subsequent scrollIntoView
            window.scrollTo({ top: 0, behavior: 'instant' });
            this.$nextTick(() => {
                // Reset AOS so animations replay on page switch
                document.querySelectorAll('[data-aos]').forEach(function(el) {
                    el.classList.remove('aos-init', 'aos-animate');
                });
                if (window.AOS) {
                    AOS.init({ duration: 800, easing: 'ease-out-cubic', once: true, offset: 50 });
                }
                // Umami virtual pageview
                if (window.umami) {
                    var pagePath = this.currentPage === 'home' ? '/' : '/' + this.currentPage;
                    umami.track(function(props) { return Object.assign({}, props, { url: pagePath }); });
                }
            });
        },

        _updateMeta() {
            var titles = {
                home: 'Ökomix | Yeso Agrícola y Dolomita Premium',
                analisis: 'Análisis de Yeso Agrícola | Ökomix',
                'analisis-dolomita': 'Análisis de Dolomita | Ökomix'
            };
            var descriptions = {
                home: 'Ökomix - Yeso Agrícola y Dolomita de alta pureza. Mejore el rendimiento de sus cultivos con minerales de origen natural. Exportamos a Mercosur y el mundo.',
                analisis: 'Yeso Agrícola Ökomix — hasta 97% de pureza, 18% azufre, sin sodio ni aluminio. Analizado por INTEMA-CONICET.',
                'analisis-dolomita': 'Dolomita Ökomix — 96% de pureza, CaO 32.6%, MgO 16.2%. Analizada por CEQUIMAP, Universidad Nacional de Córdoba.'
            };
            document.title = titles[this.currentPage] || titles.home;
            var metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) metaDesc.setAttribute('content', descriptions[this.currentPage] || descriptions.home);
        }
    };
}
