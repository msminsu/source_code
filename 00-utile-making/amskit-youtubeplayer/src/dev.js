import YoutubePlayer from "./index";

window.player1 = new YoutubePlayer({
  el: "#player1",
  videoId: "IfS6GcRxdv4",
  loop: true,
  // autoplay: true,
});


window.player2 = new YoutubePlayer({
  el: "#player2",
  videoId: "IfS6GcRxdv4",
  // loop: true,
  // autoplay: true,
});

player1.on("canplay", () => {
  console.log("ready");
});

player1.on("stop", () => {
  console.log("stop");
});

player1.on("play", () => {
  console.log("play");
});

player1.on("pause", () => {
  console.log("pause");
});

player1.on("ended", () => {
  console.log("ended");
});

player1.on("waiting", () => {
  console.log("waiting");
});

player1.on("playing", () => {
  console.log("playing");
});

