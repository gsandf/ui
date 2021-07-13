const path = require('path');
const packageJson = require('./package.json');

const outputTypes = ['commonjs', 'module'];

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
      library: { type: outputType },
      libraryTarget: outputType,
      module: outputType === 'module'
    },

    devtool: 'source-map',

    experiments: {
      outputModule: outputType === 'module'
    },

    externals: externals,

    mode: 'development',

    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    corejs: 3,
                    loose: true,
                    modules: outputType === 'commonjs' ? 'commonjs' : false,
                    targets:
                      outputType === 'modules'
                        ? { esmodules: true }
                        : 'node 12',
                    useBuiltIns: 'entry'
                  }
                ],
                '@babel/preset-react',
                '@babel/preset-typescript'
              ],
              plugins: [
                ['styled-components'],
                ['@babel/plugin-proposal-class-properties', { loose: true }]
              ]
            }
          }
        }
      ]
    },

    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      fallback: {
        stream: false
      }
    },

    target: outputType === 'commonjs' ? 'node12' : 'es2020'
  };
}

module.exports = outputTypes.map(getBaseConfig);
