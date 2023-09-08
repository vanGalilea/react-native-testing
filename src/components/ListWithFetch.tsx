import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import axios from 'axios';

const AVATAR_SIZE = 68;

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
  image: string;
  birthDate: string;
}

export default () => {
  const [usersData, setUsersData] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://dummyjson.com/users');
        setUsersData(response.data.users);
      } catch (e) {
        setHasError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRenderItem = useCallback(
    ({
      item: {firstName, lastName, email, image, id, birthDate},
    }: {
      item: IUser;
    }) => (
      <View
        style={styles.userContainer}
        accessibilityLabel={`${id}-user-container`}>
        <View style={styles.avatarWrapper}>
          <Image source={{uri: image}} style={styles.image} />
        </View>
        <View style={styles.userInfoContainer}>
          <Text>
            {firstName} {lastName}
          </Text>
          <Text>{email}</Text>
          <Text>{birthDate}</Text>
        </View>
      </View>
    ),
    [],
  );

  return (
    <View>
      <Text>The Funky Users DB</Text>
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
      <FlatList
        data={usersData}
        renderItem={handleRenderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  errorContainer: {backgroundColor: '#C63939', padding: 16, borderRadius: 6},
  userContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 16,
    marginBottom: 8,
    flex: 1,
  },
  avatarWrapper: {
    backgroundColor: 'rgba(88,186,224,0.65)',
    padding: 16,
    borderRadius: AVATAR_SIZE,
  },
  userInfoContainer: {flex: 1, marginLeft: 16},
  image: {height: AVATAR_SIZE, width: AVATAR_SIZE},
});
