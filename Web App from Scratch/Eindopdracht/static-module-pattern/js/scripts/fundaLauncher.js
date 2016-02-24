var fShaker = fShaker || {};
'use strict';

fShaker.launcher = (function () {
    
    return {
        init: () =>  {
//            fShaker.ux.loader(true);
            fShaker.api.getLocation();
            fShaker.ux.shakeMe();

        }
    }
    
})();

fShaker.launcher.init();