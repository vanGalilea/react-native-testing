import React, {useRef, useState} from 'react'
import {StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {Colors,} from 'react-native/Libraries/NewAppScreen'
// @ts-ignore
import Video from 'react-native-video'

// @ts-ignore
export default ({navigation}) => {
  const videoRef = useRef()
  const [isPlaying, setIsPlaying] = useState(true)
  const [isFullScreen, setIsFullScreen] = useState(false)
  navigation.setOptions({ headerShown: !isFullScreen })

  const showFullScreen = () => videoRef.current.presentFullscreenPlayer()
  const exitFullScreen = () => videoRef.current.dismissFullscreenPlayer()
  const pauseOrStart = () => null

  return (
    <View style={styles.body}>
      <View style={styles.sectionContainer}>
        <TouchableOpacity testID='full-screen' style={styles.button} onPress={showFullScreen}>
          <Text>Full screen</Text>
        </TouchableOpacity>
        <TouchableOpacity testID='pause' style={styles.button} onPress={pauseOrStart}>
          <Text>Pause/Start</Text>
        </TouchableOpacity>
      </View>
      <>
        <Video
           ref={videoRef}
           source={{uri: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4"}}
           style={isFullScreen ? styles.videoFullScreen : styles.video}
           resizeMode={'cover'}
           onFullscreenPlayerWillPresent={()=> setIsFullScreen(true)}
           onFullscreenPlayerDidDismiss={()=> setIsFullScreen(false)}
        />
      </>
      {
        isFullScreen &&
          <View style={styles.fullScreenBG}>
            <StatusBar hidden={true}/>
            <TouchableOpacity testID='full-screen' style={styles.button} onPress={exitFullScreen}>
              <Text>Exit full screen</Text>
            </TouchableOpacity>
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
