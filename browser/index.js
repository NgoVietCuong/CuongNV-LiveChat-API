import initialLoad from './initialLoad';

(function() {
  if (window.Shopify && window.Shopify.shop) {
    window.nvc = {};
    window.nvc.cloudName = "dvz7322mp";
    window.nvc.shopifyDomain = window.Shopify.shop;
    initialLoad();
  }
})();