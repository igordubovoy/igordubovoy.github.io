(function () {
    var dark = document.getElementById('dark'),
        modal = document.querySelector('.modal-form');


    if (window.addEventListener) {
        window.addEventListener('scroll', viewModal, false);
    } else {
        window.attachEvent('scroll', viewModal);
    }

    var style = window.getComputedStyle(document.body),
        prop = +style.height.substring(0, style.height.length - 2);
    console.log(prop)


    function viewModal() {
        var scroll = window.scrollY * 100 / prop;
        console.log(scroll)

        if (scroll > 99) {
            dark.className = "dark_monitor";
            modal.style.cssText += "visibility: visible; z-index: 1000";
        } else {
            dark.className = "";
            modal.style.cssText = "";
        }
    }
})()
