// Smooth scrolling behavior for side navigation links
document.querySelectorAll('.side-nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
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