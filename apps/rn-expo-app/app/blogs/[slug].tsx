import {useLocalSearchParams} from 'expo-router';
import {Text} from 'react-native';

export default function Page() {
  const {slug} = useLocalSearchParams();

  return <Text>Blog post: {slug}</Text>;
}
