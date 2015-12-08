'use strict'
shop.Favorite = function (dataSource, core) {
  shop.ProductsBase.apply(this, arguments);
  this._favoritesIds = []
};

shop.Favorite.prototype = Object.create(shop.ProductsBase.prototype);

shop.Favorite.prototype.addIds = function(product) {
  this._favoritesIds.push(product.data.id);
};

shop.Favorite.prototype.existIds = function(product) {
  return this._favoritesIds.indexOf(product.data.id) === -1;
};

shop.Favorite.prototype.filterProducts = function() {
  var self = this;
  this._filteredProducts = this._dataSource.getProducts().filter(function(product) {
    return self._favoritesIds.indexOf(product.data.id) !== -1;
  });
};

shop.Favorite.prototype.getFavoriteIds = function() {
  return this._favoritesIds;
}

shop.Favorite.prototype.removeId = function(product) {
  var index = this._favoritesIds.indexOf(product.data.id);
  this._favoritesIds.splice(index, 1);
};
