const path = require('path');

const outputTypes = ['commonjs', 'module', 'umd'];

const targets = {
  commonjs: 'node12',
  umd: 'web',
  module: 'es2020'
};

function getBaseConfig(outputType) {
  return {
    entry: {
      'gsandf-ui': './src/index.ts'
    },

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: `[name].${outputType}.js`,
      library: {
        name: outputType === 'umd' ? 'gsandfui' : undefined,
        type: outputType
      },
      libraryTarget: outputType,
      module: outputType === 'module'
    },

    devtool: 'source-map',

    mode: 'production',

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        }
      ]
    },

    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      fallback: {
        stream: false
      }
    },

    target: targets[outputType],

    experiments: {
      outputModule: outputType === 'module'
    }
  };
}

module.exports = outputTypes.map(getBaseConfig);
