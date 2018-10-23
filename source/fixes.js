;(function () {
    if (Modernizr.cssvhunit) {
    // supported
    } else {
        // not-supported

        function updateMapContainer() {
            var h = document.documentElement.clientHeight;
            var m = document.getElementById('map-container');
            if (m && h) {
                m.setAttribute('style', 'height: ' + (h*0.9) + 'px');
            }
        }

        updateMapContainer(); 
        window.onresize = updateMapContainer;
    }
}) ();