// Global variables
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

// Theme functionality
function getCurrentSeasonOrFestival() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();

    const festivals = {
        'durga-puja': { start: new Date(currentDate.getFullYear(), 9, 3), end: new Date(currentDate.getFullYear(), 9, 14) },
        'diwali': { start: new Date(currentDate.getFullYear(), 9, 30), end: new Date(currentDate.getFullYear(), 10, 3) }
    };

    for (const [festival, { start, end }] of Object.entries(festivals)) {
        if (currentDate >= start && currentDate <= end) return festival;
    }

    const seasons = [
        { name: 'spring', months: [2, 3] },
        { name: 'summer', months: [4, 5, 6] },
        { name: 'monsoon', months: [7, 8] },
        { name: 'autumn', months: [9, 10] },
        { name: 'winter', months: [11, 0, 1] }
    ];

    return seasons.find(season => season.months.includes(currentMonth))?.name || 'default';
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    toggleSwitch.checked = theme.includes('dark');
    addAnimationsForTheme(theme);
}

function switchTheme(e) {
    const currentSeasonOrFestival = getCurrentSeasonOrFestival();
    setTheme(e.target.checked ? `${currentSeasonOrFestival}-dark` : `${currentSeasonOrFestival}-light`);
}

function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        const systemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(`${getCurrentSeasonOrFestival()}-${systemDarkMode ? 'dark' : 'light'}`);
    }
}

// Theme-based animations
function addAnimationsForTheme(theme) {
    const animationContainer = document.querySelector('.theme-animations');
    if (!animationContainer) return;

    animationContainer.innerHTML = '';

    function createSideAnimation(className, count, side) {
        const containerHeight = window.innerHeight;
        const containerWidth = window.innerWidth;
        const spacing = containerHeight / count;
        const sideWidth = containerWidth * 0.2; // 20% of the screen width
        
        for (let i = 0; i < count; i++) {
            const animationElement = document.createElement('div');
            animationElement.classList.add(className);
    
            // Calculate horizontal position
            let offsetX;
            if (side === 'left') {
                offsetX = Math.random() * sideWidth;
            } else { // right side
                offsetX = containerWidth - (Math.random() * sideWidth) -10;
            }
            
            animationElement.style.left = `${offsetX}px`;
    
            // Calculate vertical position
            const baseY = i * spacing;
            const offsetY = (Math.random() - 0.5) * spacing; // Allow for some overlap
            animationElement.style.top = `${Math.max(0, Math.min(containerHeight - 20, baseY + offsetY))}px`;
    
            // Random animation delay
            animationElement.style.animationDelay = `${Math.random() * 5}s`;
    
            animationContainer.appendChild(animationElement);
        }
    }

    function resetLeafAnimations() {
        setTimeout(() => {
            document.querySelectorAll('.leaf').forEach(leaf => {
                leaf.style.animation = 'none';
                leaf.offsetHeight;
                leaf.style.animation = null;
            });
        });
    }

    function createDhunuchiWithSmoke() {
        ['left', 'right'].forEach(side => {
            const container = document.createElement('div');
            container.classList.add('dhunuchi-container', side);
            
            const holder = document.createElement('div');
            holder.classList.add('dhunuchi-holder', side);
            
            const stand = document.createElement('div');
            stand.classList.add('dhunuchi-stand', side);
    
            container.appendChild(holder);
            container.appendChild(stand);
    
            for (let i = 0; i < 20; i++) {
                const smoke = document.createElement('div');
                smoke.classList.add('dhunuchi-smoke');
                smoke.style.position = 'absolute';
                smoke.style.top = '-50px';
                smoke.style.left = '50%';
                smoke.style.transform = 'translateX(-50%)';
                smoke.style.animationDelay = `${Math.random() * 10}s`;
    
                holder.appendChild(smoke);
            }
    
            animationContainer.appendChild(container);
        });
    }
    
    function addToranaWithMangoLeaves() {
        const body = document.querySelector('body');
    
        const toranaString = document.createElement('div');
        toranaString.classList.add('torana-string');
        body.appendChild(toranaString);
    
        for (let i = 0; i < 10; i++) {
            const mangoLeaf = document.createElement('div');
            mangoLeaf.classList.add('mango-leaf');
            mangoLeaf.style.left = `${(i * 10) + 5}%`;
            mangoLeaf.style.top = '10px';
            mangoLeaf.style.animationDelay = `${i * 0.2}s`;
            body.appendChild(mangoLeaf);
        }
    }

    const themeAnimations = {
        'spring': () => {
            createSideAnimation('petal', 10, 'left');
            createSideAnimation('petal', 10, 'right');
        },
        'summer': () => {
            const sunRay = document.createElement('div');
            sunRay.classList.add('sun-ray');
            sunRay.style.left = '50%';
            animationContainer.appendChild(sunRay);
        },
        'monsoon': () => {
            createSideAnimation('raindrop', 20, 'left');
            createSideAnimation('raindrop', 20, 'right');
        },
        'autumn': () => {
            createSideAnimation('leaf', 9, 'left');
            createSideAnimation('leaf', 7, 'right');
            resetLeafAnimations();
        },
        'winter': () => {
            createSideAnimation('snowflake', 20, 'left');
            createSideAnimation('snowflake', 20, 'right');
        },
        'diwali': () => {
            createSideAnimation('firework', 10, 'left');
            createSideAnimation('firework', 10, 'right');
        },
        'durga-puja': () => {
            createDhunuchiWithSmoke();
            addToranaWithMangoLeaves();
        }
    };

    const seasonOrFestival = theme.split('-')[0];
    if (themeAnimations[seasonOrFestival]) {
        themeAnimations[seasonOrFestival]();
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();

    // Smooth scrolling for side navigation links
    document.querySelectorAll('.side-nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Loading screen functionality
    const img = document.querySelector('.profile-picture img');
    const loadingScreen = document.querySelector('.loading-screen');
  
    function hideLoadingScreen() {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 4000);
    }
  
    img.complete ? hideLoadingScreen() : img.onload = hideLoadingScreen;
    img.onerror = hideLoadingScreen;
  
    loadingScreen.style.opacity = '1';
    loadingScreen.style.display = 'flex';

    // Gallery functionality
    const galleryWall = document.querySelector('.gallery-wall');
    const frames = document.querySelectorAll('.gallery-frame');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
  
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

    // Resume link animation
    setTimeout(function() {
        document.querySelector('.resume-link').classList.add('peek');
    }, 3000);
});

