shopApp.service('shoppingCartService', ['$location', function ($location) {
  mainService.call(this);

  this.addToShopCart = function(phone) {
    phone.inShopCart = true;
    this.viewPhones.push(phone);
  };

  this.removeFromShopCart = function(phone) {
    var index = this.viewPhones.indexOf(phone);
    phone.inShopCart = false;
    this.viewPhones.splice(index, 1);
  };

  this.toggle = function(phone) {
    if(!phone.inShopCart){
      this.addToShopCart(phone);
    } else {
      $location.path('/shoppingCart');
    }
  };

  this.getViewPhones = function() {
    return this.viewPhones;
  };
}])
