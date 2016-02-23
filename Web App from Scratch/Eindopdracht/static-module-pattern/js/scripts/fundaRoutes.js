var fShaker = fShaker || {};
'use strict';

fShaker.routes = (function () {
    if (location.hash === undefined || location.hash === '') {
        location.hash = '#home';
    }

    var _sections = document.querySelectorAll('.togglesection');
    var i;

    function routers(_data) {
        routie({
            'home': () => {
                console.log("dit is home");
                fShaker.page.initHome.init();
                fShaker.routes.toggle(location.hash)
            },
            'myhouse': () => {
                //slice is to delete bestsellersdetail/ from the hash, so the queryselector will work
                fShaker.page.initHouse.init();
                fShaker.routes.toggle(location.hash);
            },
            '*': () => {
                fShaker.routes.toggle(location.hash)
            }
        });
    };

    function toggle(route) {
        for (i = 0; i < _sections.length; i++) {
            _sections[i].classList.add('inactive');
            //If there is no hash, make every section visible, in case JS is disabled.
            if (!route) {
                _sections[0].classList.remove('inactive');
            } else {

                //make the right section, according to its hash, visible
                document.querySelector(route).classList.remove('inactive');
            }
        }
    };


    return {
        init: routers,
        toggle: toggle

    }

})();