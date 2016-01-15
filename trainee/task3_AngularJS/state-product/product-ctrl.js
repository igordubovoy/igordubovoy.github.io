function productCtrl(dataService, favoriteService, shoppingCartService, productService, $route, $location) {
  mainListCtr.apply(this, arguments);
  this.phone = productService.phone;
};
shopApp.controller('productCtrl',
  ['dataService', 'favoriteService', 'shoppingCartService', 'productService', '$route', '$location', productCtrl]);
