import {Image, ImageStyle, ImageURISource, StyleSheet, View} from 'react-native'
import useCachedImage from '../hooks/useCachedImage'
import useImageHeight from '../hooks/useImageHeight'
import SkeletonLoadingIndicator from './SkeletonLoadingIndicator'
import React, {useEffect} from 'react'

const RANDOM_IMAGE_URI =
  'https://images.unsplash.com/photo-1616924551095-5156721a1cbc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1664&q=80'
const CachedImage: React.FC<{
  style?: ImageStyle
  source: ImageURISource
}> = ({style, source}) => {
  const {image} = useCachedImage({imageUrl: source.uri})
  const {imageHeight} = image ? useImageHeight(image) : {imageHeight: null}
  if (image == undefined || imageHeight == undefined) {
    return <SkeletonLoadingIndicator />
  }

  return (
    <Image
      style={{height: imageHeight, width: '90%', ...style}}
      source={{uri: image}}
    />
  )
}

export default () => {
  return (
    <View style={styles.centeredView}>
      <CachedImage
        source={{
          uri: RANDOM_IMAGE_URI,
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
