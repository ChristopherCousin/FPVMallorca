// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Menú Responsive
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-links a').forEach(enlace => {
        enlace.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Desplazamiento Suave
    document.querySelectorAll('a[href^="#"]').forEach(enlace => {
        enlace.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70, // Ajuste para la barra de navegación fija
                    behavior: 'smooth'
                });
            }
        });
    });

    // Slider de Testimonios
    let testimonialIndex = 0;
    const testimonials = document.querySelectorAll('.testimonial-item');
    const totalTestimonials = testimonials.length;

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.remove('active');
            if (i === index) {
                testimonial.classList.add('active');
            }
        });
    }

    function nextTestimonial() {
        testimonialIndex = (testimonialIndex + 1) % totalTestimonials;
        showTestimonial(testimonialIndex);
    }

    setInterval(nextTestimonial, 5000);

    // Validación de Formulario de Reserva
    const reservationForm = document.getElementById('reservation-form');

    reservationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Aquí puedes añadir lógica para enviar el formulario a tu servidor
        alert('¡Gracias por tu reserva! Nos pondremos en contacto contigo pronto.');
        reservationForm.reset();
    });

    // Validación de Newsletter
    const newsletterForm = document.getElementById('newsletter-form');

    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Aquí puedes añadir lógica para suscribir el email a tu lista
        alert('¡Gracias por suscribirte a nuestro boletín!');
        newsletterForm.reset();
    });

    // Cambio de fondo del navbar al hacer scroll
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Inicializar
    showTestimonial(testimonialIndex);
});
