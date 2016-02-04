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
            //when hash changes, execute toggle function
            window.addEventListener("hashchange",function() {myApp.sections.toggle(location.hash)}, false);
            //Onload, execute toggle function, to immediately show the right section
            window.addEventListener("load",function () {myApp.sections.toggle(location.hash)}, false)
        }
    };

    myApp.sections = {
        toggle: function (route) {
            var sections = document.querySelectorAll(".togglesection");
            
            //loop through sections, and add inactive class to every section
            for (var i = 0; i < sections.length; i++) {
                sections[i].classList.add("inactive");
                
                //If there is no hash, make every section visible, in case JS is disabled.
                if (!route) {
                    sections[0].classList.remove("inactive");
                } else {
                    //make the right section, according to its hash, visible
                    document.querySelector(route).classList.remove('inactive');
                }
            }
        }
    };

    //Initialize app to run the application
    myApp.app.init();
})();