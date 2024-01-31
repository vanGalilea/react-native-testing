import {Link} from 'expo-router';
import {Text} from 'react-native';

export default function Page() {
  return (
    <>
      <Text>Settings page!</Text>
      <Link href="/settings/country/">Country</Link>
    </>
  );
}
