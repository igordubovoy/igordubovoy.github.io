'use strict';
shop.Favorite = function (dataSource, core) {
  shop.ProductsBase.apply(this, arguments);

  this._data = localStorage.dataFavorites;/*this._data -> var data*/
  this._favoritesIds = this._data ? JSON.parse(this._data) : [];
};

shop.Favorite.prototype = Object.create(shop.ProductsBase.prototype);

shop.Favorite.prototype.addIds = function(product) {/*->add*/
  this._favoritesIds.push(product.data.id);
  this.saveData()
};

shop.Favorite.prototype.existIds = function(product) {/*->exist*/
  return this._favoritesIds.indexOf(product.data.id) === -1;
};

shop.Favorite.prototype.filterProducts = function() {
  var self = this;
  this._filteredProducts = this._dataSource.getProducts().filter(function(product) {
    return self._favoritesIds.indexOf(product.data.id) !== -1;
  });
};

shop.Favorite.prototype.getFavoriteIds = function() {/*delete*/
  return this._favoritesIds;
};

shop.Favorite.prototype.removeId = function(product) {/*->remove*/
  var index = this._favoritesIds.indexOf(product.data.id);
  this._favoritesIds.splice(index, 1);
  this.saveData()
};

shop.Favorite.prototype.saveData = function() {
  var dataStr = JSON.stringify(this._favoritesIds);
  localStorage.dataFavorites = dataStr;
}