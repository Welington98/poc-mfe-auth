const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');
const commonConfig = require('./webpack.common');
const CopyWebpackPlugin = require('copy-webpack-plugin');


const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/',
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'auth',
      filename: 'remoteEntry.js',
      exposes: {
        './AuthApp': './src/bootstrap',
      },
      shared: packageJson.dependencies,
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public/_redirects', to: '.' }, // Isso garante que _redirects vá para dashboard/latest/
      ],
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
