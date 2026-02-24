/* ==========================================================================
   Ökomix - Main JavaScript
   ========================================================================== */

/**
 * Click handler for data-umami-event attributes.
 * Needed because data-auto-track="false" disables Umami's built-in handler.
 */
document.addEventListener('click', function(e) {
    var el = e.target.closest('[data-umami-event]');
    if (!el || !window.umami) return;
    var name = el.getAttribute('data-umami-event');
    var data = {};
    for (var i = 0; i < el.attributes.length; i++) {
        var attr = el.attributes[i];
        if (attr.name.startsWith('data-umami-event-')) {
            data[attr.name.slice(17)] = attr.value;
        }
    }
    umami.track(name, Object.keys(data).length ? data : undefined);
});

/**
 * Identify session with referrer/campaign params for Umami
 */
(function() {
    if (!window.umami) return;
    var params = new URLSearchParams(window.location.search);
    var keys = ['ref', 'utm_source', 'utm_medium', 'utm_campaign'];
    var data = {};
    var hasData = false;
    keys.forEach(function(key) {
        var val = params.get(key);
        if (val) { data[key] = val; hasData = true; }
    });
    if (hasData) umami.identify(data);
})();

/**
 * Engagement timer — tracks active time on page (15s, 30s, 60s, 120s)
 */
(function() {
    if (!window.umami) return;
    var milestones = [15, 30, 60, 120];
    var elapsed = 0;
    var index = 0;
    var timer = setInterval(function() {
        if (index >= milestones.length) { clearInterval(timer); return; }
        if (document.visibilityState !== 'visible') return;
        elapsed++;
        if (elapsed === milestones[index]) {
            umami.track('engagement', { seconds: milestones[index] });
            index++;
        }
    }, 1000);
})();

/**
 * Scroll depth tracking — 25%, 50%, 75%, 100%
 */
(function() {
    if (!window.umami) return;
    var reached = {};
    window.addEventListener('scroll', function() {
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight <= 0) return;
        var percent = Math.round((window.scrollY / docHeight) * 100);
        var milestones = [25, 50, 75, 100];
        for (var i = 0; i < milestones.length; i++) {
            if (percent >= milestones[i] && !reached[milestones[i]]) {
                reached[milestones[i]] = true;
                umami.track('scroll-depth', { percent: milestones[i] });
            }
        }
    }, { passive: true });
})();

/**
 * Hide loader when page is fully loaded
 */
window.addEventListener('load', function() {
    var loader = document.getElementById('loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(function() {
            loader.style.display = 'none';
        }, 500);
    }

    // Scroll section tracking con Umami
    if (window.umami) {
        var sections = ['hero','productos','beneficios','exportacion','contacto'];
        var obs = new IntersectionObserver(function(entries) {
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
