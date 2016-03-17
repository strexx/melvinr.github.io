var fShaker = fShaker || {};
'use strict';


fShaker.ux = (function () {

    var _fShakerBody = document.querySelector('body');
    
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

    return {
        shake: shake
    }
})();