var myApp = myApp || {};

//IIFE, this is a self invoking function
(function () {
    "use strict";

    //Object literal declarations
    myApp.app = {
        //init is a method
        init: function () {
            myApp.routes.init();
        }
    };

    myApp.routes = {

        init: function () {
            window.addEventListener("hashchange",function() {myApp.sections.toggle(location.hash)}, false);
            window.addEventListener("load",function () {myApp.sections.toggle(location.hash)}, false)
        },
        load: function () {

        }
    };

    myApp.sections = {
        toggle: function (route) {
            var sections = document.querySelectorAll(".togglesection");

            for (var i = 0; i < sections.length; i++) {
                sections[i].classList.add("inactive");
                
                if (!route) {
                    sections[0].classList.remove("inactive");
                } else {
                    document.querySelector(route).classList.remove('inactive');
                }
            }
        }
    };

    //Initialize app to run the application
    myApp.app.init();
})();