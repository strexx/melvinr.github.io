var NYT = NYT || {};

//Thanks to Matthias Dolstra and Senny Kalidien for helping and working with me on this project

//IIFE, this is a self invoking function
(function () {
    'use strict';

    //Object literal declarations
    NYT.launcher = {
        //init is a method
        init: function () {
            NYT.api.init();
            NYT.ux.gestures();
        }
    };

    NYT.api = {
        init: function () {
            aja()
                .url('http://api.nytimes.com/svc/books/v2/lists/e-book-fiction.json?&api-key=b147374c9f7b0f2b25ddf9694dc28511:4:74324460')
                .on('success', function (data) {
                    var loadie = document.getElementById('loader');

                    //map the data from the array and add a uniqueid to every result's book_details to be able to get and display the right data with the right title
                    var newdata = _.map(data.results, function (data, iteratee) {
                        data.book_details[0].id = _.uniqueId('book_');

                        return data;
                    });

                    loadie.classList.add('inactive');

                    NYT.routes.init(data);

                })
                .on('error', function () {
                    alert('Data request failed')
                })
                .go();
        }
    }

    NYT.ux = {
        gestures: function () {
            var myElement = document.querySelector('body');
            var mc = new Hammer(myElement);

            mc.on('swiperight', function (ev) {
                window.history.back();
            });


        }
    }

    NYT.routes = {
        init: function (data) {
            if (location.hash === undefined || location.hash === '') {
                location.hash = '#bestsellers';
            }

            routie({
                'bestsellers': function () {
                    NYT.routes.toggle(window.location.hash);
                    NYT.page.overviewList.init(data);
                },
                'bestsellersdetail/:id': function (id) {
                    //slice is to delete bestsellersdetail/ from the hash, so the queryselector will work
                    NYT.routes.toggle(window.location.hash.slice(0, 18));
                    NYT.page.bestsellerDetail.init(data, id);
                },
                '*': function () {
                    NYT.routes.toggle(window.location.hash);
                }
            });
        },
        toggle: function (route) {
            var sections = document.querySelectorAll('.togglesection');
            var i;

            for (i = 0; i < sections.length; i++) {
                sections[i].classList.add('inactive');

                //If there is no hash, make every section visible, in case JS is disabled.
                if (!route) {
                    sections[0].classList.remove('inactive');
                } else {

                    //make the right section, according to its hash, visible
                    document.querySelector(route).classList.remove('inactive');
                }
            }
        }
    };

    NYT.page = {
        overviewList: {
            init: function (data) {
                //define directives to bind data to the HTML
                var overview = document.querySelector('[data-route="bestsellers"]');
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
                                    return 'This book is written by ' + this.author;
                                }
                            },
                            id: {
                                text: function () {
                                    return this.title;
                                },
                                href: function () {
                                    //pass the correct hashlink to to the href, so the detailpages have the correct links
                                    return '#bestsellersdetail/' + this.id;
                                    console.log(data.results[0].book_details[0])
                                }
                            }
                        },
                    }
                };
                //Bind and render the data to the right HTML section
                Transparency.render(overview, data, directives);
            }
        },
        //Book detail page
        bestsellerDetail: {
            init: function (data, id) {
                var detailPage = document.querySelector('[data-route="bestsellersdetail"]');

                //For each result in the JSON, check if the id matches the current id in the hash, if this is the case, get the right data and bind these to the correct section and HTML elements

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
                var dataDetail = _.filter(data.results, function (data) {
                    return data.book_details[0].id === id;
                });
                
                Transparency.render(detailPage, dataDetail, directives);

            }
        }
    }

    //Initialize app to run the application
    NYT.launcher.init();
})();