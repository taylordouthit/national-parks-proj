import { checkedCount } from "../index.js";

export const info = L.control();

info.onAdd = function (map) {
  this._div = L.DomUtil.create("div", "info"); // create a div with a class "info"
  this.update();
  return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
  this._div.innerHTML =
    `<h4>National Parks Completed</h4>` +
    (props
      ? `<b> ${props.name} </b> <br/>
         ${checkedCount} / ${props.nationalParksCount} Park(s)`
      : `${checkedCount} / 63`);
};
