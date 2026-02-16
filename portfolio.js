// Main JavaScript for Multi-Page Portfolio with Dark/Light Mode

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    initApp();
});

function initApp() {
    // Register GSAP Plugins
    gsap.registerPlugin(ScrollTrigger);

    // Initialize components
    initTheme();
    initCustomCursor();
    initNavigation();
    initParticles();
    initPageAnimations();
    initMobileMenu();
    initLanguage();
    initPageTransitions();
    
    // Set current year
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// ============================================
// THEME MANAGEMENT
// ============================================

function initTheme() {
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme, false);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme, true);
}

function setTheme(theme, animate) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update icons
    const lightIcon = document.querySelector('.theme-icon-light');
    const darkIcon = document.querySelector('.theme-icon-dark');
    
    if (lightIcon && darkIcon) {
        if (theme === 'light') {
            lightIcon.classList.remove('hidden');
            darkIcon.classList.add('hidden');
        } else {
            lightIcon.classList.add('hidden');
            darkIcon.classList.remove('hidden');
        }
    }
    
    // Animate transition
    if (animate) {
        gsap.to('body', {
            opacity: 0.8,
            duration: 0.15,
            yoyo: true,
            repeat: 1
        });
    }
}

// ============================================
// LANGUAGE MANAGEMENT
// ============================================

let currentLang = localStorage.getItem('language') || 'en';

function initLanguage() {
    if (currentLang === 'ar') {
        setLanguage('ar', false);
    }
    updateLangToggle();
}

function toggleLanguage() {
    const newLang = currentLang === 'en' ? 'ar' : 'en';
    setLanguage(newLang, true);
}

function setLanguage(lang, animate) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    
    const html = document.documentElement;
    const body = document.body;
    
    if (lang === 'ar') {
        html.setAttribute('dir', 'rtl');
        html.setAttribute('lang', 'ar');
        body.style.fontFamily = "'Cairo', 'Inter', sans-serif";
    } else {
        html.setAttribute('dir', 'ltr');
        html.setAttribute('lang', 'en');
        body.style.fontFamily = "'Inter', sans-serif";
    }
    
    // Update translatable elements
    const elements = document.querySelectorAll('[data-en][data-ar]');
    elements.forEach(el => {
        const text = el.getAttribute(`data-${lang}`);
        if (animate) {
            gsap.to(el, {
                opacity: 0,
                y: -10,
                duration: 0.2,
                onComplete: () => {
                    el.textContent = text;
                    gsap.to(el, {
                        opacity: 1,
                        y: 0,
                        duration: 0.2
                    });
                }
            });
        } else {
            el.textContent = text;
        }
    });
    
    updateLangToggle();
}

function updateLangToggle() {
    const toggle = document.querySelector('.lang-toggle .lang-current');
    const mobileLangText = document.getElementById('mobileLangText');
    
    if (toggle) {
        toggle.textContent = currentLang === 'en' ? 'EN' : 'AR';
    }
    
    if (mobileLangText) {
        mobileLangText.textContent = currentLang === 'en' ? 'العربية' : 'English';
    }
}

// ============================================
// CUSTOM CURSOR
// ============================================

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
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        dotX += (mouseX - dotX) * 0.5;
        dotY += (mouseY - dotY) * 0.5;
        cursorDot.style.left = dotX + 'px';
        cursorDot.style.top = dotY + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
}

// ============================================
// NAVIGATION
// ============================================

function initNavigation() {
    const navbar = document.getElementById('navbar');
    
    // Show navbar on scroll for non-hero pages
    if (!document.querySelector('.hero-section')) {
        navbar.classList.add('visible');
    } else {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            if (currentScroll > 100) {
                navbar.classList.add('visible');
            } else {
                navbar.classList.remove('visible');
            }
        }, { passive: true });
    }
}

// ============================================
// PARTICLES
// ============================================

function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    const particleCount = window.matchMedia('(pointer: coarse)').matches ? 15 : 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        container.appendChild(particle);
    }
}

// ============================================
// PAGE ANIMATIONS
// ============================================

function initPageAnimations() {
    // Hero animations
    if (document.querySelector('.hero-section')) {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.from('.title-line', {
            opacity: 0,
            y: 100,
            duration: 1.2,
            stagger: 0.2,
            delay: 0.3
        })
        .from('.hero-badge', {
            opacity: 0,
            y: 30,
            duration: 0.8
        }, '-=0.8')
        .from('.hero-roles', {
            opacity: 0,
            y: 30,
            duration: 0.8
        }, '-=0.6')
        .from('.hero-subtitle', {
            opacity: 0,
            y: 30,
            duration: 0.8
        }, '-=0.6')
        .from('.hero-buttons', {
            opacity: 0,
            y: 30,
            duration: 0.8
        }, '-=0.6')
        .from('.side-decoration', {
            opacity: 0,
            duration: 1
        }, '-=0.4');

        // Role rotation
        const roles = document.querySelectorAll('.role');
        let currentRole = 0;
        setInterval(() => {
            roles.forEach(r => r.classList.remove('active'));
            currentRole = (currentRole + 1) % roles.length;
            roles[currentRole].classList.add('active');
        }, 3000);
    }

    // Section animations
    gsap.utils.toArray('.section-label').forEach(label => {
        gsap.from(label, {
            opacity: 0,
            x: -30,
            duration: 0.8,
            scrollTrigger: {
                trigger: label,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            opacity: 0,
            y: 30,
            duration: 1,
            scrollTrigger: {
                trigger: title,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Animate cards on scroll
    gsap.utils.toArray('.skill-card, .certificate-card, .timeline-item, .project-card, .stat-item').forEach((el, i) => {
        gsap.from(el, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            delay: i * 0.1,
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Counter animation
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => {
        const number = item.querySelector('.stat-number');
        if (number) {
            const target = parseInt(number.getAttribute('data-count'));
            ScrollTrigger.create({
                trigger: item,
                start: 'top 85%',
                onEnter: () => {
                    gsap.to(number, {
                        innerHTML: target,
                        duration: 2,
                        snap: { innerHTML: 1 },
                        ease: 'power2.out'
                    });
                }
            });
        }
    });
}

// ============================================
// MOBILE MENU
// ============================================

function initMobileMenu() {
    const btn = document.getElementById('mobileMenuBtn');
    const menu = document.getElementById('mobileMenu');
    if (!btn || !menu) return;
    
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

// ============================================
// PAGE TRANSITIONS
// ============================================

function initPageTransitions() {
    // Add click handlers for smooth page transitions
    document.querySelectorAll('a[href$=".html"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && !href.startsWith('#') && !this.hasAttribute('download')) {
                e.preventDefault();
                
                gsap.to('body', {
                    opacity: 0,
                    duration: 0.3,
                    onComplete: () => {
                        window.location.href = href;
                    }
                });
            }
        });
    });

    // Fade in on page load
    gsap.from('body', {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out'
    });
}

// ============================================
// PERFORMANCE
// ============================================

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        gsap.globalTimeline.pause();
    } else {
        gsap.globalTimeline.resume();
    }
});

// Handle resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 250);
});