const path = require("path");
const Dotenv = require("dotenv-webpack");

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
      path: path.resolve(__dirname, ".env"), // Load .env file
    }),
  ],
};
