'use strict'
shop.ProductsBase = function (dataSource, core) {
  this._core = core;
  this._dataSource = dataSource;

  this._filteredProducts = [];
  this._limitedProducts = [];
  this._sortedProducts = [];

  this._limit = shop.limitValues[0];
  this._order = shop.orderType.id.type;
  this._pageNo = 1;

  this._pageCount = 0;

  this.container = document.getElementById('container');
};

shop.ProductsBase.prototype.calculatePageCount = function () {
  this._pageCount = Math.ceil(this._sortedProducts.length / this._limit);
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
  this.sort();
  this.limitProducts();
  this.write();
};

shop.ProductsBase.prototype.changePageNo = function (pageNo) {
  this.setPageNo(pageNo);
  this.limitProducts();
  this.write();
};

shop.ProductsBase.prototype.limitProducts = function () {
  this._limitedProducts = this._sortedProducts.slice(this._pageNo * this._limit - this._limit, this._limit * this._pageNo);
};

shop.ProductsBase.prototype.process = function() {
  this.filterProducts();
  this.sort();
  this.limitProducts();
  this.calculatePageCount();
  this.write();
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

shop.ProductsBase.prototype.sort = function () {
  var sortFunc = null;

  switch (this._order) {
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
    console.error('error in orderType, ' + this._order + '- is not define');
  }

  this._sortedProducts = this._filteredProducts.sort(sortFunc);
};

shop.ProductsBase.prototype.write = function () {
  this.container.innerHTML = '';
  this._core.writeHeader();
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

  if (this._sortedProducts.length > 0) {
    do {
      var
        tab = document.createElement('div'),
        isActive = i === this._pageNo;

      tab.innerHTML = i;
      tab.className = 'pager_tab';

      if (!isActive) {
        setOnClick(tab, i);
      } else {
        tab.classList.add('active');
      };

      sectionForPager.appendChild(tab);
      i++;
    } while (i <= this._pageCount);
  }

  sectionForPager.className = 'pager_container';
  this.container.appendChild(sectionForPager);
};

shop.ProductsBase.prototype.writeProducts = function () {
  var containerForProducts = document.createElement('div');

  containerForProducts.className = "container_for_products";
  this.container.className = 'content';

  this._limitedProducts.forEach(function (product) {
    product.write(containerForProducts);
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
    labelLimit = document.createElement('span'),
    selectLimit = document.createElement('select');

  labelLimit.innerHTML = 'Кількість';
  selectLimit.className = 'sorting_limit_select';
  blockLimit.className = 'sorting_limit';
  labelLimit.className = 'sorting_limit_label';

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

  blockLimit.appendChild(labelLimit);
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
    labelSort = document.createElement('span'),
    selectSort = document.createElement('select');

  labelSort.innerHTML = 'Сортування';
  selectSort.className = 'sorting_sort_select';
  blockSort.className = 'sorting_sort';
  labelSort.className = 'sorting_sort_label';

  for (var key in shop.orderType) {
    var
      optionElem = document.createElement('option'),
      orderType = shop.orderType[key];

    optionElem.setAttribute('value', orderType.type);
    optionElem.innerHTML = orderType.text;

    if (optionElem.value === this._order) {
      optionElem.setAttribute('selected', 'selected');
    };

    selectSort.appendChild(optionElem);
  };

  blockSort.appendChild(labelSort);
  blockSort.appendChild(selectSort);
  blockMenu.appendChild(blockSort);

  selectSort.onchange = function () {
    self.changeOrder(this.value);
  };
};
