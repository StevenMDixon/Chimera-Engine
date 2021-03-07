// webpack.config.js

const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      },
      {
        test: /\.ts$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'ts-loader'
      },
      {
        test: /\.s?css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.wav$/,
        loader: 'file-loader'
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'images',
        },
      },
      // {
      //   test: /\.json$/,
      //   // We could restrict using json-loader only on .json files in the
      //   // node_modules/pixi.js directory, but the ability to load .json files
      //   // could be useful elsewhere in our app, so I usually don't.
      //   //include: path.resolve(__dirname, 'node_modules/pixi.js'),
      //   loader: 'json-loader'
      // },
    ]
    
  },
  resolve: { 
      extensions: ["*", ".js", ".jsx", '.ts']
  },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/dist/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3000,
    publicPath: "http://localhost:3000/dist/",
  },
}