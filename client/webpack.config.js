const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  context: __dirname,
  entry: './src/index.js',
  output: {
    path: __dirname,
    filename: 'bundle.js',
  },

  module: {

    rules: [

      {
      test: /\.(js|jsx)$/,
      include: [
          /src/ ],
      loader: 'babel-loader',
      options: {
          presets: ["es2015"]
        }
      },

      {
      test: /\.scss$/,
        use: [{
          loader: ExtractTextPlugin.extract('css!sass'),
        }]
      }
  ],
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './',
  },
  // This lets us debug our react code in chrome dev tools. Errors will have lines and file names
  // Without this the console says all errors are coming from just coming from bundle.js
  devtool: "eval-source-map",
  plugins: [
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      output: { comments: false },
      mangle: false,
      sourcemap: false,
      minimize: true,
      mangle: { except: ['$super', '$', 'exports', 'require', '$q', '$ocLazyLoad'] },
    }),
    new ExtractTextPlugin({ filename: 'src/public/stylesheets/app.css', allChunks: true }),
  ],
};

module.exports = config;
