'use strict'
shop.Favorite = function (dataSource, core) {
  shop.ProductsBase.apply(this, arguments);
  this._favoritesIds = []
};

shop.Favorite.prototype = Object.create(shop.ProductsBase.prototype);

shop.Favorite.prototype.addToFavoritesIds = function(id) {
    this._favoritesIds.push(id);
};

shop.Favorite.prototype.existIdsInFavorites = function(id) {
  return this._favoritesIds.indexOf(id) === -1;
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

shop.Favorite.prototype.removeFromFavoritesIds = function(id) {
  var index = this._favoritesIds.indexOf(id);
  this._favoritesIds.splice(index, 1);
};
