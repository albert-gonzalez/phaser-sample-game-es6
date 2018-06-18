var path = require('path');
var webpack = require('webpack');

var definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
  WEBGL_RENDERER: true,
  CANVAS_RENDERER: true
});

module.exports = {
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: './dist/'
  },
  plugins: [
    definePlugin
  ],
  module: {
    rules: [
      { test: /phaser-split\.js$/, use: ['expose-loader?Phaser'] },
      { test: [/\.vert$/, /\.frag$/], use: 'raw-loader' },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              disable: true
            }
          }
        ]
      }
    ]
  },
  devtool: 'source-map',
  mode: process.env.WEBPACK_SERVE ? 'development' : 'production',
  serve: {
    dev: {
      publicPath: '/dist/'
    }
  }
};
