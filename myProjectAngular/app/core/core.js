'use strict';

var myApp = angular.module('myApp', ['ngRoute', 'angular-parallax']);
function coreCtrl(photoDataService, $route) {
  var self = this;

  this.headerNav = [
    {
      name: 'ГЛАВНАЯ',
      type: '/main'
    },
    {
      name: 'УСЛУГИ',
      type: '/services'
    },
    {
      name: 'КОНТАКТЫ',
      type: '/contacts'
    }
  ];
  this.name = 'Igor'
  this.series = photoDataService.getSeries();
}

myApp.controller('coreCtrl', ['photoDataService', '$route', coreCtrl]);
