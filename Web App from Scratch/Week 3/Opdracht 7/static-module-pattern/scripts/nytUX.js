var NYT = NYT || {};
'use strict';


NYT.ux = (function () {

    var _nytBody = document.querySelector('body');
    var _mc = new Hammer(_nytBody);
    var loadie = document.getElementById('loader');


    function swipeBack() {
        _mc.on('swiperight', (ev) => {
            window.history.back();
        });
    }
    //    based on the advice of Lisa Klein
    function loader(active) {
        if (active) {
            loadie.classList.remove('inactive');
        } else {
            loadie.classList.add('inactive');
        }
    }

    return {
        gestures: swipeBack,
        loader: loader
    }
})();