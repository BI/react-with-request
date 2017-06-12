var Webpack = require('webpack')

module.exports = {
  entry: './src/WithRequest.js',
  output: {
    library: 'ReactWithRequest',
    libraryTarget: 'umd',
    path: 'dist',
    filename: 'react-with-request.js'
  },
  externals: {
    'react': {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react'
    }
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: { presets: ['react', 'es2015'] }
      }
    ]
  }
}
