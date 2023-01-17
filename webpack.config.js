const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts"],
    modules: [path.resolve(__dirname, "node_modules")],
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
    },
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "bundle.css",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "public/img"),
          to: "img",
          noErrorOnMissing: true,
        },
        {
          from: path.resolve(__dirname, "public/styles"),
          to: "styles",
          noErrorOnMissing: true,
        },
      ],
    }),
  ],
  devServer: {
    static: path.join(__dirname, "public"),
    compress: true,
    port: 5500,
  },
  devtool: "source-map",
};
