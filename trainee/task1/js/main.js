/*
window.addEventListener("DOMContentLoaded", function () {

  var content = document.querySelector(".content");
  function List(products){

    this.products = products;
    this.write = function(){
      this.products.forEach(function (elem) {
        var item = document.createElement('div'),
            img = document.createElement('img'),
            span_name = document.createElement('span'),
            span_price = document.createElement('span'),
            button = document.createElement('button');

        span_price.innerHTML = elem.price + " грн";
        span_name.innerHTML = elem.name;
        button.innerHTML = "В корзину";

        img.setAttribute("src", "images/small/small_" + elem.id + ".jpg");

        item.appendChild(img);
        item.appendChild(span_name);
        item.appendChild(span_price);
        item.appendChild(button);

        span_name.className = "item_span";
        span_price.className = "item_span item_span_price";
        item.className = "item";
        button.className = "item_button";
        content.appendChild(item);
      })
    }
  }
  var newList = new List(products);
  newList.write();
  console.log(shop)
});
*/




