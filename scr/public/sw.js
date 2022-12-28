var version = 'v19102022';
var CACHENAME = "cachestore-" + version;
var host="http://localhost:3000";

var FILES = [
  "./controladores/funciones.js",
  "./controladores/session.js",
  "https://cdn.jsdelivr.net/npm/admin-lte@3.1/dist/css/adminlte.min.css",
  "https://cdn.jsdelivr.net/npm/admin-lte@3.1/dist/js/adminlte.min.js",
  "https://unpkg.com/vue@3.1.1/dist/vue.global.prod.js",
  "https://cdn.jsdelivr.net/npm/sweetalert2@11",
  "https://code.jquery.com/jquery-3.3.1.js",
  "https://pro.fontawesome.com/releases/v5.10.0/css/all.css"

];


self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHENAME).then(function (cache) {
      return cache.addAll(FILES);
    })
  );
});


self.addEventListener('activate', function (event) {

  event.waitUntil(
    caches.keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames
            .map(c => c.split('-'))
            .filter(c => c[0] === 'cachestore')
            .filter(c => c[1] !== version)
            .map(c =>  caches.delete(c.join('-')))
        )
        
      )
  );
});




self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener("push", e => {
  const data = e.data.json();

  self.registration.showNotification(
    data.title,
    {
      body: data.body,
      image: "",
      icon: data.icon,
      badge: data.icon
    }
  );
});