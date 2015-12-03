'use strict'
shop.Core = function() {
  this.dataSource = new shop.DataSource(this);
  this.products = new shop.Products(this.dataSource, this);
  this.favorite = new shop.Favorite(this.dataSource, this);
  this.shoppingCart = new shop.ShoppingCart(this.dataSource, this);

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
  var productsObject = null;
  this._state = state;

  switch(state) {
    case shop.state.products:
      productsObject = this.products;
      break;
    case shop.state.favorite:
      productsObject = this.favorite;
      break;
    case shop.state.shoppingCart:
      productsObject = this.shoppingCart;
      break;
    default:
      console.error('State is not define', state);
  }

  productsObject.filterProducts();
  productsObject.sort(shop.orderType.id.type)
  productsObject.limitProducts();
  productsObject.calculatePageCount();
  productsObject.write();
}

shop.Core.prototype.writeHeader = function() {
  var
    self = this,
    header = document.createElement('header'),
    shoppingCart = document.createElement('div'),
    wishList = document.createElement('div'),
    mainList = document.createElement('div'),
    container = document.getElementById('container');

  switch(this._state) {
    case shop.state.products:
      mainList.className = "active";
      shoppingCart.className = 'shopping_cart';
      wishList.className = 'wish_list';
      break;

    case shop.state.favorite:
      wishList.className = 'active';
      shoppingCart.className = 'shopping_cart';
      mainList.className = 'main_list';
      break;

    case shop.state.shoppingCart:
      shoppingCart.className = 'active';
      wishList.className = 'wish_list';
      mainList.className = 'main_list';
    break;
  }

  shoppingCart.innerHTML = 'Кошик';
  wishList.innerHTML = 'Вибране';
  mainList.innerHTML = 'Головна';

  header.appendChild(shoppingCart);
  header.appendChild(wishList);
  header.appendChild(mainList);
  container.appendChild(header);

  wishList.onclick = function() {
    self.changeState(shop.state.favorite)
  }

  shoppingCart.onclick = function() {
    self.changeState(shop.state.shoppingCart)
  }

  mainList.onclick = function() {
    self.changeState(shop.state.products)
  }

};

