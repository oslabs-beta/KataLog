<<<<<<< HEAD
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const CopyPlugin = require('copy-webpack-plugin');
=======
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
>>>>>>> 2b807db25613b80fc4e15637c028c5a28196860d

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
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: ['file-loader'],
      },
    ],
  },
  resolve: {
<<<<<<< HEAD
    extensions: [".tsx", ".ts", ".js"],
=======
    extensions: ['.tsx', '.ts', '.js', '.png'],
>>>>>>> 2b807db25613b80fc4e15637c028c5a28196860d
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "./dist"),
    },
    client: { webSocketTransport: "sockjs" },
    webSocketServer: "sockjs",
    proxy: {
<<<<<<< HEAD
      "/api": {
        target: "http://localhost:3000",
      },
    },
    // proxy: {
    //   "/api": "http://localhost:3000",
    //   secure: false,
    // },
=======
      '/api': 'http://localhost:3000',
      secure: false,
    },
>>>>>>> 2b807db25613b80fc4e15637c028c5a28196860d
  },
};
