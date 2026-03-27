/* ========================================
   SAHAR MOGHIMIAN HOOSH — Main JavaScript
   Futuristic Signal Vibes
   ======================================== */

// ─── Wave Canvas Animation ───────────────────────────
(function initWaveCanvas() {
    const canvas = document.getElementById('waveCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function drawWave(yOffset, amplitude, frequency, speed, color, lineWidth) {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;

        for (let x = 0; x < canvas.width; x++) {
            const y = yOffset +
                Math.sin(x * frequency + time * speed) * amplitude +
                Math.sin(x * frequency * 0.5 + time * speed * 1.3) * amplitude * 0.5;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }

        ctx.stroke();
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const centerY = canvas.height * 0.5;

        // Multiple signal-like waves
        drawWave(centerY - 60, 30, 0.008, 0.8, 'rgba(99, 102, 241, 0.2)', 1.5);
        drawWave(centerY, 40, 0.006, 0.6, 'rgba(51, 102, 255, 0.15)', 2);
        drawWave(centerY + 50, 25, 0.01, 1.0, 'rgba(124, 58, 237, 0.12)', 1);
        drawWave(centerY - 30, 20, 0.012, 1.2, 'rgba(8, 145, 178, 0.1)', 1);
        drawWave(centerY + 80, 35, 0.007, 0.5, 'rgba(139, 92, 246, 0.1)', 1.5);

        // Subtle grid lines
        ctx.strokeStyle = 'rgba(99, 102, 241, 0.05)';
        ctx.lineWidth = 0.5;
        for (let y = 0; y < canvas.height; y += 60) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }
        for (let x = 0; x < canvas.width; x += 60) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }

        // Floating particles
        for (let i = 0; i < 30; i++) {
            const px = (Math.sin(time * 0.3 + i * 2.1) * 0.5 + 0.5) * canvas.width;
            const py = (Math.cos(time * 0.2 + i * 1.7) * 0.5 + 0.5) * canvas.height;
            const size = Math.sin(time + i) * 1.5 + 2;
            const alpha = Math.sin(time * 0.5 + i) * 0.12 + 0.12;

            ctx.beginPath();
            ctx.arc(px, py, size, 0, Math.PI * 2);
            ctx.fillStyle = i % 2 === 0
                ? `rgba(99, 102, 241, ${alpha})`
                : `rgba(124, 58, 237, ${alpha})`;
            ctx.fill();
        }

        time += 0.015;
        animationId = requestAnimationFrame(animate);
    }

    resize();
    window.addEventListener('resize', resize);
    animate();

    // Pause when not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            animate();
        }
    });
})();


// ─── Typing Effect ───────────────────────────────────
(function initTypingEffect() {
    const element = document.getElementById('typingText');
    if (!element) return;

    const roles = [
        'PhD Researcher @ Skoltech',
        'Project Manager @ MoniSensa',
        'Energy Systems Engineer',
        'NILM Researcher',
        'Signal Processing Enthusiast'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeout;

    function type() {
        const current = roles[roleIndex];

        if (isDeleting) {
            element.textContent = current.substring(0, charIndex - 1);
            charIndex--;
        } else {
            element.textContent = current.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? 30 : 60;

        if (!isDeleting && charIndex === current.length) {
            speed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            speed = 400;
        }

        timeout = setTimeout(type, speed);
    }

    type();
})();


// ─── Navbar Scroll Effect ────────────────────────────
(function initNavScroll() {
    const nav = document.getElementById('nav');
    if (!nav) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        nav.classList.toggle('scrolled', scrollY > 50);
        lastScroll = scrollY;
    }, { passive: true });
})();


// ─── Mobile Navigation ──────────────────────────────
(function initMobileNav() {
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');
    if (!toggle || !links) return;

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        links.classList.toggle('open');
    });

    // Close menu when clicking a link
    links.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            links.classList.remove('open');
        });
    });
})();


// ─── Scroll Reveal Animation ─────────────────────────
(function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger the animation
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 80);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(el => observer.observe(el));
})();


// ─── Animated Counters ───────────────────────────────
(function initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.target);
                const duration = 1500;
                const start = Date.now();

                function update() {
                    const elapsed = Date.now() - start;
                    const progress = Math.min(elapsed / duration, 1);
                    // Ease out
                    const eased = 1 - Math.pow(1 - progress, 3);
                    el.textContent = Math.round(target * eased);

                    if (progress < 1) {
                        requestAnimationFrame(update);
                    } else {
                        el.textContent = target;
                    }
                }

                update();
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
})();


// ─── Skill Bars Animation ────────────────────────────
(function initSkillBars() {
    const fills = document.querySelectorAll('.skill-fill[data-width]');
    if (!fills.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                el.style.width = el.dataset.width + '%';
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.3 });

    fills.forEach(el => observer.observe(el));
})();


// ─── Publication Filters ─────────────────────────────
(function initPubFilters() {
    const filters = document.querySelectorAll('.pub-filter');
    const cards = document.querySelectorAll('.pub-card');
    if (!filters.length || !cards.length) return;

    filters.forEach(btn => {
        btn.addEventListener('click', () => {
            filters.forEach(f => f.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            cards.forEach(card => {
                if (filter === 'all') {
                    card.classList.remove('hidden');
                    card.style.display = '';
                } else {
                    const categories = card.dataset.category || '';
                    if (categories.includes(filter)) {
                        card.classList.remove('hidden');
                        card.style.display = '';
                    } else {
                        card.classList.add('hidden');
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
})();


// ─── Smooth Scroll for Anchor Links ──────────────────
(function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
})();


// ─── Lightbox (for Blog Gallery) ─────────────────────
function openLightbox(element) {
    const img = element.querySelector('img');
    if (!img) return;

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    if (!lightbox || !lightboxImg) return;

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || 'Photo';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
});


// ─── Active Navigation Link Highlight ────────────────
(function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.toggle('active',
                        link.getAttribute('href') === `#${id}`
                    );
                });
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-80px 0px -50% 0px'
    });

    sections.forEach(section => observer.observe(section));
})();
