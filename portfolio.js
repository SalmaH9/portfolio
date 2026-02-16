// portfolio.js

// Initialize Lucide Icons
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    initApp();
});

function initApp() {
    // Register GSAP Plugins
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // Initialize all components
    initCustomCursor();
    initProgressBar();
    initNavigation();
    initParticles();
    initHeroAnimations();
    initScrollAnimations();
    initMagneticButtons();
    initMobileMenu();
    
    // Set current year
    document.getElementById('year').textContent = new Date().getFullYear();
}

// Custom Cursor
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    const hoverElements = document.querySelectorAll('[data-cursor="hover"]');

    if (window.matchMedia('(pointer: coarse)').matches) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        // Smooth follow for outer cursor
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        // Faster follow for dot
        dotX += (mouseX - dotX) * 0.5;
        dotY += (mouseY - dotY) * 0.5;
        cursorDot.style.left = dotX + 'px';
        cursorDot.style.top = dotY + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effects
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
}

// Progress Bar
function initProgressBar() {
    gsap.to('.progress-bar', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.3
        }
    });
}

// Navigation
function initNavigation() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('visible');
        } else {
            navbar.classList.remove('visible');
        }
        
        lastScroll = currentScroll;
    }, { passive: true });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobileMenu');
                if (mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                }

                gsap.to(window, {
                    duration: 1.2,
                    scrollTo: { y: target, offsetY: 80 },
                    ease: 'power3.inOut'
                });
            }
        });
    });
}

// Floating Particles
function initParticles() {
    const container = document.getElementById('particles');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        container.appendChild(particle);
    }
}

// Hero Animations
function initHeroAnimations() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Animate title lines
    tl.to('.title-line', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.2,
        delay: 0.3
    })
    .to('.title-underline', {
        width: '200px',
        duration: 0.8,
        ease: 'power2.out'
    }, '-=0.6')
    .to('.hero-badge', {
        opacity: 1,
        y: 0,
        duration: 0.8
    }, '-=0.4')
    .to('.hero-roles', {
        opacity: 1,
        y: 0,
        duration: 0.8
    }, '-=0.4')
    .to('.hero-subtitle', {
        opacity: 1,
        y: 0,
        duration: 0.8
    }, '-=0.4')
    .to('.hero-buttons', {
        opacity: 1,
        y: 0,
        duration: 0.8
    }, '-=0.4')
    .to('.scroll-indicator', {
        opacity: 1,
        duration: 0.8
    }, '-=0.2')
    .to('.side-decoration', {
        opacity: 1,
        duration: 1
    }, '-=0.5');

    // Role rotation
    const roles = document.querySelectorAll('.role');
    let currentRole = 0;

    setInterval(() => {
        roles.forEach(r => r.classList.remove('active'));
        currentRole = (currentRole + 1) % roles.length;
        roles[currentRole].classList.add('active');
    }, 3000);

    // Parallax for orbs
    gsap.to('.orb-1', {
        y: -200,
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        }
    });

    gsap.to('.orb-2', {
        y: 100,
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        }
    });
}

// Scroll Animations
function initScrollAnimations() {
    // Section headers
    gsap.utils.toArray('.section-label').forEach(label => {
        gsap.to(label, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: label,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.to(title, {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
                trigger: title,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // About section
    gsap.to('.about-image-container', {
        opacity: 1,
        x: 0,
        duration: 1,
        scrollTrigger: {
            trigger: '.about-grid',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        }
    });

    gsap.to('.experience-float', {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        delay: 0.4,
        scrollTrigger: {
            trigger: '.about-grid',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        }
    });

    gsap.to('.about-content', {
        opacity: 1,
        x: 0,
        duration: 1,
        scrollTrigger: {
            trigger: '.about-grid',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        }
    });

    // Stats counter
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach((item, index) => {
        gsap.to(item, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.15,
            scrollTrigger: {
                trigger: '.about-stats',
                start: 'top 85%',
                toggleActions: 'play none none reverse',
                onEnter: () => animateCounter(item)
            }
        });
    });

    // Timeline
    gsap.utils.toArray('.timeline-item').forEach((item, i) => {
        gsap.to(item, {
            opacity: 1,
            x: 0,
            duration: 1,
            delay: i * 0.2,
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Skills
    gsap.utils.toArray('.skill-card').forEach((card, i) => {
        gsap.to(card, {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            delay: i * 0.1,
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Projects
    gsap.utils.toArray('.project-card').forEach((card, i) => {
        gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Certificates
    gsap.utils.toArray('.certificate-card').forEach((card, i) => {
        gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.1,
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Contact
    const contactElements = ['.contact-badge', '.contact-title', '.contact-subtitle', '.contact-links', '.contact-cta'];
    contactElements.forEach((el, i) => {
        gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.15,
            scrollTrigger: {
                trigger: '.contact-container',
                start: 'top 75%',
                toggleActions: 'play none none reverse'
            }
        });
    });
}

// Counter Animation
function animateCounter(element) {
    const number = element.querySelector('.stat-number');
    const target = parseInt(number.getAttribute('data-count'));
    
    gsap.to(number, {
        innerHTML: target,
        duration: 2,
        snap: { innerHTML: 1 },
        ease: 'power2.out',
        onUpdate: function() {
            number.innerHTML = Math.round(this.targets()[0].innerHTML);
        }
    });
}

// Magnetic Buttons
function initMagneticButtons() {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const magneticElements = document.querySelectorAll('.magnetic-btn');

    magneticElements.forEach(elem => {
        elem.addEventListener('mousemove', (e) => {
            const rect = elem.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(elem, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        elem.addEventListener('mouseleave', () => {
            gsap.to(elem, {
                x: 0,
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
}

// Mobile Menu
function initMobileMenu() {
    const btn = document.getElementById('mobileMenuBtn');
    const menu = document.getElementById('mobileMenu');
    let isOpen = false;

    btn.addEventListener('click', () => {
        isOpen = !isOpen;
        menu.classList.toggle('active', isOpen);
        
        const icon = btn.querySelector('i');
        if (isOpen) {
            icon.setAttribute('data-lucide', 'x');
        } else {
            icon.setAttribute('data-lucide', 'menu');
        }
        lucide.createIcons();
    });

    // Close menu on link click
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            isOpen = false;
            menu.classList.remove('active');
            const icon = btn.querySelector('i');
            icon.setAttribute('data-lucide', 'menu');
            lucide.createIcons();
        });
    });
}

// Scroll to section helper
function scrollToSection(id) {
    const target = document.getElementById(id);
    if (target) {
        gsap.to(window, {
            duration: 1.2,
            scrollTo: { y: target, offsetY: 80 },
            ease: 'power3.inOut'
        });
    }
}

// Performance: Pause animations when tab is hidden
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        gsap.globalTimeline.pause();
    } else {
        gsap.globalTimeline.resume();
    }
});