'use strict'
shop.ShoppingCart = function (dataSource, core) {
  shop.ProductsBase.apply(this, arguments);

  this._shoppingCartIds = []
  this._totalResult = 0;
  this.container = document.getElementById('container');
};

shop.ShoppingCart.prototype = Object.create(shop.ProductsBase.prototype);

shop.ShoppingCart.prototype.addIds = function(product) {
  this._shoppingCartIds.push(product.data.id);
};

shop.ShoppingCart.prototype.existIds = function(product) {
  return this._shoppingCartIds.indexOf(product.data.id) === -1;
};

shop.ShoppingCart.prototype.filterProducts = function() {
  var self = this;
  this._filteredProducts = this._dataSource.getProducts().filter(function(product) {
    return self._shoppingCartIds.indexOf(product.data.id) !== -1;
  });
};

shop.ShoppingCart.prototype.getIds = function() {
  return this._shoppingCartIds;
};

shop.ShoppingCart.prototype.removeId = function(product) {
  var index = this._shoppingCartIds.indexOf(product.data.id);
  this._shoppingCartIds.splice(index, 1);
};

shop.ShoppingCart.prototype.writeTotalBlock = function() {
  var
    totalBlock = document.createElement('div'),
    total = document.createElement('div');

    totalBlock.className = 'total';
    total.className = 'total_content'

    total.innerHTML = 'Загальна сума до сплати: ' + this._totalResult + ' грн';

    totalBlock.appendChild(total);
    this.container.appendChild(totalBlock);
};

shop.ShoppingCart.prototype.calculateTotalResult = function() {
  var self = this;
  this._totalResult = 0;

  this._filteredProducts.forEach(function(product){
    self._totalResult += product._totalPrice;
  });
};

shop.ShoppingCart.prototype.write = function() {
  this.container.innerHTML = '';
  this._core.writeHeader();
  this.writeSortingMenu();
  if(this._shoppingCartIds.length){
    this.writeProducts();
    this.calculateTotalResult();
    this.writeTotalBlock();
  } else {
    this.writeEmpty(this.container)
  }
  this.writePager();
};

