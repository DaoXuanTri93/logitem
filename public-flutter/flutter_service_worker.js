'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "38ec4ac82010cb8d4d942947ba9bd304",
"assets/AssetManifest.bin.json": "b0a26760ab1eb58d4e874eeb86a36909",
"assets/AssetManifest.json": "246d542efa9bc6ea09519c61b842aee2",
"assets/assets/icons/acccount.svg": "05e11424ddfddc4650ff99bc7e3d14ac",
"assets/assets/icons/checklist.svg": "83e1dc329a88364bf862b55ea15952cf",
"assets/assets/icons/dangerIcon.svg": "3f97529e2bd2470940e15c518e43ebff",
"assets/assets/icons/logger.svg": "bf20e3d4541bc29f5f8ffa97b2a756ea",
"assets/assets/icons/menu_bar.svg": "6ecfc7069439782da0bf65f9645e68c6",
"assets/assets/icons/menu_dashboard.svg": "5e8d164243b3e28c22a8a5e35719c96e",
"assets/assets/icons/menu_profile.svg": "134c2274ffaca9441fe7523b2f476608",
"assets/assets/icons/menu_setting.svg": "32ab0402dc07a66d078c758ddb0aa798",
"assets/assets/icons/mission_approval.svg": "02e1c36166385a35fc252f06307d355d",
"assets/assets/icons/one_drive.svg": "0b0ca635ef35ec9beebb18aaf20cd5d9",
"assets/assets/icons/password_lock.svg": "8675c208bd974cabc0b31b95b8c93368",
"assets/assets/icons/search.svg": "82ad5e39b306dc6a42809cbeef651e64",
"assets/assets/icons/sign_out.svg": "747325b7c09d298076158d63724a2483",
"assets/assets/icons/staff.svg": "81bc820fa1af92004463e5dcb8399452",
"assets/assets/icons/user_account.svg": "ada0a6d645a99bb8448451e000a555de",
"assets/assets/images/123.jpg": "b8ad2b1b9cc9b748face0904109677dc",
"assets/assets/images/blue.jpg": "52be042339ed0fcc7ae73ee41e881ddb",
"assets/assets/images/driver.png": "1e625a511f12dd167b3f7cc43acecb06",
"assets/assets/images/logitem_logo.jpg": "1920d1c926d31933ad4c956aee768721",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "c7e7293a587a4edbe78aed0a72a44e58",
"assets/lib/assets/Blue.jpg": "5839c583910c7be233aa19249c684be2",
"assets/lib/assets/camcorder.svg": "8f8a5ec22e5372b162f0cd0f262b865b",
"assets/lib/assets/dangkytre.svg": "61632b11d9a7d61275c97d5b0d15e1be",
"assets/lib/assets/download.jpg": "793fd09090726d2b402fb2af19a7ddb5",
"assets/lib/assets/exit-left-svgrepo-com.svg": "6d3571a11b9898821424fe7b743c188b",
"assets/lib/assets/exit-svgrepo-com.svg": "b3d827b919625fd2be8f4c76adf50c98",
"assets/lib/assets/exit-vector-1-svgrepo-com.svg": "2cc055d13177c8c1be47dd66df333610",
"assets/lib/assets/file-plus-alt-svgrepo-com.svg": "095a590928c13ea5d3bab90ba40c9659",
"assets/lib/assets/fingerprint-scan-svgrepo-com.svg": "9603f9a3521095fd19059345bd621474",
"assets/lib/assets/flagen.svg": "b3a876f068accc91f9238598847933a8",
"assets/lib/assets/flagja.svg": "31a79d73f954e5ec648c19856ebe61ae",
"assets/lib/assets/flagno.svg": "f7eb619040f613b10204e3611346f66a",
"assets/lib/assets/flagvn.svg": "2c213f5cc045ba9c25a10f4a671c2eb5",
"assets/lib/assets/id-card-svgrepo-com.svg": "0538b37198d216fc842424ec11ce77c5",
"assets/lib/assets/img.png": "0eaa13e60fc07b3a9b648f2871de47b6",
"assets/lib/assets/language.svg": "a4407b31b4a621c26bbf29689183d6c6",
"assets/lib/assets/logitem.jpg": "0ecd79f59d0e52651b37c6ed3213dc97",
"assets/lib/assets/logitem_image-removebg-preview.png": "17a2a2285166c071b19e2a7f1b27babc",
"assets/lib/assets/tick-double-svgrepo-com.svg": "d32194de1b15418a8faf9d05f0c2d843",
"assets/lib/assets/time-new-svgrepo-com.svg": "1af587edfb4c21525642f6f6950465bc",
"assets/lib/assets/time-out-svgrepo-com.svg": "b256b326f0f823c98bd25d09611e7bc4",
"assets/lib/assets/timekeeping.svg": "4d9f5b6107cb4c279fff7890e64be6bb",
"assets/NOTICES": "48d9d7d856170acc0396a17653e3f001",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "89ed8f4e49bcdfc0b5bfc9b24591e347",
"assets/packages/flutter_image_compress_web/assets/pica.min.js": "6208ed6419908c4b04382adc8a3053a2",
"assets/shaders/ink_sparkle.frag": "4096b5150bac93c41cbc9b45276bd90f",
"canvaskit/canvaskit.js": "eb8797020acdbdf96a12fb0405582c1b",
"canvaskit/canvaskit.wasm": "73584c1a3367e3eaf757647a8f5c5989",
"canvaskit/chromium/canvaskit.js": "0ae8bbcc58155679458a0f7a00f66873",
"canvaskit/chromium/canvaskit.wasm": "143af6ff368f9cd21c863bfa4274c406",
"canvaskit/skwasm.js": "87063acf45c5e1ab9565dcf06b0c18b8",
"canvaskit/skwasm.wasm": "2fc47c0a0c3c7af8542b601634fe9674",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "59a12ab9d00ae8f8096fffc417b6e84f",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "29a646c00526c6223d0e19c157cda2d9",
"/": "29a646c00526c6223d0e19c157cda2d9",
"main.dart.js": "14eb2fdf253beea4308b6cfa83b3b7f2",
"manifest.json": "a3b941730fff719b4b41190d4d43f008",
"version.json": "0253b4f5390261cb3679fc1177344210"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
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
