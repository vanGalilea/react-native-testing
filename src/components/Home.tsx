import React from 'react'
import {Button, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {Colors,} from 'react-native/Libraries/NewAppScreen'
import {SCREENS} from './App'

// @ts-ignore
export default ({ navigation }) => {
  return (
    <View style={styles.body}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1}}>
        <ScrollView style={{flex: 1}} contentInsetAdjustmentBehavior="automatic">
          <View style={styles.innerScrollView}>
            <Text>Go to component...</Text>
            <View>
              {
                Object.keys(SCREENS).map((key, i)=> {
                  const screenName = SCREENS[key]
                  if (screenName === SCREENS.HOME) return null

                  return (
                    <TouchableOpacity
                      key={i} style={{padding: 8}}
                      onPress={() => navigation.navigate(screenName)}
                    >
                      <Text>{screenName}</Text>
                    </TouchableOpacity>
                  )
                }
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.white,
    ...StyleSheet.absoluteFillObject
  },
  innerScrollView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16
  },
  sectionContainer: {
    padding: 24,
    alignItems: "center"
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  button: {
    borderRadius: 12,
    padding: 6,
    margin: 6,
    backgroundColor: "#9e9ef8",
    justifyContent: "center",
    alignItems: "center"
  }
})
