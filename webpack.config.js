module.exports = {
  context: __dirname + "/app",
  entry: {
    js: "./entry.jsx",
    html: "./index.html"
  },
  output: {
    path: __dirname + "/public",
    filename: "bundle.js"
  },

  devServer: {
    contetnBase: "public",
    port: 3000,
    inline: true,
    historyApiFallback: true
  },
  resolve: {
    extensions: ["", ".js", ".html", ".jsx"]
  },

  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: "file-loader?name=[name].[ext]"
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["latest", "react"]
        }
      }
    ]
  }
}
