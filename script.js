// script.js

// Menú Responsive
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Desplazamiento Suave
document.querySelectorAll('a[href^="#"]').forEach(enlace => {
    enlace.addEventListener('click', function(e) {
        e.preventDefault();
        navLinks.classList.remove('active');
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Slider de Testimonios
let testimonialIndex = 0;
const testimonials = document.querySelectorAll('.testimonial-item');
const totalTestimonials = testimonials.length;

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.style.display = (i === index) ? 'block' : 'none';
    });
}

function nextTestimonial() {
    testimonialIndex = (testimonialIndex + 1) % totalTestimonials;
    showTestimonial(testimonialIndex);
}

setInterval(nextTestimonial, 5000);

// Validación de Formulario
const reservationForm = document.getElementById('reservation-form');

reservationForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('¡Gracias por tu reserva! Nos pondremos en contacto contigo pronto.');
    reservationForm.reset();
});

// Validación de Newsletter
const newsletterForm = document.getElementById('newsletter-form');

newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('¡Gracias por suscribirte a nuestro boletín!');
    newsletterForm.reset();
});

// Inicializar
showTestimonial(testimonialIndex);

