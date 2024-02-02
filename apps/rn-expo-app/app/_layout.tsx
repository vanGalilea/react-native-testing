import { Tabs, useLocalSearchParams, useRootNavigationState, useRouter, useSegments } from "expo-router";
import '../global.css';
import {Center, Icon, NativeBaseProvider, Pressable, Text} from 'native-base';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {BottomTabBarButtonProps} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import {usePathname} from 'expo-router/build/hooks';

export default function Layout() {
  const pathname = usePathname();

  return (
    <NativeBaseProvider>
      <Tabs
        screenOptions={{
          headerLeft: HeaderLeft,
          unmountOnBlur: true,
        }}>
        <Tabs.Screen
          name="index"
          options={{
            headerTitle: 'Home',
            tabBarButton: ({onPress}) => (
              <TabBarButton
                isSelected={pathname === '/'}
                label={'Home'}
                onPress={onPress}
                iconName={'home'}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="blogs"
          options={{
            headerTitle: 'Blogs',
            tabBarButton: ({onPress}) => (
              <TabBarButton
                isSelected={pathname.includes('/blogs')}
                label={'Blogs'}
                onPress={onPress}
                iconName={'book-open'}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            headerTitle: 'Settings',
            tabBarButton: ({onPress}) => (
              <TabBarButton
                isSelected={pathname.includes('/settings')}
                label={'Settings'}
                onPress={onPress}
                iconName={'account-settings'}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="auth"
          options={{
            href: null,
          }}
        />
      </Tabs>
    </NativeBaseProvider>
  );
}

const TabBarButton = ({
  isSelected,
  onPress,
  label,
  iconName,
}: {
  isSelected: boolean;
  onPress: BottomTabBarButtonProps['onPress'];
  label: string;
  iconName: string;
}) => {
  return (
    <Pressable opacity={isSelected ? 1 : 0.5} py="3" flex={1} onPress={onPress}>
      <Center>
        <Icon
          mb="1"
          as={
            <MaterialCommunityIcons
              // @ts-ignore
              name={isSelected ? iconName : `${iconName}-outline`}
            />
          }
          color="black"
          size="sm"
        />
        <Text color="black" fontSize="12">
          {label}
        </Text>
      </Center>
    </Pressable>
  );
};

const HeaderLeft = () => {
  const {back} = useRouter();
  const pathname = usePathname();
  const isNestedStack = pathname.split('/').length - 1 > 1;
  if(!isNestedStack) {
    return null;
  }

  return (
    <Pressable
      onPress={back}>
      <Icon
        as={<MaterialCommunityIcons name="keyboard-backspace" />}
        color="black"
        size="sm"
      />
    </Pressable>
  );
}
