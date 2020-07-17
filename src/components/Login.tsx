import React, {useState} from 'react'
import {StyleSheet, Text, TextInput, Pressable, View,} from 'react-native'
import {Colors,} from 'react-native/Libraries/NewAppScreen'


// @ts-ignore
export default ({onSubmit}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = ()=> {
    setUsername('')
    setPassword('')
    onSubmit({username, password})
  }

  return (
    <View style={styles.body}>
      <View style={styles.sectionContainer}>
        <TextInput
          placeholder="Username"
          onChangeText={(text => setUsername(text))}
          value={username}
        />
        <TextInput
          secureTextEntry={true}
          placeholder="Password"
          onChangeText={(text => setPassword(text))}
          value={password}
        />
        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text>Submit</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.white,
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
