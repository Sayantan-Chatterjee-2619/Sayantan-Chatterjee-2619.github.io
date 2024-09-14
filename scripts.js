
// Smooth scrolling behavior for side navigation links
document.querySelectorAll('.side-nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Toggle side navigation visibility
const toggleButton = document.querySelector('.nav-toggle');
const sideNav = document.querySelector('.side-nav');
const body = document.body;

toggleButton.addEventListener('click', function () {
    sideNav.classList.toggle('open');
    body.classList.toggle('nav-open');
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
const prevButton = document.getElementById('prevAchievement');
const nextButton = document.getElementById('nextAchievement');

const achievements = [
    {
        image: "/api/placeholder/400/320",
        caption: "Python Certification",
        description: "Completed advanced Python programming course with distinction."
    },
    {
        image: "/api/placeholder/400/320",
        caption: "Machine Learning Workshop",
        description: "Participated in a two-day intensive workshop on machine learning algorithms."
    },
    {
        image: "/api/placeholder/400/320",
        caption: "Best Project Award",
        description: "Received the Best Project Award for innovative solution in college tech fest."
    }
];

let currentAchievementIndex = 0;

function createAchievementCard(achievement) {
    const card = document.createElement('div');
    card.className = 'achievement-card';
    card.innerHTML = `
        <img src="${achievement.image}" alt="${achievement.caption}" class="achievement-image">
        <p class="achievement-caption">${achievement.caption}</p>
        <p>${achievement.description}</p>
    `;
    return card;
}

function initializeAchievements() {
    achievements.forEach((achievement, index) => {
        const card = createAchievementCard(achievement);
        if (index !== 0) {
            card.style.transform = 'translateX(20px)';
            card.style.opacity = '0';
        }
        achievementStack.appendChild(card);
    });
}

function showAchievement(index) {
    const cards = achievementStack.children;
    for (let i = 0; i < cards.length; i++) {
        if (i === index) {
            cards[i].style.transform = 'translateX(0)';
            cards[i].style.opacity = '1';
        } else {
            cards[i].style.transform = 'translateX(20px)';
            cards[i].style.opacity = '0';
        }
    }
}

function nextAchievement() {
    currentAchievementIndex = (currentAchievementIndex + 1) % achievements.length;
    showAchievement(currentAchievementIndex);
}

function prevAchievement() {
    currentAchievementIndex = (currentAchievementIndex - 1 + achievements.length) % achievements.length;
    showAchievement(currentAchievementIndex);
}

nextButton.addEventListener('click', nextAchievement);
prevButton.addEventListener('click', prevAchievement);

// Initialize the achievements
initializeAchievements();

document.querySelectorAll('.academic-card-flip').forEach(card => {
    card.addEventListener('click', () => {
        card.querySelector('.academic-card-inner').classList.toggle('is-flipped');
    });
});
