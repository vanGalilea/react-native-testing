import React, {useCallback, useEffect, useState} from 'react';
import {Pressable, StatusBar, StyleSheet, Text, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Video from 'react-native-video';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../App';

const SOME_VIDEO =
  'https://d192a4z5wljn2.cloudfront.net/ervNPPeH/hoookedup/5938/TvtX4P6AYH.mp4';

export default () => {
  const {setOptions} = useNavigation<NavigationProps>();
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  useEffect(() => {
    setOptions({headerShown: !isFullScreen});
  }, [isFullScreen, setOptions]);

  const showFullScreen = () => setIsFullScreen(true);
  const exitFullScreen = () => setIsFullScreen(false);

  const togglePause = useCallback(() => setIsPlaying(!isPlaying), [isPlaying]);

  const resetMediaState = useCallback(() => {
    setIsPlaying(false);
    setIsFullScreen(false);
  }, []);

  useEffect(() => {
    return resetMediaState;
  }, [resetMediaState]);

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
          accessibilityLabel={'video-player'}
          source={{uri: SOME_VIDEO}}
          style={isFullScreen ? styles.videoFullScreen : styles.video}
          resizeMode={'cover'}
          onError={console.log}
          paused={!isPlaying}
          fullscreen={isFullScreen}
        />
      </>
      {isFullScreen && (
        <View style={styles.fullScreenBG}>
          <StatusBar hidden={true} />
          <Pressable style={styles.button} onPress={exitFullScreen}>
            <Text>Exit full screen</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={togglePause}>
            <Text>Pause / Start</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.white,
    alignItems: 'center',
    flex: 1,
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
    borderRadius: 12,
    padding: 6,
    margin: 6,
    backgroundColor: '#9e9ef8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: 200,
    height: 200,
  },
  videoFullScreen: {
    width: '100%',
    height: 200,
    zIndex: 5,
  },
  fullScreenBG: {
    backgroundColor: Colors.black,
    ...StyleSheet.absoluteFillObject,
  },
});
