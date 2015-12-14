'use strict';
shop.Favorite = function (dataSource, core) {
  shop.ProductsBase.apply(this, arguments);

  var data = localStorage.dataFavorites;
  this._favoritesIds = data ? JSON.parse(data) : [];
};

shop.Favorite.prototype = Object.create(shop.ProductsBase.prototype);

shop.Favorite.prototype.add = function(product) {
  this._favoritesIds.push(product.data.id);
  this.saveData()
};

shop.Favorite.prototype.exist = function(product) {
  return this._favoritesIds.indexOf(product.data.id) === -1;
};

shop.Favorite.prototype.filterProducts = function() {
  var self = this;
  this._filteredProducts = this._dataSource.getProducts().filter(function(product) {
    return !self.exist(product);
  });
};

shop.Favorite.prototype.remove = function(product) {
  var index = this._favoritesIds.indexOf(product.data.id);
  this._favoritesIds.splice(index, 1);
  this.saveData()
};

shop.Favorite.prototype.saveData = function() {
  var dataStr = JSON.stringify(this._favoritesIds);
  localStorage.dataFavorites = dataStr;
};
