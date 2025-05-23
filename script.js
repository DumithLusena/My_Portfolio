// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(26, 26, 26, 0.98)';
    } else {
        navbar.style.background = 'rgba(26, 26, 26, 0.95)';
    }
});

// Create floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size between 2-8px
        const size = Math.random() * 6 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random horizontal position
        particle.style.left = Math.random() * 100 + '%';
        
        // Random animation duration between 10-20s
        const duration = Math.random() * 10 + 10;
        particle.style.animationDuration = duration + 's';
        
        // Random delay
        const delay = Math.random() * 10;
        particle.style.animationDelay = delay + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// Contact form handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const submitBtn = this.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    emailjs.sendForm('service_5b0d7kq', 'template_vjxgfdr', this)
        .then(function(response) {
            Swal.fire("Message sent successfully!");
            document.getElementById('contactForm').reset();
            submitBtn.textContent = 'Send Message';
            submitBtn.disabled = false;
        }, function(error) {
            Swal.fire("Failed to send message. Please try again later.");
            submitBtn.textContent = 'Send Message';
            submitBtn.disabled = false;
        });
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Add hover effects to skill items
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.05)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add click effects to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
        `;
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Mobile menu functionality
document.querySelector('.mobile-menu').addEventListener('click', function() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    
    if (navLinks.style.display === 'flex') {
        navLinks.style.cssText = `
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            background: rgba(26, 26, 26, 0.98);
            flex-direction: column;
            padding: 2rem;
            backdrop-filter: blur(10px);
            z-index: 999;
        `;
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
            document.querySelector('.nav-links').style.display = 'none';
        }
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    hero.style.transform = `translateY(${rate}px)`;
});

// Skills animation counter
function animateSkillBars() {
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        const percentage = item.querySelector('.skill-percentage').textContent;
        if (percentage.includes('%')) {
            const value = parseInt(percentage);
            let current = 0;
            const increment = value / 50;
            
            const counter = setInterval(() => {
                current += increment;
                if (current >= value) {
                    current = value;
                    clearInterval(counter);
                }
                item.querySelector('.skill-percentage').textContent = Math.floor(current) + '%';
            }, 30);
        }
    });
}

// Trigger skill animation when skills section is visible
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated-skills')) {
            entry.target.classList.add('animated-skills');
            animateSkillBars();
        }
    });
}, { threshold: 0.5 });

const skillsSection = document.getElementById('skills');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Add custom cursor effect
const cursor = document.createElement('div');
cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    background: rgba(0, 255, 136, 0.5);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.1s ease;
    mix-blend-mode: difference;
`;
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
});

// Cursor effects on hover
document.querySelectorAll('a, button, .skill-item, .project-card, .education-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2)';
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
    });
});

// Add loading screen
const loadingScreen = document.createElement('div');
loadingScreen.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--primary-bg);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
    transition: opacity 0.5s ease;
`;

loadingScreen.innerHTML = `
    <div style="text-align: center;">
        <div style="width: 50px; height: 50px; border: 3px solid rgba(0, 255, 136, 0.3); border-top: 3px solid var(--accent-green); border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 1rem;"></div>
        <p style="color: var(--accent-green); font-size: 1.2rem;">Loading...</p>
    </div>
`;

document.body.appendChild(loadingScreen);

// Remove loading screen after page loads
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }, 1000);
});

// Add scroll progress indicator
const scrollProgress = document.createElement('div');
scrollProgress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: var(--gradient);
    z-index: 1001;
    transition: width 0.1s ease;
`;
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
});

