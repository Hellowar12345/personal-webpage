// ===== Particle Background =====
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let mouseX = 0, mouseY = 0;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);
window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

class Particle {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.color = Math.random() > 0.5 ? '100, 255, 218' : '189, 147, 249';
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Subtle mouse interaction
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
            this.x -= dx * 0.002;
            this.y -= dy * 0.002;
        }

        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
            this.reset();
        }
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
        ctx.fill();
    }
}

// Create particles
for (let i = 0; i < 80; i++) {
    particles.push(new Particle());
}

function drawLines() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(100, 255, 218, ${0.08 * (1 - dist / 120)})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    drawLines();
    requestAnimationFrame(animateParticles);
}

animateParticles();


// ===== Clock System =====
const sessionStart = Date.now();

function updateClock() {
    const now = new Date();

    // Nav clock
    const navClock = document.getElementById('navClock');
    navClock.textContent = now.toLocaleTimeString('en-US', { hour12: false });

    // Main clock date
    const clockDate = document.getElementById('clockDate');
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    clockDate.textContent = `📅 ${now.toLocaleDateString('en-US', options)}`;

    // Main clock time
    const clockTime = document.getElementById('clockTime');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ms = String(Math.floor(now.getMilliseconds() / 10)).padStart(2, '0');
    clockTime.textContent = `${hours}:${minutes}:${seconds}.${ms}`;

    // Timezone
    const clockTimezone = document.getElementById('clockTimezone');
    const tzName = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const offset = -now.getTimezoneOffset();
    const offsetH = Math.floor(Math.abs(offset) / 60);
    const offsetM = Math.abs(offset) % 60;
    const sign = offset >= 0 ? '+' : '-';
    clockTimezone.textContent = `🌐 ${tzName} (UTC${sign}${String(offsetH).padStart(2, '0')}:${String(offsetM).padStart(2, '0')})`;

    // Uptime
    const uptime = document.getElementById('uptime');
    const elapsed = Date.now() - sessionStart;
    const uH = String(Math.floor(elapsed / 3600000)).padStart(2, '0');
    const uM = String(Math.floor((elapsed % 3600000) / 60000)).padStart(2, '0');
    const uS = String(Math.floor((elapsed % 60000) / 1000)).padStart(2, '0');
    uptime.textContent = `${uH}:${uM}:${uS}`;
}

// Update clock at high frequency for smooth milliseconds
setInterval(updateClock, 50);
updateClock();


// ===== Navbar Scroll Effect =====
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    const scrollY = window.scrollY;

    if (scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Active nav link based on scroll position
    const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
    const navLinks = document.querySelectorAll('.nav-link');

    for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && scrollY >= section.offsetTop - 200) {
            navLinks.forEach(link => link.classList.remove('active'));
            navLinks[i].classList.add('active');
            break;
        }
    }

    lastScroll = scrollY;
});


// ===== Intersection Observer for Animations =====
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Animate skill bars
            if (entry.target.id === 'skills') {
                document.querySelectorAll('.skill-fill').forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    setTimeout(() => {
                        bar.style.width = width + '%';
                    }, 200);
                });
            }

            // Animate stat numbers
            if (entry.target.id === 'about') {
                document.querySelectorAll('.stat-number').forEach(num => {
                    const target = parseInt(num.getAttribute('data-target'));
                    animateNumber(num, target);
                });
            }
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});


// ===== Number Animation =====
function animateNumber(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 30);
}


// ===== Smooth Scroll for Nav Links =====
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});


// ===== Console Easter Egg =====
console.log(
    '%c👋 Hi there, fellow developer!',
    'color: #64ffda; font-size: 20px; font-weight: bold;'
);
console.log(
    '%c🔍 Looking at my code? Nice! Feel free to reach out.',
    'color: #bd93f9; font-size: 14px;'
);
console.log(
    '%c— 李欣員 (4112065022)',
    'color: #8892b0; font-size: 12px; font-style: italic;'
);
