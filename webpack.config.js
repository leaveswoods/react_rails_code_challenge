const webpack = require('webpack');
const path = require('path');
const { readFileSync } = require('fs');
const entry = './app/javascript';

module.exports = {
  entry: {
    blog: path.resolve(entry, 'packs', 'blog.js')
  },
  output: {
    path: path.resolve('./public/packs/js'),
    filename: '[name].bundle.js'
  },
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          { loader: 'style-loader' },
          // css-loader
          { loader: 'css-loader' },
          // sass-loader
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        include: [path.resolve(entry)],
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: [
            'transform-modern-regexp',
            '@babel/plugin-syntax-dynamic-import',
            '@babel/plugin-proposal-class-properties',
            ['@babel/plugin-transform-runtime', { regenerator: true }],
            [
              'import',
              {
                libraryName: 'antd',
                libraryDirectory: 'es',
                style: 'css'
              }
            ]
          ]
        }
      }
    ]
  }
};
