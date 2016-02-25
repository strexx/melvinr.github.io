var fShaker = fShaker || {};
'use strict';

fShaker.page = (function () {
    //private
    var _home = document.querySelector('[data-route="home"]'),
        _myHouse = document.querySelector('[data-route="myhouse"]'),
        myButton = document.getElementById('mybutton'),
        detailLink = document.getElementById('detail-link'),
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
                },
            },
            AantalKamers: {
                text: function () {
                    return 'Aantal kamers: ' + this.AantalKamers;
                }
            },
            HoofdFotoSecure: {
                src: function () {
                    return this.HoofdFotoSecure;
                }
            },
        },
        retrievedObject = localStorage.getItem('houses'),
        houseObjects = JSON.parse(retrievedObject);


    function getRandomObject() {
        function myFunction() {
            return Math.floor(Math.random() * 24 + 1);
        }
        var me = myFunction();
        var myHouseObject = houseObjects[me];
        console.log(myHouseObject);

        localStorage.setItem('homeaddress', myHouseObject.Adres);
        localStorage.setItem('uniqueid', myHouseObject.GroupByObjectType)

        Transparency.render(_home, myHouseObject, _directives);
    }


    function initHome() {
        myButton.addEventListener('click', function () {
            getRandomObject();
        })
        detailLink.addEventListener('click', function () {
            fShaker.api.objectDetail();
        })
        fShaker.ux.shake();
    }

    function initHouse() {
        console.log("dit is je detailpaginaswa");
        var detailHouseData = localStorage.getItem('myhouse'),
            detailHouse = JSON.parse(detailHouseData);
        var addressData = localStorage.getItem('homeaddress');
        document.getElementById('adresje').innerHTML = addressData;
        Transparency.render(_myHouse, detailHouse, _directives)
            //        Transparency.render(_myHouse, myHouseObject);
    }

    //public
    return {
        initHome: initHome,
        //House detail page
        initHouse: initHouse,
        getRandomObject: getRandomObject
    }
})();