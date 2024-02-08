import { statesData } from "./geoJson/us-states.js";
import { localParksGeoJSON } from "./geoJson/national-parks.js";
import { parkIcon } from "./components/park-icon.js";
import { legend } from "./components/legend.js";
import { info } from "./components/info.js";
import { style, onEachFeature } from "./map-interactivity/interactivity.js";
import { config } from "../config.js";
import { fetchAllParks } from "./api.js";

// Temporary Store
export let checkedCount = 0;

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

// Array to keep track of checkbox states
var checkboxStates = {};

// Fetch it or use local data
const nationalParksGeoJSON = config.useApi
  ? await fetchAllParks()
  : localParksGeoJSON;

// Add markers
L.geoJSON(nationalParksGeoJSON, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng)
      .bindPopup(
        `<input type="checkbox" id=${feature.properties.name} class="park-checkbox" data-name="${feature.properties.name}"> <label for=${feature.properties.name} /> ${feature.properties.name}`
      )
      .on("popupopen", function () {
        var checkbox = document.querySelector(
          `input[data-name="${feature.properties.name}"]`
        );
        checkbox.checked = checkboxStates[feature.properties.name] || false; // Restore checkbox state
        checkbox.addEventListener("change", function () {
          checkboxStates[feature.properties.name] = this.checked;
          updateCheckedCount();
          info.update();
        });
      });
  },
}).addTo(map);

// Function to update count of checked checkboxes
const updateCheckedCount = () => {
  checkedCount = Object.values(checkboxStates).filter(Boolean).length;
  console.log("Checked parks count:", checkedCount);
};
