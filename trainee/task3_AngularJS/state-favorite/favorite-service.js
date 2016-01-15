shopApp.service('favoriteService', function () {
  mainService.call(this);

  this.addToFavorite = function(phone) {
    phone.inFavorite = true;
    this.viewPhones.push(phone);
  };

  this.removeFromFavorite = function(phone) {
    var index = this.viewPhones.indexOf(phone);
    phone.inFavorite = false;
    this.viewPhones.splice(index, 1);
  };

  this.toggle = function(phone) {
    phone.inFavorite ? this.removeFromFavorite(phone) : this.addToFavorite(phone);
  };

  this.getViewPhones = function() {
    return this.viewPhones;
  }
})
