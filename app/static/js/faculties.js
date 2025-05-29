document.addEventListener("DOMContentLoaded", () => {
    // Search functionality
    const searchInput = document.getElementById("facultySearchInput");
    const facultyCards = document.querySelectorAll(".faculty-card");

    if (searchInput) {
        searchInput.addEventListener("keyup", function () {
            const term = this.value.toLowerCase();
            facultyCards.forEach(card => {
                const name = card.getAttribute("data-name");
                card.style.display = name.includes(term) ? "block" : "none";
            });
        });
    }

    // Modal display
    const modal = document.getElementById("facultyModal");
    const modalImg = document.getElementById("facultyModalImg");
    const modalName = document.getElementById("facultyModalName");
    const modalDesc = document.getElementById("facultyModalDescription");

    document.querySelectorAll(".faculty-card-toggle").forEach(button => {
        button.addEventListener("click", () => {
            modalName.textContent = button.dataset.name;
            modalDesc.textContent = button.dataset.description;
            modalImg.src = button.dataset.image;
            modalImg.alt = button.dataset.name;
        });
    });

    // Lazy loading images
    const lazyImages = document.querySelectorAll("img.lazy-load");
    if ("IntersectionObserver" in window) {
        let observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove("lazy-load");
                    obs.unobserve(img);
                }
            });
        });
        lazyImages.forEach(img => observer.observe(img));
    }
});
// Modal close functionality

    document.addEventListener("DOMContentLoaded", function () {
        const searchInput = document.getElementById("facultySearchInput");
        const facultyCards = document.querySelectorAll(".faculty-card");

        searchInput.addEventListener("input", function () {
            const term = this.value.toLowerCase();
            facultyCards.forEach(card => {
                const name = card.getAttribute("data-name");
                card.style.display = name.includes(term) ? "block" : "none";
            });
        });

        // Modal setup
        const modalImg = document.getElementById("facultyModalImg");
        const modalName = document.getElementById("facultyModalName");
        const modalDesc = document.getElementById("facultyModalDescription");

        document.querySelectorAll(".faculty-card-toggle").forEach(button => {
            button.addEventListener("click", () => {
                modalName.textContent = button.dataset.name;
                modalDesc.textContent = button.dataset.description;
                modalImg.src = button.dataset.image;
                modalImg.alt = button.dataset.name;
            });
        });

        // Dark Mode
        const toggle = document.getElementById("darkModeToggle");
        toggle.addEventListener("click", function () {
            document.body.classList.toggle('bg-dark');
            document.body.classList.toggle('text-white');
            document.querySelectorAll('.card').forEach(card => card.classList.toggle('bg-dark'));
        });
    });

