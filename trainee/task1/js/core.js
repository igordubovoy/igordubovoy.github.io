'use strict'
shop.Core = function() {
  this.dataSource = new shop.DataSource(this);
  this.products = new shop.Products(this.dataSource, this);
  this.favorite = new shop.Favorite(this.dataSource, this);
  this.shoppingCart = new shop.ShoppingCart(this.dataSource, this);
  this.productsObject = null;
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
  this._state = state;

  switch(state) {
    case shop.state.products:
      this.productsObject = this.products;
      break;
    case shop.state.favorite:
      this.productsObject = this.favorite;
      break;
    case shop.state.shoppingCart:
      this.productsObject = this.shoppingCart;
      break;
    default:
      console.error('State is not define', state);
  }

  this.productsObject.process();
}

shop.Core.prototype.writeHeader = function() {
  var
    self = this,
    header = document.createElement('header'),
    container = document.getElementById('container');

  function writeButton(state, title, container){
    var button = document.createElement('div');

    button.className = 'product_list_btn';
    button.innerHTML = title;

    if (state === self._state) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }

    container.appendChild(button);

    button.onclick = function() {
      self.changeState(state);
    }
  };


  writeButton(shop.state.shoppingCart, 'Кошик', header);
  writeButton(shop.state.favorite, 'Вибране', header);
  writeButton(shop.state.products, 'Головна', header);

  container.appendChild(header);
};

