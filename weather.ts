const apikey = process.env.OPEN_WEATHER_API_KEY;

enum TempUnit {
  Celsius = "celsius",
  Fahrenheit = "fahrenheit",
}

enum WeatherCondition {
  Thunderstorm = "Thunderstorm",
  Drizzle = "Drizzle",
  Rain = "Rain",
  Snow = "Snow",
  Atmosphere = "Atmosphere",
  Clouds = "Clouds",
  Clear = "Clear",
  Extreme = "Extreme",
  Default = "default-weather",
}

interface Settings {
  geoButton: HTMLElement;
  geoErrorMessage: HTMLElement;
  startPos: GeolocationPosition | null;
  searchQuery: string;
  closeButton: HTMLElement;
}

class GLoc {
  settings: Settings;

  constructor() {
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
    this.settings.geoButton.addEventListener("click", () =>
      this.getGeoLocation()
    );
    this.settings.closeButton.addEventListener("click", () =>
      this.hideGeoErrorMessageBanner()
    );
  }

  getGeoLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => this.geoSuccess(position),
      (error) => this.geoError(error)
    );
  }

  showGeoErrorMessageBanner() {
    this.settings.geoErrorMessage.classList.toggle("hide");
  }

  hideGeoErrorMessageBanner() {
    this.settings.geoErrorMessage.classList.add("hide");
  }

  async geoSuccess(position: GeolocationPosition) {
    this.hideGeoErrorMessageBanner();
    this.settings.startPos = position;
    this.settings.searchQuery = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apikey}`;

    try {
      const response = await fetch(this.settings.searchQuery);
      const data = await response.json();
      const weatherInfo = new WeatherInfo();
      weatherInfo.setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }

  geoError(error: GeolocationPositionError) {
    setTimeout(() => this.showGeoErrorMessageBanner(), 5000);
    if (error.code === error.TIMEOUT) {
      this.showGeoErrorMessageBanner();
    }
  }
}

interface WeatherSettings {
  tempIcon: HTMLElement;
  weather: HTMLElement;
  weatherInfo: HTMLElement;
  location: HTMLElement;
  weatherDescription: HTMLElement;
  temperature: HTMLElement;
  tempNumber: number;
  fahrenheit: HTMLElement;
  celsius: HTMLElement;
  wind: HTMLElement;
  searchLocationInput: HTMLInputElement;
  searchLocationButton: HTMLElement;
  celsiusButton: HTMLElement;
  fahrenheitButton: HTMLElement;
  humidity: HTMLElement;
  speedUnit: HTMLElement;
  windSpeed: number;
  windDirection: HTMLElement;
  windDegree: number;
  dayOrNight: string;
  closeAttribution: HTMLElement;
  openAttribution: HTMLElement;
  attributionModal: HTMLElement;
  searchQuery: string;
}

class WeatherInfo {
  settings: WeatherSettings;

  constructor() {
    this.settings = {
      tempIcon: document.getElementById("temp-icon")!,
      weather: document.getElementById("weather")!,
      weatherInfo: document.getElementById("weather-info")!,
      location: document.getElementById("location")!,
      weatherDescription: document.getElementById("weather-description")!,
      temperature: document.getElementById("temperature")!,
      tempNumber: 0,
      fahrenheit: document.getElementById("fahrenheit")!,
      celsius: document.getElementById("celsius")!,
      wind: document.getElementById("wind")!,
      searchLocationInput: document.getElementById(
        "search-location-input"
      ) as HTMLInputElement,
      searchLocationButton: document.getElementById("search-location-button")!,
      celsiusButton: document.getElementById("celsius")!,
      fahrenheitButton: document.getElementById("fahrenheit")!,
      humidity: document.getElementById("humidity")!,
      speedUnit: document.getElementById("speed-unit")!,
      windSpeed: 0,
      windDirection: document.getElementById("wind-direction")!,
      windDegree: 0,
      dayOrNight: "",
      closeAttribution: document.getElementById("close-attribution")!,
      openAttribution: document.getElementById("noun-project")!,
      attributionModal: document.getElementById("attribution-links")!,
      searchQuery: "",
    };
    this.init();
  }

  init() {
    this.bindUIActions();
    this.settings.searchLocationInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.settings.searchLocationButton.click();
      }
    });
  }

  bindUIActions() {
    this.settings.searchLocationButton.addEventListener("click", () =>
      this.getWeatherData()
    );
    this.settings.celsiusButton.addEventListener("click", () =>
      this.changeTempUnit(TempUnit.Celsius)
    );
    this.settings.fahrenheitButton.addEventListener("click", () =>
      this.changeTempUnit(TempUnit.Fahrenheit)
    );
    this.settings.closeAttribution.addEventListener("click", () =>
      this.closeAttributionModal()
    );
    this.settings.openAttribution.addEventListener("click", () =>
      this.openAttributionModal()
    );
  }

  closeAttributionModal() {
    this.settings.attributionModal.classList.add("hide");
  }

  openAttributionModal() {
    this.settings.attributionModal.classList.remove("hide");
  }

  async getWeatherData() {
    if (this.settings.searchLocationInput.value !== "") {
      this.settings.searchQuery = `https://api.openweathermap.org/data/2.5/weather?q=${this.settings.searchLocationInput.value}&appid=${apikey}`;
      try {
        const response = await fetch(this.settings.searchQuery);
        const data = await response.json();
        this.setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    }
  }

  setWeatherData(data: any) {
    GLoc.prototype.hideGeoErrorMessageBanner();
    document.getElementById("front-page-description")!.classList.add("hide");
    this.settings.weather.classList.remove("hide");
    this.settings.location.textContent = `${data.name}, ${data.sys.country}`;
    this.settings.humidity.textContent = data.main.humidity;
    this.settings.weatherDescription.textContent = data.weather[0].description;
    this.settings.tempNumber = data.main.temp;
    this.settings.windSpeed = data.wind.speed;
    this.settings.windDegree = data.wind.deg;
    this.getWeatherDirection();
    this.changeTempUnit(TempUnit.Fahrenheit);
    const time = Date.now() / 1000;
    this.getDayOrNight(time, data.sys.sunrise, data.sys.sunset);
    const canvasBackground = new CanvasBackground();
    canvasBackground.chooseBackground(data.weather[0].main);
  }

  getWeatherDirection() {
    const degree = this.settings.windDegree;
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round(degree / 45) % 8;
    this.settings.windDirection.textContent = directions[index];
  }

  changeTempUnit(unit: TempUnit) {
    const newTemp = this.settings.tempNumber - 273.15;
    if (unit === TempUnit.Fahrenheit) {
      this.settings.temperature.innerHTML = Math.round(
        (9 / 5) * newTemp + 32
      ).toString();
      this.settings.celsius.classList.remove("checked");
      this.settings.fahrenheit.classList.add("checked");
      this.settings.temperature.classList.remove("celsius-degree");
      this.settings.temperature.classList.add("fahrenheit-degree");
      this.changeSpeedUnit("m");
    } else if (unit === TempUnit.Celsius) {
      this.settings.celsius.classList.add("checked");
      this.settings.fahrenheit.classList.remove("checked");
      this.settings.temperature.classList.add("celsius-degree");
      this.settings.temperature.classList.remove("fahrenheit-degree");
      this.settings.temperature.innerHTML = Math.round(newTemp).toString();
      this.changeSpeedUnit("km");
    }
  }

  changeSpeedUnit(unit: string) {
    if (unit === "km") {
      this.settings.wind.textContent = Math.round(
        this.settings.windSpeed * 3.6
      ).toString();
      this.settings.speedUnit.textContent = "km/h";
    } else if (unit === "m") {
      this.settings.wind.textContent = Math.round(
        this.settings.windSpeed * 2.23694185194
      ).toString();
      this.settings.speedUnit.textContent = "mph";
    }
  }

  getDayOrNight(time: number, sunrise: number, sunset: number) {
    if (time >= sunrise && time < sunset) {
      this.settings.dayOrNight = "daytime";
    } else {
      this.settings.dayOrNight = "nighttime";
    }
  }
}

