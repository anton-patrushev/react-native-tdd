const transformIgnore = [
  '@react-native',
  'react-native',
  'react-native-toast-message',
];

module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFiles: ['./jest.setup.js'],
  transformIgnorePatterns: [`node_modules/(?!(${transformIgnore.join('|')})/)`],
};
