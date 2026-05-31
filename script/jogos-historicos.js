// ===========================
// Jogos Históricos - Parallax on hero
// ===========================
const jhHeroBg = document.querySelector('.jh-hero__bg');
const jhHeroContent = document.querySelector('.jh-hero__content');

function jhParallax() {
    const scrollY = window.pageYOffset;
    const windowHeight = window.innerHeight;

    if (jhHeroBg && scrollY < windowHeight) {
        jhHeroBg.style.transform = `translateY(${scrollY * 0.35}px)`;
        if (jhHeroContent) {
            jhHeroContent.style.transform = `translateY(${scrollY * 0.12}px)`;
            jhHeroContent.style.opacity = 1 - (scrollY / windowHeight) * 0.7;
        }
    }
}

// ===========================
// Staggered scroll animations for timeline cards
// ===========================
const jhTimelineItems = document.querySelectorAll('.jh-timeline__item');

const jhObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('animate-visible');
            }, 200);
            jhObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
});

jhTimelineItems.forEach(item => jhObserver.observe(item));

// ===========================
// Parallax with throttle
// ===========================
let jhTicking = false;
window.addEventListener('scroll', () => {
    if (!jhTicking) {
        window.requestAnimationFrame(() => {
            jhParallax();
            jhTicking = false;
        });
        jhTicking = true;
    }
});

// ===========================
// Card tilt effect on mouse (desktop)
// ===========================
const jhCards = document.querySelectorAll('.jh-timeline__card');

jhCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `translateY(-5px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotateY(0) rotateX(0)';
    });
});