interface CanvasSettings {
  weatherBackground: HTMLElement;
  weatherCanvas: HTMLCanvasElement;
  weatherCTX: CanvasRenderingContext2D;
  rainCanvas: HTMLCanvasElement;
  rainCTX: CanvasRenderingContext2D;
  cloudCanvas: HTMLCanvasElement;
  cloudCTX: CanvasRenderingContext2D;
  timeCanvas: HTMLCanvasElement;
  timeCTX: CanvasRenderingContext2D;
  lightningCanvas: HTMLCanvasElement;
  lightningCTX: CanvasRenderingContext2D;
  bgChoice: string;
  iconColor: { [key: string]: string };
  requestRain: number;
  requestCloud: number;
  requestWeather: number;
  requestTime: number;
  refreshIntervalID: number;
}

class CanvasBackground {
  settings: CanvasSettings;

  constructor() {
    this.settings = {
      weatherBackground: document.getElementById("weather-background")!,
      weatherCanvas: document.getElementById(
        "weather-canvas"
      ) as HTMLCanvasElement,
      weatherCTX: (
        document.getElementById("weather-canvas") as HTMLCanvasElement
      ).getContext("2d")!,
      rainCanvas: document.getElementById("rain-canvas") as HTMLCanvasElement,
      rainCTX: (
        document.getElementById("rain-canvas") as HTMLCanvasElement
      ).getContext("2d")!,
      cloudCanvas: document.getElementById("cloud-canvas") as HTMLCanvasElement,
      cloudCTX: (
        document.getElementById("cloud-canvas") as HTMLCanvasElement
      ).getContext("2d")!,
      timeCanvas: document.getElementById("time-canvas") as HTMLCanvasElement,
      timeCTX: (
        document.getElementById("time-canvas") as HTMLCanvasElement
      ).getContext("2d")!,
      lightningCanvas: document.getElementById(
        "lightning-canvas"
      ) as HTMLCanvasElement,
      lightningCTX: (
        document.getElementById("lightning-canvas") as HTMLCanvasElement
      ).getContext("2d")!,
      bgChoice: "",
      iconColor: {
        defaultWeather: "#9AD4E0",
        thunderstorm: "#717F8E",
        drizzle: "#63A6CC",
        rain: "#63A6CC",
        snow: "#B5B9BB",
        atmosphere: "#CED1DD",
        clouds: "#6AB7E3",
        extremeWeather: "#D3746B",
        clearsky: "#9AD4E0",
      },
      requestRain: 0,
      requestCloud: 0,
      requestWeather: 0,
      requestTime: 0,
      refreshIntervalID: 0,
    };
    this.init();
  }

