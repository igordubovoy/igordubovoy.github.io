'use strict';
shop.DataSource = function (core) {
  this._core = core;

  this._products = [];
};

shop.DataSource.prototype.initProducts = function () {
  for (var i = 0; i < shop.productsData.length; i++) {
    var product = new shop.Product(shop.productsData[i], this._core);
    this._products.push(product);
  }
};

shop.DataSource.prototype.getProducts = function () {
  return this._products;
};