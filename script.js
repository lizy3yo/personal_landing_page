// Theme Management
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.applyTheme();
        this.bindEvents();
    }

    applyTheme() {
        if (this.currentTheme === 'dark') {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.currentTheme);
        this.applyTheme();
        
        // Add transition effect
        document.body.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }

    bindEvents() {
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }
}

// Interactive Components
class InteractiveComponents {
    constructor() {
        this.magicMessages = [
            "✨ React magic is happening!",
            "🚀 Components are rendering!",
            "⚡ State is updating!",
            "🎯 Props are flowing!",
            "🔥 Hooks are working!",
            "💫 Virtual DOM is diffing!",
            "🌟 JSX is transpiling!",
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
    // Initialize all components
    const themeManager = new ThemeManager();
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