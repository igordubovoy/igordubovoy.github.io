shopApp.service('dataService', function () {
  this.phones = productsData;
  this.getPhones = function() {
    return this.phones;
  };
})
