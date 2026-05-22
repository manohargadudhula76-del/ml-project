function getBathValue() {
  var uiBathrooms = document.getElementsByName("uiBathrooms");

  for (var i = 0; i < uiBathrooms.length; i++) {
    if (uiBathrooms[i].checked) {
      return parseInt(uiBathrooms[i].value);
    }
  }

  return -1;
}

function getBHKValue() {
  var uiBHK = document.getElementsByName("uiBHK");

  for (var i = 0; i < uiBHK.length; i++) {
    if (uiBHK[i].checked) {
      return parseInt(uiBHK[i].value);
    }
  }

  return -1;
}

function onClickedEstimatePrice() {

  console.log("Estimate Price Button Clicked");

  var sqft = document.getElementById("uiSqft");
  var bhk = getBHKValue();
  var bathrooms = getBathValue();
  var location = document.getElementById("uiLocations");
  var estPrice = document.getElementById("uiEstimatedPrice");

  /* RENDER BACKEND URL */

  var url = "https://ml-project-c8ov.onrender.com/predict_home_price";

  estPrice.innerHTML = "<h2>Calculating...</h2>";

  $.post(url, {
      total_sqft: parseFloat(sqft.value),
      bhk: bhk,
      bath: bathrooms,
      location: location.value
  },

  function(data, status) {

      console.log(data);

      estPrice.innerHTML =
      "<h2>₹ " + data.estimated_price.toString() + " Lakh</h2>";
  })

  .fail(function(error) {

      console.log(error);

      estPrice.innerHTML =
      "<h2>Server Error</h2>";
  });
}

function onPageLoad() {

  console.log("Document Loaded");

  /* RENDER BACKEND URL */

  var url = "https://ml-project-c8ov.onrender.com/get_location_names";

  $.get(url, function(data, status) {

      console.log("Got response for get_location_names request");

      if (data) {

          var locations = data.locations;

          var uiLocations =
          document.getElementById("uiLocations");

          $("#uiLocations").empty();

          for (var i in locations) {

              var opt = new Option(locations[i]);

              $("#uiLocations").append(opt);
          }
      }
  });
}

window.onload = onPageLoad;