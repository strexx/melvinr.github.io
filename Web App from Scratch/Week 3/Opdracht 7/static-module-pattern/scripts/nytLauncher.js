var NYT = NYT || {};
'use strict';

NYT.launcher = (function () {
    
    return {
        init: () =>  {
            NYT.ux.loader(true);
            NYT.api.init();
            NYT.ux.gestures();
        }
    }
    
})();

NYT.launcher.init();