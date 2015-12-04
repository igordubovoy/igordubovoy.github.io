'use strict'
shop.Product = function (productData, favorite, shoppingCart) {
  this.data = productData;
  this.favorite = favorite;
  this.shoppingCart = shoppingCart;

};

shop.Product.prototype.toggleFavorites = function(button) {
  if (this.favorite.existIdsInFavorites(this.data.id)) {
    this.favorite.addToFavoritesIds(this.data.id);
    button.className = 'product_favorite_btn_active';
  } else {
    this.favorite.removeFromFavoritesIds(this.data.id);
    button.className = 'product_favorite_btn';
  }
};

shop.Product.prototype.toggleShoppingCart = function(button) {
  if (this.shoppingCart.existIdsInShoppingCart(this.data.id)) {
    this.shoppingCart.addToShoppingCartIds(this.data.id);
    button.className = 'product_cart_btn_active';
    button.innerHTML = 'В кошику';
  } else {
    this.shoppingCart.removeFromShoppingCartIds(this.data.id);
    button.className = 'product_cart_btn';
    button.innerHTML = 'В кошик';
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
  cartBtn.innerHTML = 'В кошик';

  img.setAttribute('src', 'images/small/small_' + this.data.id + '.jpg');

  nameElement.className = 'product_name';
  priceElement.className = 'product_price';
  productContainer.className = 'product';
  cartBtn.className = 'product_cart_btn';
  favoriteBtn.className = 'product_favorite_btn';

  if (this.favorite.getFavoriteIds().indexOf(this.data.id) !== -1) {
    favoriteBtn.className = 'product_favorite_btn_active';
  }
  if (this.shoppingCart.getShopingCartIds().indexOf(this.data.id) !== -1) {
    cartBtn.className = 'product_cart_btn_active';
    cartBtn.innerHTML = 'В кошику';
  }

  productContainer.appendChild(img);
  productContainer.appendChild(nameElement);
  productContainer.appendChild(priceElement);
  productContainer.appendChild(cartBtn);
  productContainer.appendChild(favoriteBtn);
  container.appendChild(productContainer);

  cartBtn.onclick = function () {
    self.toggleShoppingCart(this);

  }
  favoriteBtn.onclick = function() {
    self.toggleFavorites(this);
  }
};
