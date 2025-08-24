// Navigation functionality
let isMobileMenuOpen = false;
let isScrolled = false;

// Smooth scroll to section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        closeMobileMenu();
    }
}

// Toggle mobile menu
function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    
    if (isMobileMenuOpen) {
        mobileMenu.classList.add('active');
        menuIcon.className = 'fas fa-times';
    } else {
        mobileMenu.classList.remove('active');
        menuIcon.className = 'fas fa-bars';
    }
}

// Close mobile menu
function closeMobileMenu() {
    if (isMobileMenuOpen) {
        isMobileMenuOpen = false;
        const mobileMenu = document.getElementById('mobile-menu');
        const menuIcon = document.getElementById('menu-icon');
        
        mobileMenu.classList.remove('active');
        menuIcon.className = 'fas fa-bars';
    }
}

// Handle scroll events
function handleScroll() {
    const scrollPosition = window.scrollY;
    const navigation = document.getElementById('navigation');
    
    if (scrollPosition > 100 && !isScrolled) {
        isScrolled = true;
        navigation.classList.add('scrolled');
    } else if (scrollPosition <= 100 && isScrolled) {
        isScrolled = false;
        navigation.classList.remove('scrolled');
    }
}

// Animate skill bars when they come into view
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.style.width;
                
                // Reset width to 0 and animate to target width
                skillBar.style.width = '0%';
                setTimeout(() => {
                    skillBar.style.width = width;
                }, 100);
                
                observer.unobserve(skillBar);
            }
        });
    }, {
        threshold: 0.5
    });
    
    skillBars.forEach(skillBar => {
        observer.observe(skillBar);
    });
}

// Add fade-in animation to sections
function setupScrollAnimations() {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Handle contact form interactions (if needed in future)
function initializeContactForm() {
    const emailLink = document.querySelector('a[href^="mailto:"]');
    if (emailLink) {
        emailLink.addEventListener('click', (e) => {
            // Track email click event (analytics placeholder)
            console.log('Email contact initiated');
        });
    }
    
    const playStoreLinks = document.querySelectorAll('a[href*="play.google.com"]');
    playStoreLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Track Play Store click event (analytics placeholder)
            console.log('Play Store link clicked:', link.href);
        });
    });
}

// Initialize typing effect for hero title (optional enhancement)
function initializeTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const titles = [
            'Game Developer • App Developer • Web Developer',
            'Creating Innovative Mobile Applications',
            '10+ Apps Published on Play Store',
            'Passionate 9th Standard Developer'
        ];
        
        let currentTitleIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        
        function typeEffect() {
            const currentTitle = titles[currentTitleIndex];
            
            if (isDeleting) {
                heroTitle.textContent = currentTitle.substring(0, currentCharIndex - 1);
                currentCharIndex--;
            } else {
                heroTitle.textContent = currentTitle.substring(0, currentCharIndex + 1);
                currentCharIndex++;
            }
            
            let typeSpeed = isDeleting ? 50 : 100;
            
            if (!isDeleting && currentCharIndex === currentTitle.length) {
                typeSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && currentCharIndex === 0) {
                isDeleting = false;
                currentTitleIndex = (currentTitleIndex + 1) % titles.length;
                typeSpeed = 500; // Pause before starting new title
            }
            
            setTimeout(typeEffect, typeSpeed);
        }
        
        // Uncomment the line below to enable typing effect
        // typeEffect();
    }
}

// Smooth scrolling for older browsers
function initializeSmoothScrolling() {
    // Check if browser supports smooth scrolling
    if (!('scrollBehavior' in document.documentElement.style)) {
        const links = document.querySelectorAll('button[onclick*="scrollToSection"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('onclick').match(/scrollToSection\('(.+?)'\)/)[1];
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const targetPosition = targetElement.offsetTop - 80; // Account for fixed nav
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Performance optimization - lazy load images if any are added
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Handle resize events
function handleResize() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth >= 768 && isMobileMenuOpen) {
        closeMobileMenu();
    }
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set up event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    // Initialize all features
    animateSkillBars();
    setupScrollAnimations();
    initializeContactForm();
    initializeTypingEffect();
    initializeSmoothScrolling();
    initializeLazyLoading();
    
    // Add click outside handler for mobile menu
    document.addEventListener('click', function(e) {
        const nav = document.querySelector('.nav');
        const mobileMenuBtn = document.querySelector('.nav-mobile-btn');
        
        if (isMobileMenuOpen && !nav.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Prevent mobile menu from closing when clicking inside it
    document.getElementById('mobile-menu').addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // Handle keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isMobileMenuOpen) {
            closeMobileMenu();
        }
    });
    
    // Add focus styles for accessibility
    const focusableElements = document.querySelectorAll('button, a, [tabindex]');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #3b82f6';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
    
    console.log('Garvit Joshi Portfolio Loaded Successfully! 🚀');
});

// Export functions for potential external use
window.portfolioFunctions = {
    scrollToSection,
    toggleMobileMenu,
    closeMobileMenu
};

// Add some fun console messages
console.log('%c👋 Hello! Welcome to Garvit Joshi\'s Portfolio', 'color: #3b82f6; font-size: 16px; font-weight: bold;');
console.log('%c🎮 Game Developer | 📱 App Developer | 💻 Web Developer', 'color: #10b981; font-size: 14px;');
console.log('%c🇮🇳 9th Standard Student from India with 10+ Published Apps', 'color: #8b5cf6; font-size: 12px;');
console.log('%cCheck out my apps: https://play.google.com/store/apps/dev?id=6617578849504571736', 'color: #f59e0b; font-size: 12px;');