shopApp.service('productService', ['$location', function ($location) {
  mainService.call(this);
  this.savePhone = function(phone) {
    this.phone = phone;
  };

}])
