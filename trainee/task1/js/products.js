'use strict';
shop.Products = function (dataSource, core) {
  shop.ProductsBase.apply(this, arguments);

};
shop.Products.prototype = Object.create(shop.ProductsBase.prototype);

shop.Products.prototype.filterProducts = function() {
  this._filteredProducts = this._dataSource._products;
};
