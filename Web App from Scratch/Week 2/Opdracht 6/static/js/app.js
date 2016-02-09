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


//    myApp.data = {
//        apiKey: "b147374c9f7b0f2b25ddf9694dc28511:4:74324460",
//        url: ['http://api.nytimes.com/svc/books/v2/lists/', '.json?&api-key='],
//        endURL: function (genreType) {
//            var fURL = this.url[0] + genreType + this.url[1] + this.apiKey;
//
//            return fURL;
//        }
//    }

    myApp.routes = {
        init: function () {
            //when hash changes, execute toggle function
           document.querySelector('#bestsellers').classList.add('inactive');
            
            routie({
                'start': function(){
                    document.querySelector(window.location.hash).classList.remove('inactive');
                    document.querySelector('#bestsellers').classList.add('inactive');
                },
                'bestsellers': function(){
                    document.querySelector(window.location.hash).classList.remove('inactive');
                    document.querySelector('#start').classList.add('inactive');
                }
                
            });
            myApp.page.init();
        }
    }

    myApp.page = {
        init: function () {
            aja().url('http://api.nytimes.com/svc/books/v2/lists/e-book-fiction.json?&api-key=b147374c9f7b0f2b25ddf9694dc28511:4:74324460')
                .on('success', function (data) {
                    var json = data;
                    var i;

                    //Inspired by Lisa Klein
                    for (i = 0; i < json.results.length; i++) {
                        var templating = {
                            title: "Boeklijst",
                            bestsellerList: [
                                {
                                    author: json.results[0].book_details[0].author,
                                    description: data.results[0].book_details[0].description
                    },
                                {
                                    author: json.results[1].book_details[0].author,
                                    description: data.results[1].book_details[0].description
                    },
                                {
                                    author: json.results[2].book_details[0].author,
                                    description: data.results[2].book_details[0].description
                    }
                ]
                        };
                    }
                 Transparency.render(document.getElementById('template'), templating);
                })
                .go();
        }

    };

    //Initialize app to run the application
    myApp.app.init();
})();