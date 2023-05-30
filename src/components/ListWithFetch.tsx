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
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  uid: string;
  avatar: string;
}

export default () => {
  const [usersData, setUsersData] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          'https://random-data-api.com/api/v2/users?size=10',
        );
        // @ts-ignore
        setUsersData(response.data);
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
      item: {first_name, last_name, email, phone_number, uid, avatar},
    }: {
      item: IUser;
    }) => (
      <View
        style={styles.userContainer}
        accessibilityLabel={`${uid}-user-container`}>
        <View style={styles.avatarWrapper}>
          <Image source={{uri: avatar}} style={styles.image} />
        </View>
        <View style={styles.userInfoContainer}>
          <Text>
            {first_name} {last_name}
          </Text>
          <Text>{email}</Text>
          <Text>{phone_number}</Text>
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
        keyExtractor={item => item.uid}
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
