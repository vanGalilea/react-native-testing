import {Linking, StyleSheet, Text, View} from 'react-native';
import { Link } from 'expo-router';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to React Native Testing- Expo 👋</Text>
      <Text
        style={styles.link}
        onPress={() => Linking.openURL('https://expo.io')}>
        Expo Documentation
      </Text>
      <Link href="/counter">Counter</Link>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
  },
  link: {
    fontSize: 20,
    color: "blue",
  },
});

