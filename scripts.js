// Smooth scrolling behavior for side navigation links
document.querySelectorAll('.side-nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const img = document.querySelector('.profile-picture img');
    const loadingScreen = document.querySelector('.loading-screen');
  
    function hideLoadingScreen() {
      loadingScreen.style.opacity = '0';
      setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, 4000); // Matches the transition duration in CSS
    }
  
    if (img.complete) {
      hideLoadingScreen();
    } else {
      img.onload = hideLoadingScreen;
    }
  
    // Fallback in case the image fails to load
    img.onerror = hideLoadingScreen;
  
    // Show loading screen immediately
    loadingScreen.style.opacity = '1';
    loadingScreen.style.display = 'flex';
  });

function toggleNav() {
    const sideNav = document.getElementById("sideNav");
    const currentWidth = window.getComputedStyle(sideNav).width;

    if (currentWidth !== "0px") {
        // Close the navigation
        sideNav.style.width = "0";
    } else {
        // Open the navigation
        const screenWidth = window.innerWidth;
        let navWidth;

        if (screenWidth <= 480) {
            navWidth = "50%";  // For mobile phones
        } else if (screenWidth <= 768) {
            navWidth = "40%";  // For tablets
        } else if (screenWidth <= 1024) {
            navWidth = "30%";  // For small desktops
        } else {
            navWidth = "300px";  // For larger screens
        }

        sideNav.style.width = navWidth;
    }
}

// Add event listener for window resize
window.addEventListener('resize', function() {
    const sideNav = document.getElementById("sideNav");
    const currentWidth = window.getComputedStyle(sideNav).width;

    // Only adjust if the nav is currently open
    if (currentWidth !== "0px") {
        const screenWidth = window.innerWidth;
        let navWidth;

        if (screenWidth <= 480) {
            navWidth = "40%";
        } else if (screenWidth <= 768) {
            navWidth = "30%";
        } else if (screenWidth <= 1024) {
            navWidth = "20%";
        } else {
            navWidth = "300px";
        }

        sideNav.style.width = navWidth;
    }
});

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


// Scroll animations for sections
const sections = document.querySelectorAll('section');
const backToTop = document.querySelector('.back-to-top');

function checkScroll() {
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight * 0.75) {
            section.classList.add('visible');
        }
    });

    if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
}

window.addEventListener('scroll', checkScroll);
window.addEventListener('load', checkScroll);

// Back to top button functionality
backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Updated JavaScript for the achievements section
const achievementStack = document.querySelector('.achievement-stack');
const achievementCards = document.querySelectorAll('.achievement-card');
const prevButton = document.getElementById('prevAchievement');
const nextButton = document.getElementById('nextAchievement');
let currentIndex = 0;
let autoSlideInterval;
let autoSlideDelay = 5000; // 5 seconds between auto-scrolls
let manualPauseTime = 10000; // 10 seconds pause after manual navigation

function updateCards() {
    achievementCards.forEach((card, index) => {
        card.classList.remove('active');
        if (index === currentIndex) {
            card.classList.add('active');
        }
    });
    achievementStack.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function nextAchievement() {
    currentIndex = (currentIndex + 1) % achievementCards.length;
    updateCards();
}

function prevAchievement() {
    currentIndex = (currentIndex - 1 + achievementCards.length) % achievementCards.length;
    updateCards();
}

function startAutoScroll() {
    autoSlideInterval = setInterval(nextAchievement, autoSlideDelay);
}

function resetAutoScroll() {
    clearInterval(autoSlideInterval);
    setTimeout(startAutoScroll, manualPauseTime);
}

nextButton.addEventListener('click', () => {
    nextAchievement();
    resetAutoScroll();
});

prevButton.addEventListener('click', () => {
    prevAchievement();
    resetAutoScroll();
});

// Touch events for achievement slider
let touchStartX = 0;
let touchEndX = 0;

achievementStack.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

achievementStack.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    if (touchEndX < touchStartX) {
        nextAchievement();
    }
    if (touchEndX > touchStartX) {
        prevAchievement();
    }
    resetAutoScroll();
}

// Pause auto-scroll when hovering over the achievement container
const achievementContainer = document.querySelector('.achievement-container');
achievementContainer.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
achievementContainer.addEventListener('mouseleave', startAutoScroll);

// Initialize
updateCards();
startAutoScroll();

