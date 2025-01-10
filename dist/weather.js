(()=>{"use strict";({667:function(){var t=this&&this.__awaiter||function(t,e,s,i){return new(s||(s=Promise))((function(n,a){function r(t){try{o(i.next(t))}catch(t){a(t)}}function h(t){try{o(i.throw(t))}catch(t){a(t)}}function o(t){var e;t.done?n(t.value):(e=t.value,e instanceof s?e:new s((function(t){t(e)}))).then(r,h)}o((i=i.apply(t,e||[])).next())}))};const e="970f2cb858bf46eadcaf13f9d6b65996";var s,i;!function(t){t.Celsius="celsius",t.Fahrenheit="fahrenheit"}(s||(s={})),function(t){t.Thunderstorm="Thunderstorm",t.Drizzle="Drizzle",t.Rain="Rain",t.Snow="Snow",t.Atmosphere="Atmosphere",t.Clouds="Clouds",t.Clear="Clear",t.Extreme="Extreme",t.Default="default-weather"}(i||(i={}));class n{constructor(){this.settings={geoButton:document.getElementById("geo-button"),geoErrorMessage:document.getElementById("geo-error-message"),startPos:null,searchQuery:"",closeButton:document.getElementById("close-error")},this.init()}init(){this.bindUIActions()}bindUIActions(){this.settings.geoButton&&this.settings.geoButton.addEventListener("click",(()=>this.getGeoLocation())),this.settings.closeButton&&this.settings.closeButton.addEventListener("click",(()=>this.hideGeoErrorMessageBanner()))}getGeoLocation(){navigator.geolocation.getCurrentPosition((t=>this.geoSuccess(t)),(t=>this.geoError(t)))}showGeoErrorMessageBanner(){this.settings.geoErrorMessage&&this.settings.geoErrorMessage.classList.toggle("hide")}hideGeoErrorMessageBanner(){this.settings.geoErrorMessage&&this.settings.geoErrorMessage.classList.add("hide")}geoSuccess(s){return t(this,void 0,void 0,(function*(){this.hideGeoErrorMessageBanner(),this.settings.startPos=s,this.settings.searchQuery=`https://api.openweathermap.org/data/2.5/weather?lat=${s.coords.latitude}&lon=${s.coords.longitude}&appid=${e}`;try{const t=yield fetch(this.settings.searchQuery),e=yield t.json();(new a).setWeatherData(e)}catch(t){console.error("Error fetching weather data:",t)}}))}geoError(t){setTimeout((()=>this.showGeoErrorMessageBanner()),5e3),t.code===t.TIMEOUT&&this.showGeoErrorMessageBanner()}}class a{constructor(){this.settings={tempIcon:document.getElementById("temp-icon"),weather:document.getElementById("weather"),weatherInfo:document.getElementById("weather-info"),location:document.getElementById("location"),weatherDescription:document.getElementById("weather-description"),temperature:document.getElementById("temperature"),tempNumber:0,fahrenheit:document.getElementById("fahrenheit"),celsius:document.getElementById("celsius"),wind:document.getElementById("wind"),searchLocationInput:document.getElementById("search-location-input"),searchLocationButton:document.getElementById("search-location-button"),celsiusButton:document.getElementById("celsius"),fahrenheitButton:document.getElementById("fahrenheit"),humidity:document.getElementById("humidity"),speedUnit:document.getElementById("speed-unit"),windSpeed:0,windDirection:document.getElementById("wind-direction"),windDegree:0,dayOrNight:"",closeAttribution:document.getElementById("close-attribution"),openAttribution:document.getElementById("noun-project"),attributionModal:document.getElementById("attribution-links"),searchQuery:""},this.init()}init(){this.bindUIActions(),this.settings.searchLocationInput&&this.settings.searchLocationInput.addEventListener("keypress",(t=>{"Enter"===t.key&&this.settings.searchLocationButton.click()}))}bindUIActions(){this.settings.searchLocationButton&&this.settings.searchLocationButton.addEventListener("click",(()=>this.getWeatherData())),this.settings.celsiusButton&&this.settings.celsiusButton.addEventListener("click",(()=>this.changeTempUnit(s.Celsius))),this.settings.fahrenheitButton&&this.settings.fahrenheitButton.addEventListener("click",(()=>this.changeTempUnit(s.Fahrenheit))),this.settings.closeAttribution&&this.settings.closeAttribution.addEventListener("click",(()=>this.closeAttributionModal())),this.settings.openAttribution&&this.settings.openAttribution.addEventListener("click",(()=>this.openAttributionModal()))}closeAttributionModal(){this.settings.attributionModal&&this.settings.attributionModal.classList.add("hide")}openAttributionModal(){this.settings.attributionModal&&this.settings.attributionModal.classList.remove("hide")}getWeatherData(){return t(this,void 0,void 0,(function*(){if(""!==this.settings.searchLocationInput.value){this.settings.searchQuery=`https://api.openweathermap.org/data/2.5/weather?q=${this.settings.searchLocationInput.value}&appid=${e}`;try{const t=yield fetch(this.settings.searchQuery),e=yield t.json();this.setWeatherData(e)}catch(t){console.error("Error fetching weather data:",t)}}}))}setWeatherData(t){n.prototype.hideGeoErrorMessageBanner();const e=document.getElementById("front-page-description");e&&e.classList.add("hide"),this.settings.weather&&this.settings.weather.classList.remove("hide"),this.settings.location&&(this.settings.location.textContent=`${t.name}, ${t.sys.country}`),this.settings.humidity&&(this.settings.humidity.textContent=t.main.humidity),this.settings.weatherDescription&&(this.settings.weatherDescription.textContent=t.weather[0].description),this.settings.tempNumber=t.main.temp,this.settings.windSpeed=t.wind.speed,this.settings.windDegree=t.wind.deg,this.getWeatherDirection(),this.changeTempUnit(s.Fahrenheit);const i=Date.now()/1e3;this.getDayOrNight(i,t.sys.sunrise,t.sys.sunset),(new r).chooseBackground(t.weather[0].main)}getWeatherDirection(){const t=this.settings.windDegree,e=Math.round(t/45)%8;this.settings.windDirection&&(this.settings.windDirection.textContent=["N","NE","E","SE","S","SW","W","NW"][e])}changeTempUnit(t){const e=this.settings.tempNumber-273.15;t===s.Fahrenheit?(this.settings.temperature&&(this.settings.temperature.innerHTML=Math.round(1.8*e+32).toString()),this.settings.celsius&&this.settings.celsius.classList.remove("checked"),this.settings.fahrenheit&&this.settings.fahrenheit.classList.add("checked"),this.settings.temperature&&(this.settings.temperature.classList.remove("celsius-degree"),this.settings.temperature.classList.add("fahrenheit-degree")),this.changeSpeedUnit("m")):t===s.Celsius&&(this.settings.celsius&&this.settings.celsius.classList.add("checked"),this.settings.fahrenheit&&this.settings.fahrenheit.classList.remove("checked"),this.settings.temperature&&(this.settings.temperature.classList.add("celsius-degree"),this.settings.temperature.classList.remove("fahrenheit-degree"),this.settings.temperature.innerHTML=Math.round(e).toString()),this.changeSpeedUnit("km"))}changeSpeedUnit(t){"km"===t?(this.settings.wind&&(this.settings.wind.textContent=Math.round(3.6*this.settings.windSpeed).toString()),this.settings.speedUnit&&(this.settings.speedUnit.textContent="km/h")):"m"===t&&(this.settings.wind&&(this.settings.wind.textContent=Math.round(2.23694185194*this.settings.windSpeed).toString()),this.settings.speedUnit&&(this.settings.speedUnit.textContent="mph"))}getDayOrNight(t,e,s){this.settings.dayOrNight=t>=e&&t<s?"daytime":"nighttime"}}class r{constructor(){this.settings={weatherBackground:document.getElementById("weather-background"),weatherCanvas:document.getElementById("weather-canvas"),weatherCTX:document.getElementById("weather-canvas").getContext("2d"),rainCanvas:document.getElementById("rain-canvas"),rainCTX:document.getElementById("rain-canvas").getContext("2d"),cloudCanvas:document.getElementById("cloud-canvas"),cloudCTX:document.getElementById("cloud-canvas").getContext("2d"),timeCanvas:document.getElementById("time-canvas"),timeCTX:document.getElementById("time-canvas").getContext("2d"),lightningCanvas:document.getElementById("lightning-canvas"),lightningCTX:document.getElementById("lightning-canvas").getContext("2d"),bgChoice:"",iconColor:{defaultWeather:"#9AD4E0",thunderstorm:"#717F8E",drizzle:"#63A6CC",rain:"#63A6CC",snow:"#B5B9BB",atmosphere:"#CED1DD",clouds:"#6AB7E3",extremeWeather:"#D3746B",clearsky:"#9AD4E0"},requestRain:0,requestCloud:0,requestWeather:0,requestTime:0,refreshIntervalID:0},this.init()}init(){this.setupCanvas(),this.chooseBackground()}setupCanvas(){this.resizeBackground(),window.addEventListener("resize",(()=>this.resizeBackground())),window.addEventListener("orientationchange",(()=>this.resizeBackground()))}resizeBackground(){const{innerWidth:t,innerHeight:e}=window;this.settings.weatherCanvas.width=t,this.settings.weatherCanvas.height=e,this.settings.rainCanvas.width=t,this.settings.rainCanvas.height=e,this.settings.cloudCanvas.width=t,this.settings.cloudCanvas.height=e,this.settings.timeCanvas.width=t,this.settings.timeCanvas.height=e,this.settings.lightningCanvas.width=t,this.settings.lightningCanvas.height=e}chooseBackground(t=i.Default){switch(this.settings.bgChoice=t,this.settings.weatherBackground.className=a.prototype.settings.dayOrNight,t){case i.Thunderstorm:this.clearAllCanvases(),this.settings.weatherBackground.classList.add("thunderstorm"),this.animateRain("rain"),this.animateClouds(),this.animateLightning(),this.animateTime();break;case i.Drizzle:this.clearAllCanvases(),this.settings.weatherBackground.classList.add("drizzle"),this.animateRain("drizzle"),this.animateClouds(),this.animateTime();break;case i.Rain:this.clearAllCanvases(),this.settings.weatherBackground.classList.add("rain"),this.animateRain("rain"),this.animateClouds(),this.animateTime();break;case i.Snow:this.clearAllCanvases(),this.settings.weatherBackground.classList.add("snow"),this.animateSnow(),this.animateTime();break;case i.Atmosphere:this.clearAllCanvases(),this.settings.weatherBackground.classList.add("atmosphere"),this.animateAtmosphere(),this.animateTime();break;case i.Clouds:this.clearAllCanvases(),this.settings.weatherBackground.classList.add("clouds"),this.animateClouds(),this.animateTime();break;case i.Clear:this.clearAllCanvases(),this.settings.weatherBackground.classList.add("clearsky"),this.animateTime();break;case i.Extreme:this.clearAllCanvases(),this.settings.weatherBackground.classList.add("extreme-weather"),this.animateExtreme(),this.animateTime();break;default:this.clearAllCanvases(),this.settings.weatherBackground.classList.add("default-weather"),this.getRandomBackground()}}getRandomBackground(){const t=[this.animateSnow,this.animateRain,this.animateClouds];t[Math.floor(Math.random()*t.length)].call(this,"")}clearAllCanvases(){clearInterval(this.settings.refreshIntervalID),cancelAnimationFrame(this.settings.requestRain),cancelAnimationFrame(this.settings.requestCloud),cancelAnimationFrame(this.settings.requestWeather),cancelAnimationFrame(this.settings.requestTime),this.settings.weatherCTX.clearRect(0,0,this.settings.weatherCanvas.width,this.settings.weatherCanvas.height),this.settings.timeCTX.clearRect(0,0,this.settings.timeCanvas.width,this.settings.timeCanvas.height),this.settings.rainCTX.clearRect(0,0,this.settings.rainCanvas.width,this.settings.rainCanvas.height),this.settings.cloudCTX.clearRect(0,0,this.settings.cloudCanvas.width,this.settings.cloudCanvas.height),this.settings.lightningCTX.clearRect(0,0,this.settings.lightningCanvas.width,this.settings.lightningCanvas.height)}animateRain(t){}animateClouds(){}animateTime(){}animateLightning(){}animateAtmosphere(){}animateSnow(){}animateExtreme(){}}document.addEventListener("DOMContentLoaded",(()=>{new n,new a,new r}))}})[667]()})();