(function () {
    var sign = document.getElementById("signIn"),
        exit = document.querySelector('.close'),
        dark = document.getElementById('dark'),
        modal = document.querySelector('.general');

    if (sign.addEventListener) {
        sign.addEventListener('click', clickSign, false);
    } else {
        sing.attachEvent('onclick', clickSign)
    }
    if (exit.addEventListener) {
        exit.addEventListener('click', clickToExit, false);
    }
    exit.attachEvent('onclick', clickToExit);

    function clickSign() {
        dark.className = "dark_monitor";
        modal.style.cssText += "visibility: visible; z-index: 1000";
        sign.style.cssText = "visibility: hidden"
    }

    function clickToExit() {
        dark.className = '';
        modal.style.cssText = '';
        sign.style.cssText = "visibility: visible"
    }

})()
