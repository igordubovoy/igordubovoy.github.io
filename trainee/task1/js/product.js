'use strict'
shop.Product = function (productData, core) {
  this._core = core;
  this._favorite = core.favorite;
  this._shoppingCart = core.shoppingCart;

  this._count = 1;
  this._totalPrice = 0;

  this.data = productData;

};

shop.Product.prototype.toggleFavorites = function() {
  if (this._favorite.existIds(this)) {
    this._favorite.addIds(this);
  } else {
    this._favorite.removeId(this);
  }

  this._core.productsObject.process();
};

shop.Product.prototype.toggleShoppingCart = function() {
  if (this._shoppingCart.existIds(this)) {
    this._shoppingCart.addIds(this);
    this._core.productsObject.process();
  } else {
    this._core.changeState(shop.state.shoppingCart);
  }
};

shop.Product.prototype.write = function (container) {
  var
    self = this,
    productContainer = document.createElement('div'),
    img = document.createElement('img'),
    nameElement = document.createElement('div'),
    descrElement = document.createElement('div'),
    quantityInput = document.createElement('input'),
    priceElement = document.createElement('div');

  priceElement.innerHTML = this.data.price + ' грн';
  nameElement.innerHTML = this.data.name;
  img.setAttribute('src', 'images/small/small_' + this.data.id + '.jpg');

  if(this._core._state === shop.state.products ||
     this._core._state === shop.state.favorite) {
    writeForFavAndProd();
  }
  if(this._core._state === shop.state.shoppingCart){
    writeForShopCart()
  }

  function writeForFavAndProd() {
    var
      cartBtn = document.createElement('button'),
      favoriteBtn = document.createElement('div');

    nameElement.className = 'product_name';
    priceElement.className = 'product_price';
    productContainer.className = 'product';
    cartBtn.className = 'product_cart_btn';
    favoriteBtn.className = 'product_favorite_btn';

    if (!self._favorite.existIds(self)) {
      favoriteBtn.classList.add('active');
    }
    if (self._shoppingCart.existIds(self)) {
      cartBtn.innerHTML = 'В кошик';
    } else {
      cartBtn.classList.add('active');
      cartBtn.innerHTML = 'В кошику';
    }

    productContainer.appendChild(img);
    productContainer.appendChild(favoriteBtn);
    productContainer.appendChild(nameElement);
    productContainer.appendChild(priceElement);
    productContainer.appendChild(cartBtn);

    cartBtn.onclick = function () {
      self.toggleShoppingCart();
    };

    favoriteBtn.onclick = function() {
      self.toggleFavorites();
    };
  };

  function writeForShopCart() {
    var
      result = document.createElement('span'),
      removeProduct = document.createElement('div');

    self.changeTotalPrice();

    result.innerHTML = '= ' + self.data.price + ' грн';
    quantityInput.value = self._count;
    descrElement.innerHTML = self.data.description;
    priceElement.innerHTML = 'Ціна: ' + self.data.price + ' x';
    result.innerHTML = '= ' + self._totalPrice + ' грн';
    quantityInput.setAttribute('type', 'number');
    quantityInput.setAttribute('min', '1');

    img.className = 'img_shop_cart'
    productContainer.className = 'product_shop_cart';
    nameElement.className = 'name_shop_cart';
    descrElement.className = 'descr_shop_cart';
    quantityInput.className = 'count';
    priceElement.className = 'price';
    removeProduct.className = 'remove';

    productContainer.appendChild(img);
    productContainer.appendChild(nameElement);
    productContainer.appendChild(descrElement);
    productContainer.appendChild(priceElement);
    productContainer.appendChild(quantityInput);
    productContainer.appendChild(result);
    productContainer.appendChild(removeProduct);

    quantityInput.oninput = function() {
      self.changeCount(this.value);
      self.changeTotalPrice();
      self._core.shoppingCart.process();
    }

    removeProduct.onclick = function () {
      self._shoppingCart.removeId(self);
      self._core.productsObject.process();
    }
  };

  container.appendChild(productContainer);
};

shop.Product.prototype.changeCount = function(num) {
  this._count = num;
}

shop.Product.prototype.changeTotalPrice = function() {
  this._totalPrice = this._count * this.data.price;
}
