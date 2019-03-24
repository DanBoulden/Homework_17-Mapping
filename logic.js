// Create a map 
function createMap(backMap) {
  var usamap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets-basic",
    accessToken: API_KEY
  })

  var baseMaps = {
    "Map": usamap
  };

  var overlayMaps = {
    "Earthquakes": backMap
  };

  var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5,
    layers: [usamap, backMap]
});


L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(myMap);
}

function createMarkers(response) {
  
  var earthquakes = response.features;

  var earthMarkers = [];

  for (var index = 0; index < earthquakes.length; index++) {
    var earthquake = earthquakes[index];

      // Conditionals for countries points
  var color = "";
    if (earthquakes[index].properties.mag > 4.4) {
      color = "red";
      fillO = 1.0;
      radiusV = earthquakes[index].properties.mag * 10000;
    }
    else if (earthquakes[index].properties.mag > 2.4) {
      color = "orange";
      fillO = 0.8;
      radiusV = earthquakes[index].properties.mag * 5000;
    }
    else if (earthquakes[index].properties.mag> 1) {
      color = "blue";
      fillO = 0.5;
      radiusV = earthquakes[index].properties.mag * 3000;
    }
    else {
      color = "green";
      fillO = 0.4;
      radiusV = earthquakes[index].properties.mag * 2000;
    }

    var earthMarker = L.circle([earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[0]],{
      fillColor: color,
      fillOpacity: fillO,
      stroke: 0.0,
      radius: radiusV
    })
      .bindPopup("<h3>" + earthquake.properties.place + "<h3><h3>Magnitude: " + earthquake.properties.mag + "<h3>");
      earthMarkers.push(earthMarker);
    }
    createMap(L.layerGroup(earthMarkers));
}


// Perform an API call to get earthquake information then run function
// d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson", createMarkers);
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", createMarkers);

