// Slideshow functionality
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.slide-dot');
let currentSlide = 0;
let slideInterval;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.opacity = i === index ? '1' : '0';
    });
    
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
        dot.style.backgroundColor = i === index ? 'white' : 'rgba(255, 255, 255, 0.5)';
    });
    
    currentSlide = index;
}

function nextSlide() {
    const next = (currentSlide + 1) % slides.length;
    showSlide(next);
}

function prevSlide() {
    const prev = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prev);
}

function startSlideshow() {
    slideInterval = setInterval(nextSlide, 5000);
}

function stopSlideshow() {
    clearInterval(slideInterval);
}

// Event listeners
document.getElementById('nextSlide').addEventListener('click', () => {
    stopSlideshow();
    nextSlide();
    startSlideshow();
});

document.getElementById('prevSlide').addEventListener('click', () => {
    stopSlideshow();
    prevSlide();
    startSlideshow();
});

dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        stopSlideshow();
        showSlide(i);
        startSlideshow();
    });
});

// Pause slideshow on hover
const slideshowContainer = document.querySelector('.slideshow-container');
slideshowContainer.addEventListener('mouseenter', stopSlideshow);
slideshowContainer.addEventListener('mouseleave', startSlideshow);

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        // Close mobile menu if open
        mobileMenu.classList.add('hidden');
    });
});

// Initialize slideshow
startSlideshow();