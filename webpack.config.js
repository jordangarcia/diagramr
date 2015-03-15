var path = require('path')

module.exports = {
  entry: {
    app: './src/main.js',
  },

  output: {
    path: './dist/',
    filename: "[name].js",
  },

  resolve: {
    root: [
      // when requiring a non-relative path resolve to optly directory firstthen node_modules
      path.resolve(__dirname, './src'),
      path.resolve(__dirname, './node_modules'),
    ],
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
      // required for react jsx
      { test: /\.js$/, loader: "jsx-loader" },
      { test: /\.jsx$/, loader: "jsx-loader?insertPragma=React.DOM" },
    ]
  },
};
