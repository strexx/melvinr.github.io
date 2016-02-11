var myApp = myApp || {};

//IIFE, this is a self invoking function
(function () {
    "use strict";

    //Object literal declarations
    myApp.app = {
        //init is a method
        init: function () {
            myApp.routes.init();
            myApp.page.bestSeller.init();
        }
    };

    myApp.routes = {
        init: function () {
            routie({
                'home': function () {
                    myApp.routes.toggle(window.location.hash);
                },
                'bestsellers': function () {
                    myApp.routes.toggle(window.location.hash);
                },
                'bestsellers-detail/:detailTitle': function () {
                    myApp.routes.toggle(window.location.hash.slice(0, 19));
                    myApp.page.bestsellerDetail.init();
                },
                '*': function () {
                    myApp.routes.toggle(window.location.hash);
                }
            });
        },
        toggle: function (route) {
            var sections = document.querySelectorAll(".togglesection");
            var i;

            for (i = 0; i < sections.length; i++) {
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

    myApp.page = {
        bestSeller: {
            init: function () {
                aja()
                    .url('http://api.nytimes.com/svc/books/v2/lists/e-book-fiction.json?&api-key=b147374c9f7b0f2b25ddf9694dc28511:4:74324460')
                    .on('success', function (data) {
                        var apiData = data;
                        console.log(apiData);
                        var directives = {
                            results: {
                                book_details: {
                                    book_image: {
                                        src: function () {
                                            return this.book_image
                                        }
                                    },
                                    author: {
                                        text: function () {
                                            return "This book is written by " + this.author;
                                        }
                                    },
                                    title: {
                                        href: function () {
                                            var titleNoSpace = this.title.replace(/\s+/g, '').toLowerCase();
                                            var detailTitle = titleNoSpace;
                                            return '#bestsellers-detail/' + detailTitle;
                                        }
                                    }

                                }
                            }
                        };

                        Transparency.render(document.querySelector('[data-route="bestsellers"]'), apiData, directives);
                    })
                    .go();
            }
        },
        bestsellerDetail: {
            init: function () {
                var detailURL = window.location.toString(),
                    split = detailURL.split("/"),
                    detailTitle = split[split.length - 1];
                console.log(detailTitle);
            }
        }
    }

    //Initialize app to run the application
    myApp.app.init();
})();