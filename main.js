document.addEventListener("DOMContentLoaded", function() {
    // Function to fetch and insert HTML content
    const loadComponent = (url, placeholderId, callback) => {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                document.getElementById(placeholderId).innerHTML = data;
                if (callback) {
                    callback();
                }
            });
    };

    // Load Header and then initialize its scripts
    loadComponent("header.html", "header-placeholder", () => {
        const waffleButton = document.getElementById('waffle-button');
        const waffleMenu = document.getElementById('waffle-menu');

        if (waffleButton && waffleMenu) {
            waffleButton.addEventListener('click', (e) => {
                e.stopPropagation();
                waffleMenu.classList.toggle('hidden');
            });

            window.addEventListener('click', (e) => {
                if (!waffleMenu.classList.contains('hidden') && !waffleMenu.contains(e.target) && !waffleButton.contains(e.target)) {
                    waffleMenu.classList.add('hidden');
                }
            });
        }
    });

    // Load Footer and then initialize its scripts
    loadComponent("footer.html", "footer-placeholder", () => {
        const darkThemeToggle = document.getElementById('dark-theme-toggle');
        const htmlElement = document.documentElement;

        function updateThemeToggleText() {
            const isDarkMode = htmlElement.classList.contains('dark');
            if(darkThemeToggle) {
               darkThemeToggle.textContent = `Dark Theme: ${isDarkMode ? 'On' : 'Off'}`;
            }
        }

        if (darkThemeToggle) {
            darkThemeToggle.addEventListener('click', () => {
                htmlElement.classList.toggle('dark');
                if (htmlElement.classList.contains('dark')) {
                    localStorage.setItem('theme', 'dark');
                } else {
                    localStorage.setItem('theme', 'light');
                }
                updateThemeToggleText();
            });
        }
        
        // Set initial text for theme toggle on page load
        updateThemeToggleText();
    });
});
