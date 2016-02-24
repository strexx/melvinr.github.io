var fShaker = fShaker || {};
'use strict';

fShaker.page = (function () {
    //private
    var _home = document.querySelector('[data-route="home"]'),
        _myHouse = document.querySelector('[data-route="myhouse"]'),
        myButton = document.getElementById('mybutton'),
        _directives = {
            FotoLargest: {
                src: function () {
                    return this.FotoLargest;
                }
            },
            Prijs: {
                Koopprijs: {
                    text: function () {
                        return '€' + this.Koopprijs;
                    }
                }
            }
        },
        retrievedObject = localStorage.getItem('houses'),
        houseObjects = JSON.parse(retrievedObject);


    function getRandomObject() {
        function myFunction() {
            return Math.floor(Math.random() * 24 + 1);
        }

        var me = myFunction();
        var myHouseObject = houseObjects[me];

        Transparency.render(_home, myHouseObject, _directives);
    }




    function initHome(_data) {
        myButton.addEventListener('click', function () {
            getRandomObject();
        })

    }

    function initHouse(_data) {
        Transparency.render(_myHouse, myHouseObject);
    }

    //public
    return {
        initHome: {
            init: initHome
        },
        //House detail page
        initHouse: {
            init: initHouse
        },
        getRandomObject: {
            init: getRandomObject
        }
    }
})();