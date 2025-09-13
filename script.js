// Welcome Alert Manager
class WelcomeAlert {
    constructor() {
        this.overlay = document.getElementById('welcomeOverlay');
        this.closeBtn = document.getElementById('welcomeCloseBtn');
        this.init();
    }

    init() {
        // Always show the welcome alert
        this.show();
        this.bindEvents();
    }

    show() {
        setTimeout(() => {
            this.overlay.classList.add('active');
        }, 500); 
    }

    hide() {
        this.overlay.classList.remove('active');
     
        setTimeout(() => {
            this.overlay.style.display = 'none';
        }, 300);
    }

    bindEvents() {
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.hide());
        }

        // Close on overlay click (outside the alert box)
        if (this.overlay) {
            this.overlay.addEventListener('click', (e) => {
                if (e.target === this.overlay) {
                    this.hide();
                }
            });
        }

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.overlay.classList.contains('active')) {
                this.hide();
            }
        });
    }

    // Method to reset and show welcome again (for testing)
    reset() {
        this.overlay.style.display = 'flex';
        this.show();
    }
}

// Theme Management
// (Old ThemeManager removed — replaced by improved ThemeManager later in file.)

// Interactive Components
class InteractiveComponents {
    constructor() {
        this.magicMessages = [
            "✨ Magic is happening!",
            "🚀 Components are rendering!",
            "⚡ State is updating!",
            "🎯 Ideas are flowing!",
            "🔥 Codes are working!",
            "💫 Creativity is blooming!",
            "🌟 Brain is functioning",
            "⭐ Effects are running!"
        ];
        this.currentMessageIndex = 0;
        this.init();
    }

    init() {
        this.bindMagicButton();
        this.addScrollAnimations();
        this.addHoverEffects();
    }

    bindMagicButton() {
        const magicButton = document.getElementById('magicButton');
        const magicText = document.getElementById('magicText');
        
        if (magicButton && magicText) {
            magicButton.addEventListener('click', () => {
                // Button animation
                magicButton.classList.add('bounce');
                setTimeout(() => magicButton.classList.remove('bounce'), 600);
                
                // Text update with animation
                magicText.classList.remove('active');
                setTimeout(() => {
                    magicText.textContent = this.magicMessages[this.currentMessageIndex];
                    magicText.classList.add('active');
                    this.currentMessageIndex = (this.currentMessageIndex + 1) % this.magicMessages.length;
                }, 150);
                
                // Create floating particles
                this.createParticles(magicButton);
            });
        }
    }

    createParticles(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 6; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 6px;
                height: 6px;
                background: #4ecdc4;
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                left: ${centerX}px;
                top: ${centerY}px;
            `;
            
            document.body.appendChild(particle);
            
            // Animate particle
            const angle = (i * 60) * Math.PI / 180;
            const distance = 100;
            const endX = centerX + Math.cos(angle) * distance;
            const endY = centerY + Math.sin(angle) * distance;
            
            particle.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${endX - centerX}px, ${endY - centerY}px) scale(0)`, opacity: 0 }
            ], {
                duration: 800,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }).onfinish = () => particle.remove();
        }
    }

    addScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        // Observe elements for scroll animations
        const animatedElements = document.querySelectorAll('.about-card, .expertise-card, .interactive-section');
        animatedElements.forEach(el => observer.observe(el));
    }

    addHoverEffects() {
        // Profile image hover effect
        const profileImg = document.getElementById('profileImg');
        if (profileImg) {
            profileImg.addEventListener('mouseenter', () => {
                profileImg.style.transform = 'scale(1.1) rotate(5deg)';
            });
            
            profileImg.addEventListener('mouseleave', () => {
                profileImg.style.transform = 'scale(1) rotate(0deg)';
            });
        }

        // Skill tags interactive effects
        const skillTags = document.querySelectorAll('.skill-tag');
        skillTags.forEach(tag => {
            tag.addEventListener('click', () => {
                tag.style.animation = 'bounce 0.6s ease';
                setTimeout(() => {
                    tag.style.animation = '';
                }, 600);
            });
        });
    }
}

// Utility Functions
class Utils {
    static addRippleEffect(element) {
        element.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            ripple.animate([
                { transform: 'scale(0)', opacity: 1 },
                { transform: 'scale(1)', opacity: 0 }
            ], {
                duration: 600,
                easing: 'ease-out'
            }).onfinish = () => ripple.remove();
        });
    }

    static typeWriter(element, text, speed = 50) {
        element.textContent = '';
        let i = 0;
        
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    }
}

// Performance Monitor
class PerformanceMonitor {
    constructor() {
        this.startTime = performance.now();
        this.init();
    }

    init() {
        window.addEventListener('load', () => {
            const loadTime = performance.now() - this.startTime;
            console.log(`🚀 Page loaded in ${loadTime.toFixed(2)}ms`);
        });
    }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize welcome alert first
    const welcomeAlert = new WelcomeAlert();
    
