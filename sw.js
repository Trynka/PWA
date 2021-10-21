const staticCacheName = "site-static-v2";
const assets = [
  "/",
  "/index.html",
  "/js/app.js",
  "/js/ui.js",
  "/js/materialize.min.js",
  "/css/styles.css",
  "/css/materialize.min.css",
  "/img/dish.png",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.gstatic.com/s/materialicons/v111/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
];

self.addEventListener("install", (evt) => {
    //console.log("service worker installed", evt)
    evt.waitUntil(
        caches.open(staticCacheName)
            .then((cache) => {
                cache.addAll(assets);
            })
    );
});

self.addEventListener("activate", (evt) => {
    //console.log("service worker activated", evt);
    evt.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== staticCacheName)
                .map(key => caches.delete(key))
            )
        })
    );
});

self.addEventListener("fetch", (evt) => {
    //console.log("fetch event", evt);
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request);
        })
    )
});
