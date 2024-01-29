import { Text } from 'react-native';
import { Link } from "expo-router";

export default function Page() {
  return <>
    <Text>Settings page!</Text>
    <Link href="/settings/country/">Country</Link>
  </>}

