function shoppingCartCtrl(dataService,favoriteService, shoppingCartService, productService, $route, $location) {
  mainListCtr.apply(this, arguments);
  var self = this;
  this.total = 0;
  this.phones = shoppingCartService.getViewPhones();
  this.changeCount = function(phone, count) {
    phone.count = count;
    phone.totalPrice = phone.count * phone.price;
    this.calculateTotal();
  };
  this.calculateTotal = function() {
    this.total = 0;
    this.phones.forEach(function(phone){
      self.total += phone.totalPrice;
    });
  };

  this.remove = function(phone) {
    shoppingCartService.removeFromShopCart(phone);
    this.calculateTotal();
    this.calculatePageCount();
  };

  this.calculateTotal();
  this.calculatePageCount();


};
shopApp.controller('shoppingCartCtrl',
                   ['dataService', 'favoriteService', 'shoppingCartService', 'productService', '$route', '$location', shoppingCartCtrl])
