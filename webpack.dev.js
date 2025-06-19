const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  devtool: "eval-source-map",
  devServer: {
    watchFiles: ["./src/template.html"],
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"), // Serve files from 'dist'
    },
    port: 8080, // Specify the port on which the development server will run
    hot: true, // Enable Hot Module Replacement (HMR) for live updates without a full reload
    open: true, // Automatically open the default browser when the server starts
    compress: true, // Enable gzip compression for serving files to improve performance
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
    }),
  ],
  module: {
    rules: [

      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  
};
