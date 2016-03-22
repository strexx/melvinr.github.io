var fn = fn || {};
'use strict';


document.addEventListener('DOMContentLoaded', function () {
    fn.launcher.init();
});




fn.launcher = (function () {
    var init = function () {
        fn.notification.init();
    }

    return {
        init: init
    }
})();

fn.notification = (function () {

    var askPermission = function () {
        if (!Notification in window) {
            alert("hoi");
        } else {
            Notification.requestPermission(function (permission) {
                if (permission === 'granted') {
                    console.log(permission);
                    var notification = new Notification("hoi") || alert("hoi");
                    Notification.onerror = function() {
                        alert(Error);
                    }
                }
            })
        }
    }

    return {
        init: askPermission
    }
})();

//
//
//var winMessage = "Leicester City have beaten Manchester City with a score of 1-3."
//    
//    setTimeout(function() {
//        alert("Hoi");
//    }, 3000);