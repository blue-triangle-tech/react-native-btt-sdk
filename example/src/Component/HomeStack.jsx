import React from 'react';
import Home from './Home';
import ScreenTracking from './ScreenTracking';

import { createStackNavigator } from '@react-navigation/stack';

import TabNavigationDemo from './TabNavigationDemo/TabNavigationDemo';
import StackNavigationDemo from './StackNavigationDemo/StackNavigationDemo';

import DrawerNavigationDemo from './DrawerNavigationDemo/DrawerNavigationDemo';
import { useNavigationContainerRef } from '@react-navigation/native';
import CrashScreen from './CrashTracking';

const Stack = createStackNavigator();
const HomeStack = () => {
  const navigationRef = useNavigationContainerRef();
  return (
    <Stack.Navigator detachInactiveScreens={false}>
      <Stack.Screen name={'Home'} component={Home} />
      <Stack.Screen name={'ScreenTracking'} component={ScreenTracking} />
      <Stack.Screen
        name={'Tab Navigation Demo'}
        component={TabNavigationDemo}
      />
      <Stack.Screen
        name={'Stack Navigation Demo'}
        component={StackNavigationDemo}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={'Drawer Navigation Demo'}
        component={DrawerNavigationDemo}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
