var fn = fn || {};
'use strict';


var results = document.getElementById('results');
var cluboption = document.getElementById('cluboption');

document.addEventListener('DOMContentLoaded', function () {
    results.classList.add('inactive');
    cluboption.classList.remove('inactive');
    askIt();
    
});



function askIt() {
    if (window.Notification && Notification.permission == 'granted') {
        var notification = new Notification("hoi");
    } else if (isNewNotificationSupported()) {
        Notification.requestPermission();
    }
}

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
            fn.launcher.showSection();
        return false;
    }
    return true;
}


fn.launcher = (function () {
    var init = function () {
        fn.notification.init();
    }

    var pushNotification = document.getElementById('push-notification');

    var showSection = function () {
        pushNotification.classList.remove('inactive');
    }

    return {
        init: init,
        showSection: showSection
    }
})();

//
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