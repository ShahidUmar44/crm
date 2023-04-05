module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',

        {
          root: ['.'],
          alias: {
            '@assets': './assets',
            '@navigation': './src/navigation',
            '@feature': './src/feature',
            '@shared': './src/shared',
            '@utilities': './src/utilities',
            '@theme': './src/theme',
          },
        },
      ],
      'react-native-reanimated/plugin',
      'react-native-paper/babel',
    ],
  };
};
