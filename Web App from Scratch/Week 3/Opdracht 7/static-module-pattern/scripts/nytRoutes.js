var NYT = NYT || {};
'use strict';

NYT.routes = (function () {
    if (location.hash === undefined || location.hash === '') {
        location.hash = '#bestsellers';
    }

    var sections = document.querySelectorAll('.togglesection');
    var i;

    function routers(data) {
        routie({
            'bestsellers': function () {
                NYT.routes.toggle(window.location.hash);
                NYT.page.overviewList.init(data);
            },
            'bestsellersdetail/:id': function (id) {
                //slice is to delete bestsellersdetail/ from the hash, so the queryselector will work
                NYT.routes.toggle(window.location.hash.slice(0, 18));
                NYT.page.bestsellerDetail.init(data, id);
            },
            '*': function () {
                NYT.routes.toggle(window.location.hash);
            }
        });
    };

    function toggle(route) {
        for (i = 0; i < sections.length; i++) {
            sections[i].classList.add('inactive');

            //If there is no hash, make every section visible, in case JS is disabled.
            if (!route) {
                sections[0].classList.remove('inactive');
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