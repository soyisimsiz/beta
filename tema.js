/* Beta Yapı — tema.js: kaydırma animasyonları ve küçük iyileştirmeler */
(function () {
    'use strict';

    // JS çalışıyorsa animasyon modunu aç (JS yoksa içerik asla gizlenmez)
    document.documentElement.classList.add('anim-ready');

    function hazir(fn) {
        if (document.readyState !== 'loading') fn();
        else document.addEventListener('DOMContentLoaded', fn);
    }

    hazir(function () {
        // Animasyon uygulanacak öğeler
        var secici = [
            '.card', '.process-step', '.stat-item', '.about-text', '.about-img',
            '.faq details', '.faq-item', '.cta-box', '.internal-links',
            'section > h2', '.container > h2', '.container > table',
            '#ilceler-grid > a'
        ].join(',');

        var ogeler = Array.prototype.slice.call(document.querySelectorAll(secici));
        ogeler.forEach(function (el) { el.classList.add('reveal'); });

        if (!('IntersectionObserver' in window)) {
            ogeler.forEach(function (el) { el.classList.add('gorunur'); });
            return;
        }

        var gozlemci = new IntersectionObserver(function (girisler) {
            girisler.forEach(function (g) {
                if (g.isIntersecting) {
                    g.target.classList.add('gorunur');
                    gozlemci.unobserve(g.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        ogeler.forEach(function (el) { gozlemci.observe(el); });

        // Görünüm alanına ilk anda girenler hemen görünsün
        setTimeout(function () {
            ogeler.forEach(function (el) {
                var r = el.getBoundingClientRect();
                if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('gorunur');
            });
        }, 120);
    });
})();
