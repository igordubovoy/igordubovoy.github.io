shop.ProductsBase = function () {
  this._order = shop.orderType.id;
  this.pageNo = 1;
  this.limit = 4;
  this.productsList = [];
  this.pageCount = 0;
  this.productsForView = [];
}

shop.ProductsBase.prototype.setOrder = function (order) {
  this.order = order;
}

shop.ProductsBase.prototype.setPageNo = function (pageNo) {
  this.pageNo = pageNo;
}

shop.ProductsBase.prototype.changePageNo = function (pageNo) {
  this.setPageNo(pageNo);
  this.limitProducts();
  this.write();
}

shop.ProductsBase.prototype.setLimit = function (limit) {
  this.limit = limit;
}

shop.ProductsBase.prototype.writeProducts = function () {
  var container = document.getElementById("container");
  container.className = "content";
  this.productsForView.forEach(function (product) {

    var item = document.createElement('div'),
      img = document.createElement('img'),
      span_name = document.createElement('span'),
      span_price = document.createElement('span'),
      button = document.createElement('button');

    span_price.innerHTML = product.data.price + " грн";
    span_name.innerHTML = product.data.name;
    button.innerHTML = "В корзину";

    img.setAttribute("src", "images/small/small_" + product.data.id + ".jpg");

    item.appendChild(img);
    item.appendChild(span_name);
    item.appendChild(span_price);
    item.appendChild(button);

    span_name.className = "item_span";
    span_price.className = "item_span item_span_price";
    item.className = "item";
    button.className = "item_button";
    container.appendChild(item);
  });
};

shop.ProductsBase.prototype.limitProducts = function () {
  this.productsForView = this.productsList.slice(this.pageNo * this.limit - this.limit, this.limit * this.pageNo);
};

shop.ProductsBase.prototype.calculatePageCount = function () {
  this.pageCount = Math.ceil(this.productsList.length / this.limit);
}

shop.ProductsBase.prototype.writePager = function () {

  function setOnClick(tab, pageNo) {
    tab.onclick = function () {
      self.changePageNo(pageNo);
    };
  };

  var container = document.getElementById('container');
  var sectionForPager = document.createElement('div');
  container.appendChild(sectionForPager);
  var i = 1,
    self = this;
  do {
    var tab = document.createElement('div');
    tab.innerHTML = i;
    tab.className = "pager_tab";

    active = i === this.pageNo;
    if (!active) {
      setOnClick(tab, i);
    } else {
      tab.classList.add('active_pager_tab');
    }
    sectionForPager.appendChild(tab);
    i++;
  }
  while (i <= this.pageCount);
};

shop.ProductsBase.prototype.write = function () {
  var container = document.getElementById("container");
  container.innerHTML = "";
  this.writeProducts();
  this.writePager();
}