  init() {
    this.setupCanvas();
    this.chooseBackground();
  }

  setupCanvas() {
    this.resizeBackground();
    window.addEventListener("resize", () => this.resizeBackground());
    window.addEventListener("orientationchange", () => this.resizeBackground());
  }

  resizeBackground() {
    const { innerWidth, innerHeight } = window;
    this.settings.weatherCanvas.width = innerWidth;
    this.settings.weatherCanvas.height = innerHeight;
    this.settings.rainCanvas.width = innerWidth;
    this.settings.rainCanvas.height = innerHeight;
    this.settings.cloudCanvas.width = innerWidth;
    this.settings.cloudCanvas.height = innerHeight;
    this.settings.timeCanvas.width = innerWidth;
    this.settings.timeCanvas.height = innerHeight;
    this.settings.lightningCanvas.width = innerWidth;
    this.settings.lightningCanvas.height = innerHeight;
  }

  chooseBackground(condition: string = WeatherCondition.Default) {
    this.settings.bgChoice = condition;
    this.settings.weatherBackground.className =
      WeatherInfo.prototype.settings.dayOrNight;

    switch (condition) {
      case WeatherCondition.Thunderstorm:
        this.clearAllCanvases();
        this.settings.weatherBackground.classList.add("thunderstorm");
        this.animateRain("rain");
        this.animateClouds();
        this.animateLightning();
        this.animateTime();
        break;
      case WeatherCondition.Drizzle:
        this.clearAllCanvases();
        this.settings.weatherBackground.classList.add("drizzle");
        this.animateRain("drizzle");
        this.animateClouds();
        this.animateTime();
        break;
      case WeatherCondition.Rain:
        this.clearAllCanvases();
        this.settings.weatherBackground.classList.add("rain");
        this.animateRain("rain");
        this.animateClouds();
        this.animateTime();
        break;
      case WeatherCondition.Snow:
        this.clearAllCanvases();
        this.settings.weatherBackground.classList.add("snow");
        this.animateSnow();
        this.animateTime();
        break;
      case WeatherCondition.Atmosphere:
        this.clearAllCanvases();
        this.settings.weatherBackground.classList.add("atmosphere");
        this.animateAtmosphere();
        this.animateTime();
        break;
      case WeatherCondition.Clouds:
        this.clearAllCanvases();
        this.settings.weatherBackground.classList.add("clouds");
        this.animateClouds();
        this.animateTime();
        break;
      case WeatherCondition.Clear:
        this.clearAllCanvases();
        this.settings.weatherBackground.classList.add("clearsky");
        this.animateTime();
        break;
      case WeatherCondition.Extreme:
        this.clearAllCanvases();
        this.settings.weatherBackground.classList.add("extreme-weather");
        this.animateExtreme();
        this.animateTime();
        break;
      default:
        this.clearAllCanvases();
        this.settings.weatherBackground.classList.add("default-weather");
        this.getRandomBackground();
        break;
    }
  }

