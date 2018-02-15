const webpack = require('webpack');
const resolve = require('path').resolve;
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const paths = {
  indexJs: resolve(__dirname, 'index.js'),
  indexHtml: resolve(__dirname, 'index.html'),
  dist: resolve(__dirname, 'dist'),
};

module.exports = (env) => {
  const config = {
    entry: paths.indexJs,
    output: {
      filename: 'js/[name].[hash].js',
      path: paths.dist,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'sass-loader']
          }),
        },
      ],
    },
    plugins: [
      new webpack.optimize.ModuleConcatenationPlugin(),
      new CleanWebpackPlugin(paths.dist, { root: __dirname }),
      new ExtractTextPlugin({ filename: 'css/[name].[hash].css', allChunks: true }),
      new HtmlWebpackPlugin({
        inject: true,
        template: paths.indexHtml,
      }),
    ],
    devtool: 'eval',
    devServer: {
      contentBase: paths.dist,
      compress: true,
      port: 3000,
    },
  };

  if (env.prod) {
    config.devtool = false;
  }

  return config;
};
