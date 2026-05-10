// ── AOS (Animate On Scroll) ──
AOS.init({ duration: 900, once: true, offset: 80, easing: 'ease-out-quart' });

// ── CUSTOM CURSOR ──
const dot  = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

(function animateCursor() {
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
    rx += (mx - rx) * 0.14; ry += (my - ry) * 0.14;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(animateCursor);
})();

// ── PARTICLE CANVAS ──
(function () {
    const canvas = document.getElementById('canvas-bg');
    const ctx = canvas.getContext('2d');
    let W, H, particles = [];

    function resize() {
        W = canvas.width  = canvas.offsetWidth;
        H = canvas.height = canvas.offsetHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    for (let i = 0; i < 80; i++) {
        particles.push({
            x:     Math.random() * 1920,
            y:     Math.random() * 1080,
            r:     Math.random() * 1.5 + 0.3,
            vx:    (Math.random() - 0.5) * 0.25,
            vy:    (Math.random() - 0.5) * 0.25,
            alpha: Math.random() * 0.4 + 0.05
        });
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);

        // Subtle radial glow
        const grd = ctx.createRadialGradient(W * 0.75, H * 0.3, 0, W * 0.75, H * 0.3, W * 0.55);
        grd.addColorStop(0, 'rgba(192,24,44,0.06)');
        grd.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, W, H);

        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x % W, p.y % H, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(192,24,44,${p.alpha})`;
            ctx.fill();
            p.x += p.vx; p.y += p.vy;
            if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
            if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        });

        requestAnimationFrame(draw);
    }
    draw();
})();

// ── MOBILE MENU ──
const mobileMenu = document.getElementById('mobile-menu');

function openMenu() {
    mobileMenu.classList.remove('hidden');
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden'; // cegah scroll saat menu terbuka
}
function closeMenu() {
    mobileMenu.classList.add('hidden');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
}

document.getElementById('menuToggle').addEventListener('click', openMenu);
document.getElementById('menuClose').addEventListener('click', closeMenu);

// Tutup menu saat salah satu link diklik
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
});

// ── DATA PROFIL ──
const profile = {
    name: "Rafli Khalifah Rahman",
    hardSkills: [
        "HTML5 & CSS3",
        "JavaScript (ES6+)",
        "PHP & MySQL",
        "Laravel Framework",
        "Flutter Mobile",
        "Prompt Engineering"
    ],
    softSkills: [
        "Problem Solving",
        "Strategic Planning",
        "Project Management",
        "Team Collaboration",
        "Time Efficiency"
    ]
};

// ── RENDER SKILLS ──
function renderPortfolio() {
    const hc = document.getElementById('hard-skill-container');
    const sc = document.getElementById('soft-skill-container');

    if (hc) {
        hc.innerHTML = profile.hardSkills
            .map(s => `<span class="skill-pill"><span class="dot"></span>${s}</span>`)
            .join('');
    }
    if (sc) {
        sc.innerHTML = profile.softSkills
            .map(s => `<span class="skill-pill"><span class="dot"></span>${s}</span>`)
            .join('');
    }
}

// ── FETCH JOKE ──
async function fetchJoke() {
    const jokeDisplay = document.getElementById('joke-content');
    jokeDisplay.style.opacity = 0.3;
    jokeDisplay.textContent = 'Sedang berpikir keras…';

    try {
        const res  = await fetch('https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit');
        const data = await res.json();
        const text = data.type === 'single'
            ? data.joke
            : `${data.setup}\n\n— ${data.delivery}`;
        jokeDisplay.style.opacity = 1;
        jokeDisplay.textContent = text;
    } catch {
        jokeDisplay.textContent = 'Oops, server lelucon sedang down. Programmernya lagi debugging.';
        jokeDisplay.style.opacity = 1;
    }
}

// ── CONTACT FORM ──
document.getElementById('contactForm').addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('nama').value;
    alert(`Terima kasih ${name}! Pesan Anda telah terkirim (simulasi). Saya akan segera menghubungi Anda.`);
    e.target.reset();
});

// ── REFRESH JOKE BUTTON ──
document.getElementById('refreshJokeBtn').addEventListener('click', fetchJoke);

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
    });
});

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
    renderPortfolio();
    fetchJoke();
});