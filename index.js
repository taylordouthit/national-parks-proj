import { statesData } from "./geoJson/us-states.js";
import { nationalParksData } from "./geoJson/national-parks.js";
import { parkIcon } from "./components/park-icon.js";
import { legend } from "./components/legend.js";
import { info } from "./components/info.js";
import { style, onEachFeature } from "./map-interactivity/interactivity.js";

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
  style: style,
  onEachFeature: onEachFeature,
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
