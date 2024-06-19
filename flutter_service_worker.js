'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "a42ae3ae0fee439714662b1cedd8efc5",
"assets/AssetManifest.bin.json": "855ff33d637be8063a0336fea1b80671",
"assets/AssetManifest.json": "973cd3659cd7da5424501daf5111bd77",
"assets/assets/images/ai_image.png": "b2b8d06847127b56bdedc86062fc03c1",
"assets/assets/images/big_discord_icon.png": "d74865e1094f5ac0a0e782875449ff66",
"assets/assets/test_article/deadliest.jpg": "cd29172694784095f5d38286e00b4236",
"assets/assets/test_article/helldiver.jpg": "3f913de841f0a0f2d78de2c09a793f4b",
"assets/assets/test_article/marilyn.jpg": "6023e26aea2137456e5f3c096f66bb41",
"assets/assets/test_article/truman_committee.jpg": "8b48b829f0a8e263261630215cd2b296",
"assets/assets/test_audio/article_audio.mp3": "379ddfb5991013a31d1b298cc26fe336",
"assets/assets/test_audio/helldiver_cover.jpg": "3f913de841f0a0f2d78de2c09a793f4b",
"assets/assets/test_comic/scene10_marilyn.jpg": "19bc4c48ba7e57c12c0111f56c62f101",
"assets/assets/test_comic/scene11_miller.jpg": "a55df6ddfaa9177e87a910f496e41a8e",
"assets/assets/test_comic/scene12_broadway.webp": "b8973bf325c9edd07a9e20a124d44bde",
"assets/assets/test_comic/scene13_marilyn_miller.jpg": "6023e26aea2137456e5f3c096f66bb41",
"assets/assets/test_comic/scene14_messy_room.webp": "14c5eeaa5cd2faf301b1c0aa426f7474",
"assets/assets/test_comic/scene15_headquarters.jpg": "afd195666e4de093e53e4e93d756936e",
"assets/assets/test_comic/scene1_assembly.webp": "44c6065ec63cee5d7a4dfa54719d6088",
"assets/assets/test_comic/scene2_curtiss.jpg": "3f913de841f0a0f2d78de2c09a793f4b",
"assets/assets/test_comic/scene3_wind_tunnel.webp": "32ec174cd07542717c866387192e1225",
"assets/assets/test_comic/scene4_carrier.jpg": "8f4e20a8615d098b72ab1ce1dcf39658",
"assets/assets/test_comic/scene5_truman_committee.jpg": "8b48b829f0a8e263261630215cd2b296",
"assets/assets/test_comic/scene6_inspector.webp": "04fb3613f8d091361effe82c61e3b4ab",
"assets/assets/test_comic/scene7_judge.webp": "2524f25a91e956b66ce1a8b34d59db8f",
"assets/assets/test_comic/scene8_p40.jpg": "f75b42143437673173095ba1452738d6",
"assets/assets/test_comic/scene9_shutdown.webp": "fd37842873956c54d9ea871799fae435",
"assets/assets/translations/en.json": "a40254da5699292cbb4fbdad08892123",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "1d2a1cde90ffc40ee87e44b66ac6da37",
"assets/NOTICES": "cd95e61f8ecb5d533d3f442454b65aa7",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "e986ebe42ef785b27164c36a9abc7818",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "738255d00768497e86aa4ca510cce1e1",
"canvaskit/canvaskit.js.symbols": "74a84c23f5ada42fe063514c587968c6",
"canvaskit/canvaskit.wasm": "9251bb81ae8464c4df3b072f84aa969b",
"canvaskit/chromium/canvaskit.js": "901bb9e28fac643b7da75ecfd3339f3f",
"canvaskit/chromium/canvaskit.js.symbols": "ee7e331f7f5bbf5ec937737542112372",
"canvaskit/chromium/canvaskit.wasm": "399e2344480862e2dfa26f12fa5891d7",
"canvaskit/skwasm.js": "5d4f9263ec93efeb022bb14a3881d240",
"canvaskit/skwasm.js.symbols": "c3c05bd50bdf59da8626bbe446ce65a3",
"canvaskit/skwasm.wasm": "4051bfc27ba29bf420d17aa0c3a98bce",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "383e55f7f3cce5be08fcf1f3881f585c",
"flutter_bootstrap.js": "1d9f35e0935d850943f26b8940d440d6",
"index.html": "c15c258b68d053828e9a347e455f2544",
"/": "c15c258b68d053828e9a347e455f2544",
"main.dart.js": "1251f5195d06d67f793d2aae91e01d7b",
"manifest.json": "636a955492a01f14d99a0063f19a01c6",
"version.json": "ab0f0a4f4816dbe38b34d6dd6bee6762"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