    // Initialize all other components
    const interactiveComponents = new InteractiveComponents();
    const performanceMonitor = new PerformanceMonitor();
    
    // Add ripple effects to buttons
    const buttons = document.querySelectorAll('button, .social-links a');
    buttons.forEach(button => Utils.addRippleEffect(button));
    
    // Add loading animation to main elements
    setTimeout(() => {
        const elements = document.querySelectorAll('.profile-card, .about-card, .expertise-card, .interactive-card');
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('fade-in');
            }, index * 200); // Stagger the animations
        });
    }, 100);
    
    console.log('🎉 Portfolio initialized successfully!');
    
    // Add welcome alert to window for testing purposes
    window.welcomeAlert = welcomeAlert;
});

// Dynamic Greeting based on local time
function setGreeting() {
    const greetingEl = document.getElementById('greeting');
    if (!greetingEl) return;
    const hour = new Date().getHours();
    let greet = 'Hello';
    if (hour >= 5 && hour < 12) greet = 'Good Morning';
    else if (hour >= 12 && hour < 18) greet = 'Good Afternoon';
    else greet = 'Good Evening';
    greetingEl.textContent = `${greet}!`;
}

setGreeting();

// Responsive nav toggle
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            const expanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', String(!expanded));
            navLinks.classList.toggle('show');
        });

        // Close menu when clicking a nav link (mobile)
        navLinks.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                navLinks.classList.remove('show');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
});

// Theme toggle label and persistence improvements
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.toggleBtn = document.getElementById('themeToggle');
        this.init();
    }

    init() {
        this.applyTheme();
        this.updateButtonText();
        this.bindEvents();
    }

    applyTheme() {
        // Ensure both explicit classes are set for clearer CSS targeting
        if (this.currentTheme === 'dark') {
            document.body.classList.add('dark-theme');
            document.body.classList.remove('light-theme');
        } else {
            document.body.classList.add('light-theme');
            document.body.classList.remove('dark-theme');
        }
        this.updateToggleClass();
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.currentTheme);
        this.applyTheme();
        this.updateButtonText();
        document.body.style.transition = 'all 0.3s ease';
        setTimeout(() => { document.body.style.transition = ''; }, 300);
    }

    updateButtonText() {
        if (!this.toggleBtn) return;
        // Show an icon + label. Use lucide icons if available; otherwise insert the data-lucide attribute
        const iconName = this.currentTheme === 'dark' ? 'sun' : 'moon';
        const label = this.currentTheme === 'dark' ? 'Light Mode' : 'Dark Mode';
        this.toggleBtn.innerHTML = `<i data-lucide="${iconName}"></i><span class="toggle-label">${label}</span>`;

        // If lucide is already loaded, render the icons here. If not, the script tag at the end
        // of the page will call lucide.createIcons() once it's available.
        if (window.lucide && typeof lucide.createIcons === 'function') {
            try { lucide.createIcons(); } catch (e) { /* ignore */ }
        }
    }

    bindEvents() {
        if (this.toggleBtn) {
            this.toggleBtn.addEventListener('click', () => this.toggleTheme());
        }
    }

    updateToggleClass() {
        if (!this.toggleBtn) return;
        this.toggleBtn.classList.remove('light', 'dark');
        this.toggleBtn.classList.add(this.currentTheme === 'dark' ? 'dark' : 'light');
    }
}

// Replace earlier ThemeManager usage with the new one
document.addEventListener('DOMContentLoaded', () => {
    // If ThemeManager defined earlier via module export, avoid duplicate
    try {
        window._themeManager = new ThemeManager();
    } catch (e) {
        console.error('Theme manager init failed', e);
    }
});

// Contact form validation
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const formSuccess = document.getElementById('formSuccess');

    function validateEmail(email) {
        return /^\S+@\S+\.\S+$/.test(email);
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let valid = true;
        nameError.textContent = '';
        emailError.textContent = '';
        messageError.textContent = '';
        formSuccess.textContent = '';

        if (!nameInput.value.trim()) {
            nameError.textContent = 'Please enter your name.';
            valid = false;
        }

        if (!emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
            emailError.textContent = 'Please enter a valid email.';
            valid = false;
        }

        if (!messageInput.value.trim()) {
            messageError.textContent = 'Message cannot be empty.';
            valid = false;
        }

        if (!valid) return;

        // Simulate successful send
        formSuccess.textContent = 'Message sent! Thank you.';
        form.reset();

        // Clear success after a few seconds
        setTimeout(() => { formSuccess.textContent = ''; }, 5000);
    });
});

// Handle profile image error (fallback)
document.addEventListener('DOMContentLoaded', () => {
    const profileImg = document.getElementById('profileImg');
    if (profileImg) {
        profileImg.addEventListener('error', () => {
            profileImg.style.display = 'none';
        });
    }
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ThemeManager, InteractiveComponents, Utils };
}