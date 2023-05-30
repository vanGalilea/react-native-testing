const path = require('path');

module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['./jest.setup.js'],
  // This is needed to mock the react-native-gesture-handler
  setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js'],
  clearMocks: true,
  moduleDirectories: ['node_modules', path.join(__dirname, 'src')],
  // This is needed to be able to render images in tests and transform them to mocks
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/assetsTransformer.js',
    '\\.(css|less)$': '<rootDir>/assetsTransformer.js',
  },
  transform: {},
};
