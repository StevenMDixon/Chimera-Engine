// webpack.config.js

const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './src/core.js',
  mode: 'development',
  devtool: "source-map",

  module: {
    rules: [ 
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      },
      {
        test: /\.s?css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: {
      extensions: ["*", ".js", ".jsx"]
  },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/dist/',
    filename: 'index.js',
    library: 'ChimeraEngine',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3000,
    publicPath: "http://localhost:3000/dist/",
  },
}