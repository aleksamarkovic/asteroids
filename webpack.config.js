const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
const { merge } = require("webpack-merge");

module.exports = ({ mode, NODE_ENV }) => {
  const envConfig = require(`./webpack.${mode}`);
  process.env.NODE_ENV = NODE_ENV;

  return merge(
    {
      mode,
      entry: "./src/index.js",
      output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
      },
      plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({ template: "./src/index.html" }),
        new webpack.ProgressPlugin(),
      ],
      module: {
        rules: [
          {
            test: /\.css$/i,
            use: ["style-loader", "css-loader", "postcss-loader"],
          },
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env", "@babel/preset-react"],
              },
            },
          },
        ],
      },
    },
    envConfig
  );
};
