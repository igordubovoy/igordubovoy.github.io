'use strict'
shop.Product = function (productData, core) {
  this._core = core;
  this._favorite = core.favorite;
  this._shoppingCart = core.shoppingCart;

  this.data = productData;
};

shop.Product.prototype.toggleFavorites = function() {
  if (this._favorite.existIdsInFavorites(this.data.id)) {
    this._favorite.addToFavoritesIds(this.data.id);
  } else {
    this._favorite.removeFromFavoritesIds(this.data.id);
  }

  this._core.productsObject.process();
};

shop.Product.prototype.toggleShoppingCart = function() {
  if (this._shoppingCart.existIdsInShoppingCart(this.data.id)) {
    this._shoppingCart.addToShoppingCartIds(this.data.id);
    this._core.productsObject.process();
  } else {
    this._core.changeState(shop.state.shoppingCart)
  }
};

shop.Product.prototype.write = function (container) {
  var
    self = this,
    productContainer = document.createElement('div'),
    img = document.createElement('img'),
    nameElement = document.createElement('div'),
    priceElement = document.createElement('div'),
    cartBtn = document.createElement('button'),
    favoriteBtn = document.createElement('div');

  priceElement.innerHTML = this.data.price + ' грн';
  nameElement.innerHTML = this.data.name;

  img.setAttribute('src', 'images/small/small_' + this.data.id + '.jpg');

  nameElement.className = 'product_name';
  priceElement.className = 'product_price';
  productContainer.className = 'product';
  cartBtn.className = 'product_cart_btn';
  favoriteBtn.className = 'product_favorite_btn';

  if (this._favorite.getFavoriteIds().indexOf(this.data.id) !== -1) {
    favoriteBtn.classList.add('active');
  }
  if (this._shoppingCart.getShopingCartIds().indexOf(this.data.id) !== -1) {
    cartBtn.classList.add('active');
    cartBtn.innerHTML = 'В кошику';
  } else {
    cartBtn.innerHTML = 'В кошик';
  }

  productContainer.appendChild(img);
  productContainer.appendChild(nameElement);
  productContainer.appendChild(priceElement);
  productContainer.appendChild(cartBtn);
  productContainer.appendChild(favoriteBtn);
  container.appendChild(productContainer);

  cartBtn.onclick = function () {
    self.toggleShoppingCart();

  }
  favoriteBtn.onclick = function() {
    self.toggleFavorites();
  }
};
