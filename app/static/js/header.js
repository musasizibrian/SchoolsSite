document.addEventListener('DOMContentLoaded', function() {
    // --- Snippet 1: Mobile menu, smooth scroll, header shadow ---

    // Mobile menu toggle animation
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            // The 'show' class is typically managed by Bootstrap's JS,
            // so directly toggling aria-expanded might be sufficient if Bootstrap handles the rest.
            // If not using Bootstrap's JS for collapse, you'd manually toggle a class on navbarCollapse.
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            // Example: navbarCollapse.classList.toggle('show'); // If not using Bootstrap JS for collapse
        });

        // Close dropdowns/mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            // Check if the click is outside the navbar AND outside the toggler
            if (!e.target.closest('.navbar-collapse') && !e.target.closest('.navbar-toggler')) {
                const openMenu = document.querySelector('.navbar-collapse.show'); // Bootstrap adds 'show'
                if (openMenu) {
                    const toggler = document.querySelector('.navbar-toggler[aria-expanded="true"]');
                    if (toggler) {
                        toggler.click(); // Simulate a click on the toggler to close (if using Bootstrap JS)
                                         // or directly manage classes:
                                         // openMenu.classList.remove('show');
                                         // toggler.setAttribute('aria-expanded', 'false');
                    }
                }
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            try {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100, // Adjust 100 for fixed header height
                        behavior: 'smooth'
                    });
                } else {
                    console.warn(`Smooth scroll target not found: ${targetId}`);
                }
            } catch (error) {
                console.error(`Invalid selector for smooth scroll: ${targetId}`, error);
            }
        });
    });

    // Add shadow to header on scroll
    const header = document.querySelector('.main-header'); // Ensure this selector matches your HTML
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('shadow-lg'); // Assuming 'shadow-lg' is a CSS class you've defined
                // Consider managing these styles via CSS classes for better separation
                header.style.backdropFilter = 'blur(5px)';
                header.style.backgroundColor = 'rgba(13, 110, 253, 0.95)'; // Example color
            } else {
                header.classList.remove('shadow-lg');
                header.style.backdropFilter = 'none';
                header.style.backgroundColor = '#0d6efd'; // Example initial color
            }
        });
    }

    // --- Snippet 2: Search overlay and mobile nav interactions ---
    // header-interactions.js content

    const searchOverlay = document.getElementById('searchOverlay');
    const mobileSearchIcon = document.getElementById('mobileSearchIconHeader');
    const desktopSearchIcon = document.getElementById('desktopSearchIcon');
    const closeSearchOverlay = document.getElementById('closeSearchOverlay');
    const openMobileNavMenuButton = document.getElementById('openMobileNavMenuButton');
    const mobileNavPanel = document.getElementById('mobileNavPanel'); // Make sure this ID exists in your mobile_nav.html

    function showSearchOverlay() {
        if (!searchOverlay) {
            console.warn("Search overlay element not found.");
            return;
        }
        searchOverlay.classList.remove('d-none');
        searchOverlay.classList.add('d-flex');
        // Optional: Focus on the search input when overlay is shown
        const searchInput = searchOverlay.querySelector('input[type="search"], input[type="text"]');
        if (searchInput) {
            searchInput.focus();
        }
    }

    function hideSearchOverlay() {
        if (!searchOverlay) {
            console.warn("Search overlay element not found.");
            return;
        }
        searchOverlay.classList.remove('d-flex');
        searchOverlay.classList.add('d-none');
    }

    if (mobileSearchIcon) {
        mobileSearchIcon.addEventListener('click', showSearchOverlay);
    } else {
        console.warn("Mobile search icon (mobileSearchIconHeader) not found.");
    }

    if (desktopSearchIcon) {
        desktopSearchIcon.addEventListener('click', showSearchOverlay);
    } else {
        console.warn("Desktop search icon (desktopSearchIcon) not found.");
    }

    if (closeSearchOverlay) {
        closeSearchOverlay.addEventListener('click', hideSearchOverlay);
    } else {
        console.warn("Close search overlay button (closeSearchOverlay) not found.");
    }

    // Close search overlay with Escape key
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && searchOverlay && searchOverlay.classList.contains('d-flex')) {
            hideSearchOverlay();
        }
    });

    // Mobile Nav Panel Toggle
    if (openMobileNavMenuButton && mobileNavPanel) {
        openMobileNavMenuButton.addEventListener('click', () => {
            // This assumes your mobileNavPanel is initially hidden (e.g., with d-none or transform)
            // and you have CSS to show it when a class like 'open' is added, or 'd-none' is removed.
            // The provided CSS for .mobile-nav uses transform for open/close.
            // Let's align with that.
            const isPanelOpen = mobileNavPanel.classList.contains('open') || mobileNavPanel.getAttribute('aria-hidden') === 'false';
            if (isPanelOpen) {
                mobileNavPanel.classList.remove('open');
                mobileNavPanel.setAttribute('aria-hidden', 'true');
                // If using an overlay for mobile nav:
                // document.querySelector('.overlay')?.style.display = 'none';
            } else {
                mobileNavPanel.classList.add('open');
                mobileNavPanel.setAttribute('aria-hidden', 'false');
                // If using an overlay for mobile nav:
                // document.querySelector('.overlay')?.style.display = 'block';
            }
        });
    } else {
        if (!openMobileNavMenuButton) console.warn("Open mobile nav menu button (openMobileNavMenuButton) not found.");
        if (!mobileNavPanel) console.warn("Mobile nav panel (mobileNavPanel) not found.");
    }

    // Optional: Add event listeners for closing mobileNavPanel (e.g., a close button inside mobile_nav.html)
    // Example:
    const closeMobileNavButton = document.querySelector('.mobile-nav .close-menu'); // Assuming your close button has class 'close-menu' inside 'mobile-nav'
    if (closeMobileNavButton && mobileNavPanel) {
        closeMobileNavButton.addEventListener('click', () => {
            mobileNavPanel.classList.remove('open');
            mobileNavPanel.setAttribute('aria-hidden', 'true');
            // document.querySelector('.overlay')?.style.display = 'none';
        });
    }

    // Close mobile nav if clicking on the overlay (if you have one)
    const siteOverlay = document.querySelector('.overlay');
    if (siteOverlay && mobileNavPanel) {
        siteOverlay.addEventListener('click', () => {
            if (mobileNavPanel.classList.contains('open')) {
                mobileNavPanel.classList.remove('open');
                mobileNavPanel.setAttribute('aria-hidden', 'true');
                siteOverlay.style.display = 'none'; // Hide overlay too
            }
        });
    }

});