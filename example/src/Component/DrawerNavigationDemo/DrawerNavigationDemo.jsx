import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerScreen1 from './DrawerScreen1';
import DrawerScreen2 from './DrawerScreen2';
import DrawerScreen3 from './DrawerScreen3';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from '../Home';

const DrawerNav = createDrawerNavigator();

const DrawerNavigationDemo = () => {
  return (
    <DrawerNav.Navigator
      screenOptions={{
        drawerActiveBackgroundColor: '#A1E3F9',
        drawerBackgroundColor: '#D1F8EF',
        drawerIcon: ({ focused }) => (
          <Ionicons name="cube" size={24} color="blue" />
        ),
      }}
    >
      <DrawerNav.Screen name="Screen 1" component={DrawerScreen1} />
      <DrawerNav.Screen name="Screen 2" component={DrawerScreen2} />
      <DrawerNav.Screen name="Screen 3" component={DrawerScreen3} />
      <DrawerNav.Screen name="Home" component={Home} />
    </DrawerNav.Navigator>
  );
};

export default DrawerNavigationDemo;
