document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('submit-button');
    button.addEventListener('click', () => {
        const inputField = document.getElementById('input-field');
        const userInput = inputField.value;
        console.log('User input:', userInput);
        // Add more functionality as needed
    });

    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                alert('Message sent successfully!');
                contactForm.reset();
            } else {
                throw new Error(data.message || 'Something went wrong');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error sending message. Please try again later.');
        }
    });

    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        
        // Añade clase scrolled cuando bajamos
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Oculta/muestra navbar basado en dirección del scroll
        if (currentScroll > lastScroll && currentScroll > 300) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });

    // Inicializar las animaciones
    initAnimations();
});

// GSAP Animations
function initAnimations() {
    // Hero section animations
    gsap.from('#hero h1', {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out'
    });

    gsap.from('#hero .lead', {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out'
    });

    gsap.from('#hero .hero-cta', {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.6,
        ease: 'power3.out'
    });

    // Animaciones para la sección de impacto
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        gsap.from(item, {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Animaciones para las tarjetas de productos
    gsap.from('.product-card', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '#coleccion',
            start: 'top 80%'
        }
    });
}

// Form handling
function initializeForms() {
    const newsletterForm = document.getElementById('newsletterForm');
    const contactForm = document.getElementById('contactForm');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
}

async function handleNewsletterSubmit(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;

    try {
        // Here you would normally send this to your backend
        console.log('Newsletter subscription:', email);
        
        // Show success message
        showToast('¡Gracias por suscribirte! Revisa tu email para obtener tu código de descuento.');
        e.target.reset();
    } catch (error) {
        showToast('Hubo un error. Por favor intenta nuevamente.', 'error');
    }
}

async function handleContactSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    try {
        // Here you would normally send this to your backend
        console.log('Contact form submission:', Object.fromEntries(formData));
        
        // Show success message
        showToast('¡Mensaje enviado! Te contactaremos pronto.');
        e.target.reset();
    } catch (error) {
        showToast('Hubo un error. Por favor intenta nuevamente.', 'error');
    }
}

// Simple toast notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }, 100);
}

// Add toast styles dynamically
const toastStyles = `
    .toast {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 1rem 2rem;
        background: var(--eco-green);
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.3s ease, transform 0.3s ease;
        z-index: 1000;
    }
    
    .toast.show {
        opacity: 1;
        transform: translateY(0);
    }
    
    .toast.error {
        background: #dc3545;
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = toastStyles;
document.head.appendChild(styleSheet);

// Responsive handling improvements
function handleResponsiveness() {
    // Handle navbar on mobile
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarLinks = document.querySelectorAll('.nav-link');
    
    // Close mobile menu when clicking a link
    navbarLinks.forEach(link => {
        link.addEventListener('click', () => {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });
    
    // Optimize scroll performance
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Handle touch events for product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('touchstart', handleCardTouch, { passive: true });
    });
    
    // Responsive image loading
    handleResponsiveImages();
}

function handleCardTouch(e) {
    const card = e.currentTarget;
    card.style.transform = 'scale(0.98)';
    setTimeout(() => {
        card.style.transform = '';
    }, 200);
}

function handleResponsiveImages() {
    // Load higher resolution images only on larger screens
    const images = document.querySelectorAll('img[data-src]');
    if (window.innerWidth > 768) {
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

// Call responsive handling on load
document.addEventListener('DOMContentLoaded', () => {
    // ...existing DOMContentLoaded code...
    
    handleResponsiveness();
    
    // Update on resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            handleResponsiveImages();
        }, 250);
    });
});