const path = require('path')
const jestPreset = require('@testing-library/react-native/jest-preset');

module.exports = {
    preset: '@testing-library/react-native',
    setupFilesAfterEnv: [
        './jest.setup.js'
    ],
    clearMocks: true,
    moduleDirectories: ['node_modules', path.join(__dirname, 'src')],
    setupFiles: ["./node_modules/react-native-gesture-handler/jestSetup.js"],
}
