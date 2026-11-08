const CACHE='jawara-basa-reader-v7-20261108b';
const CORE=['./','./index.html','./buku.html','./aksara.html','./guru.html'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('jawara-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
 const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==self.location.origin)return;
 if(r.mode==='navigate'||r.destination==='document'){
   e.respondWith(fetch(r).then(resp=>{if(resp.ok){const copy=resp.clone();caches.open(CACHE).then(c=>c.put(r,copy))}return resp}).catch(()=>caches.match(r)));return;
 }
 e.respondWith(fetch(r).then(resp=>{if(resp.ok){const copy=resp.clone();caches.open(CACHE).then(c=>c.put(r,copy))}return resp}).catch(()=>caches.match(r)));
});
