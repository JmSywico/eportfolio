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

/* ══════════════════════════════════════════════
   BATTLE SYSTEM
   ══════════════════════════════════════════════ */

const PROJECTS = [
    {
        name: 'SCARS OF HARPUIA',
        level: 8,
        image: './images/ScarsOfHarpuia.png',
        description: 'Can two unlikely allies bring peace to a world divided by war? Explore the war-torn continent of Pananima as Rene, a renegade avian scavenger from the Outlands. Join forces with Petra and fight to prevent a growing conflict from tearing the world apart.',
        role: 'Game Engineer · Multiplayer Systems Developer · Gameplay Programmer',
        techs: ['Unity Engine', 'C# Scripting', 'Multiplayer / Netcode', 'Gameplay Systems', 'Game Engineering'],
        playUrl: 'https://www.manybees.online/scarsofharpuia',
        githubUrl: 'https://github.com/AnviHere/ScarsOfHarpuia/tree/testing',
        dialogues: {
            default:  'A powerful target appears! What will you do?',
            analyze:  'Target analyzed! This project runs on Unity with full multiplayer support — cooperative strategy is key!',
            persona:  'Tech stack revealed: Unity Engine, C# scripting, and Netcode for GameObjects detected!',
            source:   'Source vault opening... navigating to the GitHub repository!',
            attack:   'All-out attack! Launching Scars of Harpuia right now!'
        }
    },
    {
        name: 'ROOTS OF SURVIVAL',
        level: 5,
        image: './images/rootsofsurvival.png',
        description: 'Can you master the underground and thrive beneath the soil? Rely on water as your lifeline as you navigate through roots and earth, delving deeper into the heart of nature. An epic underground survival journey.',
        role: 'Gameplay Mechanics Programmer · Quality Assurance · Playtesting',
        techs: ['Unity Engine', 'C# Scripting', 'Gameplay Mechanics', 'Physics Systems', 'QA & Playtesting'],
        playUrl: 'https://vem.itch.io/rootsofsurvival',
        githubUrl: 'https://github.com/JmSywico/Game-Jam-Roots-of-Survival',
        dialogues: {
            default:  'A challenging dungeon lies ahead. Prepare yourself!',
            analyze:  'Scan complete! This underground survival game is built with Unity — water is its core survival mechanic!',
            persona:  'Skills identified: Unity, C# gameplay mechanics, and rigorous playtesting systems!',
            source:   'Cracking the code archive... GitHub repository accessed!',
            attack:   'Going underground! Launching Roots of Survival!'
        }
    },
    {
        name: 'MASK MADNESS',
        level: 4,
        image: './images/maskmadness.png',
        description: 'Dive into the Batcave armed with just a flashlight! Hunt for elusive Batman masks while dodging pesky Batarangs. Think you can handle the challenge and collect them all while staying alive?',
        role: 'Game Logic Programmer · Game Mechanics · Quality Assurance',
        techs: ['Unity Engine', 'C# Scripting', 'Game Logic Design', 'Collision Mechanics', 'Quality Assurance'],
        playUrl: 'https://vem.itch.io/mask-madness',
        githubUrl: 'https://github.com/JmSywico/Game-Jam-Roots-of-Survival',
        dialogues: {
            default:  'The darkness of the Batcave looms. Stay sharp!',
            analyze:  'Analysis complete! Stealth and reflexes are key — avoid the Batarangs to survive!',
            persona:  'Tech revealed: Unity, C# game logic, and precise collision detection mechanics!',
            source:   'Accessing the code archive... GitHub repository opening!',
            attack:   'Into the shadows! Launching Mask Madness!'
        }
    },
    {
        name: 'MYTHOS MANUSCRIPTS',
        level: 6,
        image: './images/mythosmanuscript.png',
        description: 'A narrative puzzle experience where players explore classic myths such as The Odyssey, uncovering hidden keywords embedded within the text. Blending literature with interactive discovery across interconnected stories.',
        role: 'Lead Programmer · Game Logic Implementation · Game Mechanics · QA',
        techs: ['Unity Engine', 'C# Scripting', 'Lead Programmer', 'Custom Game Logic', 'Narrative Systems'],
        playUrl: 'https://jmsywico.itch.io/mythos-manuscripts',
        githubUrl: 'https://github.com/JmSywico/Mythos-Manuscripts',
        dialogues: {
            default:  'Ancient texts surround you. Knowledge is your weapon here!',
            analyze:  'Study complete! This narrative puzzle game weaves Greek mythology into interactive discovery!',
            persona:  'Skills mapped: Lead Programmer role, Unity, C#, and custom logic systems!',
            source:   'Deciphering the manuscript... GitHub repository opening!',
            attack:   'Unlocking ancient knowledge! Opening Mythos Manuscripts!'
        }
    },
    {
        name: 'THE BATCAVE',
        level: 3,
        image: './images/batcave.png',
        description: "Check out the virtual environment created using Unity Engine! Dive into the Batcave and see how creativity and technical skills brought Gotham's ultimate hideout to life with stunning 3D level design.",
        role: 'Level Designer · Asset Layout · Quality Assurance',
        techs: ['Unity Engine 3D', 'Level Design', 'Asset Layout', '3D Environments', 'Quality Assurance'],
        playUrl: 'https://drive.google.com/file/d/16a0OsJdyYsmQfuZj22KgStfr3CL1Oqf4/view?usp=sharing',
        githubUrl: null,
        dialogues: {
            default:  "Gotham's greatest hideout... even Batman would be impressed!",
            analyze:  'Environment scan: A 3D Unity level faithfully recreating the iconic Batcave with custom asset placement!',
            persona:  'Skills mapped: Level design mastery, Unity 3D, and meticulous asset layout techniques!',
            source:   "No public source code — the magic is in the level design itself!",
            attack:   'Entering the Batcave! Opening the video walkthrough!'
        }
    },
    {
        name: 'AGAIN?',
        level: 5,
        image: './images/again.png',
        description: 'Can you outsmart the facility and break free? Navigate locked corridors, rewinding time to correct mistakes and push closer to freedom. Every decision matters in this tense escape puzzle.',
        role: 'Gameplay Mechanics Programmer · Quality Assurance · Playtesting',
        techs: ['Unity Engine', 'C# Scripting', 'Time Rewind Systems', 'Gameplay Mechanics', 'QA & Playtesting'],
        playUrl: 'https://zarbana.itch.io/again',
        githubUrl: 'https://github.com/JmSywico/IEPRFDV_Again',
        dialogues: {
            default:  'Time rewinds, walls close in... Think fast, Joker!',
            analyze:  'Target intel: A puzzle-escape game with time manipulation — rewind your way to freedom!',
            persona:  'Systems detected: Unity, C#, and a custom time-rewind mechanic that changes everything!',
            source:   'Rewinding through the code... GitHub repository unlocked!',
            attack:   'No looking back! Launching Again?!'
        }
    }
];

