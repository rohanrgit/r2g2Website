document.addEventListener("DOMContentLoaded", function() {
    // Fetch and insert the header
    fetch("header.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("header-placeholder").innerHTML = data;

            // Now that the header is loaded, add event listeners for the waffle menu
            const waffleButton = document.getElementById('waffle-button');
            const waffleMenu = document.getElementById('waffle-menu');

            if (waffleButton && waffleMenu) {
                waffleButton.addEventListener('click', (e) => {
                    e.stopPropagation(); // Prevent click from closing menu immediately
                    waffleMenu.classList.toggle('hidden');
                });

                // Close waffle menu if clicking outside
                window.addEventListener('click', (e) => {
                    if (!waffleMenu.classList.contains('hidden') && !waffleMenu.contains(e.target) && !waffleButton.contains(e.target)) {
                        waffleMenu.classList.add('hidden');
                    }
                });
            }
        });
});
