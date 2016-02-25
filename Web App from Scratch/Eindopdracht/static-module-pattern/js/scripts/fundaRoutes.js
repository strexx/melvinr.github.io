var fShaker = fShaker || {};
'use strict';

fShaker.routes = (function () {
    if (location.hash === undefined || location.hash === '') {
        location.hash = '#home';
    }

    var _sections = document.querySelectorAll('.togglesection');
    var i;

    //Check the current hash and execute the right page initializations linked to this hash. Also display the correct pages by executing toggle.
    function routers(_data) {
        routie({
            'home': () => {
                fShaker.page.initHome();
                fShaker.routes.toggle(location.hash)
            },
            'myhouse': () => {
                fShaker.page.initHouse();
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