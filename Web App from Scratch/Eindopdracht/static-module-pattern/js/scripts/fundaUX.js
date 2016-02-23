var fShaker = fShaker || {};
'use strict';


fShaker.ux = (function () {

    var _fShakerBody = document.querySelector('body');
    var _mc = new Hammer(_fShakerBody);
    //    var _loadie = document.getElementById('loader');


    function swipeBack() {
        _mc.on('swiperight', (ev) => {
            window.history.back();
        });
    }

    function shakeMe() {
        var myShakeEvent = new Shake({
            threshold: 15, // optional shake strength threshold
            timeout: 1000 // optional, determines the frequency of event generation
        });

        myShakeEvent.start();

        window.addEventListener('shake', shakeEventDidOccur, false);

        //function to call when shake occurs
        function shakeEventDidOccur() {
            alert("HOI");
        };
    }

    //    based on the advice of Lisa Klein
    //    function loader(active) {
    //        if (active) {
    //            _loadie.classList.remove('inactive');
    //        } else {
    //            _loadie.classList.add('inactive');
    //        }
    //    }

    return {
        gestures: swipeBack,
        myShake: shakeMe
    }
})();