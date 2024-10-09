const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');

// Function to determine the current season or festival
function getCurrentSeasonOrFestival() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();

    // Festival date ranges (adjust these dates as needed)
    const durgaPujaStart = new Date(currentDate.getFullYear(), 9, 3); // October 10
    const durgaPujaEnd = new Date(currentDate.getFullYear(), 9, 14);   // October 14
    const diwaliStart = new Date(currentDate.getFullYear(), 9, 30);    // November 1
    const diwaliEnd = new Date(currentDate.getFullYear(), 10, 3);      // November 5

    // Check for festivals first
    if (currentDate >= durgaPujaStart && currentDate <= durgaPujaEnd) {
        return 'durga-puja';
    } else if (currentDate >= diwaliStart && currentDate <= diwaliEnd) {
        return 'diwali';
    } 

    // Otherwise, check for seasons
    if (currentMonth >= 2 && currentMonth <= 3) {
        return 'spring';
    } else if (currentMonth >= 4 && currentMonth <= 6) {
        return 'summer';
    } else if (currentMonth >= 7 && currentMonth <= 8) {
        return 'monsoon';
    } else if (currentMonth >= 9 && currentMonth <= 10) {
        return 'autumn';
    } else {
        return 'winter';
    }
}

// Function to set the theme, including seasonal or festival themes
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    // Ensure the toggle switch reflects the correct state for dark/light mode
    toggleSwitch.checked = theme.includes('dark');
}

// Function to handle switching between light and dark modes for the current season or festival
function switchTheme(e) {
    const currentSeasonOrFestival = getCurrentSeasonOrFestival();

    if (e.target.checked) {
        setTheme(`${currentSeasonOrFestival}-dark`);  // Apply dark version of the current theme
    } else {
        setTheme(`${currentSeasonOrFestival}-light`); // Apply light version of the current theme
    }
}

// Check for saved user preference or system preference, and apply the appropriate theme
if (currentTheme) {
    setTheme(currentTheme);  // Apply saved theme from localStorage
} else {
    const systemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const defaultTheme = systemDarkMode ? `${getCurrentSeasonOrFestival()}-dark` : `${getCurrentSeasonOrFestival()}-light`;
    setTheme(defaultTheme);
}

// Add event listener for theme switch
toggleSwitch.addEventListener('change', switchTheme, false);

// Listen for changes in system theme (light or dark)
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    const newTheme = e.matches ? `${getCurrentSeasonOrFestival()}-dark` : `${getCurrentSeasonOrFestival()}-light`;
    setTheme(newTheme);
});
    
    document.addEventListener("DOMContentLoaded", function() {
        const card = document.querySelector('.card');
        
      // Function to toggle the flip class
const toggleFlip = () => {
    card.classList.toggle('flip');
};

// Variables to store the starting point of the swipe
let startX, startY, endX, endY;

// Function to detect the swipe direction
const handleSwipe = () => {
    const diffX = endX - startX;
    const diffY = endY - startY;

    // Detect if the swipe was more horizontal than vertical
    if (Math.abs(diffX) > Math.abs(diffY)) {
        // If swipe distance is significant enough
        if (Math.abs(diffX) > 50) {
            toggleFlip();
        }
    }
};

// Add event listeners for both click (desktop) and swipe (mobile)
card.addEventListener('click', toggleFlip);

// For touch devices, detect swipe gestures
card.addEventListener('touchstart', function(event) {
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
}, false);

card.addEventListener('touchmove', function(event) {
    endX = event.touches[0].clientX;
    endY = event.touches[0].clientY;
}, false);

card.addEventListener('touchend', function() {
    handleSwipe();
}, false);

event.preventDefault();
            toggleFlip();
        });
    });
