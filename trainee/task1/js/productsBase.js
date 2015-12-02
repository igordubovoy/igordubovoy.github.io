'use strict'
shop.ProductsBase = function (dataSource, core) {
  this._core = core;
  this._dataSource = dataSource;
  this._productsForView = [];
  this._limit = shop.limitValues[0];
  this._order = shop.orderType.id.type;
  this._pageCount = 0;
  this._pageNo = 1;

  this.container = document.getElementById('container');
};

shop.ProductsBase.prototype.calculatePageCount = function () {
  this._pageCount = Math.ceil(this._dataSource.getProducts().length / this._limit);
};

shop.ProductsBase.prototype.changeLimit = function (limit) {
  this.setLimit(limit);
  this.calculatePageCount();
  this.setPageNo(1);
  this.limitProducts();
  this.write();
};

shop.ProductsBase.prototype.changeOrder = function (order) {
  this.setOrder(order);
  this.sort(order);
  this.limitProducts();
  this.write();
};

shop.ProductsBase.prototype.changePageNo = function (pageNo) {
  this.setPageNo(pageNo);
  this.limitProducts();
  this.write();
};

shop.ProductsBase.prototype.limitProducts = function () {
  this._productsForView = this._dataSource.getProducts().slice(this._pageNo * this._limit - this._limit, this._limit * this._pageNo);
};

shop.ProductsBase.prototype.setLimit = function (limit) {
  this._limit = limit;
};

shop.ProductsBase.prototype.setOrder = function (order) {
  this._order = order;
};

shop.ProductsBase.prototype.setPageNo = function (pageNo) {
  this._pageNo = pageNo;
};

shop.ProductsBase.prototype.sort = function (sortType) {
  var sortFunc = null;

  switch (sortType) {
  case shop.orderType.id.type:
    sortFunc = function sortById(productA, productB) {
      return productA.data.id - productB.data.id;
    };
    break;
  case shop.orderType.name.type:
    sortFunc = function sortByName(productA, productB) {
      if (productA.data.name > productB.data.name) return 1;
      if (productA.data.name < productB.data.name) return -1;
      return 0;
    };
    break;
  case shop.orderType.price.type:
    sortFunc = function sortByPrice(productA, productB) {
      return productA.data.price - productB.data.price;
    };
    break;
  default:
    console.error('error in orderType, ' + sortType + '- is not define');
  }

  this._dataSource.getProducts().sort(sortFunc);
};

shop.ProductsBase.prototype.write = function () {
  this.container.innerHTML = '';
  this.writeHeader();
  this.writeSortingMenu();
  this.writeProducts();
  this.writePager();
};

shop.ProductsBase.prototype.writeHeader = function() {
  var
    self = this,
    header = document.createElement('header'),
    shoppingCart = document.createElement('div'),
    wishList = document.createElement('div');

  shoppingCart.className = 'shopping_cart';
  wishList.className = 'wish_list';
  shoppingCart.innerHTML = 'Корзина';
  wishList.innerHTML = 'Желание'

  header.appendChild(shoppingCart);
  header.appendChild(wishList);
  this.container.appendChild(header);

  wishList.onclick = function() {
    self._core.changeState(shop.state.favorite)
  }
  shoppingCart.onclick = function() {
    self._core.changeState(shop.state.shoppingCart)
  }
};

shop.ProductsBase.prototype.writePager = function () {

  function setOnClick(tab, pageNo) {
    tab.onclick = function () {
      self.changePageNo(pageNo);
    };
  };

  var
    sectionForPager = document.createElement('div'),
    i = 1,
    self = this;

  do {
    var
      tab = document.createElement('div'),
      isActive = i === this._pageNo;

    tab.innerHTML = i;
    tab.className = 'pager_tab';

    if (!isActive) {
      setOnClick(tab, i);
    } else {
      tab.classList.add('active_pager_tab');
    };

    sectionForPager.appendChild(tab);
    i++;
  } while (i <= this._pageCount);

  this.container.appendChild(sectionForPager);
};

shop.ProductsBase.prototype.writeProducts = function () {
  var containerForProducts = document.createElement('div');
  this.container.className = 'content';

  this._productsForView.forEach(function (product) {
    var
      productContainer = document.createElement('div'),
      img = document.createElement('img'),
      nameElement = document.createElement('div'),
      priceElement = document.createElement('div'),
      cartBtn = document.createElement('button');

    priceElement.innerHTML = product.data.price + ' грн';
    nameElement.innerHTML = product.data.name;
    cartBtn.innerHTML = 'В корзину';

    img.setAttribute('src', 'images/small/small_' + product.data.id + '.jpg');

    nameElement.className = 'product_name';
    priceElement.className = 'product_price';
    productContainer.className = 'product';
    cartBtn.className = 'product_cart_btn';

    productContainer.appendChild(img);
    productContainer.appendChild(nameElement);
    productContainer.appendChild(priceElement);
    productContainer.appendChild(cartBtn);
    containerForProducts.appendChild(productContainer);
  });
  this.container.appendChild(containerForProducts);
};

shop.ProductsBase.prototype.writeSortingMenu = function () {
  var sortingMenu = document.createElement('section');

  sortingMenu.className = 'sorting';

  this.writeBlockLimit(sortingMenu);
  this.writeBlockSort(sortingMenu);
  this.container.appendChild(sortingMenu);
};

shop.ProductsBase.prototype.writeBlockLimit = function(blockMenu) {
  var
    self = this,
    blockLimit = document.createElement('div'),
    descriptLimit = document.createElement('span'),
    selectLimit = document.createElement('select');

  descriptLimit.innerHTML = 'Количество';
  selectLimit.className = 'limit';
  blockLimit.className = 'sorting_limit';
  descriptLimit.className = 'limit_description';

  for (var i = 0; i < shop.limitValues.length; i++) {
    var
      optionElem = document.createElement('option'),
      limitValue = shop.limitValues[i];

    optionElem.setAttribute('value', limitValue);
    optionElem.innerHTML = limitValue;

    if (optionElem.value == this._limit) {
      optionElem.setAttribute('selected', 'selected');
    };

    selectLimit.appendChild(optionElem);
  };

  blockLimit.appendChild(descriptLimit);
  blockLimit.appendChild(selectLimit);
  blockMenu.appendChild(blockLimit);

  selectLimit.onchange = function () {
    self.changeLimit(parseInt(this.value));
  }
};

shop.ProductsBase.prototype.writeBlockSort = function(blockMenu) {
  var
    self = this,
    blockSort = document.createElement('div'),
    descriptSort = document.createElement('span'),
    selectSort = document.createElement('select'),
    optionElem = null;

  descriptSort.innerHTML = 'Сортировка';
  selectSort.className = 'sort';
  blockSort.className = 'sorting_sort';
  descriptSort.className = 'sort_description';

  for (var key in shop.orderType) {
    optionElem = document.createElement('option');
    optionElem.setAttribute('value', shop.orderType[key].type);
    optionElem.innerHTML = shop.orderType[key].text;
    if (optionElem.value === this._order) {
      optionElem.setAttribute('selected', 'selected');
    };
    selectSort.appendChild(optionElem);
  };

  blockSort.appendChild(descriptSort);
  blockSort.appendChild(selectSort);
  blockMenu.appendChild(blockSort);

  selectSort.onchange = function () {
    self.changeOrder(this.value);
  };
};
