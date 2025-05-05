import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Screen1 from './Screen1';
import Screen2 from './Screen2';
import Screen3 from './Screen3';

const Stack = createStackNavigator();

const StackNavigation = ({ navigation }) => {
  return (
    <Stack.Navigator detachInactiveScreens={false}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Screen1" component={Screen1} />
      <Stack.Screen name="Screen2" component={Screen2} />
      <Stack.Screen name="Screen3" component={Screen3} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
const styles = {
  text: {
    color: 'blue',
    fontSize: 25,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#8d90ee',
    justifyContent: 'center',
    alignItems: 'center',
  },
};
