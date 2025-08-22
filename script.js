// Variable declarations
const cardBanner = document.querySelector(".card-banner");
const toggleBtn = document.querySelector(".toggle-btn");
const background = document.getElementById("background");

// --- Date & Time ---
function updateDateTime() {
    const now = new Date();
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    const date = now.toLocaleDateString(undefined, options);
    const time = now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    document.getElementById("datetime").textContent = date + " | " + time;
}

// --- Dynamic profile card background ---
function updateTheme() {
    if (document.body.classList.contains("dark")) {
        cardBanner.src = "images/bg-dark.jpeg";
    } else {
        cardBanner.src = "images/bg-light.jpeg";
    }
}

// --- Background Elements (Stars/Clouds) ---
function generateBackground() {
    background.innerHTML = ""; // Clear old elements

    if (document.body.classList.contains("dark")) {
        // Stars
        for (let i = 0; i < 100; i++) {
            let star = document.createElement("div");
            star.classList.add("star");
            let size = Math.random() * 3 + 1; // 1px - 4px
            star.style.width = size + "px";
            star.style.height = size + "px";
            star.style.top = Math.random() * 100 + "vh";
            star.style.left = Math.random() * 100 + "vw";
            star.style.animationDuration = (1 + Math.random() * 3) + "s";
            background.appendChild(star);
        }
    } else {
        // Clouds scattered
        const cloudSizes = ["small", "medium", "large"];
        for (let i = 0; i < 15; i++) {
            const size = cloudSizes[Math.floor(Math.random() * cloudSizes.length)];
            const cloud = document.createElement("div");
            cloud.classList.add("cloud", size);
            cloud.style.top = Math.random() * 40 + "%"; // restrict to top 40%
            cloud.style.left = Math.random() * 100 + "%";
            background.appendChild(cloud);
        }
    }
}

// --- Toggle Dark Mode ---
function toggleDarkMode() {
    document.body.classList.toggle("dark");
    toggleBtn.textContent = document.body.classList.contains("dark") ? "☀ Light" : "🌙 Dark";
    updateTheme();
    generateBackground();
}

// --- Initial Setup on Page Load ---
document.addEventListener('DOMContentLoaded', () => {
    // Check for system theme preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add("dark");
    }
    
    // Initial calls
    updateDateTime();
    updateTheme();
    generateBackground();

    // Event listener for the toggle button
    toggleBtn.addEventListener("click", toggleDarkMode);
    
    // Update time every second
    setInterval(updateDateTime, 1000);
});