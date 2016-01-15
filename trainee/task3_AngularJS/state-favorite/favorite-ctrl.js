function favoriteCtrl(dataService,favoriteService, shoppingCartService, productService, $route, $location) {
  mainListCtr.apply(this, arguments);

  this.phones = favoriteService.getViewPhones();
  this.calculatePageCount();
};
shopApp.controller('favoriteCtrl',
                   ['dataService', 'favoriteService', 'shoppingCartService', 'productService', '$route', '$location', favoriteCtrl])
