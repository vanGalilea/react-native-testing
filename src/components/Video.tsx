import React, {useEffect, useState} from 'react'
import {StatusBar, StyleSheet, Text, Pressable, View} from 'react-native'
import {Colors} from 'react-native/Libraries/NewAppScreen'
// @ts-ignore
import Video from 'react-native-video'

// @ts-ignore
export default ({navigation}) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isFullScreen, setIsFullScreen] = useState(false)

  useEffect(()=> {
    navigation.setOptions({ headerShown: !isFullScreen })
  }, [isFullScreen])

  const showFullScreen = () => setIsFullScreen(true)
  const exitFullScreen = () => setIsFullScreen(false)
  const togglePause = () => setIsPlaying(!isPlaying)

  return (
    <View style={styles.body}>
      <View style={styles.sectionContainer}>
        <Pressable style={styles.button} onPress={showFullScreen}>
          <Text>Full screen</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={togglePause}>
          <Text>Pause/Start</Text>
        </Pressable>
      </View>
      <>
        <Video
          accessibilityLabel={"video component"}
          source={{uri: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4"}}
          style={isFullScreen ? styles.videoFullScreen : styles.video}
          resizeMode={'cover'}
          paused={isPlaying}
          fullscreen={isFullScreen}
        />
      </>
      {
        isFullScreen &&
          <View style={styles.fullScreenBG}>
            <StatusBar hidden={true}/>
            <Pressable style={styles.button} onPress={exitFullScreen}>
              <Text>Exit full screen</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={togglePause}>
              <Text>Pause / Start</Text>
            </Pressable>
          </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.white,
    alignItems: "center",
    flex: 1
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
  },
  video: {
    width: 100,
    height: 100
  },
  videoFullScreen: {
    width: "100%",
    height: 200,
    zIndex: 5
  },
  fullScreenBG: {
    backgroundColor: Colors.black,
    ...StyleSheet.absoluteFillObject
  }
})
