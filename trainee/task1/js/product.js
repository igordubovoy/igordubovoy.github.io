'use strict';
shop.Product = function (productData, core) {
  this._core = core;
  this._favorite = core.favorite;
  this._shoppingCart = core.shoppingCart;

  this._count = 1;
  this._totalPrice = 0;

  this.data = productData;

  this.container = document.getElementById('container');

};

shop.Product.prototype.toggleFavorites = function() {
  if (this._favorite.existIds(this)) {
    this._favorite.addIds(this);
  } else {
    this._favorite.removeId(this);
  }

  if(this._core._state != shop.state.product){
    this._core.productsObject.process();
  } else {
    this.write(this.container)
  }
};

shop.Product.prototype.toggleShoppingCart = function() {
  if (this._shoppingCart.existIds(this)) {
    this._shoppingCart.addIds(this);

    if(this._core._state != shop.state.product){
      this._core.productsObject.process();
    }
    else {
      this.write(this.container)
    }
  } else {
    this._core.changeState(shop.state.shoppingCart);
  }
};

shop.Product.prototype.writeToContainer = function (container) {
  var
    self = this,
    productContainer = document.createElement('div'),
    img = document.createElement('img'),
    nameElement = document.createElement('div'),
    descrElement = document.createElement('div'),
    quantityInput = document.createElement('input'),
    priceElement = document.createElement('div'),
    cartBtn = document.createElement('button'),
    favoriteBtn = document.createElement('div'),
    removeProduct = document.createElement('div');


  cartBtn.className = 'product_cart_btn';
  favoriteBtn.className = 'product_favorite_btn';
  removeProduct.className = 'remove';


  priceElement.innerHTML = this.data.price + ' грн';
  nameElement.innerHTML = this.data.name;
  descrElement.innerHTML = this.data.description;

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

  function writeForFavAndProd() {

    nameElement.className = 'product_name';
    priceElement.className = 'product_price';
    productContainer.className = 'product';

    img.setAttribute('src', 'images/small/small_' + self.data.id + '.jpg');

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

    cartBtn.onclick = function (event) {
      event.stopPropagation();
      self.changeTotalPrice();
      self.toggleShoppingCart();
    };

    favoriteBtn.onclick = function(event) {
      event.stopPropagation();
      self.toggleFavorites();
    };

    productContainer.onclick = function() {
      self._core.changeStateToProduct(self);
    };
  };

  function writeForShopCart() {
    var result = document.createElement('span');

    self.changeTotalPrice();

    result.innerHTML = '= ' + self.data.price + ' грн';
    quantityInput.value = self._count;
    descrElement.innerHTML = self.data.description;
    priceElement.innerHTML = 'Ціна: ' + self.data.price + ' x';
    result.innerHTML = '= ' + self._totalPrice + ' грн';
    quantityInput.setAttribute('type', 'number');
    quantityInput.setAttribute('min', '1');
    img.setAttribute('src', 'images/small/small_' + self.data.id + '.jpg');

    img.className = 'img_shop_cart'
    productContainer.className = 'product_shop_cart';
    nameElement.className = 'name_shop_cart';
    descrElement.className = 'descr_shop_cart';
    quantityInput.className = 'count';
    priceElement.className = 'price';

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

  function writeForProduct() {
    var
      photoSection = document.createElement('div'),
      infoSection = document.createElement('div');
    productContainer.className = 'product_info';
    infoSection.className = 'info_section'

    img.setAttribute('src', 'images/big/big_' + self.data.id + '.jpg');

    if (!self._favorite.existIds(self)) {
      favoriteBtn.classList.add('active');
    }
    if (self._shoppingCart.existIds(self)) {
      cartBtn.innerHTML = 'В кошик';
    } else {
      cartBtn.classList.add('active');
      cartBtn.innerHTML = 'В кошику';
    }

    photoSection.appendChild(img);
    productContainer.appendChild(photoSection);
    infoSection.appendChild(favoriteBtn);
    infoSection.appendChild(nameElement);
    infoSection.appendChild(descrElement);
    infoSection.appendChild(priceElement);
    infoSection.appendChild(cartBtn);
    productContainer.appendChild(infoSection)
    productContainer.appendChild(removeProduct);

    cartBtn.onclick = function (event) {
      event.stopPropagation();
      self.changeTotalPrice();
      self.toggleShoppingCart();

    };

    favoriteBtn.onclick = function(event) {
      event.stopPropagation();
      self.toggleFavorites();
    };

    removeProduct.onclick = function() {
      self._core.changeState(self._core._stateBeforeChange)
    }
  };


  container.appendChild(productContainer);
};

shop.Product.prototype.changeCount = function(num) {
  this._count = num;
};

shop.Product.prototype.changeTotalPrice = function() {
  this._totalPrice = this._count * this.data.price;
};

shop.Product.prototype.write = function() {
  this.container.innerHTML = '';
  this._core.writeHeader();
  this.writeToContainer(this.container);
}
