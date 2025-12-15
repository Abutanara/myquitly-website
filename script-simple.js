// Simple script for language-specific pages (no translation needed)
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚭 My Quitly website loaded successfully!');
    
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

    // Mobile navigation toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // App Store Links
    // App Store Links (Fallback, falls kein href im HTML vorhanden ist)
    const appStoreLinks = {
        ios: 'https://apps.apple.com/app/my-quitly-quit-smoking/id6754508949?mt=8',
        android: 'https://play.google.com/store/apps/details?id=com.myquitly.quitsmokingapp'
    };
    
    // Add click handlers for app store buttons
    document.querySelectorAll('.app-store-btn, .app-store-link').forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Get the store type from data-store attribute
            const store = btn.getAttribute('data-store');
            const href = btn.getAttribute('href');
            
            console.log('App store button clicked, store:', store, 'href:', href);
            
            // Wenn der Button disabled ist, nicht weiter machen
            if (btn.classList.contains('disabled')) {
                e.preventDefault();
                showNotification('App store links will be available soon!', 'info');
                return;
            }
            
            // Wenn bereits ein gültiger Link im href vorhanden ist (nicht #), diesen verwenden
            if (href && href !== '#' && href.startsWith('http')) {
                // Link ist bereits vorhanden, einfach öffnen (kein preventDefault)
                console.log(`Using existing href: ${href}`);
                // window.open wird automatisch durch den Link ausgelöst
                return; // Lass den Browser den Link normal öffnen
            }
            
            // Fallback: Link aus JavaScript-Objekt verwenden
            e.preventDefault();
            if (store && appStoreLinks[store]) {
                console.log(`Opening ${store} app store (fallback):`, appStoreLinks[store]);
                window.open(appStoreLinks[store], '_blank');
            } else {
                console.log('No valid store found, showing notification');
                showNotification('App store links will be available soon!', 'info');
            }
        });
    });

    // Contact Form Handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
            this.reset();
        });
    }

    // GDPR Cookie Banner Functionality
    const cookieBanner = document.getElementById('cookie-banner');
    const cookieModal = document.getElementById('cookie-modal');
    const cookieAccept = document.getElementById('cookie-accept');
    const cookieReject = document.getElementById('cookie-reject');
    const cookieDetails = document.getElementById('cookie-details');
    const cookieModalClose = document.getElementById('cookie-modal-close');
    const cookieSavePreferences = document.getElementById('cookie-save-preferences');

    // Check if user has already made a choice
    if (!localStorage.getItem('cookieConsent')) {
        if (cookieBanner) {
            // Show banner after a short delay for better UX
            setTimeout(() => {
                cookieBanner.classList.add('show');
            }, 1000);
        }
    }

    // Cookie banner event listeners
    if (cookieAccept) {
        cookieAccept.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'accepted');
            localStorage.setItem('analyticsCookies', 'true');
            localStorage.setItem('marketingCookies', 'true');
            
            // Checkboxen aktivieren (falls Modal offen ist)
            const analyticsCheckbox = document.getElementById('analytics-cookies');
            const marketingCheckbox = document.getElementById('marketing-cookies');
            if (analyticsCheckbox) analyticsCheckbox.checked = true;
            if (marketingCheckbox) marketingCheckbox.checked = true;
            
            if (cookieBanner) cookieBanner.classList.remove('show');
            // Initialize analytics here
            if (typeof updateAnalyticsConsent === 'function') {
                updateAnalyticsConsent();
            }
            console.log('Cookies accepted - analytics initialized');
        });
    }

    if (cookieReject) {
        cookieReject.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'rejected');
            localStorage.setItem('analyticsCookies', 'false');
            localStorage.setItem('marketingCookies', 'false');
            
            // Checkboxen deaktivieren (falls Modal offen ist)
            const analyticsCheckbox = document.getElementById('analytics-cookies');
            const marketingCheckbox = document.getElementById('marketing-cookies');
            if (analyticsCheckbox) analyticsCheckbox.checked = false;
            if (marketingCheckbox) marketingCheckbox.checked = false;
            
            if (cookieBanner) cookieBanner.classList.remove('show');
            // Ensure analytics are not initialized
            if (typeof updateAnalyticsConsent === 'function') {
                updateAnalyticsConsent();
            }
            console.log('Cookies rejected');
        });
    }

    if (cookieDetails) {
        cookieDetails.addEventListener('click', () => {
            if (cookieModal) {
                // Gespeicherte Präferenzen laden (falls bereits vorhanden)
                // Wenn keine Präferenzen vorhanden, bleiben Checkboxen deaktiviert (Opt-in Prinzip)
                const savedAnalytics = localStorage.getItem('analyticsCookies');
                const savedMarketing = localStorage.getItem('marketingCookies');
                
                const analyticsCheckbox = document.getElementById('analytics-cookies');
                const marketingCheckbox = document.getElementById('marketing-cookies');
                
                if (analyticsCheckbox) {
                    // Nur setzen, wenn bereits eine Präferenz gespeichert ist
                    // Ansonsten bleibt es deaktiviert (DSGVO-konform: Opt-in)
                    analyticsCheckbox.checked = savedAnalytics === 'true';
                }
                if (marketingCheckbox) {
                    marketingCheckbox.checked = savedMarketing === 'true';
                }
                
                cookieModal.style.display = 'block';
            }
        });
    }

    if (cookieModalClose) {
        cookieModalClose.addEventListener('click', () => {
            if (cookieModal) {
                cookieModal.style.display = 'none';
            }
        });
    }

    if (cookieSavePreferences) {
        cookieSavePreferences.addEventListener('click', () => {
            const analytics = document.getElementById('analytics-cookies').checked;
            const marketing = document.getElementById('marketing-cookies').checked;
            
            localStorage.setItem('cookieConsent', 'custom');
            localStorage.setItem('analyticsCookies', analytics);
            localStorage.setItem('marketingCookies', marketing);
            
            if (cookieBanner) cookieBanner.classList.remove('show');
            if (cookieModal) cookieModal.style.display = 'none';
            
            console.log('Cookie preferences saved:', { analytics, marketing });
        });
    }

    // Close modal when clicking outside
    if (cookieModal) {
        cookieModal.addEventListener('click', (e) => {
            if (e.target === cookieModal) {
                cookieModal.style.display = 'none';
            }
        });
    }

    // Animate progress bars on scroll
    const progressBars = document.querySelectorAll('.progress-fill');
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                bar.style.width = width;
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
});

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 4000);
}
