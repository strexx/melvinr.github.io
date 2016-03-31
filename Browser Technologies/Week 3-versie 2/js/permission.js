var fn = fn || {};
'use strict';

var permissionBtn = document.querySelector('#permission-btn'),
    docBody = document.querySelector('body'),
    myTitle = document.querySelector('title'),
    matchup = document.querySelector('#matchup');


document.addEventListener('DOMContentLoaded', function () {

    if (isNewNotificationSupported()) {
        docBody.classList.add('nf-supported');
        if (Notification.permission == 'granted' && permissionBtn.className === 'allowed') {
            fn.notification.webNotification();
            console.log('Your wish has been granted')
        }
    }

    //    fn.launcher.init();
    fn.loop.loopFunc();
});


fn.loop = (function(){
    function loopFunc () {
        permissionBtn.addEventListener('click', function(e) {
            e.preventDefault();
            Notification.requestPermission();
            if(permissionBtn.className === 'allowed') {
                permissionBtn.className = 'disallowed';
                permissionBtn.innerHTML = "Don't notify me!";
            } else {
                Notification.requestPermission = 'denied';
                permissionBtn.className = 'allowed';
                permissionBtn.innerHTML = "Notify me!";
            }
        })
    }
    
    return {
        loopFunc: loopFunc
    }
})()

fn.notification = (function () {
    function webNotification () {
        if (window.Notification && Notification.permission == 'granted' && permissionBtn.className === 'allowed') {
            setTimeout(function () {
                var result = fn.getResult.getRandomResult();
                myTitle.innerHTML = result;
                var todayMatchup = matchup.attributes['data-match'].value;
                var notification = new Notification(todayMatchup, {
                    icon: 'images/leicester.png',
                    body: result
                })
            }, 1000);
        } else if (isNewNotificationSupported()) {
            Notification.requestPermission();
        }
    }
    
    return {
        webNotification: webNotification
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