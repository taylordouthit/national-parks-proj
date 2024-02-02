import { statesData } from "./us-states.js";
import { nationalParks } from "./nps-data.js";
import { parkIcon } from "./components/park-icon.js";
import { legend } from "./components/legend.js";

// Map: used to create a map on a page and manipulate it.
const map = L.map("map").setView([43, -114], 4);

// OpenStreetMap: https://www.openstreetmap.org/about
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 8,
  minZoom: 3,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// Adding Some Color
export function getColor(d) {
  return d > 1000
    ? "#800026"
    : d > 500
    ? "#BD0026"
    : d > 200
    ? "#E31A1C"
    : d > 100
    ? "#FC4E2A"
    : d > 50
    ? "#FD8D3C"
    : d > 20
    ? "#FEB24C"
    : d > 10
    ? "#FED976"
    : "#FFEDA0";
}

function style(feature) {
  return {
    fillColor: getColor(feature.properties.density),
    weight: 2,
    opacity: 1,
    color: "white",
    dashArray: "3",
    fillOpacity: 0.7,
  };
}

let geojson = L.geoJson(statesData, { style }).addTo(map);

// Adding Interaction
function highlightFeature(e) {
  // access to the layer that was hovered through e.target
  var layer = e.target;

  layer.setStyle({
    weight: 5,
    color: "#666",
    dashArray: "",
    fillOpacity: 0.7,
  });

  layer.bringToFront();

  // updates our control when state is hovered
  info.update(layer.feature.properties);
}

// On mouseout
function resetHighlight(e) {
  geojson.resetStyle(e.target);

  info.update();
}

// zooms to the state
function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
}

// Adds listeners on our state layers
function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: zoomToFeature,
  });
}

geojson = L.geoJson(statesData, {
  style: style,
  onEachFeature: onEachFeature,
}).addTo(map);

// Custom Info Control
var info = L.control();

info.onAdd = function (map) {
  this._div = L.DomUtil.create("div", "info"); // create a div with a class "info"
  this.update();
  return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
  this._div.innerHTML =
    "<h4>US Population Density</h4>" +
    (props
      ? "<b>" +
        props.name +
        "</b><br />" +
        props.density +
        " people / mi<sup>2</sup>"
      : "Hover over a state");
};

info.addTo(map);

// Custom Legend Control
legend.addTo(map);

// Create a GeoJSON layer with custom icons
L.geoJSON(nationalParks, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, { icon: parkIcon }).bindPopup(
      feature.properties.name
    );
  },
}).addTo(map);
