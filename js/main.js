/* ============================================
   AHMED GONGI — PORTFOLIO SCRIPTS
   ============================================ */

(function () {
    'use strict';

    // ─── Navbar Scroll Effect ─────────────────────
    const navbar = document.getElementById('navbar');

    function handleNavbarScroll() {
        if (!navbar) return;
        // On inner pages, navbar already has "scrolled" class
        if (navbar.classList.contains('scrolled') && !document.querySelector('.hero')) return;

        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll(); // Run on load

    // ─── Mobile Nav Toggle ─────────────────────────
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function () {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('open');
        });

        // Close mobile nav on link click
        navLinks.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                navToggle.classList.remove('active');
                navLinks.classList.remove('open');
            });
        });
    }

    // ─── Typed.js – Hero Page ──────────────────────
    const typedOutput = document.getElementById('typed-output');
    if (typedOutput && typeof Typed !== 'undefined') {
        new Typed('#typed-output', {
            strings: [
                'AI Engineer',
                'Generative AI Specialist',
                'LLM & RAG Expert',
                'Machine Learning Engineer',
                'Data Scientist'
            ],
            typeSpeed: 60,
            backSpeed: 30,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }

    // ─── Scroll Reveal Animations ──────────────────
    function initScrollReveal() {
        const revealTargets = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger-children');

        if (!revealTargets.length) return;

        const observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        revealTargets.forEach(function (el) {
            observer.observe(el);
        });
    }

    initScrollReveal();

    // ─── Project Filters ───────────────────────────
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterBtns.length && projectCards.length) {
        filterBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                // Update active button
                filterBtns.forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                projectCards.forEach(function (card) {
                    const categories = card.getAttribute('data-category') || '';

                    if (filter === 'all' || categories.includes(filter)) {
                        card.style.display = '';
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';

                        // Animate in
                        setTimeout(function () {
                            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.95)';
                        setTimeout(function () {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // ─── Smooth Scroll for anchor links ────────────
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;

            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ─── Active Nav Link Highlight ─────────────────
    // Already handled by adding 'active' class in HTML per-page

    // ─── Parallax Orbs (subtle mouse movement) ─────
    const orbs = document.querySelectorAll('.orb');

    if (orbs.length && window.innerWidth > 768) {
        document.addEventListener('mousemove', function (e) {
            var x = (e.clientX / window.innerWidth - 0.5) * 2;
            var y = (e.clientY / window.innerHeight - 0.5) * 2;

            orbs.forEach(function (orb, index) {
                var speed = (index + 1) * 15;
                orb.style.transform = 'translate(' + (x * speed) + 'px, ' + (y * speed) + 'px)';
            });
        });
    }

    // ─── Counter Animation (Hero Stats) ────────────
    function animateCounters() {
        var counters = document.querySelectorAll('.hero-stat .number');

        counters.forEach(function (counter) {
            var text = counter.textContent;
            var match = text.match(/(\d+)/);
            if (!match) return;

            var target = parseInt(match[0]);
            var suffix = text.replace(match[0], '');
            var duration = 2000;
            var startTime = null;

            function step(timestamp) {
                if (!startTime) startTime = timestamp;
                var progress = Math.min((timestamp - startTime) / duration, 1);
                var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
                var current = Math.floor(eased * target);
                counter.textContent = current + suffix;

                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    counter.textContent = target + suffix;
                }
            }

            // Trigger when hero section is visible
            var heroSection = document.querySelector('.hero');
            if (heroSection) {
                var obs = new IntersectionObserver(function (entries) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                            requestAnimationFrame(step);
                            obs.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.3 });
                obs.observe(heroSection);
            }
        });
    }

    animateCounters();

})();
