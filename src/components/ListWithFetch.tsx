import React, {useEffect, useState} from 'react'
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native'
import {Colors} from 'react-native/Libraries/NewAppScreen'
import axios from 'axios'

export default () => {
  const [flavorsData, setFlavorsData] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const response = await axios.get(
          'https://4ec38857-2800-4f07-838e-535a78cf7d51.mock.pstmn.io/flavors',
        )
        // @ts-ignore
        setFlavorsData(response.data)
      } catch (e) {
        setHasError(true)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  return (
    <View style={styles.body}>
      <Text>The Ice Cream Shoppe</Text>
      <Text>Today's Flavors</Text>
      {loading && (
        <ActivityIndicator
          color={'#000'}
          size={'large'}
          accessibilityLabel={'loader'}
        />
      )}
      {hasError && (
        <View style={styles.errorContainer} accessibilityLabel={'alert'}>
          <Text>Error oopsie!</Text>
        </View>
      )}
      {flavorsData.map(({name, image}) => (
        <View key={name} style={styles.flavorContainer}>
          <Image
            source={{uri: image}}
            style={styles.image}
            accessibilityLabel={`${name}-flavor`}
          />
          <Text>{name}</Text>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.white,
    alignItems: 'center',
    flex: 1,
  },
  errorContainer: {backgroundColor: '#C63939', padding: 16, borderRadius: 6},
  flavorContainer: {alignItems: 'center', margin: 8},
  image: {width: 100, height: 100},
})
