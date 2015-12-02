'use strict'
shop.ProductsBase = function () {
  this._productsList = [];
  this._productsForView = [];

  this._limit = shop.limitValues[0];
  this._order = shop.orderType.id.type;
  this._pageCount = 0;
  this._pageNo = 1;

  this.container = document.getElementById('container');
};

shop.ProductsBase.prototype.calculatePageCount = function () {
  this._pageCount = Math.ceil(this._productsList.length / this._limit);
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
  this._productsForView = this._productsList.slice(this._pageNo * this._limit - this._limit, this._limit * this._pageNo);
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

  this._productsList.sort(sortFunc);
};

shop.ProductsBase.prototype.write = function () {
  this.container.innerHTML = '';
  this.writeSortingMenu();
  this.writeProducts();
  this.writePager();
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
  var
    sortingMenu = document.createElement('section');

  sortingMenu.className = 'sorting';

  this.writeBlockLimit(sortingMenu);
  this.writeBlockSort(sortingMenu);
  this.container.appendChild(sortingMenu);
};

shop.ProductsBase.prototype.writeBlockLimit = function(blockMenu) {
  var
    self = this,
    blockLimit = document.createElement('div'),
    spanLimit = document.createElement('span'),
    selectLimit = document.createElement('select'),
    optionElem = null,
    length = shop.limitValues.length;

  spanLimit.innerHTML = 'Количество';
  selectLimit.className = 'limit';
  blockLimit.className = 'sorting_limit';

  for (var i = 0; i < length; i++) {
    optionElem = document.createElement('option');
    optionElem.setAttribute('value', shop.limitValues[i]);
    optionElem.innerHTML = shop.limitValues[i];
    if (optionElem.value == this._limit) {
      optionElem.setAttribute('selected', 'selected');
    };
    selectLimit.appendChild(optionElem);
  };

  blockLimit.appendChild(spanLimit);
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
    spanSort = document.createElement('span'),
    selectSort = document.createElement('select'),
    optionElem = null;

  spanSort.innerHTML = 'Сортировка';
  selectSort.className = 'sort';
  blockSort.className = 'sorting_sort';

  for (var key in shop.orderType) {
    optionElem = document.createElement('option');
    optionElem.setAttribute('value', shop.orderType[key].type);
    optionElem.innerHTML = shop.orderType[key].text;
    if (optionElem.value === this._order) {
      optionElem.setAttribute('selected', 'selected');
    };
    selectSort.appendChild(optionElem);
  };

  blockSort.appendChild(spanSort);
  blockSort.appendChild(selectSort);
  blockMenu.appendChild(blockSort);

  selectSort.onchange = function () {
    self.changeOrder(this.value);
  };
};
