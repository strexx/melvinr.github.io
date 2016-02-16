var NYT = NYT || {};
'use strict';

NYT.launcher = (function () {
    
    return {
        init: function () {
            NYT.api.init();
            NYT.ux.gestures();
        }
    }
    
})();

NYT.launcher.init();