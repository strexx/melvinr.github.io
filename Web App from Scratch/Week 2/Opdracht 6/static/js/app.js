var myApp = myApp || {};

//IIFE, this is a self invoking function
(function () {
    "use strict";
    var hello;
    //Object literal declarations
    myApp.app = {
        //init is a method
        init: function () {
            myApp.routes.init();
        }
    };

    myApp.data = {
        init: function () {
            var json;
            aja().url('http://api.nytimes.com/svc/books/v2/lists/e-book-fiction.json?&api-key=b147374c9f7b0f2b25ddf9694dc28511:4:74324460')

            .on('success', function (data) {
                    for (var i = 0; i < data.results.length; i++) {
                        var bookauthors = data.results[i].book_details[0].author;
                    }

                })
                .go();
        }
    }

    myApp.routes = {
        init: function () {
            routie({
                'start': function () {
                    myApp.sections.startpage();
                },
                'bestsellers': function () {
                    myApp.sections.bestsellers();
                },
                'bestsellers/:name': function () {
                    routie()
                }
            })
        }
    };

    myApp.sections = {
        startpage: function () {

        },
        bestsellers: function () {
            
        }
    };

    //Initialize app to run the application
    myApp.app.init();
})();