  getRandomBackground() {
    const possibleAnimations = [
      this.animateSnow,
      this.animateRain,
      this.animateClouds,
    ];
    const randomAnimation = Math.floor(
      Math.random() * possibleAnimations.length
    );
    possibleAnimations[randomAnimation].call(this, "");
  }

  clearAllCanvases() {
    clearInterval(this.settings.refreshIntervalID);
    cancelAnimationFrame(this.settings.requestRain);
    cancelAnimationFrame(this.settings.requestCloud);
    cancelAnimationFrame(this.settings.requestWeather);
    cancelAnimationFrame(this.settings.requestTime);
    this.settings.weatherCTX.clearRect(
      0,
      0,
      this.settings.weatherCanvas.width,
      this.settings.weatherCanvas.height
    );
    this.settings.timeCTX.clearRect(
      0,
      0,
      this.settings.timeCanvas.width,
      this.settings.timeCanvas.height
    );
    this.settings.rainCTX.clearRect(
      0,
      0,
      this.settings.rainCanvas.width,
      this.settings.rainCanvas.height
    );
    this.settings.cloudCTX.clearRect(
      0,
      0,
      this.settings.cloudCanvas.width,
      this.settings.cloudCanvas.height
    );
    this.settings.lightningCTX.clearRect(
      0,
      0,
      this.settings.lightningCanvas.width,
      this.settings.lightningCanvas.height
    );
  }

  animateRain(condition: string) {
    // Implementation of animateRain method
  }

  animateClouds() {
    // Implementation of animateClouds method
  }

  animateTime() {
    // Implementation of animateTime method
  }

  animateLightning() {
    // Implementation of animateLightning method
  }

  animateAtmosphere() {
    // Implementation of animateAtmosphere method
  }

  animateSnow() {
    // Implementation of animateSnow method
  }

  animateExtreme() {
    // Implementation of animateExtreme method
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new GLoc();
  new WeatherInfo();
  new CanvasBackground();
});
