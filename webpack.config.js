const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "production",
  entry: './src/index.js', // Adjusted to point directly to your entry file
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "index.js",
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/, // Adjusted to include .js and .jsx
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",   // Preset for compiling ES6+
              "@babel/preset-react", // Preset for compiling JSX
            ],
          },
        },
      },
        {
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: "ts-loader",
          options: {
            configFile: "tsconfig.json"
          }
        }
      ],
      exclude: /node_modules/
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
      '/api': 'http://localhost:3000',
      secure: false,
    },
  },
};
