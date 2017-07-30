/**
 * This module is used by app.js. See exported functions for it purposes.
 */

export function checkHTTPS() {
  // Service workers require HTTPS (http://goo.gl/lq4gCo). If we're running on a real web server
  // (as opposed to localhost on a custom port, which is whitelisted), then change the protocol to HTTPS.
  if ((!location.port || location.port == "80") && location.protocol != 'https:') {
    location.protocol = 'https:';
  }
}

export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    // Override the default scope of '/' with './', so that the registration applies
    // to the current directory and everything underneath it.
    navigator.serviceWorker.register('/service-worker-js', {scope: './'}).then(function(registration) {
      // At this point, registration has taken place.
      // The service worker will not handle requests until this page and any
      // other instances of this page (in other tabs, etc.) have been
      // closed/reloaded.
      console.log('service worker registered successfully')
    }).catch(function(error) {
      // Something went wrong during registration. The service-worker.js file
      // might be unavailable or contain a syntax error.
      console.error('service worder registration failed')
      console.error(error);
    });
  } else {
    console.warn('Current browser doesn\'t support service workers.');
    console.log('more info: http://www.chromium.org/blink/serviceworker/service-worker-faq');
  }
}

export function GoogleAnalytics() {
  /* jshint ignore:start */
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
  ga('create', 'TODO IN FUTURE', 'auto');
  ga('send', 'pageview');
  /* jshint ignore:end */  
}