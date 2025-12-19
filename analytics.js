/**
 * Analytics and Marketing Tools Integration
 * DSGVO-compliant: Only loads tracking scripts after user consent
 */

// Configuration - Replace with your actual Google Analytics ID
const ANALYTICS_CONFIG = {
    // Google Analytics 4 (GA4) - Replace with your Measurement ID (e.g., G-XXXXXXXXXX)
    // To get your ID: https://analytics.google.com/ → Admin → Data Streams → Web → Measurement ID
    googleAnalyticsId: 'G-29128NPRYZ', // ⚠️ HIER DEINE GOOGLE ANALYTICS ID EINTRAGEN
};

/**
 * Check if user has consented to analytics cookies
 */
function hasAnalyticsConsent() {
    const consent = localStorage.getItem('cookieConsent');
    const analyticsCookies = localStorage.getItem('analyticsCookies');
    
    // Check if user accepted all cookies or specifically analytics
    if (consent === 'accepted') {
        return true;
    }
    
    if (consent === 'custom' && analyticsCookies === 'true') {
        return true;
    }
    
    return false;
}

/**
 * Check if user has consented to marketing cookies
 */
function hasMarketingConsent() {
    const consent = localStorage.getItem('cookieConsent');
    const marketingCookies = localStorage.getItem('marketingCookies');
    
    // Check if user accepted all cookies or specifically marketing
    if (consent === 'accepted') {
        return true;
    }
    
    if (consent === 'custom' && marketingCookies === 'true') {
        return true;
    }
    
    return false;
}

/**
 * Initialize Google Analytics 4 (GA4)
 */
function initGoogleAnalytics() {
    console.log('🚀 initGoogleAnalytics called');
    console.log('🚀 Analytics ID:', ANALYTICS_CONFIG.googleAnalyticsId);
    
    if (!ANALYTICS_CONFIG.googleAnalyticsId || ANALYTICS_CONFIG.googleAnalyticsId === 'G-XXXXXXXXXX') {
        console.warn('⚠️ Google Analytics ID not configured. Please set ANALYTICS_CONFIG.googleAnalyticsId');
        return;
    }

    // Check if gtag is already loaded (avoid duplicate loading)
    if (window.gtag && window.dataLayer) {
        console.log('ℹ️ Google Analytics already initialized');
        return;
    }

    console.log('📥 Loading Google Analytics script...');
    
    // Initialize dataLayer first
    window.dataLayer = window.dataLayer || [];
    function gtag() {
        dataLayer.push(arguments);
    }
    window.gtag = gtag;

    // Load Google Analytics script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_CONFIG.googleAnalyticsId}`;
    script1.onload = function() {
        console.log('✅ Google Analytics script loaded');
        gtag('js', new Date());
        gtag('config', ANALYTICS_CONFIG.googleAnalyticsId, {
            'anonymize_ip': true, // IP anonymization for GDPR compliance
            'cookie_flags': 'SameSite=None;Secure'
        });
        console.log('✅ Google Analytics initialized with ID:', ANALYTICS_CONFIG.googleAnalyticsId);
        console.log('📊 dataLayer:', window.dataLayer);
    };
    script1.onerror = function() {
        console.error('❌ Failed to load Google Analytics script');
    };
    document.head.appendChild(script1);
}


/**
 * Track page view
 */
function trackPageView() {
    console.log('📄 trackPageView called');
    console.log('📄 Has consent:', hasAnalyticsConsent());
    console.log('📄 gtag available:', typeof window.gtag !== 'undefined');
    
    if (hasAnalyticsConsent() && window.gtag) {
        gtag('event', 'page_view', {
            page_path: window.location.pathname,
            page_title: document.title
        });
        console.log('✅ Page view tracked:', window.location.pathname);
    } else {
        console.warn('⚠️ Cannot track page view - missing consent or gtag');
    }
}

/**
 * Track custom events (e.g., button clicks, downloads)
 */
function trackEvent(eventName, eventParams = {}) {
    if (hasAnalyticsConsent() && window.gtag) {
        gtag('event', eventName, eventParams);
    }

}

/**
 * Track app store button clicks
 */
function trackAppStoreClick(store) {
    trackEvent('app_store_click', {
        store: store, // 'ios' or 'android'
        app_name: 'My Quitly'
    });
}

/**
 * Initialize all analytics tools based on consent
 */
function initAnalytics() {
    console.log('🔍 initAnalytics called');
    console.log('🔍 Cookie Consent:', localStorage.getItem('cookieConsent'));
    console.log('🔍 Analytics Cookies:', localStorage.getItem('analyticsCookies'));
    console.log('🔍 Has Analytics Consent:', hasAnalyticsConsent());
    
    // Only initialize if user has given consent
    if (hasAnalyticsConsent()) {
        console.log('✅ User has consented, initializing Google Analytics...');
        initGoogleAnalytics();
        // Track initial page view with a small delay to ensure gtag is loaded
        setTimeout(() => {
            trackPageView();
        }, 500);
    } else {
        console.log('❌ User has not consented to analytics cookies');
    }
}

/**
 * Re-initialize analytics when consent changes
 * Call this function when user updates cookie preferences
 */
function updateAnalyticsConsent() {
    console.log('🔄 updateAnalyticsConsent called');
    
    // Remove existing scripts (if any)
    const existingScripts = document.querySelectorAll('script[src*="googletagmanager"], script[src*="fbevents"]');
    existingScripts.forEach(script => {
        console.log('🗑️ Removing existing script:', script.src);
        script.remove();
    });

    // Clear dataLayer
    if (window.dataLayer) {
        window.dataLayer = [];
    }
    window.gtag = undefined;

    // Re-initialize based on new consent
    setTimeout(() => {
        initAnalytics();
    }, 100);
}

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initAnalytics,
        updateAnalyticsConsent,
        trackEvent,
        trackPageView,
        trackAppStoreClick,
        hasAnalyticsConsent,
        hasMarketingConsent
    };
}

// Make functions globally available
window.initAnalytics = initAnalytics;
window.updateAnalyticsConsent = updateAnalyticsConsent;
window.trackEvent = trackEvent;
window.trackPageView = trackPageView;
window.trackAppStoreClick = trackAppStoreClick;
window.hasAnalyticsConsent = hasAnalyticsConsent;
window.hasMarketingConsent = hasMarketingConsent;

console.log('📦 Analytics.js loaded');
console.log('📦 Functions available:', {
    initAnalytics: typeof initAnalytics !== 'undefined',
    updateAnalyticsConsent: typeof updateAnalyticsConsent !== 'undefined',
    trackEvent: typeof trackEvent !== 'undefined'
});

// Auto-initialize on page load if consent already given
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('📦 DOMContentLoaded - checking for existing consent');
        initAnalytics();
    });
} else {
    console.log('📦 Document already loaded - checking for existing consent');
    initAnalytics();
}

