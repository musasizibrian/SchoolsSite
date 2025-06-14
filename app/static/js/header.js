document.addEventListener("DOMContentLoaded", function () {
    // Dropdown accessibility and animation
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function (e) {
            const menu = this.nextElementSibling;

            if (menu && menu.classList.contains('dropdown-menu')) {
                e.preventDefault();

                const isVisible = menu.classList.contains('show');
                document.querySelectorAll('.dropdown-menu.show').forEach(open => {
                    open.classList.remove('show');
                });

                if (!isVisible) {
                    menu.classList.add('show');
                }
            }
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
                menu.classList.remove('show');
            });
        }
    });
});