// Academic card flip functionality
document.querySelectorAll('.academic-card-flip').forEach(card => {
    // Function to toggle flip
    const toggleFlip = () => {
        card.querySelector('.academic-card-inner').classList.toggle('is-flipped');
    };

    // Event listener for desktop (click event)
    card.addEventListener('click', toggleFlip);

     // Event listener for mobile (touchend event)
     card.addEventListener('touchend', toggleFlip);
});


// Internship card functionality
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.internship-card');
    
    cards.forEach(card => {
        const viewCertificateBtn = card.querySelector('.peel-certificate');
        const closeCertificateBtn = card.querySelector('.close-certificate');
        
        function revealCertificate(e) {
            e.preventDefault(); // Prevent default behavior
            card.classList.add('animating');
            setTimeout(() => {
                card.classList.remove('animating');
                card.classList.add('revealed');
            }, 2000); // Duration of the swingingAndPeeling animation
        }
        
        function closeCertificate(e) {
            e.preventDefault(); // Prevent default behavior
            card.classList.remove('revealed');
        }
        
        viewCertificateBtn.addEventListener('click', revealCertificate);
        viewCertificateBtn.addEventListener('touchstart', revealCertificate);
        
        closeCertificateBtn.addEventListener('click', closeCertificate);
        closeCertificateBtn.addEventListener('touchstart', closeCertificate);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const galleryWall = document.querySelector('.gallery-wall');
    const frames = document.querySelectorAll('.gallery-frame');
    
  
    prevBtn.addEventListener('click', () => {
      galleryWall.scrollBy({ left: -300, behavior: 'smooth' });
    });
  
    nextBtn.addEventListener('click', () => {
      galleryWall.scrollBy({ left: 300, behavior: 'smooth' });
    });
  
    frames.forEach(frame => {
        frame.addEventListener('click', () => {
          frame.classList.toggle('expanded');
        });
      });      
  });

  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        document.querySelector('.resume-link').classList.add('peek');
    }, 3000); // 3000 milliseconds = 3 seconds
});

