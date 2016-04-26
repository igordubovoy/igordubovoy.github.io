myApp.service('photoDataService', function () {
  this.series = photoData;
  this.getSeries = function () {
    return this.series;
  };
});
