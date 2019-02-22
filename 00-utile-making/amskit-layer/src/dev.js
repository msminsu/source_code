import Layer from "./index";

window.layer1 = new Layer({
  modifier: "movie",
  esc: false,
});

window.layer2 = new Layer({
  modifier: "message",
  // esc: false,
});

$(document).on("click", ".open", (e) => {
  layer1.open(document.querySelector(".layer-con1").innerHTML);
});

$(document).on("click", ".close", (e) => {
  layer1.close();
});

$(document).on("click", ".open2", (e) => {
  layer2.open(document.querySelector(".layer-con2").innerHTML);
});

layer1.on("layeropenstart", () => {
  console.log("layeropenstart");
});
layer1.on("layeropenend", () => {
  console.log("layeropenend");
});
layer1.on("layerclosestart", () => {
  console.log("layerclosestart");
});
layer1.on("layercloseend", () => {
  console.log("layercloseend");
});
