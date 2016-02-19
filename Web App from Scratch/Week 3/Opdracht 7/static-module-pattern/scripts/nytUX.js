var NYT = NYT || {};
'use strict';


NYT.ux = (function () {

    var nytBody = document.querySelector('body');
    var mc = new Hammer(nytBody);

    function swipeBack() {
        mc.on('swiperight', function (ev) {
            window.history.back();
        });
    }

    return {
        gestures: swipeBack
    }
})();