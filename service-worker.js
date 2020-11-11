importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox) {
    console.log("berhasil dimuat");

    workbox.precaching.precacheAndRoute([
        { url: "https://danangpurbojati.github.io/football-match-pwa/", revision: '1' },
        { url: "https://danangpurbojati.github.io/football-match-pwa/manifest.json", revision: '1' },
        { url: "https://danangpurbojati.github.io/football-match-pwa/nav.html", revision: '1' },
        { url: "https://danangpurbojati.github.io/football-match-pwa/index.html", revision: '1' },
        { url: "https://danangpurbojati.github.io/football-match-pwa/schedule-detail.html", revision: '1' },
        { url: "https://danangpurbojati.github.io/football-match-pwa/pages/home.html", revision: '1' },
        { url: "https://danangpurbojati.github.io/football-match-pwa/pages/fixture.html", revision: '1' },
        { url: "https://danangpurbojati.github.io/football-match-pwa/pages/saved-schedule.html", revision: '1' },
        { url: "https://danangpurbojati.github.io/football-match-pwa/pages/table.html", revision: '1' },
        { url: "https://danangpurbojati.github.io/football-match-pwa/css/materialize.min.css", revision: '1' },
        { url: "https://danangpurbojati.github.io/football-match-pwa/css/custom.css", revision: '1' },
        { url: "https://danangpurbojati.github.io/football-match-pwa/js/materialize.min.js", revision: '1' },
        { url: "https://danangpurbojati.github.io/football-match-pwa/js/script.js", revision: '1' },
        { url: "https://danangpurbojati.github.io/football-match-pwa/js/sw-register.js", revision: '1' },
        { url: "https://danangpurbojati.github.io/football-match-pwa/js/schedule-detail.js", revision: '1' },
        { url: "https://danangpurbojati.github.io/football-match-pwa/js/api.js", revision: '1' },
        { url: "https://danangpurbojati.github.io/football-match-pwa/js/db.js", revision: '1' },
        { url: "https://danangpurbojati.github.io/football-match-pwa/js/idb.js", revision: '1' },
        { url: "https://danangpurbojati.github.io/football-match-pwa/images/background-home.jpg", revision: '1' },
        { url: "https://danangpurbojati.github.io/football-match-pwa/images/schedule-background.jpg", revision: '1' },
        { url: "https://danangpurbojati.github.io/football-match-pwa/images/logo/icon512x512.png", revision: '1' },
        { url: "https://danangpurbojati.github.io/football-match-pwa/images/logo/icon384x384.png", revision: '1' },
        { url: "https://danangpurbojati.github.io/football-match-pwa/images/logo/icon192x192.png", revision: '1' },
        { url: "https://danangpurbojati.github.io/football-match-pwa/images/logo/icon152x152.png", revision: '1' },
        { url: "https://danangpurbojati.github.io/football-match-pwa/images/logo/icon144x144.png", revision: '1' },
        { url: "https://danangpurbojati.github.io/football-match-pwa/images/logo/icon128x128.png", revision: '1' },
        { url: "https://danangpurbojati.github.io/football-match-pwa/images/logo/icon96x96.png", revision: '1' },
        { url: "https://danangpurbojati.github.io/football-match-pwa/images/logo/icon72x72.png", revision: '1' },
        { url: "https://danangpurbojati.github.io/football-match-pwa/images/logo/favicon.ico", revision: '1' }
    ], {
      ignoreUrlParametersMatching: [/.*/]
    });

    workbox.routing.registerRoute(
        new RegExp('/pages/'),
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'pages'
        })
    );

    workbox.routing.registerRoute(
        new RegExp('https://api.football-data.org/'),
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'api-football',
        })
    );
  
    workbox.routing.registerRoute(
        /.*(?:googleapis|gstatic)\.com/,
        workbox.strategies.staleWhileRevalidate({
          cacheName: 'google-fonts-stylesheets',
      })
    );

} else {
    console.log("tidak dapat dimuat");
}

// event push
self.addEventListener('push', event => {
    let body;
    if (event.data) {
      body = event.data.text();
    } else {
      body = 'Push message no payload';
    }
    let options = {
      body: body,
      icon: '/images/logo/icon192x192.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };
    event.waitUntil(
      self.registration.showNotification('Push Notification', options)
    );
});
