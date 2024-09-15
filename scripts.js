
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
    if (sideNav.style.width === "250px") {
        sideNav.style.width = "0";
    } else {
        sideNav.style.width = "250px";
    }
}

const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }    
}

toggleSwitch.addEventListener('change', switchTheme, false);

const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}



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
        image: "SIH Certificate.jpg",
        caption: "SIH 2023 Certification",
        description: "Smart India Hackathon 2023 grand finalist participation certificate."
    },
    {
        image: "AICTE robotics wrkshop.jpg",
        caption: "AICTE robotics Workshop",
        description: "Participated in a two-day intensive workshop on voice controlled robot."
    },
    {
        image: "Aradhana certificate.jpg",
        caption: "Winning Award",
        description: "Received the Winning Award at Science Exbibition organised by Health Education & Cultural Fair Science Exbibition, Sail Abasan Ground, Kabiguru 2nd, City Centre, Durgapur-16, from 19th January to 22nd January 2023."
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
    // Function to toggle flip
    const toggleFlip = () => {
        card.querySelector('.academic-card-inner').classList.toggle('is-flipped');
    };

    // Event listener for desktop (click event)
    card.addEventListener('click', toggleFlip);

    // Event listener for mobile (touchstart event)
    card.addEventListener('touchstart', toggleFlip);
});


document.querySelectorAll('.peek-certificate').forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.closest('.internship-card').classList.add('peeking');
    });

    button.addEventListener('mouseleave', () => {
        button.closest('.internship-card').classList.remove('peeking');
    });

    button.addEventListener('click', () => {
        button.closest('.internship-card').classList.add('flipped');
    });
});

document.querySelectorAll('.close-certificate').forEach(button => {
    button.addEventListener('click', () => {
        button.closest('.internship-card').classList.remove('flipped');
    });
});
