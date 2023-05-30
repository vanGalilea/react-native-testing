import React, {useCallback, useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';

export default ({
  onSubmit,
}: {
  onSubmit(data: {username: string; password: string}): void;
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = useCallback(() => {
    setUsername('');
    setPassword('');
    onSubmit({username, password});
  }, [onSubmit, password, username]);

  return (
    <View style={styles.body}>
      <View style={styles.sectionContainer}>
        <TextInput
          placeholder="Username"
          onChangeText={text => setUsername(text)}
          value={username}
        />
        <TextInput
          secureTextEntry={true}
          placeholder="Password"
          onChangeText={text => setPassword(text)}
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
    backgroundColor: '#fff',
  },
  sectionContainer: {
    padding: 24,
    alignItems: 'center',
  },
  button: {
    borderRadius: 12,
    padding: 6,
    margin: 6,
    backgroundColor: '#9e9ef8',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
