const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: "development",
  entry: "./src/App.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
    }),
    // new CopyPlugin({
    //   patterns: [{ from: './src/client/style.css' }],
    // }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "./dist"),
    },
    client: { webSocketTransport: "sockjs" },
    webSocketServer: "sockjs",
    proxy: {
      "/api": {
        target: "http://localhost:3000",
      },
    },
    // proxy: {
    //   "/api": "http://localhost:3000",
    //   secure: false,
    // },
  },
};
