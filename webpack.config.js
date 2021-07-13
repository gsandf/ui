const path = require('path');
const packageJson = require('./package.json');

const outputTypes = ['commonjs', 'module', 'umd'];

const targets = {
  commonjs: 'node12',
  umd: 'web',
  module: 'es2020'
};

const externalDependencies = [
  ...Object.keys(packageJson.dependencies),
  ...Object.keys(packageJson.peerDependencies)
];

const externals = externalDependencies.reduce((externals, packageName) => {
  return { ...externals, [packageName]: packageName };
}, {});

/**
 * @param {string} outputType
 * @return {import('webpack').Configuration}
 */
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

    experiments: {
      outputModule: outputType === 'module'
    },

    externals: outputType === 'umd' ? undefined : externals,

    mode: 'development',

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

    target: targets[outputType]
  };
}

module.exports = outputTypes.map(getBaseConfig);
