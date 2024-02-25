'use strict';
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const webpack = require('webpack');

const { styleLoaders } = require('./vue.utils');
const config = require('./config');

module.exports = (env, options) => {
  const devConfig = {
    module: {
      rules: styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true }),
    },
    // cheap-module-eval-source-map is faster for development
    devtool: config.dev.devtool,
    output: {
      filename: 'app/[name].[contenthash].bundle.js',
      chunkFilename: 'app/[id].[chunkhash].chunk.js',
    },
    optimization: {
      moduleIds: 'named',
    },
    plugins: [],
  };
  if (!options.env.WEBPACK_SERVE) return devConfig;
  devConfig.plugins.push(
    new BrowserSyncPlugin(
      {
        // host: 'localhost',
        host: '0.0.0.0',
        port: 9000,
        proxy: {
          target: `http://localhost:${options.watch ? '8080' : '9060'}`,
          ws: true,
        },
        socket: {
          clients: {
            heartbeatTimeout: 60000,
          },
        },
      },
      {
        reload: true,
      }
    )
  );
  return devConfig;
};
