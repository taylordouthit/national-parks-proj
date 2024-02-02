import { statesData } from "./geoJson/us-states.js";
import { localParksGeoJSON } from "./geoJson/national-parks.js";
import { parkIcon } from "./components/park-icon.js";
import { legend } from "./components/legend.js";
import { info } from "./components/info.js";
import { style, onEachFeature } from "./map-interactivity/interactivity.js";
import { config } from "../config.js";
import { fetchAllParks } from "./api.js";

// Create a map
export const map = L.map("map").setView([43, -114], 4);

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

if (config.useApi) {
  const remoteParksGeoJSON = await fetchAllParks();
  L.geoJSON(remoteParksGeoJSON, {
    pointToLayer: function (feature, latlng) {
      return L.marker(latlng).bindPopup(feature.properties.name);
    },
  }).addTo(map);
} else {
  L.geoJSON(localParksGeoJSON, {
    pointToLayer: function (feature, latlng) {
      return L.marker(latlng, { icon: parkIcon }).bindPopup(
        feature.properties.name
      );
    },
  }).addTo(map);
}
