var fShaker = fShaker || {};
'use strict';

fShaker.api = (function () {
    var inputField = document.getElementById('search');
    var inputButton = document.getElementById('submit-btn');
    var locationButton = document.getElementById('location-btn');
    var city;

    //check if the browser supports html geolocation,
    //if it does, show the button with which they can get their location
    function geoCheck() {
        if (navigator.geolocation) {
            locationButton.classList.remove('inactive');
            
        }
    }
    
    //Get the input when input has been used for searching
    inputButton.addEventListener('click', function () {
        fShaker.api.getInput();
    });
    
    function getInput() {
        city = inputField.value;
        console.log(city);
        localStorage.setItem('location', city)
        fShaker.api.getData();
    };

    
    locationButton.addEventListener('click', function () {
        fShaker.api.getLocation();
    })

    var _dataType = 'json',
        _apiKey = 'e2d60e885b8742d4b0648300e3703bd7',
        _pageNumber = 1,
        _pageSize = 25;
    
    //Get latitude and longitude and through OSM api request get the name of the city
    //will only be available if browser supports geolocation
    function getLocation() {
            navigator.geolocation.getCurrentPosition(
                displayPosition,
                displayError, {
                    enableHighAccuracy: true,
                    maximumAge: 0
                }
            );

        function displayPosition(position) {
            var _gpsToCity = ['http://nominatim.openstreetmap.org/reverse?format=json&lat=', '&lon='],
                lat = position.coords.latitude,
                lon = position.coords.longitude,
                _zoom = '&zoom=13&addressdetails=1',
                fullCityUrl = _gpsToCity[0] + lat + _gpsToCity[1] + lon + _zoom;

            aja()
                .url(fullCityUrl)
                .on('success', (data) => {
                    city = data.address.city || data.address.town;

                    localStorage.setItem('location', city)
                    inputField.value = city;
                    //execute api request to get objects from current city
                    fShaker.api.getData()
                })
                .on('error', () => {
                    alert('Location request failed')
                })
                .go();
        }

        function displayError() {
            console.log('an error has occured');
            alert('Je browser ondersteunt geen geolocatie, voer handmatig je stad in.')


        }

    }

    //Request to Funda Object api to get objects from current city

    function apiRequest() {
        var _searchQuery = localStorage.getItem('location');
        
        var _objectData = ['http://funda.kyrandia.nl/feeds/Aanbod.svc/', '/', '/?type=koop&zo=/', '/&page=', '&pagesize='],
        _fullAPIUrl = _objectData[0] + _dataType + _objectData[1] + _apiKey + _objectData[2] + _searchQuery + _objectData[3] + _pageNumber + _objectData[4] + _pageSize;
        
        aja()
            .url(_fullAPIUrl)
            .on('success', (data) => {

                var _data = data.Objects;
                console.log(_data);
                localStorage.setItem('houses', JSON.stringify(_data))
                console.log(_fullAPIUrl)
                    //Execute routes to check for current hash
                fShaker.page.getObject();
                fShaker.routes.init()
                
            })
            .on('error', () => {
                alert('Data request failed')
            })
            .go();
    }


    //Request to object detail api to get more detailed information about an object(house)
    var _objectGUID = localStorage.getItem('uniqueid'),
        _detailData = ['http://funda.kyrandia.nl/feeds/Aanbod.svc/', '/', 'detail/', '/koop/'],
        _fullDetailUrl = _detailData[0] + _dataType + _detailData[1] + _detailData[2] + _apiKey + _detailData[3] + _objectGUID;

    function objectDetail() {
        aja()
            .url(_fullDetailUrl)
            .on('success', (data) => {

                var _data = data;
                localStorage.setItem('myhouse', JSON.stringify(_data))

            })
            .on('error', () => {
                alert('Data request failed')
            })
            .go();
    }
    return {
        getInput: getInput,
        getLocation: getLocation,
        getData: apiRequest,
        objectDetail: objectDetail,
        geoCheck: geoCheck
    }
})();