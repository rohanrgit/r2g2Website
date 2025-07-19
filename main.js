document.addEventListener("DOMContentLoaded", function() {
    // Function to fetch and insert HTML content
    const loadComponent = (url, placeholderId, callback) => {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                const placeholder = document.getElementById(placeholderId);
                if (placeholder) {
                    placeholder.innerHTML = data;
                }
                if (callback) {
                    callback();
                }
            })
            .catch(error => console.error(`Error loading component from ${url}:`, error));
    };

    // Load Header and then initialize its scripts
    loadComponent("header.html", "header-placeholder", () => {
        const waffleToggles = document.querySelectorAll('.waffle-toggle');
        const waffleMenu = document.getElementById('waffle-menu');

        waffleToggles.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const menu = document.getElementById('waffle-menu');
                const buttonRect = e.currentTarget.getBoundingClientRect();
                
                menu.style.top = `${buttonRect.bottom + window.scrollY}px`;
                
                // Position menu based on which button was clicked
                if (window.innerWidth < 768) { // md breakpoint
                     const menuWidth = menu.offsetWidth || 288;
                     menu.style.left = `${buttonRect.left + (buttonRect.width / 2) - (menuWidth / 2)}px`;
                     menu.style.right = 'auto';
                } else {
                    menu.style.right = `${window.innerWidth - buttonRect.right}px`;
                    menu.style.left = 'auto';
                }
                
                menu.classList.toggle('hidden');
            });
        });

        window.addEventListener('click', (e) => {
            const menu = document.getElementById('waffle-menu');
            let isWaffleClick = false;
            waffleToggles.forEach(button => {
                if (button.contains(e.target)) {
                    isWaffleClick = true;
                }
            });

            if (menu && !menu.classList.contains('hidden') && !menu.contains(e.target) && !isWaffleClick) {
                menu.classList.add('hidden');
            }
        });
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
