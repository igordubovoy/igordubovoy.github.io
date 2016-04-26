function naviCtrl(photoDataService, $route, $window) {
  coreCtrl.apply(this, arguments);
  console.log(1231231);
  function fixingNavi() {
    var
      headerH = document.getElementsByTagName('header')[0].clientHeight,
      menu = document.querySelector('#navigation');
    menu.style.cssText += " position: fixed; top: " + headerH + "px";
    $window.addEventListener('scroll', scrollNav, false);

    function scrollNav() {
      var top = $window.scrollY
      console.log(top, headerH);
      if (top <= headerH) {
        menu.style.cssText += "top: " + (headerH - top) + "px; background-color: transparent";
      } else {
        menu.style.cssText += "top:0; background-color: white";
      }
    }
  }
  fixingNavi();
}

myApp.controller('naviCtrl', ['photoDataService', '$route', '$window', naviCtrl]);
