'use strict'
shop.ShoppingCart = function (dataSource, core) {
  shop.ProductsBase.apply(this, arguments);

  this._shoppingCartIds = []
};

shop.ShoppingCart.prototype = Object.create(shop.ProductsBase.prototype);

shop.ShoppingCart.prototype.addToShoppingCartIds = function(id) {
  this._shoppingCartIds.push(id);
};

shop.ShoppingCart.prototype.existIdsInShoppingCart = function(id) {
  return this._shoppingCartIds.indexOf(id) === -1;
};

shop.ShoppingCart.prototype.filterProducts = function() {
  var self = this;
  this._filteredProducts = this._dataSource.getProducts().filter(function(product) {
    return self._shoppingCartIds.indexOf(product.data.id) !== -1;
  });
};

shop.ShoppingCart.prototype.getShopingCartIds = function() {
  return this._shoppingCartIds;
};

shop.ShoppingCart.prototype.removeFromShoppingCartIds = function(id) {
  var index = this._shoppingCartIds.indexOf(id);
  this._shoppingCartIds.splice(index, 1);
};
