// Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const spans = navToggle.getElementsByTagName('span');
    spans[0].style.transform = navLinks.classList.contains('active') ? 'rotate(45deg) translate(5px, 5px)' : '';
    spans[1].style.opacity = navLinks.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = navLinks.classList.contains('active') ? 'rotate(-45deg) translate(7px, -7px)' : '';
});

// Mobile Dropdown Toggle
const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector('.dropdown-trigger');
    trigger.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            dropdown.classList.toggle('active');
        }
    });
});

// Enhanced Hero Background Slideshow
const heroSection = document.getElementById('hero');
const backgroundImages = [
    {
        url: "./assets/images/satellite-view.jpg",
        position: "center"
    },
    {
        url: "./assets/images/ai-tech.jpg",
        position: "center"
    },
    {
        url: "./assets/images/gis-mapping.jpg",
        position: "bottom"
    },
    {
        url: "./assets/images/digital-globe.jpg",
        position: "center"
    },
    {
        url: "./assets/images/digital-matrix.jpg",
        position: "center"
    }
];

let currentImageIndex = 0;
let nextImageIndex = 1;

// Preload images
backgroundImages.forEach(image => {
    const img = new Image();
    img.src = image.url;
});

// Create overlay elements
const currentOverlay = document.createElement('div');
const nextOverlay = document.createElement('div');
currentOverlay.className = 'hero-background current';
nextOverlay.className = 'hero-background next';
heroSection.insertBefore(nextOverlay, heroSection.firstChild);
heroSection.insertBefore(currentOverlay, heroSection.firstChild);

function updateBackground() {
    // Update current image
    currentOverlay.style.backgroundImage = `url(${backgroundImages[currentImageIndex].url})`;
    currentOverlay.style.backgroundPosition = backgroundImages[currentImageIndex].position;
    currentOverlay.style.opacity = '1';
    nextOverlay.style.opacity = '0';

    // Prepare next image
    nextImageIndex = (currentImageIndex + 1) % backgroundImages.length;
    nextOverlay.style.backgroundImage = `url(${backgroundImages[nextImageIndex].url})`;
    nextOverlay.style.backgroundPosition = backgroundImages[nextImageIndex].position;

    // Trigger transition
    setTimeout(() => {
        currentOverlay.style.opacity = '0';
        nextOverlay.style.opacity = '1';
    }, 4500); // Start transition 500ms before next change

    // Update indices
    currentImageIndex = nextImageIndex;
}

// Initial setup
updateBackground();

// Change background every 5 seconds
setInterval(updateBackground, 5000);

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.classList.contains('dropdown-trigger')) return;
        
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navLinks.classList.remove('active');
            // Close any open dropdowns
            dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
        }
    });
});

// Enhanced Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };

        try {
            // Here you would typically send the data to your backend
            // For now, we'll simulate sending an email to support@mapgpt.ai
            console.log('Sending email to support@mapgpt.ai:', data);
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'form-success';
            successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
            
            contactForm.reset();
            contactForm.appendChild(successMessage);
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        } catch (error) {
            console.error('Error sending message:', error);
            alert('There was an error sending your message. Please try again later.');
        }
    });
}

// Update Copyright Year
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Enhanced Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});
