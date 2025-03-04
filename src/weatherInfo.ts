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
      weatherBackground: document.getElementById("weather-background")!,
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
  }

  bindUIActions() {
    this.settings.searchLocationInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.settings.searchLocationButton.click();
      }
    });
    this.settings.searchCountryInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.settings.searchLocationButton.click();
      }
    });
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
        console.log(data);
        this.setWeatherData(data);
        this.handleImage(data.weather[0].icon);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        this.showErrorMessage("Error fetching weather data. Please try again.");
      }
    }
  }

  resetToClearSky() {
    this.canvasBackground.clearAllCanvases();
    this.settings.weatherBackground.className = "default-weather";
    // this.canvasBackground.animateTime(time);
  }

  chooseBackground(
    condition: string = WeatherCondition.Default,
    dayOrNight: string
  ) {
    this.resetToClearSky(); // Reset to clear sky before starting new animations

    this.settings.weatherBackground.className = dayOrNight;
    console.log(condition);
    switch (condition) {
      case WeatherCondition.Thunderstorm:
        this.settings.weatherBackground.classList.add("thunderstorm");
        this.canvasBackground.animateRain("rain");
        this.canvasBackground.animateClouds();
        this.canvasBackground.animateLightning();
        // this.canvasBackground.animateTime(dayOrNight);
        break;
      case WeatherCondition.Drizzle:
        this.settings.weatherBackground.classList.add("drizzle");
        this.canvasBackground.animateRain("drizzle");
        this.canvasBackground.animateClouds();
        // this.canvasBackground.animateTime(dayOrNight);
        break;
      case WeatherCondition.Rain:
        this.settings.weatherBackground.classList.add("rain");
        this.canvasBackground.animateRain("rain");
        this.canvasBackground.animateClouds();
        // this.canvasBackground.animateTime(dayOrNight);
        break;
      case WeatherCondition.Snow:
        this.settings.weatherBackground.classList.add("snow");
        this.canvasBackground.animateSnow();
        // this.canvasBackground.animateTime(dayOrNight);
        break;
      case WeatherCondition.Atmosphere:
        this.settings.weatherBackground.classList.add("atmosphere");
        this.canvasBackground.animateAtmosphere();
        // this.canvasBackground.animateTime(dayOrNight);
        break;
      case WeatherCondition.Clouds:
        this.settings.weatherBackground.classList.add("clouds");
        this.canvasBackground.animateClouds();
        // this.canvasBackground.animateTime(dayOrNight);
        break;
      case WeatherCondition.Clear:
        this.settings.weatherBackground.classList.add("clearsky");
        // this.canvasBackground.animateTime(dayOrNight);
        break;
      case WeatherCondition.Extreme:
        this.settings.weatherBackground.classList.add("extreme-weather");
        this.canvasBackground.animateExtreme();
        // this.canvasBackground.animateTime(dayOrNight);
        break;
      default:
        this.settings.weatherBackground.classList.add("atmosphere");
        this.canvasBackground.animateAtmosphere();
        // this.canvasBackground.animateTime(dayOrNight);
        break;
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
    if (data.sys.country.toLowerCase() == "us") {
      this.changeTempUnit(TempUnit.Fahrenheit);
    } else {
      this.changeTempUnit(TempUnit.Celsius);
    }
    const time = Date.now() / 1000;
    this.getDayOrNight(time, data.sys.sunrise, data.sys.sunset);
    this.chooseBackground(data.weather[0].main, this.settings.dayOrNight);
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

  async handleImage(imageName: string): Promise<void> {
    try {
      const response = await fetch(
        `https://openweathermap.org/img/wn/${imageName}@4x.png`
      );
      if (!response.ok) {
        throw new Error("Image was not found");
      }
      const blob = await response.blob();
      const image = new Image();
      const url = URL.createObjectURL(blob);
      image.src = url;

      await new Promise((resolve) => {
        image.onload = resolve;
      });

      URL.revokeObjectURL(url);

      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(image, 0, 0);

      const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData?.data;

      if (data) {
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];

          // Define your background removal logic here, e.g., using a color threshold or alpha value
          if (r == 230 && g == 230 && b == 230) {
            // Example: If the color is close to white, make it transparent
            data[i + 3] = 0; // Set alpha to 0 (transparent)
          }
        }
      }

      ctx?.putImageData(imageData!, 0, 0);
      const newBlob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob(resolve, "image/png");
      });

      if (newBlob) {
        const newUrl = URL.createObjectURL(newBlob);
        const weatherIcon = document.getElementById(
          "weather-icon"
        ) as HTMLImageElement;
        if (weatherIcon) {
          weatherIcon.src = newUrl;
        }
      } else {
        throw new Error("Failed to create new image blob");
      }
    } catch (error) {
      console.error("Error fetching image:", error);
      this.showErrorMessage("Error fetching image. Please try again.");
    }
  }

  showErrorMessage(message: string) {
    const errorMessageElement = document.getElementById("error-message");
    if (errorMessageElement) {
      errorMessageElement.textContent = message;
      errorMessageElement.classList.remove("hide");
    }
  }
}
