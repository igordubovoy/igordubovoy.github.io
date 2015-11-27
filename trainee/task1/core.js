shop.Core = function() {
  this.products = new shop.Products();
  this.favorite = new shop.Favorite();
  this.shopinngCart = new shop.ShopinngCart();
}

shop.Core.prototype.process = function() {
  this.products.initProducts();
  this.products.limitProducts();
  this.products.calculatePageCount();

  this.products.write();
}
