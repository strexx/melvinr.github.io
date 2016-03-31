var fn = fn || {};
'use strict';


var results = document.getElementById('results');
var cluboption = document.getElementById('cluboption');
var leicester = document.getElementById('leicester');
var leicesterTwo = document.getElementById('leicestertwo');
var docBody = document.querySelector('body');
var notifTitle = document.getElementById('notification-title');
var notifContent = document.getElementById('notification-content');
var docBody = document.querySelector('body');
var myTitle = document.querySelector('title');

document.addEventListener('DOMContentLoaded', function () {

    if (isNewNotificationSupported()) {
        docBody.classList.add('nf-supported');
        if (Notification.permission == 'granted') {
//            fn.notification.webNotification();
        }
    }

    //    fn.launcher.init();
    fn.loop.loopFunc();
});

fn.loop = (function () {
    var clubButton = document.querySelectorAll('.clubButton');
    var cluboption = document.getElementById('cluboption');

    function loopFunc() {


        var pushNotification = document.getElementById('push-notification');
        cluboption.addEventListener('click', function (e) {
            //            var result = e.target.attributes['data-result'].value;
            var matchup = e.target.attributes['data-match'].value;
            if (docBody.className === 'nf-supported') {
                e.preventDefault();
                //                fn.notification.testNotification(result, matchup);
                Notification.requestPermission();
                console.log(matchup);
            }
        })

    }

    return {
        loopFunc: loopFunc
    }
})();

fn.notification = (function () {
    function showSection(result, matchup) {
        notifTitle.innerHTML = matchup;
        notifContent.innerHTML = "Score: " + result;

    };

    function webNotification(matchup) {
        if (window.Notification && Notification.permission == 'granted') {
            setTimeout(function () {
                var result = fn.getResult.getRandomResult();
                myTitle.innerHTML = result;
                var notification = new Notification(matchup, {
                    icon: 'http://i.ebayimg.com/00/s/ODg2WDg4Ng==/z/X-8AAOxyNmZTj3tF/$_35.JPG',
                    body: result
                })
            }, 10000);
        } else if (isNewNotificationSupported()) {
            Notification.requestPermission();
        }
    }


    function testNotification(matchup, result) {

    }

    return {
        showSection: showSection,
        webNotification: webNotification,
        testNotification: testNotification
    }
})();

//Thanks to Joost Faber for helping me rewrite this for progressive enhancement.
//Source: https://developers.google.com/web/updates/2015/05/notifying-you-of-changes-to-notifications
function isNewNotificationSupported() {
    var docBody = document.querySelector('body');
    if (!window.Notification || !Notification.requestPermission) {
        console.log('hoi');
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
        //            fn.loop.loopFunc();
            console.log('nope');
        return false;
    }

    return true;
}





///Create a randomized result
fn.getResult = (function () {
    function getRandomResult() {
        function myFunction() {
            return Math.floor(Math.random() * 6);
        }
        var homeSide = myFunction();
        var awaySide = myFunction();

        var endResult = homeSide + '-' + awaySide;
        return endResult;
    }

    return {
        getRandomResult: getRandomResult
    }
})();