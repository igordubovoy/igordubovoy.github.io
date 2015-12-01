shop.Products = function () {
  shop.ProductsBase.call(this);
};
shop.Products.prototype = shop.ProductsBase.prototype;

shop.Products.prototype.initProducts = function () {
  for (var i = 0; i < shop.productsData.length; i++) {
    var product = new shop.Product(shop.productsData[i]);
    this._productsList.push(product);
  };
};
