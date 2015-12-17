'use strict';
shop.Product = function (productData, core) {
  this._core = core;
  this._favorite = core.favorite;
  this._shoppingCart = core.shoppingCart;

  this.data = productData;

  this._count = 1;
  this._totalPrice = this.data.price;

  this._container = $('#container');

};

shop.Product.prototype.toggleFavorites = function() {
  if (this._favorite.exist(this)) {
    this._favorite.add(this);
  } else {
    this._favorite.remove(this);
  }

  if(this._core._state === shop.state.product) {
    this.write(this.container)
  } else {
    this._core.productsObject.process();
  }
};

shop.Product.prototype.toggleShoppingCart = function() {
  if (this._shoppingCart.exist(this)) {
    this._shoppingCart.add(this);

    if (this._core._state != shop.state.product) {
      this._core.productsObject.process();
    } else {
      this.write(this.container)
    }
  } else {
    this._core.changeState(shop.state.shoppingCart);
  }
};

shop.Product.prototype.writeToContainer = function (container) {

  function writeForFavAndProd() {
    nameElement.addClass('product_name');
    priceElement.addClass('product_price');
    productContainer.addClass('product');
    img.attr('src', 'images/small/small_' + self.data.id + '.jpg');

    if (!self._favorite.exist(self)) {
      favoriteBtn.addClass('active');
    }
    if (self._shoppingCart.exist(self)) {
      cartBtn.html('В кошик');
    } else {
      cartBtn
        .addClass('active')
        .html('В кошику');
    }

    productContainer
      .append(img, favoriteBtn, nameElement, priceElement, cartBtn)
      .click(function() {
        self._core.changeStateToProduct(self);
      });;

    cartBtn.click(function(event) {
      event.stopPropagation();
      self.changeTotalPrice();
      self.toggleShoppingCart();
    });

    favoriteBtn.click(function(event) {
      event.stopPropagation();
      self.toggleFavorites();
    });
  };

  function writeForShopCart() {
    self.changeTotalPrice();
    var
      result = $('<span>')
        .html('= ' + self._totalPrice + ' грн'),
      quantityInput = $('<input>')
        .val(self._count)
        .addClass('count')
        .attr('type', 'number')
        .attr('min', '1')
        .on('input', function() {
          self.changeCount(this.value);
          self.changeTotalPrice();
          self._core.shoppingCart.process();
        });

    descrElement.html(self.data.description);
    nameElement.addClass('name_shop_cart');
    descrElement.addClass('descr_shop_cart');
    priceElement
      .html('Ціна: ' + self.data.price + ' x')
      .addClass('price');
    img
      .attr('src', 'images/small/small_' + self.data.id + '.jpg')
      .addClass('img_shop_cart');
    productContainer
      .addClass('product_shop_cart')
      .append(img, nameElement, descrElement, priceElement, quantityInput, result, removeProduct)
      .click(function(event) {
        var target = event.target;
        if(target.tagName === 'INPUT' || target.className === 'remove') return;
        self._core.changeStateToProduct(self);
      });

    removeProduct.click(function () {
      self._shoppingCart.remove(self);
      self._core.productsObject.process();
    });
  };

  function writeForProduct() {
    favoriteBtn
      .addClass('info_fav')
      .click(function(event) {
        event.stopPropagation();
        self.toggleFavorites();
      }); ;
    cartBtn
      .addClass('info_shop')
      .click(function (event) {
        event.stopPropagation();
        self.changeTotalPrice();
        self.toggleShoppingCart();
      });
    removeProduct
      .addClass('remove_info')
      .click(function() {
        self._core.changeState(self._core._stateBeforeChange)
      });
    img.attr('src', 'images/big/big_' + self.data.id + '.jpg');
    nameElement.addClass('name_info');
    descrElement.addClass('descr_info');
    priceElement.addClass('price_info');

    if (!self._favorite.exist(self)) {
      favoriteBtn.addClass('active');
    }
    if (self._shoppingCart.exist(self)) {
      cartBtn.html('В кошик');
    } else {
      cartBtn.addClass('active');
      cartBtn.html('В кошику');
    }

    productContainer
      .addClass('info_product')
      .append($('<div>')
        .addClass('photo_section')
        .append(img, favoriteBtn))
      .append($('<div>')
        .addClass('info_section')
        .append(nameElement, descrElement, priceElement, cartBtn,removeProduct))
  };

  var
    self = this,
    productContainer = $('<div>'),
    img = $('<img>'),
    nameElement = $('<div>'),
    descrElement = $('<div>'),
    priceElement = $('<div>'),
    cartBtn = $('<button>'),
    favoriteBtn = $('<div>'),
    removeProduct = $('<div>');

  cartBtn.addClass('product_cart_btn')
  favoriteBtn.addClass('product_favorite_btn');
  removeProduct.addClass('remove');

  priceElement.html(this.data.price + ' грн');
  nameElement.html(this.data.name);
  descrElement.html(this.data.description);

  switch(self._core._state) {
    case shop.state.shoppingCart:
      writeForShopCart();
    break;
    case shop.state.favorite:
    case shop.state.products:
      writeForFavAndProd();
    break;
    case shop.state.product:
      writeForProduct();
    break;
  }

  container.append(productContainer);
};

shop.Product.prototype.changeCount = function(count) {
  this._count = count;
};

shop.Product.prototype.changeTotalPrice = function() {
  this._totalPrice = this._count * this.data.price;
};

shop.Product.prototype.write = function() {
  this._container.html('');
  this._core.writeHeader();
  this.writeToContainer(this._container);
};
