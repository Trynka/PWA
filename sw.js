self.addEventListener("install", evt => console.log("service worker installed", evt))

self.addEventListener("activate", evt => console.log("service worker activated", evt))