import { statesData } from "./geoJson/us-states.js";
import { nationalParksData } from "./geoJson/national-parks.js";
import { parkIcon } from "./components/park-icon.js";
import { legend } from "./components/legend.js";
import { info } from "./components/info.js";

// Create a map
const map = L.map("map").setView([43, -114], 4);

// Adds roads, lakes, topography, etc.
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 8,
  minZoom: 3,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// Gives background color to states and defines the mousein/out/hover.
L.geoJson(statesData, {
  style: style, // a functioning defining the path options for styling
  onEachFeature: onEachFeature, // a funtion that will be called once for each created feature
}).addTo(map);

// Custom Info Control
info.addTo(map);

// Custom Legend Control
legend.addTo(map);

// Given national parks data, adds a marker at the latlng of each park.
L.geoJSON(nationalParksData, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, { icon: parkIcon }).bindPopup(
      feature.properties.name
    );
  },
}).addTo(map);

// Styles features
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

// Adds listeners on our state layers
function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: zoomToFeature,
  });
}

// Highlights feature
function highlightFeature(e) {
  let layer = e.target;

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

// Resets highlights on features
function resetHighlight(e) {
  let layer = e.target;

  layer.setStyle({
    weight: 2,
    opacity: 1,
    color: "white",
    dashArray: "3",
    fillOpacity: 0.7,
  });

  info.update();
}

// Zooms to feature
function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
}
