var fShaker = fShaker || {};
'use strict';

fShaker.launcher = (function () {
    
    return {
        init: () =>  {
            fShaker.api.geoCheck();
        }
    }
    
})();

fShaker.launcher.init();