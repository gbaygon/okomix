// AOS — init immediately (defer scripts run after DOM parsing, so DOM is ready)
import AOS from 'aos';
window.AOS = AOS;
AOS.init({ duration: 800, easing: 'ease-out-cubic', once: true, offset: 50 });

// Web Components — must register before Alpine scans the DOM
import './components.js';

// App init (loader + Umami tracking)
import './main.js';

// SPA Router
import { routerData } from './router.js';

// Alpine.js — LAST. Scans the DOM after Web Components
// have injected their directives (x-data, x-show, etc.)
import Alpine from 'alpinejs';
window.Alpine = Alpine;
Alpine.data('router', routerData);
Alpine.start();
