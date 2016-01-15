'use strict';
var shopApp = angular.module('shopApp', ['ngRoute']);

function mainService() {
  this.viewPhones = [];
}


function mainListCtr(dataService, favoriteService, shoppingCartService, productService, $route, $location) {
  var self = this;
  this.headerNav = [
    {
      name: 'Кошик',
      type: '/shoppingCart'
    },
    {
      name: 'Вибране',
      type: '/favorite'
    },
    {
      name: 'Головна',
      type: '/products'
    }
  ];

  this.sortingLabels = ['Сортування', 'Кількість']
  this.limitValues = ['4', '8', '12', '16', '20'];
  this.orderType = {
    id: {
      type: 'id',
      text: 'По рейтингу'
    },
    name: {
      type: 'name',
      text: 'По імені'
    },
    price: {
      type: 'price',
      text: 'По ціні'
    }
  };
  this.favoritesIds = dataService._favoritesIds;
  this.pageNo = 1;
  this.lengthArr = [];
  this.sortPhones = 'id';
  this.limitPhones = this.limitValues[1];

  this.state = $route.current.$$route.originalPath
  this.filterProducts = function () {}
  this.phones = dataService.getPhones();

  this.calculatePageCount = function () {
    var pageCount = 0;
    if(this.phones) {
      pageCount = Math.ceil(this.phones.length / parseInt(this.limitPhones))
    };


    this.lengthArr = [];
    for (var i = 1; i <= pageCount; i++) {
      this.lengthArr.push(i);
    }
  };
  this.calculatePageCount()

  this.changePageNo = function (pageNo) {
    self.pageNo = pageNo;
  }
  this.toggleFavorite = function(phone) {
    favoriteService.toggle(phone);
    this.calculatePageCount()
  };
  this.toggleShopCart = function(phone) {
    shoppingCartService.toggle(phone);
    this.calculatePageCount()
  };

  this.changeLocation = function(phone) {
    productService.savePhone(phone);
    $location.path('/product');
  };

  this.saveData = function() {
    var dataStr = JSON.stringify(this.phones);
    localStorage.productsData = dataStr;
  };


};
