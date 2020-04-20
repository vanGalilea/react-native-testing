import React from 'react'
import {Text, View} from 'react-native'
import Login from './Login'
import {useNavigation} from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'
import {SCREENS} from '../../App'

// @ts-ignore
const formSubmissionReducer = (state, action)=> {
  switch (action.type) {
    case 'START': {
      return {status: 'pending', responseData: null, errorMessage: null}
    }
    case 'RESOLVE': {
      return {
        status: 'resolved',
        responseData: action.responseData,
        errorMessage: null,
      }
    }
    case 'REJECT': {
      console.log(action)
      return {
        status: 'rejected',
        responseData: null,
        errorMessage: action.error.errors[0],
      }
    }
    default:
      throw new Error(`Unsupported type: ${action.type}`)
  }
}

// @ts-ignore
const useFormSubmission = ({endpoint, data})=> {
  const [state, dispatch] = React.useReducer(formSubmissionReducer, {
    status: 'idle',
    responseData: null,
    errorMessage: null,
  })

  const fetchBody = data ? JSON.stringify(data) : null

  React.useEffect(() => {
    if (fetchBody) {
      dispatch({type: 'START'})
      fetch(endpoint, {
          method: 'POST',
          body: fetchBody,
          headers: {
            'content-type': 'application/json',
          },
        })
        .then(r => r.json())
        .then(
          responseData => {
            dispatch({type: 'RESOLVE', responseData})
          },
          error => {
            dispatch({type: 'REJECT', error})
          },
        )
    }
  }, [fetchBody, endpoint])

  return state
}

const Spinner = ()=> {
  return (
    <View accessibilityLabel="loading...">
      <Text>loading...</Text>
    </View>
  )
}

// @ts-ignore
export default () => {
  const [formData, setFormData] = React.useState(null)
  const {status, responseData, errorMessage} = useFormSubmission({
    endpoint: '/api/login',
    data: formData,
  })

  const token = responseData?.token
  // @ts-ignore
  React.useEffect(() => {
    if (token) {
      const navigation = useNavigation()
      AsyncStorage.setItem('token', token)
      navigation.navigate(SCREENS.HOME)
    }
  }, [token])

  if (status === 'resolved') {
    // TODO: navigate away on submission success
    return null
  }

  return (
    <>
      <Login onSubmit={(data: React.SetStateAction<null>) => setFormData(data)} />
      {status === 'pending' ? <Spinner /> : null}
      <Text>{errorMessage}</Text>
    </>
  )
}
