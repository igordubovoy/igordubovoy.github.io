(function(){
    var dark = document.getElementById('dark'),
        modal = document.querySelector('.modal-form');


    if (window.addEventListener) {
        window.addEventListener('scroll', viewModal, false);
    } else {
        window.attachEvent('scroll', viewModal);
    }

    function viewModal() {
        var style = window.getComputedStyle(document.body),
        prop = +style.height.substring(0, style.height.length - 2),
        scroll = window.scrollY * 100 / prop;
        console.log(scroll)
        if (scroll > 76.78) {
            dark.className = "dark_monitor";
            modal.style.cssText += "visibility: visible; z-index: 1000";
        } else {
            dark.className = "";
            modal.style.cssText = "";
        }
    }
})()
