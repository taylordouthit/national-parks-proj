import { getColor } from "../map-interactivity/interactivity.js";

export const legend = L.control({ position: "bottomright" });

legend.onAdd = function (map) {
  var div = L.DomUtil.create("div", "info legend"),
    grades = [0, 1, 2, 3, 4, 5, 6, 7],
    labels = [];

  // loop through our density intervals and generate a label with a colored square for each interval
  for (var i = 0; i < grades.length; i++) {
    div.innerHTML +=
      '<i style="background:' +
      getColor(grades[i]) +
      '"></i> ' +
      grades[i] +
      (i === 0
        ? "<br>"
        : grades[i + 1]
        ? "&ndash;" + grades[i + 1] + "<br>"
        : "+");
  }

  return div;
};
