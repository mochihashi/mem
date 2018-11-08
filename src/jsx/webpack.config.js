/**
 * create script.js from jsx/script.js
 * 
 * 開発時には、次のようにすると、常にコンパイルしてくれる
 * > cd jsx/
 * > `npm bin`/webpack --config webpack.config.js --mode development --watch
 */
var path = require('path');
module.exports = {
    entry: path.resolve(__dirname, 'script.js'), // エントリポイントのjsxファイル
    output: {
      path: path.resolve(__dirname, '../../public/js/'),
      filename: 'script.js'
    },
    resolve: {
      modules: [__dirname, "node_modules"]
    },
    module: {
      rules: [{
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          plugins: ["babel-plugin-transform-decorators-legacy"]
        }
      }]
    }
}