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
                console.log(permission);
                if (permission === 'granted') {
                    var notification = new Notification("hoi");
                    alert(notification);
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