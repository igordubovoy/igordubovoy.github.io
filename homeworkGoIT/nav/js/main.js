(function(){
    var headerH = 200,
        menu = document.querySelector('#navigation');
        menu.style.cssText += " position: fixed; top: "+ headerH+"px";

        window.addEventListener('scroll', scrollNav, false);

        function scrollNav() {
            var top = window.scrollY
            console.log(top);
            if(top < headerH) {
            menu.style.cssText += "top: "+ (headerH-top)+"px";
            }
            else {  menu.style.cssText += "top:0";
            }
        }
})()

