(function () {
    function initialize() {
        var mapCanvas = document.getElementById('map_canvas');
        var mapOptions = {
            center: new google.maps.LatLng(50.4390449, 30.4988834),
            zoom: 17,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false
        }
        var map = new google.maps.Map(mapCanvas, mapOptions)
    }
    google.maps.event.addDomListener(window, 'load', initialize);

})()
