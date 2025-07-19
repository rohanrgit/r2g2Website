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
