document.addEventListener('DOMContentLoaded', function () {
    const mobileNav = document.getElementById('mobileNavPanel');
    const overlay = document.getElementById('overlay');
    const closeMenu = document.getElementById('closeMenu');
    const menuToggles = document.querySelectorAll('[data-toggle="mobile-nav"]');
    const submenuToggles = document.querySelectorAll('.submenu-toggle');

    function toggleMobileMenu() {
        const isOpen = mobileNav.getAttribute('aria-hidden') === 'false';
        mobileNav.setAttribute('aria-hidden', !isOpen);
        overlay.style.display = isOpen ? 'none' : 'block';
        document.body.style.overflow = isOpen ? 'auto' : 'hidden';

        if (isOpen) {
            submenuToggles.forEach(toggle => {
                toggle.setAttribute('aria-expanded', 'false');
                toggle.nextElementSibling.style.maxHeight = null;
            });
        }
    }

    menuToggles.forEach(toggle => {
        toggle.addEventListener('click', function (e) {
            e.preventDefault();
            mobileNav.setAttribute('aria-hidden', 'false');
            overlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    closeMenu.addEventListener('click', toggleMobileMenu);
    overlay.addEventListener('click', toggleMobileMenu);

    submenuToggles.forEach(toggle => {
        toggle.addEventListener('click', function () {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            const submenu = this.nextElementSibling;

            this.setAttribute('aria-expanded', !isExpanded);
            submenu.style.maxHeight = isExpanded ? null : submenu.scrollHeight + 'px';

            submenuToggles.forEach(otherToggle => {
                if (otherToggle !== toggle) {
                    otherToggle.setAttribute('aria-expanded', 'false');
                    otherToggle.nextElementSibling.style.maxHeight = null;
                }
            });
        });
    });

    mobileNav.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            toggleMobileMenu();
        }
    });

    const navLinks = mobileNav.querySelectorAll('a:not(.submenu-toggle)');
    navLinks.forEach(link => {
        link.addEventListener('click', toggleMobileMenu);
    });
});
