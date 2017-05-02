var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HTMLWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

const DEVELOPMENT = process.env.NODE_ENV === 'development';
const PRODUCTION = process.env.NODE_ENV === 'production';

const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: DEVELOPMENT
});

var plugins = PRODUCTION
    ?   [
          new webpack.optimize.UglifyJsPlugin(),
          extractSass,
          new HTMLWebpackPlugin({
            template: path.resolve(__dirname, "src/index_template.html")
          }),
          new webpack.LoaderOptionsPlugin({
            options: {
              postcss: [autoprefixer]
            }
          }),
          // new webpack.optimize.CommonsChunkPlugin({
          //     name: 'vendor',
          // })
        ]
   :   [];//[new webpack.HotModuleReplacementPlugin()];

plugins.push(
    new webpack.DefinePlugin({
        DEVELOPMENT: JSON.stringify(DEVELOPMENT),
        PRODUCTION: JSON.stringify(PRODUCTION)
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new LodashModuleReplacementPlugin({
      'collections': true,
      'paths': true
    })
);

const config = {
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: PRODUCTION ? '/' : '/public/',
    filename: PRODUCTION ? '[chunkhash].[name].min.js' : 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        use: extractSass.extract({
          use: [{
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 2
            }
          }, {
            loader: 'postcss-loader'
          }, {
            loader: 'sass-loader',
            options: {
              includePaths: [path.resolve(__dirname, "node_modules")]
            }
          }],
          fallback: "style-loader"
        })
      },
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      }, {
        test: /\.css$/,
        use: extractSass.extract({
          use: "css-loader",
          fallback: "style-loader"
        }),
        exclude: /(node_modules|bower_components)/
      }, {
        test: /\.(png|jpg|gif)$/,
        loaders: ['url-loader?limit=20000&name=images/[hash:12].[ext]'],
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  resolve: {
    alias: {
      actions: path.resolve(__dirname, "src/actions/actions.jsx"),
      reducers: path.resolve(__dirname, "src/reducers/reducers.jsx"),
      configureStore: path.resolve(__dirname, "src/store/configureStore.jsx"),
      applicationStyles: path.resolve(__dirname, "src/styles/index.scss")
    },
    modules: [
      path.resolve(__dirname, "src"),
      path.resolve(__dirname, "src/components"),
      path.resolve(__dirname, "src/tests"),
      path.resolve(__dirname, "src/api"),
      "node_modules"
    ],
    extensions: ['.js', '.jsx']
  },
  plugins: plugins
};

module.exports = config;
