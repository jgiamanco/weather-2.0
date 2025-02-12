const path = require("path");
const Dotenv = require("dotenv-webpack");
const webpack = require("webpack");
const fs = require("fs");

// Load environment variables from .env file
const env = fs.existsSync(path.resolve(__dirname, ".env"))
  ? require("dotenv").config({ path: path.resolve(__dirname, ".env") }).parsed
  : {};

// Create an object to hold the environment variables
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  mode: "production", // Set the mode to 'development' or 'production'
  entry: "./src/main.ts", // Ensure this path is correct
  output: {
    filename: "weather.js",
    path: path.resolve(__dirname, "public"), // Change 'dist' to 'public'
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new Dotenv({
      systemvars: true,
    }),
    new webpack.DefinePlugin(envKeys), // Replace process.env variables
  ],
};
