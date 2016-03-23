var fn = fn || {};
'use strict';


var results = document.getElementById('results');
var cluboption = document.getElementById('cluboption');
var leicester = document.getElementById('leicester');
var leicesterTwo = document.getElementById('leicestertwo');
var docBody = document.querySelector('body');

document.addEventListener('DOMContentLoaded', function () {
    results.classList.add('inactive');
    cluboption.classList.remove('inactive');

    if (isNewNotificationSupported()) {
        docBody.classList.add('nf-supported');
        fn.launcher.init();
    } else {
        fn.launcher.init();
    }
 
});

fn.launcher = (function () {
    var init = function () {
        if (docBody.className === 'nf-supported') {
            fn.notification.webNotification();
        } else {
            fn.notification.showSection();
        }
    }

    return {
        init: init
    }
})();


fn.notification = (function () {
    var pushNotification = document.getElementById('push-notification');
    function showSection() {
        pushNotification.classList.remove('inactive');
    };

    function webNotification() {
        if (window.Notification && Notification.permission == 'granted') {
            var notification = new Notification(leicester.innerHTML);
        } else if (isNewNotificationSupported()) {
            Notification.requestPermission();
        }
    }

    return {
        showSection: showSection,
        webNotification: webNotification
    }

})();


//Thanks to Joost Faber for helping me rewrite this for progressive enhancement.
//Source: https://developers.google.com/web/updates/2015/05/notifying-you-of-changes-to-notifications
function isNewNotificationSupported() {
    var docBody = document.querySelector('body');
    if (!window.Notification || !Notification.requestPermission) {
        return false;
    }
        
    if (Notification.permission == 'granted'){
        docBody.classList.add('nf-supported');
        return true;
    }
    try {
        new Notification('...');
    } catch (e) {
        if (e.name == 'TypeError')
            fn.notification.showSection();
        return false;
    }
    
    return true;
}

//
//fn.launcher = (function () {
//    var init = function () {
//        fn.notification.init();
//    }
//
//    var pushNotification = document.getElementById('push-notification');
//
//
//
//    return {
//        init: init,
//        showSection: showSection
//    }
//})();



if ('alert' in window) {
    results.classList.add('inactive');
    cluboption.classList.remove('inactive');
}