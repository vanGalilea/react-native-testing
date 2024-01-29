import { Pressable, Text } from "react-native";
import { Link } from "expo-router";

export default function Page() {
  return (
    <>
      <Text>Home page!</Text>
      <Link href="/blogs" asChild>
        <Pressable>
          <Text>Blogs</Text>
        </Pressable>
      </Link>
      <Link href="/settings">Settings</Link>
    </>
  );
}
