document.addEventListener('DOMContentLoaded', function () {
    const mobileNav = document.getElementById('mobileNavPanel');
    const overlay = document.getElementById('overlay');
    const closeMenuButton = document.getElementById('closeMenu');
    const menuToggles = document.querySelectorAll('[data-toggle="mobile-nav"]'); // make sure your toggle buttons have this attribute!
    const submenuToggles = document.querySelectorAll('.submenu-toggle');

    // Function to close menu
    function closeMobileMenu() {
        mobileNav.classList.remove('open');
        mobileNav.setAttribute('aria-hidden', 'true');
        overlay.style.display = 'none';
        document.body.style.overflow = 'auto';

        // Close all submenus
        submenuToggles.forEach(toggle => {
            toggle.setAttribute('aria-expanded', 'false');
            const submenu = toggle.nextElementSibling;
            if (submenu) {
                submenu.style.maxHeight = null;
                submenu.hidden = true;
            }
        });
    }

    // Function to open menu
    function openMobileMenu() {
        mobileNav.classList.add('open');
        mobileNav.setAttribute('aria-hidden', 'false');
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // Toggle menu open/close on toggle button click
    menuToggles.forEach(toggle => {
        toggle.addEventListener('click', function (e) {
            e.preventDefault();
            if (mobileNav.classList.contains('open')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    });

    // Close menu on close button or overlay click
    closeMenuButton.addEventListener('click', closeMobileMenu);
    overlay.addEventListener('click', closeMobileMenu);

    // Toggle submenus with animated maxHeight + aria-expanded + hidden
    submenuToggles.forEach(toggle => {
        toggle.addEventListener('click', function () {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            const submenu = this.nextElementSibling;

            // Close other submenus
            submenuToggles.forEach(otherToggle => {
                if (otherToggle !== toggle) {
                    otherToggle.setAttribute('aria-expanded', 'false');
                    if (otherToggle.nextElementSibling) {
                        otherToggle.nextElementSibling.style.maxHeight = null;
                        otherToggle.nextElementSibling.hidden = true;
                    }
                }
            });

            if (submenu) {
                if (isExpanded) {
                    // Close this submenu
                    this.setAttribute('aria-expanded', 'false');
                    submenu.style.maxHeight = null;
                    submenu.hidden = true;
                } else {
                    // Open this submenu
                    this.setAttribute('aria-expanded', 'true');
                    submenu.hidden = false;
                    submenu.style.maxHeight = submenu.scrollHeight + 'px';
                }
            }
        });
    });

    // Close menu on pressing Escape key
    mobileNav.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });

    // Close menu when clicking any normal link inside (not submenu toggles)
    const navLinks = mobileNav.querySelectorAll('a:not(.submenu-toggle)');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
});
