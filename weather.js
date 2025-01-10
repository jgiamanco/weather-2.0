var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g = Object.create(
        (typeof Iterator === "function" ? Iterator : Object).prototype
      );
    return (
      (g.next = verb(0)),
      (g["throw"] = verb(1)),
      (g["return"] = verb(2)),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var apikey = process.env.OPEN_WEATHER_API_KEY;
var TempUnit;
(function (TempUnit) {
  TempUnit["Celsius"] = "celsius";
  TempUnit["Fahrenheit"] = "fahrenheit";
})(TempUnit || (TempUnit = {}));
var WeatherCondition;
(function (WeatherCondition) {
  WeatherCondition["Thunderstorm"] = "Thunderstorm";
  WeatherCondition["Drizzle"] = "Drizzle";
  WeatherCondition["Rain"] = "Rain";
  WeatherCondition["Snow"] = "Snow";
  WeatherCondition["Atmosphere"] = "Atmosphere";
  WeatherCondition["Clouds"] = "Clouds";
  WeatherCondition["Clear"] = "Clear";
  WeatherCondition["Extreme"] = "Extreme";
  WeatherCondition["Default"] = "default-weather";
})(WeatherCondition || (WeatherCondition = {}));
var GLoc = /** @class */ (function () {
  function GLoc() {
    this.settings = {
      geoButton: document.getElementById("geo-button"),
      geoErrorMessage: document.getElementById("geo-error-message"),
      startPos: null,
      searchQuery: "",
      closeButton: document.getElementById("close-error"),
    };
    this.init();
  }
  GLoc.prototype.init = function () {
    this.bindUIActions();
  };
  GLoc.prototype.bindUIActions = function () {
    var _this = this;
    this.settings.geoButton.addEventListener("click", function () {
      return _this.getGeoLocation();
    });
    this.settings.closeButton.addEventListener("click", function () {
      return _this.hideGeoErrorMessageBanner();
    });
  };
  GLoc.prototype.getGeoLocation = function () {
    var _this = this;
    navigator.geolocation.getCurrentPosition(
      function (position) {
        return _this.geoSuccess(position);
      },
      function (error) {
        return _this.geoError(error);
      }
    );
  };
  GLoc.prototype.showGeoErrorMessageBanner = function () {
    this.settings.geoErrorMessage.classList.toggle("hide");
  };
  GLoc.prototype.hideGeoErrorMessageBanner = function () {
    this.settings.geoErrorMessage.classList.add("hide");
  };
  GLoc.prototype.geoSuccess = function (position) {
    return __awaiter(this, void 0, void 0, function () {
      var response, data, weatherInfo, error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            this.hideGeoErrorMessageBanner();
            this.settings.startPos = position;
            this.settings.searchQuery =
              "https://api.openweathermap.org/data/2.5/weather?lat="
                .concat(position.coords.latitude, "&lon=")
                .concat(position.coords.longitude, "&appid=")
                .concat(apikey);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 4, , 5]);
            return [4 /*yield*/, fetch(this.settings.searchQuery)];
          case 2:
            response = _a.sent();
            return [4 /*yield*/, response.json()];
          case 3:
            data = _a.sent();
            weatherInfo = new WeatherInfo();
            weatherInfo.setWeatherData(data);
            return [3 /*break*/, 5];
          case 4:
            error_1 = _a.sent();
            console.error("Error fetching weather data:", error_1);
            return [3 /*break*/, 5];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  GLoc.prototype.geoError = function (error) {
    var _this = this;
    setTimeout(function () {
      return _this.showGeoErrorMessageBanner();
    }, 5000);
    if (error.code === error.TIMEOUT) {
      this.showGeoErrorMessageBanner();
    }
  };
  return GLoc;
})();
var WeatherInfo = /** @class */ (function () {
  function WeatherInfo() {
    this.settings = {
      tempIcon: document.getElementById("temp-icon"),
      weather: document.getElementById("weather"),
      weatherInfo: document.getElementById("weather-info"),
      location: document.getElementById("location"),
      weatherDescription: document.getElementById("weather-description"),
      temperature: document.getElementById("temperature"),
      tempNumber: 0,
      fahrenheit: document.getElementById("fahrenheit"),
      celsius: document.getElementById("celsius"),
      wind: document.getElementById("wind"),
      searchLocationInput: document.getElementById("search-location-input"),
      searchLocationButton: document.getElementById("search-location-button"),
      celsiusButton: document.getElementById("celsius"),
      fahrenheitButton: document.getElementById("fahrenheit"),
      humidity: document.getElementById("humidity"),
      speedUnit: document.getElementById("speed-unit"),
      windSpeed: 0,
      windDirection: document.getElementById("wind-direction"),
      windDegree: 0,
      dayOrNight: "",
      closeAttribution: document.getElementById("close-attribution"),
      openAttribution: document.getElementById("noun-project"),
      attributionModal: document.getElementById("attribution-links"),
      searchQuery: "",
    };
    this.init();
  }
  WeatherInfo.prototype.init = function () {
    var _this = this;
    this.bindUIActions();
    this.settings.searchLocationInput.addEventListener(
      "keypress",
      function (e) {
        if (e.key === "Enter") {
          _this.settings.searchLocationButton.click();
        }
      }
    );
  };
  WeatherInfo.prototype.bindUIActions = function () {
    var _this = this;
    this.settings.searchLocationButton.addEventListener("click", function () {
      return _this.getWeatherData();
    });
    this.settings.celsiusButton.addEventListener("click", function () {
      return _this.changeTempUnit(TempUnit.Celsius);
    });
    this.settings.fahrenheitButton.addEventListener("click", function () {
      return _this.changeTempUnit(TempUnit.Fahrenheit);
    });
    this.settings.closeAttribution.addEventListener("click", function () {
      return _this.closeAttributionModal();
    });
    this.settings.openAttribution.addEventListener("click", function () {
      return _this.openAttributionModal();
    });
  };
  WeatherInfo.prototype.closeAttributionModal = function () {
    this.settings.attributionModal.classList.add("hide");
  };
  WeatherInfo.prototype.openAttributionModal = function () {
    this.settings.attributionModal.classList.remove("hide");
  };
  WeatherInfo.prototype.getWeatherData = function () {
    return __awaiter(this, void 0, void 0, function () {
      var response, data, error_2;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!(this.settings.searchLocationInput.value !== ""))
              return [3 /*break*/, 5];
            this.settings.searchQuery =
              "https://api.openweathermap.org/data/2.5/weather?q="
                .concat(this.settings.searchLocationInput.value, "&appid=")
                .concat(apikey);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 4, , 5]);
            return [4 /*yield*/, fetch(this.settings.searchQuery)];
          case 2:
            response = _a.sent();
            return [4 /*yield*/, response.json()];
          case 3:
            data = _a.sent();
            this.setWeatherData(data);
            return [3 /*break*/, 5];
          case 4:
            error_2 = _a.sent();
            console.error("Error fetching weather data:", error_2);
            return [3 /*break*/, 5];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  WeatherInfo.prototype.setWeatherData = function (data) {
    GLoc.prototype.hideGeoErrorMessageBanner();
    document.getElementById("front-page-description").classList.add("hide");
    this.settings.weather.classList.remove("hide");
    this.settings.location.textContent = ""
      .concat(data.name, ", ")
      .concat(data.sys.country);
    this.settings.humidity.textContent = data.main.humidity;
    this.settings.weatherDescription.textContent = data.weather[0].description;
    this.settings.tempNumber = data.main.temp;
    this.settings.windSpeed = data.wind.speed;
    this.settings.windDegree = data.wind.deg;
    this.getWeatherDirection();
    this.changeTempUnit(TempUnit.Fahrenheit);
    var time = Date.now() / 1000;
    this.getDayOrNight(time, data.sys.sunrise, data.sys.sunset);
    var canvasBackground = new CanvasBackground();
    canvasBackground.chooseBackground(data.weather[0].main);
  };
  WeatherInfo.prototype.getWeatherDirection = function () {
    var degree = this.settings.windDegree;
    var directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    var index = Math.round(degree / 45) % 8;
    this.settings.windDirection.textContent = directions[index];
  };
  WeatherInfo.prototype.changeTempUnit = function (unit) {
    var newTemp = this.settings.tempNumber - 273.15;
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
  };
  WeatherInfo.prototype.changeSpeedUnit = function (unit) {
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
  };
  WeatherInfo.prototype.getDayOrNight = function (time, sunrise, sunset) {
    if (time >= sunrise && time < sunset) {
      this.settings.dayOrNight = "daytime";
    } else {
      this.settings.dayOrNight = "nighttime";
    }
  };
  return WeatherInfo;
})();
var CanvasBackground = /** @class */ (function () {
  function CanvasBackground() {
    this.settings = {
      weatherBackground: document.getElementById("weather-background"),
      weatherCanvas: document.getElementById("weather-canvas"),
      weatherCTX: document.getElementById("weather-canvas").getContext("2d"),
      rainCanvas: document.getElementById("rain-canvas"),
      rainCTX: document.getElementById("rain-canvas").getContext("2d"),
      cloudCanvas: document.getElementById("cloud-canvas"),
      cloudCTX: document.getElementById("cloud-canvas").getContext("2d"),
      timeCanvas: document.getElementById("time-canvas"),
      timeCTX: document.getElementById("time-canvas").getContext("2d"),
      lightningCanvas: document.getElementById("lightning-canvas"),
      lightningCTX: document
        .getElementById("lightning-canvas")
        .getContext("2d"),
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
  CanvasBackground.prototype.init = function () {
    this.setupCanvas();
    this.chooseBackground();
  };
  CanvasBackground.prototype.setupCanvas = function () {
    var _this = this;
    this.resizeBackground();
    window.addEventListener("resize", function () {
      return _this.resizeBackground();
    });
    window.addEventListener("orientationchange", function () {
      return _this.resizeBackground();
    });
  };
  CanvasBackground.prototype.resizeBackground = function () {
    var innerWidth = window.innerWidth,
      innerHeight = window.innerHeight;
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
  };
  CanvasBackground.prototype.chooseBackground = function (condition) {
    if (condition === void 0) {
      condition = WeatherCondition.Default;
    }
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
  };
  CanvasBackground.prototype.getRandomBackground = function () {
    var possibleAnimations = [
      this.animateSnow,
      this.animateRain,
      this.animateClouds,
    ];
    var randomAnimation = Math.floor(Math.random() * possibleAnimations.length);
    possibleAnimations[randomAnimation].call(this, "");
  };
  CanvasBackground.prototype.clearAllCanvases = function () {
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
  };
  CanvasBackground.prototype.animateRain = function (condition) {
    // Implementation of animateRain method
  };
  CanvasBackground.prototype.animateClouds = function () {
    // Implementation of animateClouds method
  };
  CanvasBackground.prototype.animateTime = function () {
    // Implementation of animateTime method
  };
  CanvasBackground.prototype.animateLightning = function () {
    // Implementation of animateLightning method
  };
  CanvasBackground.prototype.animateAtmosphere = function () {
    // Implementation of animateAtmosphere method
  };
  CanvasBackground.prototype.animateSnow = function () {
    // Implementation of animateSnow method
  };
  CanvasBackground.prototype.animateExtreme = function () {
    // Implementation of animateExtreme method
  };
  return CanvasBackground;
})();
document.addEventListener("DOMContentLoaded", function () {
  new GLoc();
  new WeatherInfo();
  new CanvasBackground();
});
