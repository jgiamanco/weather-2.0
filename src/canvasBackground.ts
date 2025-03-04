import { CanvasSettings } from "./interfaces";

export class CanvasBackground {
  settings: CanvasSettings;

  constructor() {
    this.settings = {
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
    this.getRandomBackground();
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

  getRandomBackground() {
    const possibleAnimations = [
      this.animateSnow,
      this.animateRain,
      this.animateClouds,
      this.animateLightning,
    ];
    const randomAnimation = Math.floor(
      Math.random() * possibleAnimations.length
    );
    possibleAnimations[randomAnimation].call(this, "");
  }

  clearAllCanvases() {
    // Clear all intervals and animation frames
    clearInterval(this.settings.refreshIntervalID);
    if (this.settings.requestRain) {
      window.cancelAnimationFrame(this.settings.requestRain);
      this.settings.requestRain = 0;
    }
    if (this.settings.requestCloud) {
      window.cancelAnimationFrame(this.settings.requestCloud);
      this.settings.requestCloud = 0;
    }
    if (this.settings.requestWeather) {
      window.cancelAnimationFrame(this.settings.requestWeather);
      this.settings.requestWeather = 0;
    }
    if (this.settings.requestTime) {
      window.cancelAnimationFrame(this.settings.requestTime);
      this.settings.requestTime = 0;
    }

    // Clear all canvas contexts
    const canvases = [
      { ctx: this.settings.weatherCTX, canvas: this.settings.weatherCanvas },
      { ctx: this.settings.timeCTX, canvas: this.settings.timeCanvas },
      { ctx: this.settings.rainCTX, canvas: this.settings.rainCanvas },
      { ctx: this.settings.cloudCTX, canvas: this.settings.cloudCanvas },
      {
        ctx: this.settings.lightningCTX,
        canvas: this.settings.lightningCanvas,
      },
    ];

    canvases.forEach(({ ctx, canvas }) => {
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    });
  }

  // Animation methods (animateRain, animateClouds, etc.) remain unchanged
  animateRain(condition: string) {
    const rainSvg =
      condition === "drizzle"
        ? '<svg width="28px" height="39px" viewBox="0 0 28 39" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"><title>rain</title><desc>Created with Sketch.</desc><defs></defs><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g id="rain" sketch:type="MSLayerGroup" transform="translate(-10.000000, -6.000000)" fill="' +
          this.settings.iconColor.rain +
          '"><g id="Page-1" sketch:type="MSShapeGroup"><path d="M33.5,33.5 C33.5,40.1273333 28.1266667,45.5 21.5,45.5 C14.8726667,45.5 9.5,40.1273333 9.5,33.5 C9.5,21.5 21.5,3.50000001 21.5,3.50000001 C21.5,3.50000001 33.5,21.5 33.5,33.5 L33.5,33.5 L33.5,33.5 Z" id="rain" transform="translate(21.500000, 24.500000) rotate(0.000000) translate(-21.500000, -24.500000) "></path></g></g></g></svg>'
        : '<svg width="28px" height="39px" viewBox="0 0 28 39" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"><title>rain</title><desc>Created with Sketch.</desc><defs></defs><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g id="rain" sketch:type="MSLayerGroup" transform="translate(-10.000000, -6.000000)" fill="' +
          this.settings.iconColor.rain +
          '"><g id="Page-1" sketch:type="MSShapeGroup"><path d="M33.5,33.5 C33.5,40.1273333 28.1266667,45.5 21.5,45.5 C14.8726667,45.5 9.5,40.1273333 9.5,33.5 C9.5,21.5 21.5,3.50000001 21.5,3.50000001 C21.5,3.50000001 33.5,21.5 33.5,33.5 L33.5,33.5 L33.5,33.5 Z" id="rain" transform="translate(21.500000, 24.500000) rotate(-30.000000) translate(-21.500000, -24.500000) "></path></g></g></g></svg>';

    const rainSrc = "data:image/svg+xml;base64," + window.btoa(rainSvg);
    const rainSource = new Image();
    rainSource.src = rainSrc;

    const rainDrops: Array<{
      x: number;
      y: number;
      width: number;
      height: number;
      speed: number;
      imgWidth: number;
      imgHeight: number;
    }> = [];
    const maxSpeed = 10;
    let spacing = condition === "drizzle" ? 10 : 50;
    let xSpacing = 0;
    const n = Math.floor(innerWidth / spacing);
    const sizes =
      condition === "drizzle"
        ? [
            [10, 14],
            [15, 20.8],
          ]
        : [
            [28, 39],
            [24, 33],
            [20, 28],
          ];

    for (let i = 0; i < n; i++) {
      for (let x = 0; x < sizes.length; x++) {
        xSpacing += spacing;
        rainDrops.push({
          x:
            condition === "drizzle"
              ? Math.round(Math.random() * this.settings.rainCanvas.width)
              : xSpacing,
          y: Math.round(Math.random() * this.settings.rainCanvas.height),
          width:
            condition === "drizzle"
              ? Math.round(Math.random() * (innerWidth / 10))
              : 2,
          height:
            condition === "drizzle"
              ? 1
              : Math.round(Math.random() * (innerHeight / 10)),
          speed: Math.random() * maxSpeed + (condition === "drizzle" ? 2 : 5),
          imgWidth: sizes[x][0],
          imgHeight: sizes[x][1],
        });
      }
    }

    const draw = () => {
      this.settings.rainCTX.clearRect(
        0,
        0,
        this.settings.rainCanvas.width,
        this.settings.rainCanvas.height
      );

      for (let i = 0; i < rainDrops.length; i++) {
        this.settings.rainCTX.drawImage(
          rainSource,
          rainDrops[i].x,
          rainDrops[i].y,
          rainDrops[i].imgWidth,
          rainDrops[i].imgHeight
        );
        rainDrops[i].y += rainDrops[i].speed;
        if (condition === "drizzle") {
          if (rainDrops[i].y > this.settings.rainCanvas.height) {
            rainDrops[i].y = 0 - rainDrops[i].height;
            rainDrops[i].x = Math.random() * this.settings.rainCanvas.width;
          }
        } else {
          rainDrops[i].x += rainDrops[i].speed / 2;
          if (rainDrops[i].y > this.settings.rainCanvas.height) {
            rainDrops[i].y = 0 - rainDrops[i].height;
          }
          if (rainDrops[i].x > this.settings.rainCanvas.width) {
            rainDrops[i].x = 0;
          }
        }
      }

      this.settings.requestRain = requestAnimationFrame(draw);
    };

    draw();
  }

  animateClouds() {
    const cloudSvg =
      '<svg width="100px" height="55px" viewBox="0 0 100 55" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"><title>Group</title><desc>Created with Sketch.</desc><defs></defs><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g id="cloud" sketch:type="MSLayerGroup" fill="' +
      this.settings.iconColor.clouds +
      '"><g id="Group" sketch:type="MSShapeGroup"><path d="M83.336,20.018 C81.412,13.644 75.501,9 68.5,9 C66.193,9 64.013,9.518 62.046,10.421 C57.008,4.074 49.232,0 40.5,0 C26.11,0 14.31,11.053 13.108,25.132 C5.719,26.064 0,32.358 0,40 C0,48.284 6.716,55 15,55 L83,55 C92.389,55 100,47.165 100,37.5 C100,27.952 92.568,20.204 83.336,20.018 L83.336,20.018 Z" id="Shape"></path><path d="M15,51 C8.935,51 4,46.065 4,40 C4,34.478 8.131,29.792 13.609,29.101 L16.819,28.696 L17.094,25.473 C18.122,13.432 28.403,4 40.5,4 C47.708,4 54.419,7.247 58.913,12.908 L60.864,15.366 L63.716,14.056 C65.241,13.355 66.851,13 68.5,13 C73.528,13 78.054,16.361 79.507,21.173 L80.347,23.958 L83.255,24.017 C90.283,24.158 96,30.207 96,37.5 C96,44.944 90.168,51 83,51 L15,51 L15,51 Z" id="Shape"></path></g></g></g></svg>';

    const cloudSrc = "data:image/svg+xml;base64," + window.btoa(cloudSvg);
    const cloudSource = new Image();
    cloudSource.src = cloudSrc;

    const cloudArray: Array<{
      x: number;
      y: number;
      width: number;
      height: number;
      speed: number;
      imgWidth: number;
      imgHeight: number;
      img: HTMLImageElement;
    }> = [];
    const maxSpeed = 2;
    const spacing = 100;
    let xSpacing = 0;
    const n = Math.floor(innerWidth / spacing);
    const sizes = [
      [100, 55],
      [90, 49.5],
      [80, 44],
    ];

    for (let i = 0; i < n; i++) {
      for (let x = 0; x < sizes.length; x++) {
        xSpacing += spacing;
        cloudArray.push({
          x: xSpacing,
          y: Math.round(Math.random() * this.settings.cloudCanvas.height),
          width: 2,
          height: Math.round(Math.random() * (innerHeight / 10)),
          speed: Math.random() * maxSpeed + 1,
          imgWidth: sizes[x][0],
          imgHeight: sizes[x][1],
          img: cloudSource,
        });
      }
    }

    const draw = () => {
      this.settings.cloudCTX.clearRect(
        0,
        0,
        this.settings.cloudCanvas.width,
        this.settings.cloudCanvas.height
      );

      for (let i = 0; i < cloudArray.length; i++) {
        this.settings.cloudCTX.drawImage(
          cloudArray[i].img,
          cloudArray[i].x,
          cloudArray[i].y,
          cloudArray[i].imgWidth,
          cloudArray[i].imgHeight
        );
        cloudArray[i].x += cloudArray[i].speed / 1.5;

        if (cloudArray[i].x > this.settings.cloudCanvas.width) {
          cloudArray[i].x = 0 - cloudArray[i].imgWidth;
        }
      }

      this.settings.requestCloud = requestAnimationFrame(draw);
    };

    draw();
  }

  animateTime(time: string) {
    let timeSvg: string;

    if (time == "nighttime") {
      timeSvg =
        '<svg width="100px" height="101px" viewBox="0 0 100 101" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"><title>Artboard</title><desc>Created with Sketch.</desc><defs></defs><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g id="Artboard" sketch:type="MSArtboardGroup" transform="translate(0.000499, 0.000000)" fill="#FFFFC9"><path d="M45.1315012,97.851 C51.9675012,95.264 57.4325012,90.638 61.1685012,84.936 C47.2735012,89.682 32.0245012,82.374 27.0665012,68.515 C22.2195012,54.955 28.9805012,40.007 42.1495012,34.555 C35.5725012,32.74 28.4025012,32.877 21.5585012,35.462 C4.37450124,41.956 -4.34249876,61.263 2.14850124,78.441 C8.63950124,95.622 27.9485012,104.347 45.1315012,97.851 L45.1315012,97.851 L45.1315012,97.851 Z" id="Shape" sketch:type="MSShapeGroup"></path><path d="M78.9325012,81.972 L78.9355012,81.972 L79.0915012,82.343 L79.2495012,82.715 C79.9085012,84.26 79.7135012,86.681 78.8115012,88.101 L78.5995012,88.44 L76.7465012,91.359 L79.7875012,91.087 L79.7905012,91.087 L80.1935012,91.052 L80.5945012,91.014 C82.2645012,90.867 84.5065012,91.805 85.5765012,93.094 L85.8355012,93.406 L86.0965012,93.717 L88.0415012,96.07 L88.8125012,92.701 L88.9035012,92.307 C89.2795012,90.673 90.8635012,88.828 92.4215012,88.208 L92.7955012,88.057 L93.1685012,87.912 L93.1715012,87.908 L96.0075012,86.789 L93.3895012,85.217 L93.0435012,85.007 L92.6935012,84.801 C91.2545012,83.939 89.9955012,81.864 89.8845012,80.186 L89.8735012,80.02 L89.8355012,79.383 L89.8355012,79.38 L89.6425012,76.333 L87.3425012,78.337 L87.3425012,78.339 L86.8595012,78.76 L86.7315012,78.872 C85.4665012,79.976 83.1035012,80.536 81.4755012,80.12 L80.6945012,79.923 L77.7345012,79.167 L78.9325012,81.972 L78.9325012,81.972 Z" id="Shape" sketch:type="MSShapeGroup"></path><path d="M83.8435012,11.312 L84.2085012,11.485 L84.5735012,11.659 C86.0895012,12.381 87.5435012,14.327 87.8105012,15.985 L87.8725012,16.382 L88.4195012,19.795 L90.5175012,17.581 L90.7955012,17.288 L91.0695012,16.993 C92.2235012,15.775 94.5245012,14.989 96.1845012,15.25 L96.5815012,15.315 L96.9805012,15.376 L96.9845012,15.376 L99.9975012,15.851 L98.3465012,12.815 L98.1555012,12.46 C97.3525012,10.984 97.3205012,8.555 98.0795012,7.056 L98.2615012,6.695 L98.4475012,6.337 L99.8295012,3.617 L96.8315012,4.174 L96.8275012,4.174 L96.4285012,4.248 L96.0335012,4.322 C94.3845012,4.628 92.0615012,3.909 90.8755012,2.722 L90.7525012,2.603 L90.3045012,2.155 L90.3015012,2.153 L88.1405012,0 L87.7465012,3.022 L87.7465012,3.025 L87.6625012,3.657 L87.6385012,3.825 C87.4205012,5.49 86.0215012,7.475 84.5275012,8.242 L83.8055012,8.606 L83.8055012,8.608 L81.0895012,10 L83.8435012,11.31 L83.8435012,11.312 L83.8435012,11.312 Z" id="Shape" sketch:type="MSShapeGroup"></path><path d="M54.9225012,45.929 L55.3425012,46.339 C57.0745012,48.028 58.1595012,51.366 57.7475012,53.75 L57.6495012,54.326 L56.8065012,59.236 L60.7045012,57.189 L61.2155012,56.918 L61.7345012,56.648 C63.8795012,55.518 67.3855012,55.518 69.5295012,56.648 L70.0435012,56.918 L70.5555012,57.189 L70.5585012,57.189 L74.4555012,59.236 L73.6125012,54.326 L73.5145012,53.75 C73.1005012,51.366 74.1855012,48.028 75.9195012,46.339 L76.3375012,45.929 L76.7575012,45.526 L79.9105012,42.452 L75.5545012,41.819 L75.5505012,41.819 L74.3975012,41.653 C72.0025012,41.3 69.1685012,39.239 68.0945012,37.069 L67.9865012,36.852 L67.5815012,36.028 L67.5815012,36.024 L65.6325012,32.078 L63.6825012,36.024 L63.6825012,36.028 L63.2785012,36.852 L63.1705012,37.069 C62.0995012,39.239 59.2605012,41.3 56.8655012,41.653 L56.2865012,41.736 L55.7115012,41.819 L51.3535012,42.452 L54.5035012,45.526 L54.9225012,45.929 L54.9225012,45.929 Z" id="Shape" sketch:type="MSShapeGroup"></path><path d="M8.84350124,16.678 L6.99450124,19.597 L10.0345012,19.325 L10.4395012,19.29 L10.8395012,19.253 C12.5115012,19.105 14.7535012,20.043 15.8245012,21.333 L16.0805012,21.644 L16.3385012,21.955 L16.3415012,21.955 L18.2875012,24.307 L19.0575012,20.937 L19.1485012,20.543 C19.5215012,18.91 21.1045012,17.063 22.6635012,16.445 L23.0435012,16.293 L23.4165012,16.147 L23.4165012,16.146 L26.2575012,15.023 L23.6375012,13.455 L23.2905012,13.245 L22.9435012,13.04 C21.5025012,12.177 20.2425012,10.103 20.1325012,8.424 L20.1215012,8.258 L20.0825012,7.622 L20.0825012,7.62 L19.8855012,4.576 L17.5895012,6.579 L17.5865012,6.581 L17.1045012,7 L16.9785012,7.11 C15.7155012,8.214 13.3505012,8.776 11.7235012,8.359 L10.9415012,8.16 L7.98250124,7.404 L9.18050124,10.208 L9.18050124,10.21 L9.33950124,10.58 L9.49850124,10.953 C10.1565012,12.497 9.95750124,14.92 9.06050124,16.339 L8.84350124,16.678 L8.84350124,16.678 Z" id="Shape" sketch:type="MSShapeGroup"></path></g></g></svg>';
    } else {
      timeSvg =
        '<svg width="100px" height="100px" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"><title>sun</title><desc>Created with Sketch.</desc><defs></defs><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g id="Artboard" sketch:type="MSArtboardGroup"><g id="sun" sketch:type="MSLayerGroup"><path d="M50.001,76.927 C64.85,76.927 76.924,64.845 76.924,50 C76.924,35.154 64.85,23.075 50.001,23.075 C35.151,23.074 23.076,35.151 23.076,50 C23.076,64.849 35.151,76.927 50.001,76.927 L50.001,76.927 Z M50.001,26.778 C62.79,26.778 73.221,37.213 73.221,50 C73.221,62.788 62.789,73.222 50.001,73.222 C37.21,73.222 26.779,62.787 26.779,50 C26.779,37.212 37.211,26.778 50.001,26.778 L50.001,26.778 Z" id="Shape" sketch:type="MSShapeGroup"></path><path d="M50.001,73.222 C62.79,73.222 73.221,62.787 73.221,50 C73.221,37.213 62.789,26.778 50.001,26.778 C37.211,26.778 26.779,37.212 26.779,50 C26.779,62.787 37.21,73.222 50.001,73.222 L50.001,73.222 Z" id="Shape" fill="#FFFFC9" sketch:type="MSShapeGroup"></path><path d="M11.863,57.724 L0,65.452 L14.378,65.076 C22.272,64.872 26.566,70.491 23.915,77.576 L19.098,90.452 L30.498,82.108 C36.759,77.531 43.703,79.68 45.94,86.885 L50.001,100 L54.061,86.885 C56.296,79.68 63.241,77.531 69.502,82.108 L80.9,90.452 L76.083,77.576 C73.432,70.491 77.726,64.872 85.621,65.076 L99.998,65.452 L88.135,57.723 C81.622,53.475 81.622,46.527 88.138,42.281 L100,34.55 L85.622,34.927 C77.726,35.132 73.433,29.511 76.086,22.427 L80.905,9.55 L69.505,17.896 C63.244,22.47 56.3,20.321 54.064,13.117 L50.001,0 L45.94,13.115 C43.703,20.319 36.759,22.468 30.497,17.894 L19.098,9.549 L23.915,22.426 C26.567,29.509 22.272,35.129 14.378,34.926 L0,34.55 L11.862,42.281 C18.377,46.527 18.377,53.476 11.863,57.724 L11.863,57.724 Z M50.001,23.074 C64.85,23.074 76.924,35.153 76.924,49.999 C76.924,64.844 64.85,76.926 50.001,76.926 C35.151,76.927 23.076,64.849 23.076,50 C23.076,35.151 35.151,23.074 50.001,23.074 L50.001,23.074 Z" id="Shape" fill="#FFFFC9" sketch:type="MSShapeGroup"></path></g></g></g></svg>';
    }

    const timeSrc = "data:image/svg+xml;base64," + window.btoa(timeSvg);
    const timeSource = new Image();
    timeSource.src = timeSrc;

    const draw = () => {
      this.settings.timeCTX.clearRect(
        0,
        0,
        this.settings.timeCanvas.width,
        this.settings.timeCanvas.height
      );
      this.settings.timeCTX.drawImage(timeSource, 25, 100);
      this.settings.requestTime = requestAnimationFrame(draw);
    };

    draw();
  }

  animateLightning() {
    const lightningSVG =
      '<svg width="165px" height="478px" viewBox="0 0 165 478" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"><title>Shape</title><desc>Created with Sketch.</desc><defs></defs><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><path d="M100.879903,-8.99765934 L90.162516,133.004374 L100.879903,133.004374 L64.9851657,491.002341 L79.4836165,214.81442 L63.3793211,214.814428 L85.7571545,-8.99765934 L100.879903,-8.99765934 Z" id="Shape" fill="#FFFFFF" sketch:type="MSShapeGroup" transform="translate(82.129612, 241.002341) rotate(15.000000) translate(-82.129612, -241.002341) "></path></g></svg>';

    const lightningSrc =
      "data:image/svg+xml;base64," + window.btoa(lightningSVG);
    const lightningIMG = new Image();
    lightningIMG.src = lightningSrc;

    const thunderDraw = () => {
      this.settings.lightningCTX.clearRect(
        0,
        0,
        this.settings.lightningCanvas.width,
        this.settings.lightningCanvas.height
      );

      const flash = () => {
        // Apply the CSS class for the flash effect
        this.settings.lightningCanvas.classList.add("lightning-flash");

        const locx =
          Math.random() * (this.settings.lightningCanvas.width - 165);
        const locy =
          Math.random() * (this.settings.lightningCanvas.height - 478);
        this.settings.lightningCTX.drawImage(lightningIMG, locx, locy);

        const flashOff = () => {
          this.settings.lightningCTX.clearRect(
            0,
            0,
            this.settings.lightningCanvas.width,
            this.settings.lightningCanvas.height
          );
          // Remove the CSS class after the flash effect
          this.settings.lightningCanvas.classList.remove("lightning-flash");
        };

        setTimeout(flashOff, 100);
      };

      this.settings.refreshIntervalID = window.setInterval(flash, 5000);
    };

    thunderDraw();
  }

  animateAtmosphere() {
    const atmosphereSvg =
      '<svg width="96px" height="84px" viewBox="0 0 96 84" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"><title>Shape</title><desc>Created with Sketch.</desc><defs></defs><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g id="smoke" sketch:type="MSLayerGroup" transform="translate(-2.000000, 0.000000)" fill="' +
      this.settings.iconColor.atmosphere +
      '" fill-opacity=".5"><path d="M95.117,29.243 C97.344,27.148 97.949,23.727 96.388,20.943 C94.552,17.664 90.386,16.49 87.105,18.329 L86.942,18.42 C85.658,17.878 84.293,17.539 82.895,17.417 C83.716,14.407 83.501,11.099 82.026,8.082 C78.8,1.481 70.802,-1.263 64.202,1.962 C62.176,2.953 60.464,4.417 59.187,6.217 C54.886,2.788 48.852,2.013 43.736,4.512 C36.756,7.924 33.731,16.227 36.765,23.289 C34.461,24.777 32.927,27.152 32.445,29.772 C32.317,29.935 32.175,30.084 32.056,30.253 C27.755,26.823 21.72,26.048 16.604,28.548 C9.626,31.96 6.6,40.263 9.634,47.326 C6.615,49.274 4.907,52.743 5.171,56.297 C2.832,58.262 2.032,61.644 3.434,64.51 C3.82,65.301 4.343,65.976 4.955,66.534 C3.606,71.46 5.152,76.941 9.347,80.379 C15.031,85.035 23.446,84.196 28.1,78.515 C29.53,76.769 30.475,74.725 30.886,72.556 C34.082,73.35 37.446,73.011 40.408,71.671 C43.547,72.414 46.958,72.044 49.986,70.346 C51.954,69.244 53.58,67.687 54.753,65.816 C59.239,69 65.309,69.432 70.275,66.651 C73.293,64.956 75.467,62.338 76.655,59.349 C79.565,59.654 82.574,59.098 85.261,57.59 C91.673,53.996 94.297,46.234 91.66,39.58 C93.289,37.766 94.366,35.546 94.824,33.185 C95.184,31.921 95.293,30.579 95.117,29.243 L95.117,29.243 Z" id="Shape" sketch:type="MSShapeGroup"></path></g></g></svg>';

    const atmosphereSrc =
      "data:image/svg+xml;base64," + window.btoa(atmosphereSvg);
    const atmosphereSource = new Image();
    atmosphereSource.src = atmosphereSrc;

    const atmosphereArray: Array<{
      x: number;
      y: number;
      width: number;
      height: number;
      speed: number;
      imgWidth: number;
      imgHeight: number;
      img: HTMLImageElement;
    }> = [];
    const maxSpeed = 2;
    const spacing = 20;
    let xSpacing = 0;
    const n = Math.floor(innerWidth / spacing);
    const sizes = [
      [200, 150],
      [300, 200],
    ];

    for (let i = 0; i < n; i++) {
      for (let x = 0; x < sizes.length; x++) {
        xSpacing += spacing;
        atmosphereArray.push({
          x: xSpacing,
          y: Math.round(Math.random() * this.settings.weatherCanvas.height),
          width: 2,
          height: Math.round(Math.random() * (innerHeight / 10)),
          speed: Math.random() * maxSpeed + 1,
          imgWidth: sizes[x][0],
          imgHeight: sizes[x][1],
          img: atmosphereSource,
        });
      }
    }

    const draw = () => {
      this.settings.weatherCTX.clearRect(
        0,
        0,
        this.settings.weatherCanvas.width,
        this.settings.weatherCanvas.height
      );

      for (let i = 0; i < atmosphereArray.length; i++) {
        this.settings.weatherCTX.drawImage(
          atmosphereArray[i].img,
          atmosphereArray[i].x,
          atmosphereArray[i].y,
          atmosphereArray[i].imgWidth,
          atmosphereArray[i].imgHeight
        );
        atmosphereArray[i].x += atmosphereArray[i].speed / 1.5;

        if (atmosphereArray[i].x > this.settings.weatherCanvas.width) {
          atmosphereArray[i].x = 0 - atmosphereArray[i].imgWidth;
        }
      }

      this.settings.requestWeather = requestAnimationFrame(draw);
    };

    draw();
  }

  animateSnow() {
    const snowSvg =
      '<svg width="89px" height="100px" viewBox="0 0 89 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"><title>Shape</title><desc>Created with Sketch.</desc><defs></defs><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g id="Artboard" sketch:type="MSArtboardGroup" fill="' +
      this.settings.iconColor.snow +
      '"><path d="M36.786,50.287 L40.741,56.128 L48.106,56.128 L51.504,50.287 L47.924,44.067 L40.545,44.067 L36.786,50.287 L36.786,50.287 Z M39.819,97.261 L39.819,84.054 L32.44,88.204 L28.681,86.052 L28.681,81.399 L39.624,75.179 L39.624,66.499 L31.685,71.601 L31.685,62.405 L24.096,66.779 L24.096,79.247 L19.945,81.819 L16.437,79.498 L16.437,71.142 L4.919,77.64 L0,75.57 L0,70.3 L12.089,63.691 L4.528,59.89 L4.528,55.068 L8.819,52.719 L19.664,59.105 L27.197,54.759 L27.015,54.62 L19.314,50.203 L26.791,45.563 L19.286,41.217 L8.442,47.589 L4.374,45.563 L4.374,40.755 L11.713,36.632 L0,30.272 L0,25.003 L4.5,22.684 L16.044,29.35 L16.044,20.853 L19.524,18.505 L23.788,20.965 L23.76,33.683 L31.516,38.113 L31.489,29.127 L39.623,33.502 L39.623,24.822 L28.68,18.589 L28.68,13.977 L32.439,11.797 L39.818,15.948 L39.818,2.768 L44.04,0 L48.301,2.768 L48.301,15.948 L55.947,11.713 L59.792,14.257 L59.792,18.408 L48.47,24.822 L48.47,33.502 L56.214,28.778 L56.214,38.226 L64.193,33.878 L64.193,20.28 L68.037,18.491 L72.075,20.28 L72.075,28.974 L83.954,22.558 L88.107,25.088 L88.107,30.007 L76.506,36.604 L83.76,40.67 L83.76,45.367 L80,47.45 L68.862,40.867 L61.16,45.759 L68.609,50.401 L60.936,54.817 L68.862,58.967 L80,52.746 L83.578,55.276 L83.578,59.763 L76.59,63.69 L87.716,70.3 L87.716,75.488 L83.006,77.64 L72.075,71.419 L72.075,79.651 L68.148,81.845 L64.305,79.651 L64.305,67.155 L56.213,62.544 L56.213,71.224 L48.469,66.499 L48.469,75.179 L59.413,81.399 L59.413,86.319 L55.637,88.205 L48.3,84.055 L48.3,97.262 L44.04,100 L39.819,97.261 L39.819,97.261 Z" id="Shape" sketch:type="MSShapeGroup"></path></g></g></svg>';

    const snowSrc = "data:image/svg+xml;base64," + window.btoa(snowSvg);
    const snowSource = new Image();
    snowSource.src = snowSrc;

    const snowArray: Array<{
      x: number;
      y: number;
      width: number;
      height: number;
      speed: number;
      imgWidth: number;
      imgHeight: number;
      img: HTMLImageElement;
    }> = [];
    const maxSpeed = 2;
    const spacing = 50;
    let xSpacing = 0;
    const n = Math.floor(innerWidth / spacing);
    const sizes = [
      [89, 100],
      [50, 56.18],
      [70, 78.65],
    ];

    for (let i = 0; i < n; i++) {
      for (let x = 0; x < sizes.length; x++) {
        xSpacing += spacing;
        snowArray.push({
          x: Math.round(Math.random() * this.settings.weatherCanvas.width),
          y: Math.round(Math.random() * this.settings.weatherCanvas.height),
          width: 2,
          height: Math.round(Math.random() * (innerHeight / 10)),
          speed: Math.random() * maxSpeed + 1,
          imgWidth: sizes[x][0],
          imgHeight: sizes[x][1],
          img: snowSource,
        });
      }
    }

    const draw = () => {
      this.settings.weatherCTX.clearRect(
        0,
        0,
        this.settings.weatherCanvas.width,
        this.settings.weatherCanvas.height
      );

      for (let i = 0; i < snowArray.length; i++) {
        this.settings.weatherCTX.drawImage(
          snowArray[i].img,
          snowArray[i].x,
          snowArray[i].y,
          snowArray[i].imgWidth,
          snowArray[i].imgHeight
        );
        snowArray[i].y += snowArray[i].speed;
        snowArray[i].x += 1;

        if (snowArray[i].y > this.settings.weatherCanvas.height) {
          snowArray[i].y = 0 - snowArray[i].height;
          snowArray[i].x = Math.random() * this.settings.weatherCanvas.width;
        }

        if (snowArray[i].x > this.settings.weatherCanvas.width) {
          snowArray[i].x = 0 - 100;
        }
      }

      this.settings.requestWeather = requestAnimationFrame(draw);
    };

    draw();
  }

  animateExtreme() {
    const extremeSvg =
      '<svg width="80px" height="75px" viewBox="0 0 80 75" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"><title>warning</title><desc>Created with Sketch.</desc><defs></defs><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g id="Artboard" sketch:type="MSArtboardGroup" fill="' +
      this.settings.iconColor.extremeWeather +
      '"><g id="warning" sketch:type="MSLayerGroup"><path d="M35.59,2.789 L1.406,64.359 C-1.438,69.543 -0.23,74.5 7.457,74.5 L72.539,74.5 C80.244,74.5 81.435,69.543 78.59,64.359 L43.699,2.953 C42.992,1.57 41.965,0.042 39.785,0.062 C37.467,0.104 36.316,1.406 35.59,2.789 L35.59,2.789 Z M35.5,22.5 L43.5,22.5 L43.5,50.5 L35.5,50.5 L35.5,22.5 L35.5,22.5 Z M35.5,56.5 L43.5,56.5 L43.5,64.5 L35.5,64.5 L35.5,56.5 L35.5,56.5 Z" id="Shape" sketch:type="MSShapeGroup"></path></g></g></g></svg>';

    const extremeSrc = "data:image/svg+xml;base64," + window.btoa(extremeSvg);
    const extremeSource = new Image();
    extremeSource.src = extremeSrc;

    const extremeArray: Array<{
      x: number;
      y: number;
      width: number;
      height: number;
      imgWidth: number;
      imgHeight: number;
      img: HTMLImageElement;
    }> = [];
    const spacing = 50;
    let xSpacing = 0;
    const n = Math.floor(innerWidth / spacing);
    const sizes = [
      [89, 100],
      [50, 56.18],
      [70, 78.65],
    ];

    for (let i = 0; i < n; i++) {
      for (let x = 0; x < sizes.length; x++) {
        xSpacing += spacing;
        extremeArray.push({
          x: Math.round(Math.random() * this.settings.weatherCanvas.width),
          y: Math.round(Math.random() * this.settings.weatherCanvas.height),
          width: 2,
          height: Math.round(Math.random() * (innerHeight / 10)),
          imgWidth: sizes[x][0],
          imgHeight: sizes[x][1],
          img: extremeSource,
        });
      }
    }

    const draw = () => {
      this.settings.weatherCTX.clearRect(
        0,
        0,
        this.settings.weatherCanvas.width,
        this.settings.weatherCanvas.height
      );

      for (let i = 0; i < extremeArray.length; i++) {
        this.settings.weatherCTX.drawImage(
          extremeArray[i].img,
          extremeArray[i].x,
          extremeArray[i].y,
          extremeArray[i].imgWidth,
          extremeArray[i].imgHeight
        );
        extremeArray[i].y += 1;

        if (extremeArray[i].y > this.settings.weatherCanvas.height) {
          extremeArray[i].y = 0 - extremeArray[i].imgHeight;
          extremeArray[i].x = Math.random() * this.settings.weatherCanvas.width;
        }

        if (extremeArray[i].x > this.settings.weatherCanvas.width) {
          extremeArray[i].x = 0 - extremeArray[i].imgWidth;
        }
      }

      this.settings.requestWeather = requestAnimationFrame(draw);
    };

    draw();
  }
}
