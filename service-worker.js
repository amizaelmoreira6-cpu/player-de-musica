const cacheName = "musicbox-v1";

const arquivos = [
    "./",
    "./index.html",
    "./style.css",
    "./codigo.js",
    "./manifest.json",
];

self.addEventListener("install", evento => {

    evento.waitUntil(

        caches.open(cacheName)
        .then(cache => cache.addAll(arquivos))

    );

});

self.addEventListener("fetch", evento => {

    evento.respondWith(

        caches.match(evento.request)
        .then(resposta => resposta || fetch(evento.request))

    );

});