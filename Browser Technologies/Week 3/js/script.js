var fn = fn || {};
'use strict';


document.addEventListener('DOMContentLoaded', function () {
//    fn.launcher.init();
    askIt();
});


function isNewNotificationSupported() {
    if (!window.Notification || !Notification.requestPermission)
        return false;
    if (Notification.permission == 'granted')
        throw new Error('');
        alert("test 1");
    try {
        alert("test 2");
        new Notification('');
        alert("test 3");
    } catch (e) {
        if (e.name == 'TypeError')
            alert('something went wrong');
            return false;
    }
    return true;
}

function askIt() {
    if(isNewNotificationSupported()) {
        Notification.requestPermission();
    }
}

fn.launcher = (function () {
    var init = function () {
        fn.notification.init();
    }

    return {
        init: init
    }
})();


//fn.notification = (function () {
//    var askPermission = function () {
//        if (!Notification in window) {
//            alert("hoi");
//        } else {
//            Notification.requestPermission(function (permission) {
//                if (permission === 'granted') {
//                    var bla;
//                    var notification = new Notification("hoi");
//                }
//            })
//        }
//    }
//
//    return {
//        init: askPermission
//    }
//})();

//
//
//var winMessage = "Leicester City have beaten Manchester City with a score of 1-3."
//    
//    setTimeout(function() {
//        alert("Hoi");
//    }, 3000);