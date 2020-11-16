var findMeButton = $(".find-me");

// Check if the browser has support for the Geolocation API
if (!navigator.geolocation) {
  findMeButton.addClass("disabled");
  $(".no-browser-support").addClass("visible");
} else {
  findMeButton.on("click", function (e) {
    e.preventDefault();

    navigator.geolocation.getCurrentPosition(function (position) {
      // Get the coordinates of the current possition.
      var lat = position.coords.latitude;
      console.log(lat);

      var lng = position.coords.longitude;
      console.log(lng);

      let info = document.querySelector(".info");
      info.innerHTML = `${getDistanceFromLatLonInKm(
        lat,
        lng,
        document.querySelector("#latitude").value,
        document.querySelector("#longitude").value
      ).toFixed(2)} км`; //расстояние между точками 980 м

      $(".latitude").text(lat.toFixed(4));
      $(".longitude").text(lng.toFixed(4));
      $(".coordinates").addClass("visible");

      // Create a new map and place a marker at the device location.
      var map = new GMaps({
        el: "#map",
        lat: lat,
        lng: lng,
      });

      map.addMarker({
        lat: lat,
        lng: lng,
      });
    });
  });
}

// считаем расстояние в километрах
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
