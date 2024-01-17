import React from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NavigationProps, SCREENS} from '../../App';
import {useNavigation} from '@react-navigation/native';

export default () => {
  const {navigate} = useNavigation<NavigationProps>();

  return (
    <View style={styles.body}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.flex1}>
        <ScrollView
          style={styles.flex1}
          contentInsetAdjustmentBehavior="automatic">
          <View style={styles.innerScrollView}>
            <Text>Go to component...</Text>
            <View>
              {Object.keys(SCREENS).map((key, i) => {
                const screenName = SCREENS[key];
                if (screenName === SCREENS.HOME) {
                  return null;
                }

                return (
                  <Pressable
                    key={i}
                    style={styles.button}
                    onPress={() => navigate(screenName)}>
                    <Text>{screenName}</Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  body: {
    backgroundColor: Colors.white,
    ...StyleSheet.absoluteFillObject,
  },
  innerScrollView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  sectionContainer: {
    padding: 24,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  button: {
    borderRadius: 8,
    padding: 6,
    margin: 6,
    backgroundColor: '#9ef8d4',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
