export default function eventualLoad() {
  window.addEventListener('unload', () => { 
    navigator.sendBeacon(`${window.nvc.serverUrl}/visitors/upsert`, JSON.stringify({
      domain: window.nvc.shopifyDomain,
      key: window.nvc.visitor,
      active: false,
    }));
  });
}