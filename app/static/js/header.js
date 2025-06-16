document.addEventListener('DOMContentLoaded', function () {
  const mainHeader = document.querySelector('.main-header');
  const navbar = mainHeader ? mainHeader.querySelector('.navbar') : null;
  const navbarToggler = navbar ? navbar.querySelector('.navbar-toggler') : null;
  const navbarCollapse = navbar ? navbar.querySelector('.navbar-collapse') : null;
  const navLinks = navbarCollapse ? navbarCollapse.querySelectorAll('.navbar-nav .nav-link') : [];
  const dropdownToggles = navbarCollapse ? navbarCollapse.querySelectorAll('.dropdown-toggle') : [];

  // 1. Header scroll effect
  if (mainHeader && navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // 2. Toggler animation using Bootstrap's collapse events
  if (navbarToggler && navbarCollapse) {
    navbarCollapse.addEventListener('show.bs.collapse', () => {
      navbarToggler.classList.add('active');
    });
    navbarCollapse.addEventListener('hide.bs.collapse', () => {
      navbarToggler.classList.remove('active');
    });
  }

  // 3. Dropdown behavior
  dropdownToggles.forEach(toggle => {
    const dropdownMenu = toggle.nextElementSibling;

    toggle.addEventListener('click', function (e) {
      if (window.innerWidth < 992 && dropdownMenu && dropdownMenu.classList.contains('dropdown-menu')) {
        e.preventDefault();

        // Close sibling dropdowns
        const parentUl = toggle.closest('.navbar-nav, .dropdown-menu');
        if (parentUl) {
          parentUl.querySelectorAll(':scope > .nav-item > .dropdown-toggle.active').forEach(openToggle => {
            if (openToggle !== toggle) {
              openToggle.classList.remove('active');
              const siblingMenu = openToggle.nextElementSibling;
              if (siblingMenu) siblingMenu.classList.remove('show');
            }
          });
        }

        // Toggle current dropdown
        toggle.classList.toggle('active');
        dropdownMenu.classList.toggle('show');
      }
    });

    // Keyboard support
    toggle.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (window.innerWidth < 992) {
          this.click();
        }
      }
    });
  });

  // 4. Hover effect on nav-links
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => link.classList.add('hovered'));
    link.addEventListener('mouseleave', () => link.classList.remove('hovered'));
  });

  // 5. Close mobile navbar when nav-link is clicked (excluding dropdown toggles)
  if (navbarCollapse) {
    navbarCollapse.querySelectorAll('.nav-link:not(.dropdown-toggle)').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 992 && navbarCollapse.classList.contains('show')) {
          const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
          if (bsCollapse) {
            bsCollapse.hide();
          } else if (navbarToggler && navbarToggler.getAttribute('aria-expanded') === 'true') {
            navbarToggler.click();
          }
        }
      });
    });
  }

  // 6. Outside click to close mobile nav and dropdowns
  document.addEventListener('click', function (e) {
    const isInsideNavbar = navbar ? navbar.contains(e.target) : false;

    if (!isInsideNavbar) {
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) {
          bsCollapse.hide();
        } else if (navbarToggler && navbarToggler.getAttribute('aria-expanded') === 'true') {
          navbarToggler.click();
        }
      }

      // Close all active dropdowns
      document.querySelectorAll('.dropdown-menu.show').forEach(menu => menu.classList.remove('show'));
      document.querySelectorAll('.dropdown-toggle.active').forEach(toggle => toggle.classList.remove('active'));
    }
  });

  // 7. Desktop hover for dropdowns (Bootstrap doesn't do this by default)
  document.querySelectorAll('.navbar .dropdown').forEach(function (dropdown) {
    dropdown.addEventListener('mouseover', function () {
      if (window.innerWidth >= 992) {
        this.classList.add('show');
        const menu = this.querySelector('.dropdown-menu');
        if (menu) menu.classList.add('show');
      }
    });
    dropdown.addEventListener('mouseout', function () {
      if (window.innerWidth >= 992) {
        this.classList.remove('show');
        const menu = this.querySelector('.dropdown-menu');
        if (menu) menu.classList.remove('show');
      }
    });
  });
});