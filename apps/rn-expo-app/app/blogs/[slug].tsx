import { Text } from 'react-native';
import { useLocalSearchParams } from "expo-router";

export default function Page() {
  const { slug } = useLocalSearchParams();

  return <Text>Blog post: {slug}</Text>;}

