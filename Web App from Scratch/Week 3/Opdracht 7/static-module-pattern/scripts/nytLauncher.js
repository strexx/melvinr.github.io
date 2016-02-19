var NYT = NYT || {};
'use strict';

NYT.launcher = (function () {
    
    return {
        init: () => {
            NYT.api.init();
            NYT.ux.gestures();
        }
    }
    
})();

NYT.launcher.init();