function addAnimationsForTheme(theme) {
    const animationContainer = document.querySelector('.theme-animations');
    if (!animationContainer) return; // Exit if container doesn't exist

    animationContainer.innerHTML = ''; // Clear any previous animations

    function createSideAnimation(className, count, side) {
        const spacing = window.innerHeight / count; // Ensure elements are spaced out vertically
        for (let i = 0; i < count; i++) {
            const animationElement = document.createElement('div');
            animationElement.classList.add(className);

            // Set the position on the left or right side with slight random adjustments
            if (side === 'left') {
                const offsetX = Math.random() * 350; // Random offset to move it slightly right from the edge
                animationElement.style.left = `${offsetX}px`; // Slight adjustment from the left edge
            } else if (side === 'right') {
                const offsetX = Math.random() * 350; // Random offset to move it slightly left from the edge
                animationElement.style.right = `${offsetX}px`; // Slight adjustment from the right edge
            }

            // Spacing the elements vertically, with some slight variation
            const baseY = i * spacing; // Base Y position spaced evenly
            const offsetY = Math.random() * (spacing / 2); // Add random vertical variation within half of the spacing
            animationElement.style.top = `${baseY + offsetY}px`;

            animationContainer.appendChild(animationElement);
        }
    }

    function createDhunuchiWithSmoke() {
        const animationContainer = document.querySelector('.theme-animations');
    
        // Create left and right Dhunuchi containers
        const dhunuchiLeftContainer = document.createElement('div');
        dhunuchiLeftContainer.classList.add('dhunuchi-container', 'left');
        
        const dhunuchiRightContainer = document.createElement('div');
        dhunuchiRightContainer.classList.add('dhunuchi-container', 'right');
    
        // Create left Dhunuchi holder and stand
        const dhunuchiHolderLeft = document.createElement('div');
        dhunuchiHolderLeft.classList.add('dhunuchi-holder', 'left');
        
        const dhunuchiStandLeft = document.createElement('div');
        dhunuchiStandLeft.classList.add('dhunuchi-stand', 'left');
    
        // Create right Dhunuchi holder and stand
        const dhunuchiHolderRight = document.createElement('div');
        dhunuchiHolderRight.classList.add('dhunuchi-holder', 'right');
        
        const dhunuchiStandRight = document.createElement('div');
        dhunuchiStandRight.classList.add('dhunuchi-stand', 'right');
    
        // Append holders and stands to containers
        dhunuchiLeftContainer.appendChild(dhunuchiHolderLeft);
        dhunuchiLeftContainer.appendChild(dhunuchiStandLeft);
        
        dhunuchiRightContainer.appendChild(dhunuchiHolderRight);
        dhunuchiRightContainer.appendChild(dhunuchiStandRight);
    
        // Create multiple smoke elements for both holders
        for (let i = 0; i < 20; i++) {
            const smokeLeft = document.createElement('div');
            smokeLeft.classList.add('dhunuchi-smoke');
            
            // Position smoke inside the left dhunuchi holder
            smokeLeft.style.position = 'absolute';
            smokeLeft.style.top = '-50px'; // Adjust the smoke position above the holder
            smokeLeft.style.left = '50%';  // Center smoke horizontally inside holder
            smokeLeft.style.transform = 'translateX(-50%)';
            smokeLeft.style.animationDelay = `${Math.random() * 10}s`;
    
            const smokeRight = document.createElement('div');
            smokeRight.classList.add('dhunuchi-smoke');
            
            // Position smoke inside the right dhunuchi holder
            smokeRight.style.position = 'absolute';
            smokeRight.style.top = '-50px'; // Adjust the smoke position above the holder
            smokeRight.style.left = '50%';  // Center smoke horizontally inside holder
            smokeRight.style.transform = 'translateX(-50%)';
            smokeRight.style.animationDelay = `${Math.random() * 10}s`;
    
            // Append smoke to the respective holders
            dhunuchiHolderLeft.appendChild(smokeLeft);
            dhunuchiHolderRight.appendChild(smokeRight);
        }
    
        // Append both dhunuchi containers to the animation container
        animationContainer.appendChild(dhunuchiLeftContainer);
        animationContainer.appendChild(dhunuchiRightContainer);
    }
    
    function addToranaWithMangoLeaves() {
        const body = document.querySelector('body');
    
        // Create Torana (String)
        const toranaString = document.createElement('div');
        toranaString.classList.add('torana-string');
        body.appendChild(toranaString);
    
        // Create mango leaves and attach to the torana
        for (let i = 0; i < 10; i++) {
            const mangoLeaf = document.createElement('div');
            mangoLeaf.classList.add('mango-leaf');
            
            const position = (i * 10) + 5;
            mangoLeaf.style.left = `${position}%`;
            mangoLeaf.style.top = '10px';

            // Add slight delay to each leaf's animation for a more natural look
            mangoLeaf.style.animationDelay = `${i * 0.2}s`;

            body.appendChild(mangoLeaf);
        }
    }
    
    
    
    


    // Add animations based on the theme
    if (theme.includes('spring')) {
        createSideAnimation('petal', 10, 'left'); // 10 petals on the left
        createSideAnimation('petal', 10, 'right'); // 10 petals on the right
    } else if (theme.includes('summer')) {
        const sunRay = document.createElement('div');
        sunRay.classList.add('sun-ray');
        sunRay.style.left = '50%'; // Center sun ray
        animationContainer.appendChild(sunRay);
    } else if (theme.includes('monsoon')) {
        createSideAnimation('raindrop', 20, 'left'); // 20 raindrops on the left
        createSideAnimation('raindrop', 20, 'right'); // 20 raindrops on the right
    } else if (theme.includes('autumn')) {
        createSideAnimation('leaf', 15, 'left'); // 15 leaves on the left
        createSideAnimation('leaf', 15, 'right'); // 15 leaves on the right
    } else if (theme.includes('winter')) {
        createSideAnimation('snowflake', 20, 'left'); // 20 snowflakes on the left
        createSideAnimation('snowflake', 20, 'right'); // 20 snowflakes on the right
    } else if (theme.includes('diwali')) {
        createSideAnimation('firework', 10, 'left'); // 10 fireworks on the left
        createSideAnimation('firework', 10, 'right'); // 10 fireworks on the right
    } else if (theme.includes('durga-puja')) {
        // Call function to create dhunuchi and smoke animation for Durga Puja
        createDhunuchiWithSmoke();
        addToranaWithMangoLeaves();
    }
}

// Call this function when the theme changes or on page load
const currenttheme = document.documentElement.getAttribute('data-theme');
addAnimationsForTheme(currenttheme);

// If you're switching themes dynamically, ensure to call `addAnimationsForTheme(newTheme)` when the theme changes
toggleSwitch.addEventListener('change', () => {
    const newTheme = document.documentElement.getAttribute('data-theme');
    addAnimationsForTheme(newTheme); // Update the animations
});

// If the theme is loaded based on system or local storage
window.addEventListener('DOMContentLoaded', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    addAnimationsForTheme(currentTheme);
});

