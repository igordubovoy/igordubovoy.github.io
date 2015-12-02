'use strict'
shop.Core = function() {
  this.dataSource = new shop.DataSource();
  this.products = new shop.Products(this.dataSource, this);
  this.favorite = new shop.Favorite(this.dataSource);
  this.shoppingCart = new shop.ShoppingCart(this.dataSource);

  this._state = shop.state.products;
}

shop.Core.prototype.process = function() {
  this.dataSource.initProducts();
  this.changeState(this._state);
//  var arr = [];
//  for(var prop in this.products) {
//    arr.push(prop)
//  }
//  function sortProp(propA, propB){
//    if(propA > propB) return 1;
//    if(propA < propB) return -1;
//    return 0
//  }
//
//  console.log(arr.sort(sortProp))

}

shop.Core.prototype.changeState = function (state) {
  switch(state){
    case shop.state.products:
      this.products.limitProducts();
      this.products.calculatePageCount();
      this.products.write();
      this._state = state;
    break;

    case shop.state.favorite:
      this._state = state
      console.log(this._state)
    break;

    case shop.state.shoppingCart:
      this._state = state
      console.log(this._state)
    break;
    default: console.error('Error in state, '+ state +' is not define')
  }
}
