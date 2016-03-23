var fn = fn || {};
'use strict';


var results = document.getElementById('results');
var cluboption = document.getElementById('cluboption');
var leicester = document.getElementById('leicester');
var leicesterTwo = document.getElementById('leicestertwo');
var docBody = document.querySelector('body');
var notifTitle = document.getElementById('notification-title');
var notifContent = document.getElementById('notification-content');


document.addEventListener('DOMContentLoaded', function () {
    results.classList.add('inactive');
    cluboption.classList.remove('inactive');

    if (isNewNotificationSupported()) {
        docBody.classList.add('nf-supported');
    }
    fn.launcher.init();

});

fn.launcher = (function () {
    var clubButton = document.querySelectorAll('.clubButton');
    var init = function () {

        fn.loop.loopFunc();

        //        if (docBody.className !== 'nf-supported') {
        //            fn.notification.showSection();
        //        } else {
        //            fn.notification.webNotification();
        //            console.log('Melvin');
        //        }
    }

    return {
        init: init
    }
})();


fn.loop = (function () {
    var clubButton = document.querySelectorAll('.clubButton');
    var cluboption = document.getElementById('cluboption');

    function loopFunc() {


        cluboption.addEventListener('click', function (e) {
            var result = e.target.attributes['data-result'].value;
            var matchup = e.target.attributes['data-match'].value;
            if (docBody.className !== 'nf-supported') {
                fn.notification.showSection(result, matchup);
            } else {
                fn.notification.webNotification(result, matchup);
                console.log('Melvin');
            }
        })

    }

    return {
        loopFunc: loopFunc
    }
})();

fn.notification = (function () {
    var pushNotification = document.getElementById('push-notification');

    function showSection(result, matchup) {
        pushNotification.classList.remove('inactive');
        notifTitle.innerHTML = matchup;
        notifContent.innerHTML = "Score: " + result;
        
    };

    function webNotification(result, matchup) {
        if (window.Notification && Notification.permission == 'granted') {
            console.log(notifContent);
            var notification = new Notification(matchup);
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

    if (Notification.permission == 'granted') {
        docBody.classList.add('nf-supported');
        return true;
    }
    try {
        new Notification('...');
    } catch (e) {
        if (e.name == 'TypeError')
            fn.loop.loopFunc();
        alert('Wrong!');
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