'use strict'
shop.ShoppingCart = function (dataSource, core) {
  shop.ProductsBase.apply(this, arguments);

  this._shoppingCartIds = [2, 3 ,5]
}

shop.ShoppingCart.prototype = Object.create(shop.ProductsBase.prototype);

shop.ShoppingCart.prototype.filterProducts = function () {
  this._filteredProducts = [];
  for (var i = 0; i < this._shoppingCartIds.length; i++) {
    for (var j = 0; j < this._dataSource._products.length; j++) {
      if (this._shoppingCartIds[i] == this._dataSource._products[j].data.id) {
        this._filteredProducts.push(this._dataSource._products[j]);
      }
    }
  }
};