toggleSwitch.addEventListener('change', switchTheme);

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    setTheme(`${getCurrentSeasonOrFestival()}-${e.matches ? 'dark' : 'light'}`);
});

// Scroll animations for sections
const sections = document.querySelectorAll('section');
const backToTop = document.querySelector('.back-to-top');

function checkScroll() {
    sections.forEach(section => {
        if (section.getBoundingClientRect().top < window.innerHeight * 0.75) {
            section.classList.add('visible');
        }
    });

    backToTop.classList.toggle('visible', window.pageYOffset > 300);
}

window.addEventListener('scroll', checkScroll);
window.addEventListener('load', checkScroll);

backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Toggle side navigation
function toggleNav() {
    const sideNav = document.getElementById("sideNav");
    const currentWidth = window.getComputedStyle(sideNav).width;

    if (currentWidth !== "0px") {
        sideNav.style.width = "0";
    } else {
        const screenWidth = window.innerWidth;
        let navWidth = screenWidth <= 480 ? "50%" :
                       screenWidth <= 768 ? "40%" :
                       screenWidth <= 1024 ? "30%" : "300px";
        sideNav.style.width = navWidth;
    }
}

// Adjust side navigation on window resize
window.addEventListener('resize', function() {
    const sideNav = document.getElementById("sideNav");
    const currentWidth = window.getComputedStyle(sideNav).width;

    if (currentWidth !== "0px") {
        const screenWidth = window.innerWidth;
        let navWidth = screenWidth <= 480 ? "40%" :
                       screenWidth <= 768 ? "30%" :
                       screenWidth <= 1024 ? "20%" : "300px";
        sideNav.style.width = navWidth;
    }
});

// Achievement carousel functionality
const achievementStack = document.querySelector('.achievement-stack');
const achievementCards = document.querySelectorAll('.achievement-card');
const prevButton = document.getElementById('prevAchievement');
const nextButton = document.getElementById('nextAchievement');
let currentIndex = 0;
let autoSlideInterval;
const autoSlideDelay = 5000;
const manualPauseTime = 10000;

function updateCards() {
    achievementCards.forEach((card, index) => {
        card.classList.toggle('active', index === currentIndex);
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
});

achievementStack.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX) {
        nextAchievement();
    } else if (touchEndX > touchStartX) {
        prevAchievement();
    }
    resetAutoScroll();
}

const achievementContainer = document.querySelector('.achievement-container');
achievementContainer.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
achievementContainer.addEventListener('mouseleave', startAutoScroll);

updateCards();
startAutoScroll();

// Academic card flip functionality
document.querySelectorAll('.academic-card-flip').forEach(card => {
    const toggleFlip = () => {
        card.querySelector('.academic-card-inner').classList.toggle('is-flipped');
    };
    card.addEventListener('click', toggleFlip);
    card.addEventListener('touchend', toggleFlip);
});

// Internship card functionality
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.internship-card');
    
    cards.forEach(card => {
        const viewCertificateBtn = card.querySelector('.peel-certificate');
        const closeCertificateBtn = card.querySelector('.close-certificate');
        
        function revealCertificate(e) {
            e.preventDefault();
            card.classList.add('animating');
            setTimeout(() => {
                card.classList.remove('animating');
                card.classList.add('revealed');
            }, 2000);
        }
        
        function closeCertificate(e) {
            e.preventDefault();
            card.classList.remove('revealed');
        }
        
        viewCertificateBtn.addEventListener('click', revealCertificate);
        viewCertificateBtn.addEventListener('touchstart', revealCertificate);
        
        closeCertificateBtn.addEventListener('click', closeCertificate);
        closeCertificateBtn.addEventListener('touchstart', closeCertificate);
    });
});