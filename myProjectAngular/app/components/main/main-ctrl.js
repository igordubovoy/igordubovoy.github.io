function mainCtrl(photoDataService, $route) {
  coreCtrl.apply(this, arguments);
  this.name = 'valera';
  console.log('main')
}

myApp.controller('mainCtrl', ['photoDataService', '$route', mainCtrl]);
