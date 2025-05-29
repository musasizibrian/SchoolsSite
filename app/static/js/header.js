document.addEventListener("DOMContentLoaded", function () {
    const searchIcon = document.getElementById("desktopSearchIcon");
    const searchOverlay = document.getElementById("searchOverlay");
    const closeSearch = document.getElementById("closeSearchOverlay");

    searchIcon?.addEventListener("click", function () {
        searchOverlay.classList.remove("d-none");
    });

    closeSearch?.addEventListener("click", function () {
        searchOverlay.classList.add("d-none");
    });

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            searchOverlay.classList.add("d-none");
        }
    });
});
