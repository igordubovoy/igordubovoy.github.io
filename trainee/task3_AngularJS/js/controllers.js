'use strict';

/*controllers*/
var shopApp = angular.module('shopApp', []);
shopApp.controller('mainListCtrl', ['$http', function ($http) {
  var self = this;

  this.headerNav = ['Кошик', 'Вибране', 'Головна'];
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
  this.allStates = {
    favorite: 'favorite',
    products: 'products',
    shoppingCart: 'shoppingCart',
    product: 'product'
  };

  $http.get('js/data.json').success(function (data) {
    self.phones = data;
    self.calculatePageCount()
  });

  this.favoritesIds = [];
  this.state = this.allStates.products;
  this.pageNo = 1;
  this.lengthArr = [];
  this.sortPhones = 'id';
  this.limitPhones = this.limitValues[1];


  this.calculatePageCount = function () {
    var pageCount = Math.ceil(this.phones.length / parseInt(this.limitPhones));
    this.lengthArr = [];
    for (var i = 1; i <= pageCount; i++) {
      this.lengthArr.push(i);
    }
  };

  this.changePageNo = function(pageNo){
    self.pageNo = pageNo;
  }

  this.changeState = function(button) {
    switch(button) {
      case 'Кошик':
        this.state = this.allStates.shoppingCart;
        break;
      case 'Вибране':
        this.state = this.allStates.favorite;
        break;
      case 'Головна':
        this.state = this.allStates.products;
        break;
    }
  };
  this.exist = function(phone) {
    return this.favoritesIds.indexOf(phone.id) === -1;
  };
  this.addId = function(phone){
    this.favoritesIds.push(phone.id)
  }

  this.remove = function(phone) {
    var index = this.favoritesIds.indexOf(phone.id);
    this.favoritesIds.splice(index, 1);
  };

  this.toggle = function(phone) {
    this.exist(phone) ? this.addId(phone) : this.remove(phone);
  };

}]);
