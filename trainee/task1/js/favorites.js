'use strict'
shop.Favorite = function (dataSource) {
  shop.ProductsBase.apply(this, arguments);

  this.selectedIds = [1, 5, 7];
}

shop.Favorite.prototype.write  = function () {
  console.log(this._dataSource)
}


