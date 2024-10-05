const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');

// Function to set the theme
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    toggleSwitch.checked = theme === 'dark';
}

// Function to switch theme
function switchTheme(e) {
    if (e.target.checked) {
        setTheme('dark');
    } else {
        setTheme('light');
    }    
}

// Check for saved user preference, if any, on load of the website
if (currentTheme) {
    setTheme(currentTheme);
} else {
    // If no saved preference, check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark');
    } else {
        setTheme('light');
    }
}

// Add an event listener to the toggle switch
toggleSwitch.addEventListener('change', switchTheme, false);

// Listen for changes in system theme
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    const newTheme = e.matches ? 'dark' : 'light';
    setTheme(newTheme);
});
    
    document.addEventListener("DOMContentLoaded", function() {
        const card = document.querySelector('.card');
        
        // Function to toggle the flip class
        const toggleFlip = () => {
            card.classList.toggle('flip');
        };
        
        // Add event listeners for both click (desktop) and touchstart (mobile)
        card.addEventListener('click', toggleFlip);
        card.addEventListener('touchstart', function(event) {
            // Prevent touch from triggering both events (touch + click)
            event.preventDefault();
            toggleFlip();
        });
    });

