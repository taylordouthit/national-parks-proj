// Define a custom icon for parks
export const parkIcon = L.icon({
  iconUrl: "/src/icons/park-icon.svg", // Replace 'park-icon.png' with the path to your icon image
  iconSize: [46, 60], // Size of the icon image
  iconAnchor: [16, 32], // Point of the icon which corresponds to marker's location
  popupAnchor: [0, -32], // Point from which the popup should open relative to the iconAnchor
});
