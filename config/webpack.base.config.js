const webpack = require("webpack");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const paths = require("./paths");
const config = require("./config");

process.noDeprecation = true;
const nodeEnvironment = process.env.NODE_ENV || "development";
const isProduction = nodeEnvironment === "production";

module.exports = {
  entry: paths.entryPath,
  serve: {
    content: paths.entryPath,
    dev: {
      publicPath: paths.outputPath
    },
    open: true
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.(js|jsx|ts|tsx)$/,
        loader: "eslint-loader",
        exclude: /(node_modules)/
        // options: {
        //   emitWarning: !isProduction
        // }
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: [/(node_modules)/, /\.(test|spec).tsx?$/],
        use: ["awesome-typescript-loader", "react-docgen-typescript-loader"]
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: "babel-loader"
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: "file-loader?hash=sha512&digest=hex&name=[name].[hash].[ext]",
            options: {
              outputPath: paths.imagesPath
            }
          },
          {
            loader: "image-webpack-loader",
            options: {
              progressive: true,
              optimizationLevel: 7,
              interlaced: false,
              pngquant: {
                quality: "65-90",
                speed: 4
              }
            }
          }
        ]
      },
      {
        test: /\.(woff2|ttf|woff|eot|txt)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: paths.fontsPath
            }
          }
        ]
      }
    ]
  },
  resolve: {
    modules: ["src", "node_modules"],
    extensions: ["*", ".ts", ".tsx", ".js", ".jsx", ".css", ".scss"]
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEV__: !isProduction,
      env: nodeEnvironment,
      "process.env": {
        NODE_ENV: JSON.stringify(nodeEnvironment)
      }
    }),
    new webpack.ContextReplacementPlugin(
      /date-fns[/\\]/,
      new RegExp(`[/\\\\\](${config.supportedLocales.join("|")})[/\\\\\]`)
    ),
    new DuplicatePackageCheckerPlugin({
      verbose: true
    }),
    new CopyWebpackPlugin({patterns: [{from: "public", to: "./"}]})
  ]
};
