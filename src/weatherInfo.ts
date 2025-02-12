import { WeatherSettings } from "./interfaces";
import { CanvasBackground } from "./canvasBackground";
import { TempUnit, WeatherCondition } from "./enums";
import { apikey } from "./apikey";

export class WeatherInfo {
  settings: WeatherSettings;
  canvasBackground: CanvasBackground;

  constructor(canvasBackground: CanvasBackground) {
    this.canvasBackground = canvasBackground;
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
      searchCountryInput: document.getElementById(
        "search-country-input"
      ) as HTMLInputElement,
      searchLocationButton: document.getElementById("search-location-button")!,
      celsiusButton: document.getElementById("celsius")!,
      fahrenheitButton: document.getElementById("fahrenheit")!,
      humidity: document.getElementById("humidity")!,
      speedUnit: document.getElementById("speed-unit")!,
      windSpeed: 0,
      windDirection: document.getElementById("wind-direction")!,
      windDegree: 0,
      dayOrNight: "daytime",
      closeAttribution: document.getElementById("close-attribution")!,
      openAttribution: document.getElementById("noun-project")!,
      attributionModal: document.getElementById("attribution-links")!,
      searchQuery: "",
    };
    this.init();
  }

  init() {
    this.bindUIActions();
    if (this.settings.searchLocationInput) {
      this.settings.searchLocationInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          this.settings.searchLocationButton.click();
        }
      });
    }
    if (this.settings.searchCountryInput) {
      this.settings.searchCountryInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          this.settings.searchLocationButton.click();
        }
      });
    }
  }

  bindUIActions() {
    if (this.settings.searchLocationButton) {
      this.settings.searchLocationButton.addEventListener("click", () =>
        this.getWeatherData()
      );
    }
    if (this.settings.celsiusButton) {
      this.settings.celsiusButton.addEventListener("click", () =>
        this.changeTempUnit(TempUnit.Celsius)
      );
    }
    if (this.settings.fahrenheitButton) {
      this.settings.fahrenheitButton.addEventListener("click", () =>
        this.changeTempUnit(TempUnit.Fahrenheit)
      );
    }
    if (this.settings.closeAttribution) {
      this.settings.closeAttribution.addEventListener("click", () =>
        this.closeAttributionModal()
      );
    }
    if (this.settings.openAttribution) {
      this.settings.openAttribution.addEventListener("click", () =>
        this.openAttributionModal()
      );
    }
  }

  closeAttributionModal() {
    if (this.settings.attributionModal) {
      this.settings.attributionModal.classList.add("hide");
    }
  }

  openAttributionModal() {
    if (this.settings.attributionModal) {
      this.settings.attributionModal.classList.remove("hide");
    }
  }

  async getWeatherData() {
    if (
      this.settings.searchLocationInput.value !== "" &&
      this.settings.searchCountryInput.value !== ""
    ) {
      this.settings.searchQuery = `https://api.openweathermap.org/data/2.5/weather?q=${this.settings.searchLocationInput.value},${this.settings.searchCountryInput.value}&appid=${apikey}`;
      try {
        const response = await fetch(this.settings.searchQuery);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        this.setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        this.showErrorMessage("Error fetching weather data. Please try again.");
      }
    }
  }

  setWeatherData(data: any) {
    this.clearCanvasBackground();
    const frontPageDescription = document.getElementById(
      "front-page-description"
    );
    if (frontPageDescription) {
      frontPageDescription.classList.add("hide");
    }
    if (this.settings.weather) {
      this.settings.weather.classList.remove("hide");
    }
    if (this.settings.location) {
      this.settings.location.textContent = `${data.name}, ${data.sys.country}`;
    }
    if (this.settings.humidity) {
      this.settings.humidity.textContent = data.main.humidity;
    }
    if (this.settings.weatherDescription) {
      this.settings.weatherDescription.textContent =
        data.weather[0].description;
    }
    this.settings.tempNumber = data.main.temp;
    this.settings.windSpeed = data.wind.speed;
    this.settings.windDegree = data.wind.deg;
    this.getWeatherDirection();
    this.changeTempUnit(TempUnit.Fahrenheit);
    const time = Date.now() / 1000;
    this.getDayOrNight(time, data.sys.sunrise, data.sys.sunset);
    this.canvasBackground.chooseBackground(data.weather[0].main);
  }

  clearCanvasBackground() {
    this.canvasBackground.clearAllCanvases();
  }

  getWeatherDirection() {
    const degree = this.settings.windDegree;
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round(degree / 45) % 8;
    if (this.settings.windDirection) {
      this.settings.windDirection.textContent = directions[index];
    }
  }

  changeTempUnit(unit: TempUnit) {
    const kelvinTemp = this.settings.tempNumber;
    if (unit === TempUnit.Fahrenheit) {
      const fahrenheitTemp = Math.round(((kelvinTemp - 273.15) * 9) / 5 + 32);
      if (this.settings.temperature) {
        this.settings.temperature.innerHTML = fahrenheitTemp.toString();
      }
      if (this.settings.celsius) {
        this.settings.celsius.classList.remove("checked");
      }
      if (this.settings.fahrenheit) {
        this.settings.fahrenheit.classList.add("checked");
      }
      if (this.settings.temperature) {
        this.settings.temperature.classList.remove("celsius-degree");
        this.settings.temperature.classList.add("fahrenheit-degree");
      }
      this.changeSpeedUnit("m");
    } else if (unit === TempUnit.Celsius) {
      const celsiusTemp = Math.round(kelvinTemp - 273.15);
      if (this.settings.celsius) {
        this.settings.celsius.classList.add("checked");
      }
      if (this.settings.fahrenheit) {
        this.settings.fahrenheit.classList.remove("checked");
      }
      if (this.settings.temperature) {
        this.settings.temperature.classList.add("celsius-degree");
        this.settings.temperature.classList.remove("fahrenheit-degree");
        this.settings.temperature.innerHTML = celsiusTemp.toString();
      }
      this.changeSpeedUnit("km");
    }
  }

  changeSpeedUnit(unit: string) {
    if (unit === "km") {
      if (this.settings.wind) {
        this.settings.wind.textContent = Math.round(
          this.settings.windSpeed * 3.6
        ).toString();
      }
      if (this.settings.speedUnit) {
        this.settings.speedUnit.textContent = "km/h";
      }
    } else if (unit === "m") {
      if (this.settings.wind) {
        this.settings.wind.textContent = Math.round(
          this.settings.windSpeed * 2.23694185194
        ).toString();
      }
      if (this.settings.speedUnit) {
        this.settings.speedUnit.textContent = "mph";
      }
    }
  }

  getDayOrNight(time: number, sunrise: number, sunset: number) {
    this.settings.dayOrNight =
      time >= sunrise && time < sunset ? "daytime" : "nighttime";
  }

  showErrorMessage(message: string) {
    const errorMessageElement = document.getElementById("error-message");
    if (errorMessageElement) {
      errorMessageElement.textContent = message;
      errorMessageElement.classList.remove("hide");
    }
  }
}
