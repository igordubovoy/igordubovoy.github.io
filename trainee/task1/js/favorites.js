'use strict'
shop.Favorite = function (dataSource, core) {
  shop.ProductsBase.apply(this, arguments);
  this._favoritesIds = [5, 7, 9]
}

shop.Favorite.prototype = Object.create(shop.ProductsBase.prototype);

shop.Favorite.prototype.filterProducts = function() {
  var self = this;
  this._filteredProducts = this._dataSource.getProducts().filter(function(product) {
    return self._favoritesIds.indexOf(product.data.id) > -1;
  });
};
