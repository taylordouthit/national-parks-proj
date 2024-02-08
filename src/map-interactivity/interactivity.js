import { info } from "../components/info.js";
import { map } from "../index.js";

// Styles features
export function style(feature) {
  return {
    fillColor: getColor(feature.properties.nationalParksCount),
    weight: 2,
    opacity: 1,
    color: "white",
    dashArray: "3",
    fillOpacity: 0.7,
  };
}

// Adding Some Color
export function getColor(d) {
  return d > 8
    ? "#F9EFDB"
    : d > 7
    ? "#EBD9B4"
    : d > 6
    ? "#9DBC98"
    : d > 5
    ? "#638889"
    : d > 4
    ? "#C3E2C2"
    : d > 3
    ? "#EAECCC"
    : d > 2
    ? "#DBCC95"
    : d > 1
    ? "#CD8D7A"
    : d > 0
    ? "#AFC8AD"
    : "#EEE7DA";
}

// Adds listeners on our state layers
export function onEachFeature(feature, layer) {
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
