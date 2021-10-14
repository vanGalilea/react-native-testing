import {useState, useEffect} from 'react'
import {Dimensions, Image} from 'react-native'

export default (url: string): {imageHeight: number | null} => {
  const [imageHeight, setImageHeight] = useState<number | null>(null)

  useEffect(() => {
    if (url != null) {
      Image.getSize(
        url,
        (width, height) => {
          const screenWidth = Dimensions.get('window').width
          const scaleFactor = width / screenWidth
          const updatedImageHeight = height / scaleFactor
          setImageHeight(updatedImageHeight * 0.87)
        },
        () => () => {
          return null
        },
      )
    }
  }, [url])

  return {imageHeight}
}
