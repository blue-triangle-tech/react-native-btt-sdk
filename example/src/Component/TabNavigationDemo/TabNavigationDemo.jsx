import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Screen1 from './Screen1';
import Screen2 from './Screen2';
import Screen3 from './Screen3';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
const TabNavigationDemo = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });

    return () => {
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          height: 60, // Restore the proper height
          paddingBottom: 10,
          backgroundColor: '#f8f8f8',
          borderTopWidth: 1,
          borderTopColor: '#ddd',
        },
      });
    };
  }, [navigation]);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 80,
          paddingBottom: 6,
          backgroundColor: '#f8f8f8',
          borderTopWidth: 1,
          borderRadius: 15,
        },
        tabBarLabelStyle: {
          fontSize: 19,
          color: 'blue',
        },
        tabBarActiveTintColor: 'red',
        tabBarActiveBackgroundColor: '#f8f8f8',
      }}
    >
      <Tab.Screen
        options={{
          tabBarLabel: 'Screen 1',
          tabBarIcon: ({ focused }) => (
            <Ionicons name="chatbubbles" size={24} color="blue" />
          ),
        }}
        name={'Screen-1 Tab Navigation'}
        component={Screen1}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Screen 2',
          tabBarIcon: ({ focused }) => (
            <Ionicons name="bar-chart" size={24} color="blue" />
          ),
        }}
        name={'Screen-2 Tab Navigation'}
        component={Screen2}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Screen 3',
          tabBarIcon: ({ focused }) => (
            <Ionicons name="cart" size={24} color="blue" />
          ),
        }}
        name={'Screen-3 Tab Navigation'}
        component={Screen3}
      />
    </Tab.Navigator>
  );
};

export default TabNavigationDemo;
