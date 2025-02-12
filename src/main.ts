import { CanvasBackground } from "./canvasBackground";
import { GLoc } from "./gloc";
import { WeatherInfo } from "./weatherInfo";

document.addEventListener("DOMContentLoaded", () => {
  const canvasBackground = new CanvasBackground();
  new GLoc(canvasBackground);
  new WeatherInfo(canvasBackground);
});
