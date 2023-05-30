### This is how you should test 🧪 your react-native ⚛️ components with [Jest](https://jestjs.io/) and [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)

In this repo you'll find several examples that will cover:
- 👆 [Clicking buttons and asserting onPress' outcome](https://github.com/vanGalilea/react-native-testing/blob/master/__tests__/Counter.test.tsx).
- 📲 [Filling a simple login form and asserting successful submission](https://github.com/vanGalilea/react-native-testing/blob/master/__tests__/LoginSubmission.test.tsx).
- 🎣 [Custom hook testing (number of alternatives)](https://github.com/vanGalilea/react-native-testing/blob/master/__tests__/CounterUsesCustomHook.test.tsx).
- 📡 [Mocking fetch calls](https://github.com/vanGalilea/react-native-testing/blob/master/__tests__/LoginSubmission.test.tsx#L36).
- 🧭 [Mocking navigation through screens](https://github.com/vanGalilea/react-native-testing/blob/master/__tests__/LoginSubmission.test.tsx#L13). ([react navigation v5](https://reactnavigation.org/))
- 🔚 [E2E feel due to real navigation throughout screens](https://github.com/vanGalilea/react-native-testing/blob/master/__tests__/Home.test.tsx).
- 📥 [Handling and mocking providers](https://github.com/vanGalilea/react-native-testing/blob/master/src/test/test-utils.tsx).
- 📹 [Mocking external lib.'s components](https://github.com/vanGalilea/react-native-testing/blob/master/__tests__/Video.test.tsx).
- 🎭 [Mocking and interacting with RN's Modal component](https://github.com/vanGalilea/react-native-testing/blob/master/__tests__/Modal.test.tsx).
- 🧾 [Handling with a screen with RN's FlatList component](https://github.com/vanGalilea/react-native-testing/blob/master/__tests__/FlatList.test.tsx).
- 📡 [Using MSW to mock api calls and handling loading/errors](https://github.com/vanGalilea/react-native-testing/blob/master/__tests__/ListWithFetch.test.tsx).

### How to run the tests 🏃‍♀️
- Clone the repo
- Run `yarn` to install dependencies
- Run `yarn test` to run the tests
- Run `yarn test:coverage` to run the tests and generate a coverage report


### How to run the app 📱
- Clone the repo
- Run `yarn` to install dependencies
- Run `npx pod-install` to install iOS dependencies
- Run `yarn start` to start the metro bundler
- Click `i` to run the app on iOS simulator or `a` to run it on Android emulator

### Ideas and future improvements 🚀
- 📱 Add E2E tests with Maestro
- ⚛️ Add tests for react native web project

### Inspiration, resources and further reading 📚
- 👏 Inspired by [Kent C. Dodds'](https://testingjavascript.com/) workshop [Test React Components with Jest and React Testing Library](https://github.com/testing-library/react-testing-library). 
For more info check [Epic React](https://epicreact.dev/).
- 📕 [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)
- 🧑‍🔬️ [Jest](https://jestjs.io/)
- ️⚛️ [React Native](https://reactnative.dev/)
- 🗺 [React Navigation](https://reactnavigation.org/)
- 🛰 [MSW](https://mswjs.io/)

