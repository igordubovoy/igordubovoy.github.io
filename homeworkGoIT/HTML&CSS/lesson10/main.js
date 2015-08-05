(function () {
    var buttonsZoom = document.querySelectorAll('.zoom'),
        dark = document.querySelector('.dark'),
        bigPhoto = document.querySelector('.show-big-photo'),
        exit = document.querySelector('.close');


    for (var i = 0; i < buttonsZoom.length; i++) {
        buttonsZoom[i].onclick = function () {
            if (this.className === "zoom _1") {
                dark.className += " dark_monitor";
                bigPhoto.style.cssText = "display: block; background-image: url(img/big/1_big.jpg);";
            }
        }
    }

    exit.onclick = function () {
        dark.className = "";
        bigPhoto.style.cssText = "display: none;";
    }

})()
