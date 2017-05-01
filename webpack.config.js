var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HTMLWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');

const DEVELOPMENT = process.env.NODE_ENV === 'development';
const PRODUCTION = process.env.NODE_ENV === 'production';

var plugins = PRODUCTION
    ?   [
          new webpack.optimize.UglifyJsPlugin(),
          new ExtractTextPlugin('style-[contenthash:10].css'),
          new HTMLWebpackPlugin({
            template: path.resolve(__dirname, "app/index_template.html")
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
  // :   [new webpack.HotModuleReplacementPlugin()];

plugins.push(
    new webpack.DefinePlugin({
        DEVELOPMENT: JSON.stringify(DEVELOPMENT),
        PRODUCTION: JSON.stringify(PRODUCTION)
    })
);

const cssIdentifier = PRODUCTION ? '[hash:base64:10]' : '[path][name]---[local]';

const cssLoader = PRODUCTION
    ?   ExtractTextPlugin.extract({
            loader: 'css-loader?localIdentName=' + cssIdentifier + '!postcss-loader'
        })
    :   ['style-loader', 'css-loader?localIdentName=' + cssIdentifier + '!postcss-loader'];

const config = {
  entry: './app/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: PRODUCTION ? '/' : '/public/',
    filename: PRODUCTION ? '[chunkhash].[name].min.js' : 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      }, {
        test: /\.css$/,
        loaders: cssLoader,
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
      actions: path.resolve(__dirname, "app/actions/actions.jsx"),
      reducers: path.resolve(__dirname, "app/reducers/reducers.jsx"),
      configureStore: path.resolve(__dirname, "app/store/configureStore.jsx"),
    },
    modules: [
      path.resolve(__dirname, "app"),
      path.resolve(__dirname, "app/components"),
      path.resolve(__dirname, "app/tests"),
      path.resolve(__dirname, "app/api"),
      "node_modules"
    ],
    extensions: ['.js', '.jsx']
  },
  plugins: plugins
};

module.exports = config;
