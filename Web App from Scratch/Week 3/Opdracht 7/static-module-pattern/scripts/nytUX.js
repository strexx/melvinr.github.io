var NYT = NYT || {};
'use strict';


NYT.ux = (function () {

    var _nytBody = document.querySelector('html');
    var _mc = new Hammer(_nytBody);


        function swipeBack() {
            _mc.on('swiperight', function (ev) {
                window.history.back();
            });
        }

    return {
        gestures: swipeBack
    }
})();