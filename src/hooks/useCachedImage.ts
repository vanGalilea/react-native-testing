import AsyncStorage from '@react-native-community/async-storage'
import {useEffect, useState} from 'react'

const blobToBase64 = (blob: Blob): Promise<string> => {
  const reader = new FileReader()
  reader.readAsDataURL(blob)
  return new Promise(resolve => {
    reader.onloadend = () => {
      // @ts-ignore
      resolve(reader.result)
    }
  })
}

export const setImageInStorage = async (url: string): Promise<string> => {
  if (url != undefined) {
    const imageFromStorage = await AsyncStorage.getItem(url)
    if (imageFromStorage != undefined) {
      return imageFromStorage
    } else {
      const fetchResponse = await fetch(url)
      const blob = await fetchResponse.blob()
      const base64 = await blobToBase64(blob)
      await AsyncStorage.setItem(url, base64)
      return base64
    }
  }
  throw new Error(`url is ${typeof url}, please make sure there is a url`)
}

export default ({
  imageUrl,
}: {
  imageUrl: string | undefined
}): {image: string | undefined} => {
  if (!imageUrl) return {image: undefined}

  const [image, setImage] = useState<string>(imageUrl)

  const setCachedImage = async () => {
    try {
      const base64Data = await setImageInStorage(imageUrl)
      setImage(base64Data)
    } catch (error) {
      console.warn(`*** USE CACHED IMAGE ERROR --> ${error}`)
    }
  }

  useEffect(() => {
    setCachedImage().then(console.log)
  }, [imageUrl])

  return {image}
}
