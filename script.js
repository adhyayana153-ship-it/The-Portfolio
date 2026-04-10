// 1. We use 'let' so we can reset this value later
let startTime = Date.now();

function initClock() {
    const timerDisplay = document.getElementById('timer-display');
    const hourHand = document.getElementById('hour-hand');
    const minHand = document.getElementById('min-hand');
    const secHand = document.getElementById('sec-hand');
    const resetBtn = document.getElementById('reset-session');

    // Reset Feature
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            startTime = Date.now(); // Reset the start point to 'now'
            updateSessionTimer();   // Refresh immediately
        });
    }

    function update() {
        const now = new Date();
        
        // 2. FIXED IST Logic
        // We use 'en-GB' because it uses 24-hour format by default, 
        // then force the Kolkata timezone.
        const istString = now.toLocaleTimeString('en-GB', {
            timeZone: 'Asia/Kolkata',
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        
        if (timerDisplay) {
            timerDisplay.textContent = `■ ${istString} IST (Kolhapur)`;
        }

        // 3. Analog Clock Hands
        const seconds = now.getSeconds();
        const minutes = now.getMinutes();
        const hours = now.getHours();

        const secDeg = (seconds / 60) * 360;
        const minDeg = (minutes / 60) * 360 + (seconds / 60) * 6;
        const hourDeg = (hours / 12) * 360 + (minutes / 60) * 30;

        if (secHand) secHand.style.transform = `translateX(-50%) rotate(${secDeg}deg)`;
        if (minHand) minHand.style.transform = `translateX(-50%) rotate(${minDeg}deg)`;
        if (hourHand) hourHand.style.transform = `translateX(-50%) rotate(${hourDeg}deg)`;

        // Update the session counter
        updateSessionTimer();
    }

    setInterval(update, 1000);
    update(); 
}

function updateSessionTimer() {
    const sessionTimerDisplay = document.getElementById('session-timer');
    if (!sessionTimerDisplay) return;

    const elapsed = Date.now() - startTime;
    const totalSeconds = Math.floor(elapsed / 1000);
    
    const h = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');

    sessionTimerDisplay.textContent = `▶ ${h}:${m}:${s}`;
}

document.addEventListener('DOMContentLoaded', initClock);
// Ensure the DOM is fully loaded before running the clock
document.addEventListener('DOMContentLoaded', initClock);
function showSection(sectionId) {
    // 1. Select all elements with the class 'page-section'
    const sections = document.querySelectorAll('.page-section');
    
    // 2. Hide every section
    sections.forEach(section => {
        section.classList.add('hidden');
    });
    
    // 3. Show the requested section
    const target = document.getElementById(sectionId);
    if (target) {
        target.classList.remove('hidden');
        target.classList.add('flex'); // Maintain flexbox layout
    }
}
// Add this to your script.js
const videoContainer = document.getElementById('video-container');
const projectVideo = document.getElementById('project-video');

if (videoContainer && projectVideo) {
    // Play video on hover
    videoContainer.addEventListener('mouseenter', () => {
        projectVideo.play().catch(error => {
            console.log("Autoplay was prevented. Ensure the video is muted.");
        });
    });

    // Pause and reset video when mouse leaves
    videoContainer.addEventListener('mouseleave', () => {
        projectVideo.pause();
        projectVideo.currentTime = 0; // Optional: restarts video from beginning
    });
}
async function loadProjects() {
    const container = document.getElementById('projects-section');
    try {
        const response = await fetch('projects.html');
        const data = await response.text();
        
        // This takes everything inside the <body> of projects.html and puts it here
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, 'text/html');
        const content = doc.body.innerHTML;
        
        container.innerHTML = content + `<button onclick="showSection('home-section')" class="mt-8 border border-black px-4 py-2 hover:bg-black hover:text-white transition-all">BACK</button>`;
        
        showSection('projects-section');
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}