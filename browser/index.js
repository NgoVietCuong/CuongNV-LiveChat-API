import initialLoad from './initialLoad';

(function() {
  if (window.Shopify && window.Shopify.shop) {
    window.nvc = {};
    window.nvc.shopifyDomain = window.Shopify.shop;
    window.nvc.chatWidgetClose = true;
    initialLoad();
  }
})();