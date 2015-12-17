'use strict';
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

  this.self = this;

  this._container = $('#container');
};

shop.ProductsBase.prototype.calculatePageCount = function () {
  this._pageCount = Math.ceil(this._sortedProducts.length / this._limit);
};

shop.ProductsBase.prototype.changeLimit = function(limit) {
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

shop.ProductsBase.prototype.limitProducts = function() {
  this._limitedProducts = this._sortedProducts.slice(
    this._pageNo * this._limit - this._limit, this._limit * this._pageNo);
};

shop.ProductsBase.prototype.process = function() {
  this.calculate();
  this.write();
};

shop.ProductsBase.prototype.calculate = function() {
  this.filterProducts();
  this.sort();
  this.limitProducts();
  this.calculatePageCount();
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
  this._container.html('');
  this._core.writeHeader();
  this.writeSortingMenu();

  if(this._limitedProducts.length){
    this.writeProducts();
    this.writeAfterProducts();
  } else {
    this.writeEmpty(this._container);
  }

  this.writePager();
};

shop.ProductsBase.prototype.writePager = function () {

  function setOnClick(tab, pageNo) {
    tab.on('click', function () {
      self.changePageNo(pageNo);
    });
  };

  var
    self = this,
    sectionForPager = $('<div>').addClass('pager_container');

  for(var i = 1; i <= this._pageCount; i++){
    var
      isActive = i === this._pageNo,
      tab = $('<div>')
        .html(i)
        .addClass('pager_tab');

    if (!isActive) {
      setOnClick(tab, i);
    } else {
      tab.addClass('active');
    };

    sectionForPager.append(tab);
  }

  self._container.append(sectionForPager);
};

shop.ProductsBase.prototype.writeProducts = function () {
  var containerForProducts = $('<div>').addClass('container_for_products');

  this._limitedProducts.forEach(function (product) {
    product.writeToContainer(containerForProducts);
  });

  this._container
    .append(containerForProducts)
    .addClass('content');
};

shop.ProductsBase.prototype.writeSortingMenu = function () {
  var sortingMenu = $('<section>').addClass('sorting');

  this.writeBlockLimit(sortingMenu);
  this.writeBlockSort(sortingMenu);
  this._container.append(sortingMenu);
};

shop.ProductsBase.prototype.writeBlockLimit = function(blockMenu) {
  var
    self = this,
    blockLimit = $('<div>'),
    selectLimit = $('<select>')
      .addClass('sorting_limit_select')
      .on('change', function() {
        self.changeLimit(parseInt(this.value));
      }),
    labelLimit = $('<span>')
      .html('Кількість')
      .addClass('sorting_limit_label');

  for (var i = 0; i < shop.limitValues.length; i++) {
    var
      limitValue = shop.limitValues[i],
      optionElem = $('<option>')
        .attr('value', limitValue)
        .html(limitValue);

    if (optionElem.val() == this._limit) {
      optionElem.attr('selected', 'selected');
    };

    selectLimit.append(optionElem);
  };

  blockLimit
    .append(labelLimit)
    .append(selectLimit)
    .addClass('sorting_limit')
    .appendTo(blockMenu);
};

shop.ProductsBase.prototype.writeBlockSort = function(blockMenu) {
  var
    self = this,
    blockSort = $('<div>').addClass('sorting_sort'),
    labelSort = $('<span>')
      .html('Сортування')
      .addClass('sorting_sort_label'),
    selectSort = $('<select>')
      .addClass('sorting_sort_select')
      .on('change', function () {
        self.changeOrder(this.value);
      });

  for (var key in shop.orderType) {
    var
      orderType = shop.orderType[key],
      optionElem = $('<option>')
        .attr('value', orderType.type)
        .html(orderType.text);

    if (optionElem.val() === this._order) {
      optionElem.attr('selected', 'selected');
    };

    selectSort.append(optionElem);
  };

  blockSort
    .append(labelSort)
    .append(selectSort)
    .appendTo(blockMenu);
};

shop.ProductsBase.prototype.writeEmpty = function(container) {

 $('<div>')
  .addClass('empty')
  .html('Пусто')
  .appendTo(container);
};

shop.ProductsBase.prototype.writeAfterProducts = function() {};
