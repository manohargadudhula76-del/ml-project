const BACKEND_URL = "https://ml-project-c8ov.onrender.com";

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
  var sqft = document.getElementById("uiSqft");
  var bhk = getBHKValue();
  var bathrooms = getBathValue();
  var location = document.getElementById("uiLocations");
  var estPrice = document.getElementById("uiEstimatedPrice");

  if (!location.value) {
    estPrice.innerHTML = "<h2>Select location</h2>";
    return;
  }

  var url = BACKEND_URL + "/predict_home_price";

  estPrice.innerHTML = "<h2>Calculating...</h2>";

  $.post(url, {
    total_sqft: parseFloat(sqft.value),
    bhk: bhk,
    bath: bathrooms,
    location: location.value
  }, function(data) {
    estPrice.innerHTML = "<h2>₹ " + data.estimated_price + " Lakh</h2>";
  }).fail(function(error) {
    console.log(error);
    estPrice.innerHTML = "<h2>Server Error</h2>";
  });
}

function onPageLoad() {
  console.log("Document Loaded");

  var url = BACKEND_URL + "/get_location_names";

  $.get(url, function(data) {
    console.log("Locations loaded:", data);

    var uiLocations = $("#uiLocations");
    uiLocations.empty();

    uiLocations.append(
      $("<option></option>")
        .attr("value", "")
        .attr("disabled", true)
        .attr("selected", true)
        .text("Choose a Location")
    );

    if (data && data.locations) {
      for (var i = 0; i < data.locations.length; i++) {
        uiLocations.append(
          $("<option></option>")
            .attr("value", data.locations[i])
            .text(data.locations[i])
        );
      }
    }
  }).fail(function(error) {
    console.log("Location loading failed:", error);
    $("#uiLocations").html("<option>Locations failed to load</option>");
  });
}

window.onload = onPageLoad;