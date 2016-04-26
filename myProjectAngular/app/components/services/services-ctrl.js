function servicesCtrl(photoDataService, $route) {
  coreCtrl.apply(this, arguments);
  this.name = 'valera';
}

myApp.controller('servicesCtrl', ['photoDataService', '$route', servicesCtrl]);
