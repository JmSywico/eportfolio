/* ============================================
   PERSONA 5 — DEVELOPER EDITION
   ============================================ */

/* ── Keyboard tab focus ── */
const handleFirstTab = (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('user-is-tabbing');
        window.removeEventListener('keydown', handleFirstTab);
        window.addEventListener('mousedown', handleMouseDownOnce);
    }
};

const handleMouseDownOnce = () => {
    document.body.classList.remove('user-is-tabbing');
    window.removeEventListener('mousedown', handleMouseDownOnce);
    window.addEventListener('keydown', handleFirstTab);
};

window.addEventListener('keydown', handleFirstTab);

/* ── Boot Screen ── */
const bootScreen = document.getElementById('boot-screen');

const dismissBoot = () => {
    bootScreen.classList.add('dismissed');
    startTypewriter();
    setTimeout(() => { bootScreen.style.display = 'none'; }, 900);
};

if (bootScreen) {
    window.addEventListener('keydown', dismissBoot, { once: true });
    bootScreen.addEventListener('click', dismissBoot, { once: true });
}

/* ── Typewriter for header eyebrow ── */
function startTypewriter() {
    const el = document.getElementById('header-eyebrow');
    if (!el) return;
    const fullText = 'PHANTOM DEVELOPER // GAME ENGINEER';
    el.textContent = '';
    el.style.borderRight = '2px solid #FF0000';

    let i = 0;
    const tick = () => {
        if (i < fullText.length) {
            el.textContent += fullText[i++];
            setTimeout(tick, 50);
        } else {
            el.style.borderRight = 'none';
        }
    };
    setTimeout(tick, 200);
}

/* ── Back to Top ── */
const backToTopButton = document.querySelector('.back-to-top');
let backToTopVisible = false;

const setBackToTopVisibility = (show) => {
    backToTopButton.style.visibility = show ? 'visible' : 'hidden';
    backToTopButton.style.opacity   = show ? 1 : 0;
    backToTopButton.style.transform = show ? 'scale(1)' : 'scale(0)';
};

window.addEventListener('scroll', () => {
    const shouldShow = window.scrollY > 700;
    if (shouldShow !== backToTopVisible) {
        backToTopVisible = shouldShow;
        setBackToTopVisibility(backToTopVisible);
    }
});

/* ── Nav shadow on scroll ── */
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 50
        ? '0 4px 24px rgba(255,0,0,0.18)'
        : 'none';
});

/* ── Scroll Reveal ── */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── Stat Bar Animation ── */
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fill = entry.target;
            const target = fill.dataset.fill || 0;
            fill.style.width = '0%';
            // Small delay so the reveal transition finishes first
            setTimeout(() => {
                fill.style.width = target + '%';
            }, 300);
            statObserver.unobserve(fill);
        }
    });
}, { threshold: 0.4 });

document.querySelectorAll('.stat-item__fill').forEach(el => statObserver.observe(el));
