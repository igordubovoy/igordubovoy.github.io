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

  this._container = $('#container')
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

    function writeCount() {
      var length = self.shoppingCart.getIds().length;

      $('<div>')
        .addClass('count_shop_cart')
        .html(length > 0 && length < 10 ? length : '9+')
        .appendTo(button);
    };

    var button = $('<div>')
      .addClass('product_list_btn')
      .html(title)
      .toggleClass('active', state === self._state)
      .click(function(){
        self.changeState(state);
      });

    if (state === shop.state.shoppingCart &&
        self.shoppingCart.getIds().length > 0) {
      writeCount();
    }

    container.append(button);
  };

  var
    self = this,
    header = $('<header>');

  writeButton(shop.state.shoppingCart, 'Кошик', header);
  writeButton(shop.state.favorite, 'Вибране', header);
  writeButton(shop.state.products, 'Головна', header);

  this._container.append(header);
};

shop.Core.prototype.changeStateToProduct = function (product) {
  this.product = product;
  this.changeState(shop.state.product);
};
