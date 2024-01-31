import {Link} from 'expo-router';
import {Text} from 'react-native';

export default function Page() {
  return (
    <>
      <Text>Blogs page!</Text>
      <Link href="/blogs/123/">Blog 123</Link>
      <Link href="/blogs/345/">Blog 345</Link>
    </>
  );
}
