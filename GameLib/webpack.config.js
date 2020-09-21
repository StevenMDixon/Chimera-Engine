// webpack.config.js

const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './src/index.ts',
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
        loader: 'file-loader'
      }
    
    ]
  },
  resolve: { 
      extensions: ["*", ".js", ".jsx", '.ts']
  },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/dist/',
    filename: 'index.js',
    library: 'GameLib',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3000,
    publicPath: "http://localhost:3000/dist/",
  },
}