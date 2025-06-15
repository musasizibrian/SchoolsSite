document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      link.classList.add('hovered');
    });
    link.addEventListener('mouseleave', () => {
      link.classList.remove('hovered');
    });
  });

  // Example: Toggle class on scroll
  window.addEventListener("scroll", () => {
    const header = document.querySelector(".main-header");
    header.classList.toggle("scrolled", window.scrollY > 50);
  });
});
