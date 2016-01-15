function productsCtrl(dataService, favoriteService, shoppingCartService, productService, $route, $location) {
  mainListCtr.apply(this, arguments);

}

shopApp.controller('productsCtrl',
                   ['dataService', 'favoriteService', 'shoppingCartService', 'productService', '$route','$location', productsCtrl]);
