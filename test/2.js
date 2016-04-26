(function(window){
  var a = 1,
      b = 2;
  return window.my = function() {
    if (arguments.length) {
      a = arguments[0];
      if (arguments[1]) {
        b = arguments[1];
      }
    } else {
      console.log('a:',a,'b:',b);
    }
  }
})(window)
