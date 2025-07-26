// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger menu
    const bars = navToggle.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
        if (navMenu.classList.contains('active')) {
            if (index === 0) bar.style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            if (index === 1) bar.style.opacity = '0';
            if (index === 2) bar.style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            bar.style.transform = 'none';
            bar.style.opacity = '1';
        }
    });
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.querySelectorAll('.bar').forEach(bar => {
            bar.style.transform = 'none';
            bar.style.opacity = '1';
        });
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Add fade-in animation to elements
document.addEventListener('DOMContentLoaded', () => {
    // Apply initial styles for animation
    const animatedElements = document.querySelectorAll('.timeline-content, .experience-card, .contact-item, .research-item');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
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

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title .gradient-text');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 150);
    }
});

// Smooth reveal for sections
function revealSection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}

const sectionObserver = new IntersectionObserver(revealSection, {
    threshold: 0.15
});

// Add reveal animation to sections
document.addEventListener('DOMContentLoaded', () => {
    const sectionsToReveal = document.querySelectorAll('section');
    sectionsToReveal.forEach(section => {
        section.classList.add('section-hidden');
        sectionObserver.observe(section);
    });
});

// Add CSS for section reveal animation
const style = document.createElement('style');
style.textContent = `
    .section-hidden {
        opacity: 0;
        transform: translateY(50px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .section-hidden.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    .nav-link.active {
        color: #2563eb !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-shapes .shape');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// Add entrance animation to hero content
document.addEventListener('DOMContentLoaded', () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 200);
    }
});

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTop');

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

// Scroll to top functionality
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Contact Form Handler - Google Forms Integration
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validation
        if (!name || !email || !message) {
            showMessage('Please fill in all required fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Submit to Google Forms
        submitToGoogleForms(name, email, message);
    });
}

function submitToGoogleForms(name, email, message) {
    // Show loading message
    showMessage('Sending your message...', 'loading');
    
    // Your Google Form submission URL
    const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSc00FW5yynKMgP-9demvJv7_qptc0W-VRJTP1be0fxr49ADhw/formResponse';
    
    // Debug: Log submission details
    console.log('Submitting to Google Forms:', {
        url: GOOGLE_FORM_URL,
        name: name,
        email: email,
        message: message,
        fieldIds: {
            name: 'entry.1026314088',
            email: 'entry.145181332', 
            message: 'entry.1690537029'
        }
    });
    
    // Form data with correct field IDs from your Google Form
    const formData = new FormData();
    formData.append('entry.1026314088', name);    // Name field
    formData.append('entry.145181332', email);   // Email field  
    formData.append('entry.1690537029', message); // Message field
    
    // Submit to Google Forms with better error handling
    fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
    }).then((response) => {
        console.log('Form submission response:', response);
        // Due to no-cors mode, we can't read the response, but if we get here, submission likely worked
        showSuccessMessage(name, email, message);
    }).catch((error) => {
        console.error('Form submission error:', error);
        showMessage('There was an error sending your message. Please try again.', 'error');
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showMessage(message, type) {
    // Remove existing messages
    const existingMsg = document.querySelector('.form-message');
    if (existingMsg) existingMsg.remove();
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message form-message-${type}`;
    messageDiv.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'loading' ? 'fa-spinner fa-spin' : 'fa-exclamation-triangle'}"></i>
        <span>${message}</span>
    `;
    
    // Insert before form
    contactForm.parentNode.insertBefore(messageDiv, contactForm);
    
    // Auto remove after 5 seconds (except for loading messages)
    if (type !== 'loading') {
        setTimeout(() => {
            if (messageDiv.parentNode) messageDiv.remove();
        }, 5000);
    }
}

function showFieldIdSetupMessage(name, email, message) {
    // Remove existing messages
    const existingMsg = document.querySelector('.form-message');
    if (existingMsg) existingMsg.remove();
    
    // Create setup message with your specific form
    const messageDiv = document.createElement('div');
    messageDiv.className = 'form-message form-message-info';
    messageDiv.innerHTML = `
        <div class="setup-content">
            <div class="setup-header">
                <i class="fas fa-tools"></i>
                <h4>Need Field IDs - Quick Fix!</h4>
            </div>
            <p>Hi ${name}! The form submission failed because we need the correct field IDs from your Google Form.</p>
            
            <div class="quick-steps">
                <h4>🚀 Quick Steps (2 minutes):</h4>
                <ol>
                    <li><strong>Open your form:</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSc00FW5yynKMgP-9demvJv7_qptc0W-VRJTP1be0fxr49ADhw/viewform" target="_blank">Click here</a></li>
                    <li><strong>Right-click the NAME field</strong> → Select "Inspect"</li>
                    <li><strong>Look for:</strong> <code>name="entry.XXXXXXX"</code> in the code</li>
                    <li><strong>Copy the numbers</strong> after "entry." (example: 123456789)</li>
                    <li><strong>Repeat for EMAIL and MESSAGE fields</strong></li>
                    <li><strong>Tell me the 3 field IDs</strong> and I'll fix it immediately!</li>
                </ol>
            </div>
            
            <div class="example-section">
                <h4>💡 What to look for:</h4>
                <p>In the inspect window, find lines like:</p>
                <code>name="entry.123456789"</code> ← Name field ID<br>
                <code>name="entry.987654321"</code> ← Email field ID<br>
                <code>name="entry.555666777"</code> ← Message field ID
            </div>
            
            <div class="temp-contact">
                <p><strong>⚡ For immediate contact:</strong></p>
                <p><a href="mailto:pabitram@iisc.ac.in?subject=Contact from Website&body=Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}" target="_blank">📧 Send via Email Instead</a></p>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" class="close-btn">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Insert before form
    contactForm.parentNode.insertBefore(messageDiv, contactForm);
    
    // Reset form
    contactForm.reset();
}

function showSuccessMessage(name, email, message) {
    // Remove existing messages
    const existingMsg = document.querySelector('.form-message');
    if (existingMsg) existingMsg.remove();
    
    // Create success message
    const messageDiv = document.createElement('div');
    messageDiv.className = 'form-message form-message-success';
    messageDiv.innerHTML = `
        <div class="success-content">
            <div class="success-header">
                <i class="fas fa-check-circle"></i>
                <h4>Thank you for your message, ${name}!</h4>
            </div>
            <p>Your message has been successfully submitted via Google Forms. I will get back to you soon!</p>
            <div class="contact-summary">
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong> ${message}</p>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" class="close-btn">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Insert before form
    contactForm.parentNode.insertBefore(messageDiv, contactForm);
    
    // Reset form
    contactForm.reset();
}