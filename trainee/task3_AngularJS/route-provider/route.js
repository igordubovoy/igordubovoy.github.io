
shopApp.config(['$routeProvider', function ($routeProvider) {

  $routeProvider
    .when('/products', {
    templateUrl: 'state-products/products.html'
  })
    .when('/shoppingCart', {
    templateUrl: 'state-shop-cart/shoppingCart.html'
  })
    .when('/favorite', {
    templateUrl: 'state-favorite/favorite.html'
  })
    .when('/product', {
    templateUrl: 'state-product/product.html'
  })
    .otherwise({
    redirectTo: '/products'
  });
}]);
