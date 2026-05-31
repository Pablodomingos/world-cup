// ===========================
// Main Script
// Waits for components to load, then initializes interactive features.
// ===========================

function initComponents() {
    // DOM Elements (injected by component loader)
    const hamburger = document.getElementById('hamburger');
    const sidebar = document.getElementById('sidebar');
    const sidebarClose = document.getElementById('sidebar-close');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const sidebarLinks = document.querySelectorAll('.sidebar__link');
    const header = document.querySelector('.header');
    const scrollTopBtn = document.getElementById('scroll-top');

    // Sidebar Toggle
    function openSidebar() {
        sidebar.classList.add('sidebar--open');
        sidebarOverlay.classList.add('sidebar__overlay--visible');
        hamburger.classList.add('hamburger--active');
        document.body.style.overflow = 'hidden';
    }

    function closeSidebar() {
        sidebar.classList.remove('sidebar--open');
        sidebarOverlay.classList.remove('sidebar__overlay--visible');
        hamburger.classList.remove('hamburger--active');
        document.body.style.overflow = '';
    }

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            if (sidebar.classList.contains('sidebar--open')) {
                closeSidebar();
            } else {
                openSidebar();
            }
        });
    }

    if (sidebarClose) sidebarClose.addEventListener('click', closeSidebar);
    if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);

    sidebarLinks.forEach(link => {
        link.addEventListener('click', closeSidebar);
    });

    // Header Scroll Effect
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 80) {
                header.classList.add('header--scrolled');
            } else {
                header.classList.remove('header--scrolled');
            }
        });
    }

    // Scroll to Top Button
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 400) {
                scrollTopBtn.classList.add('scroll-top--visible');
            } else {
                scrollTopBtn.classList.remove('scroll-top--visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Keyboard Accessibility: Close sidebar on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar && sidebar.classList.contains('sidebar--open')) {
            closeSidebar();
        }
    });
}

// ===========================
// Page Content Features (don't depend on loaded components)
// ===========================
function initPageFeatures() {
    // Scroll Animations (Intersection Observer)
    const animatedElements = document.querySelectorAll('[data-animate]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1
    });

    animatedElements.forEach(el => observer.observe(el));

    // Parallax Effect on Scroll
    const heroParallax = document.querySelector('.hero__parallax-bg');
    const historiaParallax = document.querySelector('.historia__parallax-layer');
    const heroContent = document.querySelector('.hero__content');

    function handleParallax() {
        const scrollY = window.pageYOffset;
        const windowHeight = window.innerHeight;

        if (heroParallax && scrollY < windowHeight) {
            heroParallax.style.transform = `translateY(${scrollY * 0.4}px)`;
            if (heroContent) {
                heroContent.style.transform = `translateY(${scrollY * 0.15}px)`;
                heroContent.style.opacity = 1 - (scrollY / windowHeight) * 0.8;
            }
        }

        if (historiaParallax) {
            const section = historiaParallax.parentElement;
            const rect = section.getBoundingClientRect();
            if (rect.top < windowHeight && rect.bottom > 0) {
                const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
                historiaParallax.style.transform = `translateY(${progress * -50}px)`;
            }
        }
    }

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleParallax();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Timeline Cards: Stagger animation on scroll
    const timelineItems = document.querySelectorAll('.timeline__item');

    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-visible');
                }, index * 150);
                timelineObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    timelineItems.forEach(item => timelineObserver.observe(item));

    // Smooth ball rotation on mouse move (desktop)
    const ballImages = document.querySelectorAll('.timeline__card-img img');

    document.addEventListener('mousemove', (e) => {
        const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;

        ballImages.forEach(ball => {
            const rect = ball.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            if (isVisible) {
                ball.style.transform = `rotate(${mouseX * 5}deg) translateY(${mouseY * 3}px)`;
            }
        });
    });
}

// ===========================
// Initialization
// ===========================
// Page content features can run immediately
initPageFeatures();

// Component-dependent features wait for loader
document.addEventListener('components:loaded', initComponents);
