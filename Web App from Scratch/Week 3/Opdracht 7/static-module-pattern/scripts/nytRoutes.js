var NYT = NYT || {};
'use strict';

NYT.routes = (function () {
    if (location.hash === undefined || location.hash === '') {
        location.hash = '#bestsellers';
    }

    var _sections = document.querySelectorAll('.togglesection');
    var i;

    function routers(data) {
        routie({
            'bestsellers': () => {
                NYT.routes.toggle(window.location.hash);
                NYT.page.overviewList.init(data);
            },
            'bestsellersdetail/:id': (id) => {
                //slice is to delete bestsellersdetail/ from the hash, so the queryselector will work
                NYT.routes.toggle(window.location.hash.slice(0, 18));
                NYT.page.bestsellerDetail.init(data, id);
            },
            '*': () => {
                NYT.routes.toggle(window.location.hash);
            }
        });
    };

    function toggle(route) {
        for (i = 0; i < _sections.length; i++) {
            _sections[i].classList.add('hide');
            //If there is no hash, make every section visible, in case JS is disabled.
            if (!route) {
                _sections[0].classList.remove('hide');
            } else {

                //make the right section, according to its hash, visible
                document.querySelector(route).classList.remove('hide');
            }
        }
    };


    return {
        init: routers,
        toggle: toggle

    }

})();