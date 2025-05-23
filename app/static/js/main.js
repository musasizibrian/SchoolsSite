/**
 * Kabale University - Main JavaScript File
 * Version: 3.0
 * Handles core functionality across all pages
 */

document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // Global Functions
    // ======================
    
    /**
     * Debounce function for performance optimization
     */
    function debounce(func, wait = 100) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                func.apply(this, args);
            }, wait);
        };
    }

    // ======================
    // Mobile Navigation
    // ======================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.innerHTML = mainNav.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }

    // ======================
    // Dropdown Menus
    // ======================
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('mouseenter', function() {
            this.querySelector('.dropdown-menu').classList.add('active');
        });
        
        dropdown.addEventListener('mouseleave', function() {
            this.querySelector('.dropdown-menu').classList.remove('active');
        });
    });

    // ======================
    // Announcement Bar Close
    // ======================
    const announcementClose = document.querySelector('.announcement-close');
    
    if (announcementClose) {
        announcementClose.addEventListener('click', function() {
            this.closest('.announcement-bar').style.display = 'none';
            // Set cookie to remember closed state
            document.cookie = "announcementClosed=true; max-age=86400"; // 1 day
        });
    }

    // ======================
    // Smooth Scrolling
    // ======================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ======================
    // Form Validation
    // ======================
    const forms = document.querySelectorAll('form:not(.no-validate)');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            let valid = true;
            const requiredFields = this.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.classList.add('error');
                    valid = false;
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (!valid) {
                e.preventDefault();
                this.querySelector('.error-message')?.remove();
                
                const errorMsg = document.createElement('div');
                errorMsg.className = 'error-message';
                errorMsg.textContent = 'Please fill in all required fields';
                this.prepend(errorMsg);
            }
        });
    });

    // ======================
    // Back to Top Button
    // ======================
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', debounce(function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    }));
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ======================
    // Lazy Loading Images
    // ======================
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img.lazy');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // ======================
    // Current Year in Footer
    // ======================
    const yearElement = document.querySelector('.current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

// ======================
// Page-Specific Modules
// ======================

/**
 * News Filter Module
 */
if (document.querySelector('.news-filter')) {
    import('./news.js').then(module => {
        module.initNewsFilter();
    });
}

/**
 * Programs Filter Module
 */
if (document.querySelector('.program-filter')) {
    import('./program-filter.js').then(module => {
        module.initProgramFilter();
    });
}

/**
 * Gallery Filter Module
 */
if (document.querySelector('.gallery-filter')) {
    import('./gallery-filter.js').then(module => {
        module.initGalleryFilter();
    });
}

/**
 * Testimonials Slider
 */
if (document.querySelector('.testimonials-slider')) {
    import('./testimonials-slider.js').then(module => {
        module.initTestimonialsSlider();
    });
}

/**
 * Events View Toggle
 */
if (document.querySelector('.events-view')) {
    import('./events-view.js').then(module => {
        module.initEventsView();
    });
}

/**
 * Main JavaScript file for School Management System
 * Contains common functionality used across the application
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Initialize popovers
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });

    // Auto-dismiss flash messages after 5 seconds
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        setTimeout(() => {
            bootstrap.Alert.getInstance(alert).close();
        }, 5000);
    });

    // Add active class to current nav link
    const currentUrl = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentUrl) {
            link.classList.add('active');
            // If it's in a dropdown, highlight the parent too
            const dropdown = link.closest('.dropdown-menu');
            if (dropdown) {
                const dropdownToggle = document.querySelector(`[data-bs-toggle="dropdown"][aria-expanded="false"]`);
                if (dropdownToggle) {
                    dropdownToggle.classList.add('active');
                }
            }
        }
    });

    // Enable smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

/**
 * Helper function to show loading spinner
 */
function showLoading() {
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    `;
    document.body.appendChild(loadingOverlay);
}

/**
 * Helper function to hide loading spinner
 */
function hideLoading() {
    const loadingOverlay = document.querySelector('.loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.remove();
    }
}

/**
 * Helper function for form validation
 */
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;

    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('is-invalid');
            isValid = false;
        } else {
            field.classList.remove('is-invalid');
        }
    });

    return isValid;
}