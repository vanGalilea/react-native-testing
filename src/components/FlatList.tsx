import React, {useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';

const DATA = [
  'Pizza',
  'Burger',
  'Risotto',
  'French Fries',
  'Onion Rings',
  'Fried Shrimps',
  'Water',
  'Coke',
  'Beer',
  'Cheese Cake',
];

const EXTRA_DATA = [
  'Pancakes',
  'The Impossible Burger',
  'Fanta',
  'French Omelette',
  'Onion Fries',
  'Nep Shrimps',
  'Soda',
  'Cheesy Mushroom',
];

const NETWORK_DELAY = 1000;

const Item = ({title}: {title: string}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

export default () => {
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState(DATA);
  const [loadingMore, setLoadingMore] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    setData([]);
    setTimeout(() => {
      setRefreshing(false);
      setData(DATA);
    }, NETWORK_DELAY);
  };

  const onEndReached = () => {
    if (data.length > 15) {
      return null;
    }
    setLoadingMore(true);
    setTimeout(() => {
      setData([...data, ...EXTRA_DATA]);
      setLoadingMore(false);
    }, NETWORK_DELAY);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        accessibilityLabel={'dishes-list'}
        data={data}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => <Item title={item} />}
        onEndReachedThreshold={0.2}
        onEndReached={onEndReached}
        onRefresh={onRefresh}
        progressViewOffset={100}
        refreshing={refreshing}
      />
      {refreshing && <Text>Refreshing...</Text>}
      <LoadingMore isEnabled={loadingMore} />
    </SafeAreaView>
  );
};

const LoadingMore = ({isEnabled}: {isEnabled: boolean}) => {
  if (!isEnabled) {
    return null;
  }

  return (
    <View style={styles.loadingMoreContainer}>
      <Text>Loading More Dishes...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
  },
  loadingMoreContainer: {paddingVertical: 12},
});