const PARTY = [
    { name: 'JOKER',  init: 'JM', hp: 121, maxHp: 121, sp: 50, maxSp: 58 },
    { name: 'SKULL',  init: 'C#', hp: 108, maxHp: 108, sp: 38, maxSp: 40 },
    { name: 'PANTHER', init: 'UN', hp: 95, maxHp: 95,  sp: 62, maxSp: 62 },
    { name: 'MONA',   init: 'QA', hp: 82, maxHp: 82,   sp: 55, maxSp: 55 },
];

/* State */
let currentIdx = 0;
let isSwitching = false;

/* DOM */
const bName      = document.getElementById('b-name');
const bLevel     = document.getElementById('b-level');
const bImage     = document.getElementById('b-image');
const bTags      = document.getElementById('b-tags');
const bDialogue  = document.getElementById('b-dialogue-text');
const bInfoLabel = document.getElementById('b-info-label');
const bInfoBody  = document.getElementById('b-info-body');
const bIndicator = document.getElementById('b-indicator');
const bPrev      = document.getElementById('b-prev');
const bNext      = document.getElementById('b-next');
const bAllOut    = document.getElementById('b-all-out');
const partyHud   = document.getElementById('battle-party');
const aoOverlay  = document.getElementById('all-out-overlay');

function initBattle() {
    if (!bName) return;
    buildPartyHUD();
    buildIndicators();
    loadProject(0, false);
    document.querySelectorAll('.battle-menu__item').forEach(btn => {
        btn.addEventListener('click', () => handleAction(btn.dataset.action));
    });
    bPrev && bPrev.addEventListener('click', () => navigate(-1));
    bNext && bNext.addEventListener('click', () => navigate(1));
    bAllOut && bAllOut.addEventListener('click', () => allOutAttack(PROJECTS[currentIdx].playUrl));
    /* Keyboard: left/right arrows navigate, 1-4 trigger actions */
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        if (e.key === 'ArrowLeft')  navigate(-1);
        if (e.key === 'ArrowRight') navigate(1);
        if (e.key === '1') handleAction('analyze');
        if (e.key === '2') handleAction('persona');
        if (e.key === '3') handleAction('source');
        if (e.key === '4') handleAction('attack');
    });
}

