var NYT = NYT || {};
'use strict';

NYT.page = (function () {
    //private
    var overview = document.querySelector('[data-route="bestsellers"]'),
        detailPage = document.querySelector('[data-route="bestsellersdetail"]'),
        directives = {
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
                    },
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

    //still private
    function initOverview(data) {
        Transparency.render(overview, data, directives);
    }

    function initDetail(data, id) {
        //Filter the id's from the data and check if id matches the current id in the url's hash
        var dataDetail = _.filter(data.results, function (data) {
            return data.book_details[0].id === id;
        });

        Transparency.render(detailPage, dataDetail, directives);
    }

//public
    return {
        overviewList: {
            init: initOverview
        },
        //Book detail page
        bestsellerDetail: {
            init: initDetail
        }
}
})();