var NYT = NYT || {};
'use strict';


NYT.ux = (function () {

    var nytBody = document.querySelector('body');
    var mc = new Hammer(nytBody);
    var myBody;
    return {
        gestures: function () {
            myBody = nytBody;

            mc.on('swiperight', function (ev) {
                window.history.back();
            });
        }
    }
})();