var fShaker = fShaker || {};
'use strict';

fShaker.api = (function () {

    var getLocation = function () {

        var _dataType = 'json',
            _apiKey = 'e2d60e885b8742d4b0648300e3703bd7',
            _searchQuery,
            _pageNumber = 1,
            _pageSize = 25;

        var _city;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                displayPosition,
                displayError, {
                    enableHighAccuracy: true,
                    maximumAge: 0
                }
            );
        }

        function displayPosition(position) {
            var _gpsToCity = ['http://nominatim.openstreetmap.org/reverse?format=json&lat=', '&lon='],
                lat = position.coords.latitude,
                lon = position.coords.longitude,
                _zoom = '&zoom=13&addressdetails=1',
                fullCityUrl = _gpsToCity[0] + lat + _gpsToCity[1] + lon + _zoom;



            aja()
                .url(fullCityUrl)
                .on('success', (data) => {
                    city = data.address.city
                    localStorage.setItem('location', city)
                    alert(city)
                    apiRequest()
                })
                .on('error', () => {
                    alert('Location request failed')
                })
                .go();
        }

        function displayError() {
            console.log('an error has occured');
        }

        function apiRequest() {
            _searchQuery = localStorage.getItem('location');
            
            var _objectData = ['http://funda.kyrandia.nl/feeds/Aanbod.svc/', '/', '/?type=koop&zo=/', '/&page=', '&pagesize='],
                _fullAPIUrl = _objectData[0] + _dataType + _objectData[1] + _apiKey + _objectData[2] + _searchQuery + _objectData[3] + _pageNumber + _objectData[4] + _pageSize;

            
            aja()
                .url(_fullAPIUrl)
                .on('success', (data) => {
                
                    var _data = data.Objects;
                    localStorage.setItem('houses', JSON.stringify(_data))
                    
                    fShaker.ux.loader(false);
                    fShaker.routes.init()
                })
                .on('error', () => {
                    alert('Data request failed')
                    fShaker.ux.loader(false);
                })
                .go();
        }
    }
    return {
        getLocation: getLocation
    }
})();