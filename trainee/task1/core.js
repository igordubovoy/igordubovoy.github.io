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
  var arr = [];
  for(var prop in this.products) {
    arr.push(prop)
  }
  function sortProp(propA, propB){
    if(propA > propB) return 1;
    if(propA < propB) return -1;
    return 0
  }

  console.log(arr.sort(sortProp))
}
