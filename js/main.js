// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Mobile menu functionality
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileMenuBtn && mobileMenu) {
        // Toggle menu on button click
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });

        // Close menu when clicking on mobile links
        if (mobileLinks.length > 0) {
            mobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.remove('active');
                });
            });
        }
    }

    // Slideshow functionality (only for pages that have slides)
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slide-dot');
    const slideshowContainer = document.querySelector('.slideshow-container');
    const nextSlideBtn = document.getElementById('nextSlide');
    const prevSlideBtn = document.getElementById('prevSlide');

    if (slides.length > 0 && slideshowContainer) {
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

        // Event listeners for slideshow controls
        if (nextSlideBtn) {
            nextSlideBtn.addEventListener('click', () => {
                stopSlideshow();
                nextSlide();
                startSlideshow();
            });
        }

        if (prevSlideBtn) {
            prevSlideBtn.addEventListener('click', () => {
                stopSlideshow();
                prevSlide();
                startSlideshow();
            });
        }

        // Dot navigation
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                stopSlideshow();
                showSlide(i);
                startSlideshow();
            });
        });

        // Pause slideshow on hover
        slideshowContainer.addEventListener('mouseenter', stopSlideshow);
        slideshowContainer.addEventListener('mouseleave', startSlideshow);

        // Initialize slideshow
        startSlideshow();
    }

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
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
            }
        });
    });
    window.openPopup = function(imageSrc, caption) {
        const popup = document.getElementById('imagePopup');
        const popupImage = document.getElementById('popupImage');
        const popupCaption = document.getElementById('popupCaption');
        
        if (popup && popupImage && popupCaption) {
            popupImage.src = imageSrc;
            popupImage.alt = caption;
            popupCaption.textContent = caption;
            popup.classList.remove('hidden');
            
            // Prevent body scrolling when popup is open
            document.body.style.overflow = 'hidden';
        }
    };

    window.closePopup = function() {
        const popup = document.getElementById('imagePopup');
        if (popup) {
            popup.classList.add('hidden');
            // Restore body scrolling
            document.body.style.overflow = 'auto';
        }
    };

    // Close popup with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closePopup();
        }
    });
});