function buildPartyHUD() {
    if (!partyHud) return;
    partyHud.innerHTML = PARTY.map(p => `
        <div class="battle-party__member">
            <div class="battle-party__portrait">${p.init}</div>
            <div class="battle-party__name">${p.name}</div>
            <div class="battle-party__bars">
                <div class="battle-party__bar-row">
                    <span class="battle-bar-label">HP</span>
                    <div class="battle-bar battle-bar--hp"><div class="battle-bar__fill" style="width:${Math.round(p.hp/p.maxHp*100)}%"></div></div>
                    <span class="battle-bar-num">${p.hp}/${p.maxHp}</span>
                </div>
                <div class="battle-party__bar-row">
                    <span class="battle-bar-label">SP</span>
                    <div class="battle-bar battle-bar--sp"><div class="battle-bar__fill" style="width:${Math.round(p.sp/p.maxSp*100)}%"></div></div>
                    <span class="battle-bar-num">${p.sp}/${p.maxSp}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function buildIndicators() {
    if (!bIndicator) return;
    bIndicator.innerHTML = PROJECTS.map((p, i) => `
        <div class="battle-indicator-dot${i === 0 ? ' active' : ''}" data-index="${i}" title="${p.name}"></div>
    `).join('');
    bIndicator.querySelectorAll('.battle-indicator-dot').forEach(dot => {
        dot.addEventListener('click', () => {
            const i = parseInt(dot.dataset.index);
            if (i !== currentIdx) switchTo(i);
        });
    });
}

function loadProject(idx, animate) {
    const p = PROJECTS[idx];
    if (animate && bImage) {
        bImage.classList.add('switching');
        if (bName) bName.style.opacity = '0';
    }
    const delay = animate ? 280 : 0;
    setTimeout(() => {
        if (bName)  { bName.textContent  = p.name;  bName.style.opacity = '1'; }
        if (bLevel) bLevel.textContent = `LV ${p.level}`;
        if (bImage) {
            bImage.src = p.image;
            bImage.alt = p.name;
            bImage.classList.remove('switching');
        }
        setDialogue(p.dialogues.default);
        resetInfoPanel();
        buildTechTags(p.techs);
        document.querySelectorAll('.battle-indicator-dot').forEach((d, i) =>
            d.classList.toggle('active', i === idx)
        );
    }, delay);
}

function buildTechTags(techs) {
    if (!bTags) return;
    const positions = [
        { top: '12%', left: '4%'   },
        { top: '28%', right: '3%'  },
        { top: '58%', left: '6%'   },
        { top: '74%', right: '5%'  },
        { top: '5%',  right: '14%' },
    ];
    bTags.innerHTML = techs.slice(0, 5).map((tech, i) => {
        const pos = positions[i] || { top: `${20 + i * 15}%`, left: '5%' };
        const style = Object.entries(pos).map(([k, v]) => `${k}:${v}`).join(';');
        return `<span class="battle-tech-tag" style="${style};--delay:${i * 0.9}s">${tech}</span>`;
    }).join('');
}

function setDialogue(text) {
    if (!bDialogue) return;
    bDialogue.textContent = '';
    let i = 0;
    const tick = () => {
        if (i < text.length) {
            bDialogue.textContent += text[i++];
            setTimeout(tick, 22);
        }
    };
    tick();
}

function resetInfoPanel() {
    if (bInfoLabel) bInfoLabel.textContent = 'SELECT AN ACTION';
    if (bInfoBody)  bInfoBody.innerHTML = '<p class="battle-info__hint">Press ANALYZE to read about this project, PERSONA to see the tech stack, SOURCE to view the code, or ATTACK to play it.</p>';
}

function handleAction(action) {
    const p = PROJECTS[currentIdx];
    setDialogue(p.dialogues[action] || p.dialogues.default);

    if (action === 'analyze') {
        if (bInfoLabel) bInfoLabel.textContent = 'ANALYZE';
        if (bInfoBody)  bInfoBody.innerHTML = `
            <p>${p.description}</p>
            <p class="battle-info__role">${p.role}</p>
        `;
    } else if (action === 'persona') {
        if (bInfoLabel) bInfoLabel.textContent = 'TECH STACK';
        if (bInfoBody)  bInfoBody.innerHTML = `
            <p style="font-family:var(--font-mono);font-size:1.15rem;color:var(--p5-light-gray);margin-bottom:0.5rem;">SKILLS DETECTED:</p>
            <ul class="battle-skill-list">
                ${p.techs.map(t => `<li>${t}</li>`).join('')}
            </ul>
        `;
    } else if (action === 'source') {
        if (p.githubUrl) {
            if (bInfoLabel) bInfoLabel.textContent = 'SOURCE CODE';
            if (bInfoBody)  bInfoBody.innerHTML = `
                <p>Source code is available for this project.</p>
                <a href="${p.githubUrl}" target="_blank" class="battle-info__link">OPEN GITHUB ▶</a>
            `;
            setTimeout(() => window.open(p.githubUrl, '_blank'), 900);
        } else {
            if (bInfoLabel) bInfoLabel.textContent = 'SOURCE CODE';
            if (bInfoBody)  bInfoBody.innerHTML = `<p>Source code is not publicly available for this project — the craft is in the craft itself!</p>`;
        }
    } else if (action === 'attack') {
        allOutAttack(p.playUrl);
    }
}

function navigate(dir) {
    if (isSwitching) return;
    switchTo((currentIdx + dir + PROJECTS.length) % PROJECTS.length);
}

function switchTo(newIdx) {
    if (isSwitching || newIdx === currentIdx) return;
    isSwitching = true;
    currentIdx = newIdx;
    loadProject(newIdx, true);
    setTimeout(() => { isSwitching = false; }, 450);
}

function allOutAttack(url) {
    if (!aoOverlay) { window.open(url, '_blank'); return; }
    aoOverlay.classList.add('active');
    setTimeout(() => window.open(url, '_blank'), 750);
    setTimeout(() => aoOverlay.classList.remove('active'), 1900);
}

/* Boot once DOM is ready */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBattle);
} else {
    initBattle();
}
