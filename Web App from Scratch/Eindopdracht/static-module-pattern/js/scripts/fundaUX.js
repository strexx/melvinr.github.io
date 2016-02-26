var fShaker = fShaker || {};
'use strict';


fShaker.ux = (function () {

    var _fShakerBody = document.querySelector('body');
    var _loadie = document.getElementById('loader');
    
    function shake() {
        var myShakeEvent = new Shake({
            threshold: 15,
            timeout: 1000
        });

        myShakeEvent.start();

        window.addEventListener('shake', shakeEventDidOccur, false);

        //If shake occurs, get a random object and render it
        function shakeEventDidOccur() {
            alert('shooken');
            fShaker.page.getObject();
        };
    }

    //    based on the advice of Lisa Klein
        function loader(active) {
            if (active) {
                _loadie.classList.remove('inactive');
            } else {
                _loadie.classList.add('inactive');
            }
        }

    return {
        shake: shake,
        loader: loader
    }
})();