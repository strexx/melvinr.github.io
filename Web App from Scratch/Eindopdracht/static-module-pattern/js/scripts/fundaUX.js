var fShaker = fShaker || {};
'use strict';


fShaker.ux = (function () {

    var _fShakerBody = document.querySelector('body');
    var _loadie = document.getElementById('loader');
    
    function shake() {
        var myShakeEvent = new Shake({
            threshold: 15, // optional shake strength threshold
            timeout: 1000 // optional, determines the frequency of event generation
        });

        myShakeEvent.start();

        window.addEventListener('shake', shakeEventDidOccur, false);

        //function to call when shake occurs
        function shakeEventDidOccur() {
            alert("something");
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