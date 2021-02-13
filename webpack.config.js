const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    //publicPath: '/dist/',
    host: '0.0.0.0',
    port: 8080,
    },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {//CSS处理
        test: /\.css$/,
        loader: "style-loader!css-loader?modules",
        exclude: /node_modules/,
      },

      {
        test: /\.html$/,
        use: {
          loader: 'html-loader'
        }
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  plugins: [
    new HtmlWebPackPlugin({
      titel: 'test app',
      filename: 'index.html',
      template: './src/index.html'
    })
  ]
};
