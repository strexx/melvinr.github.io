var NYT = NYT || {};
'use strict';

NYT.api = (function () {
    var _loadie = document.getElementById('loader');
    var _genre = 'e-book-fiction';
    var _dataType = '.json';
    var _apiKey = 'b147374c9f7b0f2b25ddf9694dc28511:4:74324460';
    
    
    function apiRequest () {
            aja()
                .url('http://api.nytimes.com/svc/books/v2/lists/'+ _genre + _dataType + '?&api-key=' + _apiKey)
                .on('success', (data) => {
                    _loadie.classList.add('inactive');
                    //map the data from the array and add a uniqueid to every result's book_details to be able to get and display the right data with the right title
                    var newdata = _.map(data.results, function(data, iteratee) {
                        data.book_details[0].id = _.uniqueId('book_');

                        return data;
                    });


                    NYT.routes.init(data);

                })
                .on('error', function () {
                    alert('Data request failed')
                })
                .go();
        }

    return {
        init: apiRequest
    }
})();