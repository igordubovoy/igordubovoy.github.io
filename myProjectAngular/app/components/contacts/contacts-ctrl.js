function contactsCtrl(photoDataService, $route) {
  coreCtrl.apply(this, arguments);
  this.name = 'valera';
}

myApp.controller('contactsCtrl', ['photoDataService', '$route', contactsCtrl]);
