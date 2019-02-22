const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

var config = {
  output: {
    filename: "promokit-layer.js",
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "umd",
  },
  devServer: {
    contentBase: "./dist",
    hot: true,
    host: "172.20.60.44",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  "modules": false,
                  "targets": {
                    "browsers": [
                      "last 2 versions",
                      "ie >= 9",
                    ],
                  },
                },
              ],
            ],
            plugins: ["@babel/plugin-transform-object-assign"],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg)$/,
        use: [
          "url-loader",
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "index.html",
      inject: true,
    }),
  ],
};

module.exports = (env, argv) => {
  if (argv.mode === "development") {
    config.entry = {
      app: "./src/dev.js",
    };
    config.devtool = "inline-source-map";
  }

  if (argv.mode === "production") {
    config.entry = {
      app: "./src/index.js",
    };

  }

  return config;
};