// ===========================
// Elencos - Combined Filters (Year + Country)
// ===========================
const searchInput = document.getElementById('search-year');
const countryFilter = document.getElementById('filter-country');
const cardsContainer = document.getElementById('cards-container');
const noResults = document.getElementById('no-results');

function applyFilters() {
    if (!cardsContainer) return;

    const yearQuery = searchInput ? searchInput.value.trim() : '';
    const countryQuery = countryFilter ? countryFilter.value : '';
    const cards = cardsContainer.querySelectorAll('.elenco-card');
    let visibleCount = 0;

    cards.forEach(card => {
        const year = card.getAttribute('data-year') || '';
        const country = card.getAttribute('data-country') || '';

        const matchesYear = !yearQuery || year.includes(yearQuery);
        const matchesCountry = !countryQuery || country === countryQuery;

        if (matchesYear && matchesCountry) {
            card.style.display = '';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });

    if (noResults) {
        noResults.hidden = visibleCount > 0;
    }
}

if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
}

if (countryFilter) {
    countryFilter.addEventListener('change', applyFilters);
}

// ===========================
// Figurinhas - Stagger Animation
// ===========================
const figurinhas = document.querySelectorAll('.figurinha');

if (figurinhas.length > 0) {
    const figurinhaObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-visible');
                }, index * 80);
                figurinhaObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    });

    figurinhas.forEach(fig => figurinhaObserver.observe(fig));
}
