import { Settings } from "./interfaces";
import { CanvasBackground } from "./canvasBackground";
import { apikey } from "./apikey";
import { WeatherInfo } from "./weatherInfo";

export class GLoc {
  settings: Settings;
  canvasBackground: CanvasBackground;

  constructor(canvasBackground: CanvasBackground) {
    this.canvasBackground = canvasBackground;
    this.settings = {
      geoButton: document.getElementById("geo-button")!,
      geoErrorMessage: document.getElementById("geo-error-message")!,
      startPos: null,
      searchQuery: "",
      closeButton: document.getElementById("close-error")!,
    };
    this.init();
  }

  init() {
    this.bindUIActions();
  }

  bindUIActions() {
    if (this.settings.geoButton) {
      this.settings.geoButton.addEventListener("click", () =>
        this.getGeoLocation()
      );
    }
    if (this.settings.closeButton) {
      this.settings.closeButton.addEventListener("click", () =>
        this.hideGeoErrorMessageBanner()
      );
    }
  }

  getGeoLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => this.geoSuccess(position),
      (error) => this.geoError(error)
    );
  }

  showGeoErrorMessageBanner() {
    if (this.settings.geoErrorMessage) {
      this.settings.geoErrorMessage.classList.toggle("hide");
    }
  }

  hideGeoErrorMessageBanner() {
    if (this.settings.geoErrorMessage) {
      this.settings.geoErrorMessage.classList.add("hide");
    }
  }

  async geoSuccess(position: GeolocationPosition) {
    this.hideGeoErrorMessageBanner();
    this.settings.startPos = position;
    this.settings.searchQuery = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apikey}`;

    try {
      const response = await fetch(this.settings.searchQuery);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      const weatherInfo = new WeatherInfo(this.canvasBackground);
      weatherInfo.setWeatherData(data);
      weatherInfo.handleImage(data.weather[0].icon);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      this.showGeoErrorMessageBanner();
    }
  }

  geoError(error: GeolocationPositionError) {
    setTimeout(() => this.showGeoErrorMessageBanner(), 5000);
    if (error.code === error.TIMEOUT) {
      this.showGeoErrorMessageBanner();
    }
  }
}
