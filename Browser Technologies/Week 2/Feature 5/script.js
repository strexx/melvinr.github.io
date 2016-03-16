var myLocation; // global variable to store lat/lng
if (navigator && navigator.geolocation) {
  // HTML5 GeoLocation
  function getLocation(position) {
    myLocation = {
      "lat": position.coords.latitude,
      "lng": position.coords.longitude
    }
    console.log("HTML5" + myLocation);
  }
  navigator.geolocation.getCurrentPosition(getLocation);
} else {
  // Google AJAX API fallback GeoLocation
  if ((typeof google == 'object') && google.loader && google.loader.ClientLocation) {
    myLocation = {
      "lat": google.loader.ClientLocation.latitude,
      "lng": google.loader.ClientLocation.longitude
    }
    console.log("Google API" + myLocation);
  }
}

