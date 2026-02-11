/* ==========================================================================
   Ökomix - Main JavaScript
   ========================================================================== */

/**
 * Initialize AOS (Animate on Scroll)
 */
document.addEventListener('DOMContentLoaded', function() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 50
        });
    }
});

/**
 * Hide loader when page is fully loaded
 */
window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }

    // Scroll section tracking con Umami
    if (window.umami) {
        const sections = ['hero','productos','beneficios','exportacion','contacto'];
        const obs = new IntersectionObserver(function(entries) {
            entries.forEach(function(e) {
                if (e.isIntersecting) {
                    umami.track('section-view', { section: e.target.id });
                    obs.unobserve(e.target);
                }
            });
        }, { threshold: 0.3 });
        sections.forEach(function(id) {
            var el = document.getElementById(id);
            if (el) obs.observe(el);
        });
    }
});