// Add theme toggle functionality
function createThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        background: var(--gradient);
        color: var(--primary-bg);
        font-size: 1.2rem;
        cursor: pointer;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 4px 20px rgba(0, 255, 136, 0.3);
    `;
    themeToggle.innerHTML = '<i class="fas fa-palette"></i>';
    themeToggle.title = 'Customize Colors';
    
    themeToggle.addEventListener('click', () => {
        // Color customization logic
        const colors = [
            { name: 'Green', accent: '#00ff88', dark: '#00cc6a' },
            { name: 'Blue', accent: '#00aaff', dark: '#0088cc' },
            { name: 'Purple', accent: '#aa00ff', dark: '#8800cc' },
            { name: 'Orange', accent: '#ff8800', dark: '#cc6600' },
            { name: 'Red', accent: '#ff0066', dark: '#cc0044' }
        ];
        
        const currentIndex = parseInt(localStorage.getItem('colorIndex') || '0');
        const newIndex = (currentIndex + 1) % colors.length;
        const newColor = colors[newIndex];
        
        document.documentElement.style.setProperty('--accent-green', newColor.accent);
        document.documentElement.style.setProperty('--dark-green', newColor.dark);
        document.documentElement.style.setProperty('--gradient', `linear-gradient(135deg, ${newColor.accent}, ${newColor.dark}, ${newColor.dark}dd)`);
        
        localStorage.setItem('colorIndex', newIndex.toString());
        
        // Show notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 2rem;
            right: 2rem;
            background: rgba(26, 26, 26, 0.95);
            color: ${newColor.accent};
            padding: 1rem 1.5rem;
            border-radius: 10px;
            z-index: 10000;
            backdrop-filter: blur(10px);
            border: 1px solid ${newColor.accent}33;
        `;
        notification.textContent = `Theme changed to ${newColor.name}`;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 2000);
    });
    
    document.body.appendChild(themeToggle);
}

// Add back to top button
const backToTop = document.createElement('button');
backToTop.style.cssText = `
    position: fixed;
    bottom: 6rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 2px solid var(--accent-green);
    background: var(--secondary-bg);
    color: var(--accent-green);
    font-size: 1.2rem;
    cursor: pointer;
    z-index: 1000;
    transition: all 0.3s ease;
    opacity: 0;
    visibility: hidden;
`;
backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTop.title = 'Back to Top';

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.style.opacity = '1';
        backToTop.style.visibility = 'visible';
    } else {
        backToTop.style.opacity = '0';
        backToTop.style.visibility = 'hidden';
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

document.body.appendChild(backToTop);

// Education cards animation
const educationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInLeft 0.8s ease-out forwards';
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.education-card').forEach(card => {
    educationObserver.observe(card);
});

// Add slideInLeft animation
const educationStyle = document.createElement('style');
educationStyle.textContent = `
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(educationStyle);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    createThemeToggle();
    
    // Load saved theme
    const savedColorIndex = localStorage.getItem('colorIndex');
    if (savedColorIndex) {
        const colors = [
            { accent: '#00ff88', dark: '#00cc6a' },
            { accent: '#00aaff', dark: '#0088cc' },
            { accent: '#aa00ff', dark: '#8800cc' },
            { accent: '#ff8800', dark: '#cc6600' },
            { accent: '#ff0066', dark: '#cc0044' }
        ];
        const color = colors[parseInt(savedColorIndex)];
        document.documentElement.style.setProperty('--accent-green', color.accent);
        document.documentElement.style.setProperty('--dark-green', color.dark);
        document.documentElement.style.setProperty('--gradient', `linear-gradient(135deg, ${color.accent}, ${color.dark}, ${color.dark}dd)`);
    }
    
    // Add typing effect delay
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero h1');
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 80);
    }, 1000);
});

// Profile image error handling
document.getElementById('profileImage').addEventListener('error', function() {
    this.src = '/api/placeholder/200/200';
});

// Add intersection observer for timeline items
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('timeline-active');
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.timeline-item').forEach(item => {
    timelineObserver.observe(item);
});

// Add timeline animation styles
const timelineStyle = document.createElement('style');
timelineStyle.textContent = `
    .timeline-item {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .timeline-item.timeline-active {
        opacity: 1;
        transform: translateY(0);
    }
    
    .timeline-marker {
        transform: scale(0);
        transition: transform 0.4s ease 0.2s;
    }
    
    .timeline-item.timeline-active .timeline-marker {
        transform: scale(1);
    }
`;
document.head.appendChild(timelineStyle);