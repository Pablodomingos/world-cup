// ===========================
// Contact Form Handling
// ===========================
const contactForm = document.getElementById('contact-form');
const formFeedback = document.getElementById('form-feedback');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        formFeedback.style.color = '#ff6b6b';
        formFeedback.textContent = 'Por favor, preencha todos os campos.';
        return;
    }

    // Simula envio (sem backend)
    formFeedback.style.color = 'var(--green-light)';
    formFeedback.textContent = '✓ Mensagem enviada com sucesso!';
    contactForm.reset();

    setTimeout(() => {
        formFeedback.textContent = '';
    }, 4000);
});
