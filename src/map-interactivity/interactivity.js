import { info } from "../components/info.js";
import { map } from "../index.js";

// Styles features
export function style(feature) {
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
