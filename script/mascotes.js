const mascoteCards = document.querySelectorAll('.mascote-card');

if (mascoteCards.length > 0) {
    const mascoteObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-visible');
                }, index * 100);
                mascoteObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    mascoteCards.forEach(card => mascoteObserver.observe(card));
}
