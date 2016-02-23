var fShaker = fShaker || {};
'use strict';

fShaker.launcher = (function () {
    
    return {
        init: () =>  {
            fShaker.api.getLocation();
            fShaker.ux.myShake();
        }
    }
    
})();

fShaker.launcher.init();