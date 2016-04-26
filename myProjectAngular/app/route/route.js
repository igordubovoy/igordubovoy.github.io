myApp.config(['$routeProvider', function ($routeProvider) {

  $routeProvider
    .when('/main', {
    templateUrl: 'app/route/state-main/main-template.html'
  })
    .when('/services', {
    templateUrl: 'app/route/state-services/services-template.html'
  })
    .when('/contacts', {
    templateUrl: 'app/route/state-contacts/contacts-template.html'
  })
    .when('/series', {
    templateUrl: 'app/route/state-series/series-template.html'
  })
    .otherwise({
    redirectTo: '/main'
  });
}]);
