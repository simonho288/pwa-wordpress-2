var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var path = require('path');
var WriteFilePlugin = require('write-file-webpack-plugin');

var extractSCSS = new ExtractTextPlugin('app.bundle.css');
var extractHtml = new ExtractTextPlugin('[name].html');

module.exports = [{
  entry: {
    home: path.resolve(__dirname, './src/pug/home.pug'),
    blogs: path.resolve(__dirname, './src/pug/blogs.pug'),
    pages: path.resolve(__dirname, './src/pug/pages.pug'),
    pageview: path.resolve(__dirname, './src/pug/pageview.pug'),
    postview: path.resolve(__dirname, './src/pug/postview.pug'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].html'
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: extractHtml.extract(['html-loader', 'pug-html-loader?pretty&exports=false'])
      }
    ]
  },
  plugins: [
    extractHtml
  ]
}, {
  entry: {
    app: path.resolve(__dirname, './src/app.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        include: path.resolve(__dirname, 'src'),
        loader: "babel-loader"
      },
      {
        test: /\.scss$/,
        use: extractSCSS.extract(['css-loader', 'postcss-loader', 'sass-loader'])
      },
      {
        test: /\.pug$/,
        use: extractHtml.extract(['html-loader', 'pug-html-loader?pretty&exports=false'])
      }
    ]
  },
  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true, // gzipped
    port: 8080,
    // stats: 'errors-only'
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      options: {
        postcss: [
          autoprefixer({
            browsers: ['last 2 version', 'Explorer >= 10', 'Android >= 4']
          })
        ]
      }
    }),
    extractSCSS,
    new WriteFilePlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      Tether: 'tether'
    })
  ]
}]