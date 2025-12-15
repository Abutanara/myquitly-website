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
    if (!ANALYTICS_CONFIG.googleAnalyticsId || ANALYTICS_CONFIG.googleAnalyticsId === 'G-XXXXXXXXXX') {
        console.warn('Google Analytics ID not configured. Please set ANALYTICS_CONFIG.googleAnalyticsId');
        return;
    }

    // Load Google Analytics script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_CONFIG.googleAnalyticsId}`;
    document.head.appendChild(script1);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag() {
        dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', ANALYTICS_CONFIG.googleAnalyticsId, {
        'anonymize_ip': true, // IP anonymization for GDPR compliance
        'cookie_flags': 'SameSite=None;Secure'
    });

    window.gtag = gtag;
    console.log('✅ Google Analytics initialized');
}


/**
 * Track page view
 */
function trackPageView() {
    if (hasAnalyticsConsent() && window.gtag) {
        gtag('event', 'page_view', {
            page_path: window.location.pathname,
            page_title: document.title
        });
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
        app_name: 'MyQuitly'
    });
}

/**
 * Initialize all analytics tools based on consent
 */
function initAnalytics() {
    // Only initialize if user has given consent
    if (hasAnalyticsConsent()) {
        initGoogleAnalytics();
        // Track initial page view
        trackPageView();
    }
}

/**
 * Re-initialize analytics when consent changes
 * Call this function when user updates cookie preferences
 */
function updateAnalyticsConsent() {
    // Remove existing scripts (if any)
    const existingScripts = document.querySelectorAll('script[src*="googletagmanager"], script[src*="fbevents"]');
    existingScripts.forEach(script => script.remove());

    // Re-initialize based on new consent
    initAnalytics();
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

// Auto-initialize on page load if consent already given
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnalytics);
} else {
    initAnalytics();
}

