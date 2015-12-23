'use strict';
shop.Core = function () {
  this.dataSource = new shop.DataSource(this);
  this.products = new shop.Products(this.dataSource, this);
  this.favorite = new shop.Favorite(this.dataSource, this);
  this.shoppingCart = new shop.ShoppingCart(this.dataSource, this);
  this.product = null;
  this.productsObject = null;
  this._stateBeforeChange = null;

  this._state = shop.state.products;

  this._containder = document.getElementById('container')
};

shop.Core.prototype.process = function () {
  this.dataSource.initProducts();
  this.changeState(this._state);
};

shop.Core.prototype.changeState = function (state) {
  this._stateBeforeChange = this._state;
  this._state = state;

  switch (state) {
  case shop.state.products:
    this.productsObject = this.products;
    break;
  case shop.state.favorite:
    this.productsObject = this.favorite;
    break;
  case shop.state.shoppingCart:
    this.productsObject = this.shoppingCart;
    break;
  case shop.state.product:
    break;
  default:
    console.error('State is not define', state);
  }

  if (state === shop.state.product) {
    this.product.write();
  } else {
    this.productsObject.process();
  }
};

shop.Core.prototype.writeHeader = function () {

  function writeButton(state, title, container) {
    var button = document.createElement('div');

    function writeCount() {
      var
        count = document.createElement('div'),
        length = self.shoppingCart.getIds().length;

      count.className = 'count_shop_cart'

      if (length > 0 && length < 10) {
        count.innerHTML = length;
      } else {
        count.innerHTML = "9+"
      }
      button.appendChild(count);
    };

    button.className = 'product_list_btn';
    button.innerHTML = title;

    if (state === self._state) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }

    if (state === shop.state.shoppingCart &&
        self.shoppingCart.getIds().length > 0) {
      writeCount();
    }

    container.appendChild(button);

    button.onclick = function () {
      self.changeState(state);
    };
  };

  var
    self = this,
    header = document.createElement('header'),
    container = document.getElementById('container');

  writeButton(shop.state.shoppingCart, 'Кошик', header);
  writeButton(shop.state.favorite, 'Вибране', header);
  writeButton(shop.state.products, 'Головна', header);

  container.appendChild(header);
};

shop.Core.prototype.changeStateToProduct = function (product) {
  this.product = product;
  this.changeState(shop.state.product);
};
