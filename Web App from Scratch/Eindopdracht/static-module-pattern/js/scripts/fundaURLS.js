var fShaker = fShaker || {};
'use strict';

fShaker.urls = (function () {

    var _brokenGpsToCity = ['http://nominatim.openstreetmap.org/reverse?format=json&lat=', '&lon='];

    function _gpsToCity(lat, lon) {
        var fullUrl = _brokenGpsToCity[0] + lat + _brokenGpsToCity[1] + lon;

        return fullUrl;

    };
    
    return {
        init: _gpsToCity
    }

}())