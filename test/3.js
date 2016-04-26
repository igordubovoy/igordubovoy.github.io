var summ = 0;
function add(arr) {
  arr.forEach(function(elem) {
    if(elem.join) {
      add(elem);
    } else {
      return summ+= elem;
    }
  })
  return summ;
}

var arr = [1,2,3,4,[4,2,3]];

console.log(add(arr));
