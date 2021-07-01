module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        corejs: 3,
        loose: true,
        modules: false,
        targets: 'node 10',
        useBuiltIns: 'entry'
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['styled-components'],
    ['@babel/plugin-proposal-class-properties', { loose: true }]
  ]
};
