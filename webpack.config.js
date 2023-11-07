const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isDockerBuild = process.env.DOCKER_BUILD === 'true';

module.exports = {
  mode: "development",
  entry: isDockerBuild ? "./App.tsx" : "./src/App.tsx",
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
        test: /\.(css)$/, // Add this rule for CSS files
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: ['file-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.png'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: isDockerBuild ? "./index.html" : "./src/index.html",
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
      '/api': 'http://localhost:3000',
      secure: false,
    },
  },
};
