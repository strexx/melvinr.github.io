var fShaker = fShaker || {};
'use strict';

fShaker.page = (function () {
    //private
    var _home = document.querySelector('[data-route="home"]'),
        _myHouse = document.querySelector('[data-route="myhouse"]'),
        shakeBtn = document.getElementById('shakeBtn'),
        _detailLink = document.getElementById('detail-link'),
        _directives = {
            FotoLargest: {
                src: function () {
                    return this.FotoLargest;
                }
            },
            Prijs: {
                Koopprijs: {
                    text: function () {
                        return 'Koopprijs: €' + this.Koopprijs;
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
            moreinfo: {
                text: function () {
                    return 'Meer informatie? Klik op de foto!'
                }
            },
            Ligging: {
                text: function() {
                    return 'Gelegen ' + this.Ligging;
                }
            },
            Bouwjaar: {
                text: function() {
                    return 'Bouwjaar: ' + this.Bouwjaar;
                }
            }
        },
        retrievedObject = localStorage.getItem('houses'),
        houseObjects = JSON.parse(retrievedObject),
        _detailHouseData = localStorage.getItem('myhouse'),
        _detailHouse = JSON.parse(_detailHouseData),
        _addressData = localStorage.getItem('homeaddress'),
        _objAddress = document.getElementById('obj-address');


    //Function to get a random object its data and add the necessary things to localstorage. Then renders the 'home' page with the right data
    function getRandomObject() {
        function myFunction() {
            return Math.floor(Math.random() * 24 + 1);
        }
        var me = myFunction();
        var myHouseObject = houseObjects[me];

        localStorage.setItem('homeaddress', myHouseObject.Adres);
        localStorage.setItem('uniqueid', myHouseObject.GroupByObjectType)

        _detailLink.classList.remove('inactive');

        Transparency.render(_home, myHouseObject, _directives);
    }


    //Call the function above when the shake button is clicked. Perform objectDetail api request when image is clicked. Also execute the shake event.
    function initHome() {
        shakeBtn.addEventListener('click', function () {
            getRandomObject();
        })
        _detailLink.addEventListener('click', function () {
            fShaker.api.objectDetail();
        })
        fShaker.ux.shake();
    }

    //Change the html of the detail page's h1 to the correct one, also render 'myhouse' template with the right data.
    function initHouse() {
        _objAddress.innerHTML = _addressData;
        
        Transparency.render(_myHouse, _detailHouse, _directives)
    }

    //public
    return {
        getObject: getRandomObject,
        initHome: initHome,
        //House detail page
        initHouse: initHouse
    }
})();