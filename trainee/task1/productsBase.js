shop.ProductsBase = function () {
  this._productsList = [];
  this._productsForView = [];

  this._limit = shop.limitValues[0];
  this._order = shop.orderType[0].type;
  this._pageCount = 0;
  this._pageNo = 1;

  this.container = document.getElementById('container');
}

shop.ProductsBase.prototype.calculatePageCount = function () {
  this._pageCount = Math.ceil(this._productsList.length / this._limit);
}

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
}

shop.ProductsBase.prototype.setOrder = function (order) {
  this._order = order;
}

shop.ProductsBase.prototype.setPageNo = function (pageNo) {
  this._pageNo = pageNo;
}

shop.ProductsBase.prototype.sort = function (sortType) {
  switch (sortType) {
  case shop.orderType[0].type:
    function sortById(productA, productB) {
      return productA.data.id - productB.data.id;
    };
    this._productsList.sort(sortById);
    break;

  case shop.orderType[1].type:
    function sortByName(productA, productB) {
      if (productA.data.name > productB.data.name) return 1;
      if (productA.data.name < productB.data.name) return -1;
      return 0;
    }
    this._productsList.sort(sortByName);
    break;

  case shop.orderType[2].type:
    function sortByPrice(productA, productB) {
      return productA.data.price - productB.data.price;
    };
    this._productsList.sort(sortByPrice);
    break;

  default:
    console.log('error in orderType, ' + sortType + '- is not define');
  };
};

shop.ProductsBase.prototype.write = function () {
  this.container.innerHTML = '';
  this.writeSortingMenu();
  this.writeProducts();
  this.writePager();
}

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
    }

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

    nameElement.className = 'item_span';
    priceElement.className = 'item_span item_span_price';
    productContainer.className = 'item';
    cartBtn.className = 'item_button';

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
    self = this,
    sortingMenu = document.createElement('section'),
    sortingForm = document.createElement('form'),
    blockQuantity = document.createElement('div'),
    spanQuantity = document.createElement('span'),
    selectQuantity = document.createElement('select'),
    blockSort = document.createElement('div'),
    spanSort = document.createElement('span'),
    selectSort = document.createElement('select'),
    optionElem;

  for (var i = 0; i < shop.limitValues.length + shop.orderType.length; i++) {
    optionElem = document.createElement('option');
    if (i < shop.limitValues.length) {
      optionElem.setAttribute('value', shop.limitValues[i]);
      optionElem.innerHTML = shop.limitValues[i];
      if (optionElem.value == this._limit) {
        optionElem.setAttribute('selected', 'selected');
      };
      selectQuantity.appendChild(optionElem);

    } else {
      optionElem.setAttribute('value', shop.orderType[i - shop.limitValues.length].type);
      optionElem.innerHTML = shop.orderType[i - shop.limitValues.length].text;
      if (optionElem.value === this._order) {
        optionElem.setAttribute('selected', 'selected');
      };
      selectSort.appendChild(optionElem);
    };
  };

  sortingMenu.className = 'sorting';
  blockQuantity.className = 'sorting__quantity';
  blockSort.className = 'sorting__sort';

  selectQuantity.id = 'quantity';
  selectSort.id = 'sort';

  spanQuantity.innerHTML = 'Количество';
  spanSort.innerHTML = 'Сортировка';

  blockQuantity.appendChild(spanQuantity);
  blockQuantity.appendChild(selectQuantity);
  sortingForm.appendChild(blockQuantity);

  blockSort.appendChild(spanSort);
  blockSort.appendChild(selectSort);
  sortingForm.appendChild(blockSort);

  sortingMenu.appendChild(sortingForm);
  this.container.appendChild(sortingMenu);

  selectQuantity.onchange = function () {
    self.changeLimit(parseInt(this.value));
  }
  selectSort.onchange = function () {
    self.changeOrder(this.value)
  };
};
