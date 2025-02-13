export interface Settings {
  geoButton: HTMLElement;
  geoErrorMessage: HTMLElement;
  startPos: GeolocationPosition | null;
  searchQuery: string;
  closeButton: HTMLElement;
}

export interface WeatherSettings {
  weatherBackground: HTMLElement;
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
  searchCountryInput: HTMLInputElement;
  searchLocationButton: HTMLElement;
  celsiusButton: HTMLElement;
  fahrenheitButton: HTMLElement;
  humidity: HTMLElement;
  bgChoice: string;
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

export interface CanvasSettings {
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
  iconColor: {
    defaultWeather: string;
    thunderstorm: string;
    drizzle: string;
    rain: string;
    snow: string;
    atmosphere: string;
    clouds: string;
    extremeWeather: string;
    clearsky: string;
  };
  requestRain: number;
  requestCloud: number;
  requestWeather: number;
  requestTime: number;
  refreshIntervalID: number;
  dayOrNight: string;
}
