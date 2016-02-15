var myApp = myApp || {};

//Thanks to Matthias Dolstra and Senny Kalidien for helping and working with me on this project

//IIFE, this is a self invoking function
(function () {
    "use strict";

    //Object literal declarations
    myApp.app = {
        //init is a method
        init: function () {
            myApp.api.init();
        }
    };

    myApp.api = {
        init: function () {
            aja()
                .url('http://api.nytimes.com/svc/books/v2/lists/e-book-fiction.json?&api-key=b147374c9f7b0f2b25ddf9694dc28511:4:74324460')
                .on('success', function (data) {
                console.log(data);
                    //map the data from the array and add a uniqueid to every result's book_details to be able to get and display the right data with the right title
                    var newdata = _.map(data.results, function (data, iteratee) {
                        data.book_details[0].id = _.uniqueId('book_');

                        return data;
                    });

                    document.getElementById('loader').classList.add('inactive');
                    myApp.routes.init(data);

                })
                .go();
        }
    }

    myApp.routes = {
        init: function (data) {
            if (location.hash === undefined || location.hash === '') {
                location.hash = '#bestsellers';
            }
            
            routie({
                'bestsellers': function () {
                    myApp.routes.toggle(window.location.hash);
                    myApp.page.bestSeller.init(data);
                },
                'bestsellersdetail/:id': function (id) {
                    //slice is to delete bestsellersdetail/ from the hash, so the queryselector will work
                    myApp.routes.toggle(window.location.hash.slice(0, 18));
                    myApp.page.bestsellerDetail.init(data, id);
                    //                    myApp.page.bestsellerDetail.init();
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
            init: function (data) {
                //define directives to bind data to the HTML
                var directives = {
                    results: {
                        book_details: {
                            book_image: {
                                src: function () {
                                    return this.book_image;
                                }
                            },
                            author: {
                                text: function () {
                                    return "This book is written by " + this.author;
                                }
                            },
                            id: {
                                text: function () {
                                    return this.title;
                                },
                                href: function () {
                                    //pass the correct hashlink to to the href, so the detailpages have the correct links
                                    return "#bestsellersdetail/" + this.id;
                                    console.log(data.results[0].book_details[0])
                                }
                            }
                        },
                    }
                };
                //Bind and render the data to the right HTML section
                Transparency.render(document.querySelector('[data-route="bestsellers"]'), data, directives);
            }
        },
        //Book detail page
        bestsellerDetail: {
            init: function (data, id) {
                
                data.results.forEach(function (currentValue, index) {
                    //For each result in the JSON, check if the id matches the current id in the hash, if this is the case, get the right data and bind these to the correct section and HTML elements
                    if (currentValue.book_details[0].id === id) {
                        var directives = {
                            results: {
                                book_details: {
                                    description: {
                                        src: function () {
                                            return this.description;
                                        }
                                    },
                                    title: {
                                        text: function () {
                                            return this.title;
                                        }
                                    }
                                }
                            }
                        };
                        Transparency.render(document.querySelector('[data-route="bestsellersdetail"]'), currentValue, directives);
                    }
                })

            }
        }
    }

    //Initialize app to run the application
    myApp.app.init();
})();