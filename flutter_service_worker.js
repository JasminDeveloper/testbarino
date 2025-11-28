'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"flutter_bootstrap.js": "6b7a829a22b3108ed68d4e6ee1fc9fbf",
"version.json": "9aa323354af8d1c4033254a490675c56",
"index.html": "d7ab9a4e0fde20eb74e55fcb1ec750b5",
"/": "d7ab9a4e0fde20eb74e55fcb1ec750b5",
"main.dart.js": "543e375ffbb1da2ec07d2bb770538017",
"flutter.js": "83d881c1dbb6d6bcd6b42e274605b69c",
"favicon.png": "317baffced255b311ad219781c2d72c8",
"package.json": "c48004eaf28a61af6ff45eda6da75b98",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "06f926a4d3d48053ded0d57e4d477fff",
"fingerprint_reader.zip": "25e3d534168457fbd9fc5db172079e8d",
"assets/AssetManifest.json": "6dee413c9096fc7449ea05f7998c1e41",
"assets/NOTICES": "68b552731478dea1556c4299d50ab05d",
"assets/FontManifest.json": "3ae5fd8e84a1c6c788536318e0a71cf8",
"assets/AssetManifest.bin.json": "382e96a88ade3df4460880f35692f9fb",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "33b7d9392238c04c131b6ce224e13711",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "2578fefbbbeeb3b6389ff1ecd7673677",
"assets/fonts/MaterialIcons-Regular.otf": "c336ee11d0869e08fbfc334d5593930c",
"assets/assets/gifImage/fingerprint.gif": "fcb6637d3933bd2bc25f760acb3cafa6",
"assets/assets/images/add_image.png": "5fa43ecdc39cad75c9da039bb10ab355",
"assets/assets/images/tab_home.svg": "867f1d5046f34e871576a6d095d4c926",
"assets/assets/images/ic_logo.png": "7431dc067f3b1c8d4a1f28b1a44ed9d0",
"assets/assets/images/ic_banner.png": "d3a9b00ae48c4871d44456fe0378d83a",
"assets/assets/svgIcons/ic_finger_placeholder.svg": "7bd04a74aa371b3404fecd090e64917a",
"assets/assets/svgIcons/ic_back_arrow.svg": "aefbce62a2535601db9a6249c9b7e310",
"assets/assets/svgIcons/ic_delete.svg": "0cd1c31ff0b6c848ef605d73b3e25a4b",
"assets/assets/svgIcons/ic_sync_data.svg": "a11a0b77998428255146ec706ffd106e",
"assets/assets/svgIcons/ic_burger_menu.svg": "aad32c5a9740a1426c92030e720f6be9",
"assets/assets/svgIcons/ic_reset_white.svg": "2a10f21327034a4cfd752ca88df7c857",
"assets/assets/svgIcons/ic_add.svg": "4e68a9832ddd45ff7aec4bba204c387a",
"assets/assets/svgIcons/ic_upload.svg": "8167d221cac23d8dd60353a98089194d",
"assets/assets/svgIcons/ic_archive_list.svg": "4c45e4c2c65a377bf708bd1f3d58d811",
"assets/assets/svgIcons/ic_right_hand.svg": "5a48b71443177cf3c4400419daf1dc82",
"assets/assets/svgIcons/ic_close.svg": "8426697e8435a7317e2a441ba3540ce8",
"assets/assets/svgIcons/ic_dropdown.svg": "62d19a3cf9637d3b6aeed8865a2ee596",
"assets/assets/svgIcons/ic_user.svg": "1445c69292b29e4d55242d0c31d4f997",
"assets/assets/svgIcons/ic_uncheck.svg": "1f9f063a06f6e1a24732cc072604267b",
"assets/assets/svgIcons/ic_password.svg": "e7518ca2a91e45709cd420384f02dfc1",
"assets/assets/svgIcons/ic_arrow_right.svg": "880f8ba4fe23b8e3f729c49238f93bd5",
"assets/assets/svgIcons/ic_login_logo.svg": "4b2a90a9d189f48563ddeb411e41d87b",
"assets/assets/svgIcons/ic_radio_uncheck.svg": "f38dea49da27be582098e1ba4957e659",
"assets/assets/svgIcons/ic_refresh_list.svg": "f8f2a471d0ee69aa4d90abbc9e21e1ac",
"assets/assets/svgIcons/ic_client_list.svg": "d0d85ad6980e4f1d2f35113208289862",
"assets/assets/svgIcons/ic_check_green.svg": "2ecabd2af3c0b49bb67e592a6f3c522a",
"assets/assets/svgIcons/ic_check.svg": "4c2a1e8220c4cf3c6ae9f70a8c0dc3c9",
"assets/assets/svgIcons/ic_calender.svg": "d1737dd59f007d904577972b9f5941b6",
"assets/assets/svgIcons/ic_back.svg": "f7d6898a7a7f0d83dc3eb19e831c42b0",
"assets/assets/svgIcons/ic_left_hand.svg": "4daaa49c831e31d1859a8a50139ec336",
"assets/assets/svgIcons/ic_reset.svg": "99c8eeeb88fde6a942e3e193b14f0c87",
"assets/assets/svgIcons/ic_biometric.svg": "03ffbdb7223f89cbebe42aa66e04798f",
"assets/assets/svgIcons/ic_search.svg": "c10bb90268b298b2e69000d3cc13cec3",
"assets/assets/svgIcons/ic_radio_checked.svg": "55ba99a78f0a7d9b69a747880b9fec75",
"assets/assets/svgIcons/ic_edit.svg": "1a4f08417f1afb31df5820d3390b5029",
"assets/assets/svgIcons/ic_logout.svg": "9712aad79c049cfb221ea9c151b4ac41",
"assets/assets/fonts/Outfit-Bold.ttf": "e28d1b405645dfd47f4ccbd97507413c",
"assets/assets/fonts/Outfit-Regular.ttf": "9f444021dd670d995f9341982c396a1d",
"assets/assets/fonts/Outfit-Black.ttf": "d032ccd62028487a6c8d70a07bda684b",
"assets/assets/fonts/Outfit-Thin.ttf": "8f281fc8ba39d6f355190c14b6532b44",
"assets/assets/fonts/Outfit-SemiBold.ttf": "f4bde7633a5db986d322f4a10c97c0de",
"assets/assets/fonts/Outfit-ExtraLight.ttf": "f257db4579a91feb1c1f0e80daae48ae",
"assets/assets/fonts/Outfit-ExtraBold.ttf": "d649fd9b3a7e7c6d809b53eede996d18",
"assets/assets/fonts/Outfit-Medium.ttf": "3c88ad79f2a55beb1ffa8f68d03321e3",
"assets/assets/fonts/Outfit-Light.ttf": "905f109c79bd9683fc22eaffe4808ffe",
"canvaskit/skwasm.js": "ea559890a088fe28b4ddf70e17e60052",
"canvaskit/skwasm.js.symbols": "e72c79950c8a8483d826a7f0560573a1",
"canvaskit/canvaskit.js.symbols": "bdcd3835edf8586b6d6edfce8749fb77",
"canvaskit/skwasm.wasm": "39dd80367a4e71582d234948adc521c0",
"canvaskit/chromium/canvaskit.js.symbols": "b61b5f4673c9698029fa0a746a9ad581",
"canvaskit/chromium/canvaskit.js": "8191e843020c832c9cf8852a4b909d4c",
"canvaskit/chromium/canvaskit.wasm": "f504de372e31c8031018a9ec0a9ef5f0",
"canvaskit/canvaskit.js": "728b2d477d9b8c14593d4f9b82b484f3",
"canvaskit/canvaskit.wasm": "7a3f4ae7d65fc1de6a6e7ddd3224bc93",
"fingerprint_reader/websdk.client.bundle.min.js": "a61dc521837db272a48fe541c79dec45",
"fingerprint_reader/bootstrap.bundle.js": "1a94abb2d5270a12fa1ffba3a186737d",
"fingerprint_reader/fingerprint.sdk.min.js": "56f4ab289ae05616859a589e259e6438",
"fingerprint_reader/bootstrap.bundle.js.map": "f71cf6369adc52138c90ac0702165b57",
"fingerprint_reader/es6-shim.js": "4722b59e546997900b9203a171f392c5",
"fingerprint_reader/jquery-3.5.0.min.map": "1790afac4ab93e0dc75967129d048608",
"fingerprint_reader/customNew.js": "14915412059f87d06301ae8d93bec83f",
"fingerprint_reader/jquery-3.5.0.min.js": "12108007906290015100837a6a61e9f4"};
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
