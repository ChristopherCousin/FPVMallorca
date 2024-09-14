// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Menú Responsive
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        const expanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
        menuToggle.setAttribute('aria-expanded', !expanded);
        navLinks.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-links a').forEach(enlace => {
        enlace.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', false);
        });
    });

    // Desplazamiento Suave con Ajuste de Offset
    document.querySelectorAll('a[href^="#"]').forEach(enlace => {
        enlace.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 70; // Altura del navbar
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Slider de Testimonios Mejorado
    const testimonials = document.querySelectorAll('.testimonial-item');
    const prevBtn = document.querySelector('.slider-control.prev');
    const nextBtn = document.querySelector('.slider-control.next');
    let currentTestimonial = 0;
    const totalTestimonials = testimonials.length;
    let testimonialInterval;

    const showTestimonial = (index) => {
        testimonials.forEach((testimonial, i) => {
            if (i === index) {
                testimonial.classList.add('active');
            } else {
                testimonial.classList.remove('active');
            }
        });
    };

    const nextTestimonial = () => {
        currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
        showTestimonial(currentTestimonial);
    };

    const prevTestimonialFunc = () => {
        currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
        showTestimonial(currentTestimonial);
    };

    const startTestimonialSlider = () => {
        testimonialInterval = setInterval(nextTestimonial, 5000);
    };

    const resetTestimonialSlider = () => {
        clearInterval(testimonialInterval);
        startTestimonialSlider();
    };

    nextBtn.addEventListener('click', () => {
        nextTestimonial();
        resetTestimonialSlider();
    });

    prevBtn.addEventListener('click', () => {
        prevTestimonialFunc();
        resetTestimonialSlider();
    });

    // Validación de Formularios
    const reservationForm = document.getElementById('reservation-form');
    const newsletterForm = document.getElementById('newsletter-form');

    const showError = (input, message) => {
        const formGroup = input.parentElement;
        const errorMessage = formGroup.querySelector('.error-message');
        errorMessage.textContent = message;
        input.setAttribute('aria-invalid', 'true');
    };

    const clearError = (input) => {
        const formGroup = input.parentElement;
        const errorMessage = formGroup.querySelector('.error-message');
        errorMessage.textContent = '';
        input.removeAttribute('aria-invalid');
    };

    const validateInput = (input) => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            showError(input, 'Este campo es obligatorio.');
            return false;
        }

        if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                showError(input, 'Introduce un correo electrónico válido.');
                return false;
            }
        }

        if (input.type === 'tel' && input.value) {
            const telRegex = /^\d{9}$/;
            if (!telRegex.test(input.value)) {
                showError(input, 'Introduce un número de teléfono válido (9 dígitos).');
                return false;
            }
        }

        if (input.type === 'date' && input.value) {
            const selectedDate = new Date(input.value);
            const today = new Date();
            today.setHours(0,0,0,0);
            if (selectedDate < today) {
                showError(input, 'Selecciona una fecha futura.');
                return false;
            }
        }

        clearError(input);
        return true;
    };

    const validateForm = (form) => {
        let isValid = true;
        const inputs = form.querySelectorAll('input, select, textarea');

        inputs.forEach(input => {
            if (!validateInput(input)) {
                isValid = false;
            }
        });

        return isValid;
    };

    reservationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm(reservationForm)) {
            // Aquí puedes añadir lógica para enviar el formulario a tu servidor
            alert('¡Gracias por tu reserva! Nos pondremos en contacto contigo pronto.');
            reservationForm.reset();
        }
    });

    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm(newsletterForm)) {
            // Aquí puedes añadir lógica para suscribir el email a tu lista
            alert('¡Gracias por suscribirte a nuestro boletín!');
            newsletterForm.reset();
        }
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

    // Inicializar Slider
    showTestimonial(currentTestimonial);
    startTestimonialSlider();
});
