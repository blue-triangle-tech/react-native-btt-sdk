import React from 'react';
import Home from './Component/Home';
import { createStackNavigator } from '@react-navigation/stack';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { BTTNavigationContainerTracker } from '@bluetriangle/react-native-btt-sdk';

import ScreenTracking from './Component/ScreenTracking';
import TabNavigationDemo from './Component/TabNavigationDemo/TabNavigationDemo';
import StackNavigationDemo from './Component/StackNavigationDemo/StackNavigationDemo';
import DrawerNavigationDemo from './Component/DrawerNavigationDemo/DrawerNavigationDemo';
import CrashTracking from './Component/CrashTracking';
import NetworkCallsAxios from './Component/NetworkCallsAxios/NetworkCallsAxios';

//importing the navigation container tracker for automatic navigation

const Stack = createStackNavigator();
const App = () => {
  const navigationRef = useNavigationContainerRef();

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        BTTNavigationContainerTracker.onContainerStateChange(navigationRef);
      }}
      onStateChange={async () => {
        BTTNavigationContainerTracker.onContainerStateChange(navigationRef);
      }}
    >
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
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
        <Stack.Screen name={'crash-tracking'} component={CrashTracking} />
        <Stack.Screen
          name={'network calls axios'}
          component={NetworkCallsAxios}
        />
        <Stack.Screen
          name={'network calls fetch'}
          component={NetworkCallsAxios}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
