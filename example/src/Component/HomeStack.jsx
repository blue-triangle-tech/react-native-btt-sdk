import React from 'react';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Home from "./Home"
import ScreenTracking from "./ScreenTracking";

import {createStackNavigator} from '@react-navigation/stack';

import TabNavigationDemo from "./TabNavigationDemo/TabNavigationDemo";
import StackNavigationDemo from "./StackNavigationDemo/StackNavigationDemo";
import BTTNavigationContainerTracker from '@bluetriangle/react-native-btt-sdk';

import DrawerNavigationDemo from "./DrawerNavigationDemo/DrawerNavigationDemo";
import {useNavigationContainerRef} from "@react-navigation/native";
import NetworkCallsAxios from "./NetworkCallsAxios/NetworkCallsAxios";

const Stack = createStackNavigator();
const HomeStack = () => {
    const navigationRef = useNavigationContainerRef();
    return (
        <Stack.Navigator>
            <Stack.Screen name={"Home"} component={Home}/>
            <Stack.Screen name={"ScreenTracking"} component={ScreenTracking}/>
            <Stack.Screen name={"Tab Navigation Demo"} component={TabNavigationDemo}
                          options={{tabBarStyle: {display: 'none'}}}/>
            <Stack.Screen name={"Stack Navigation Demo"} component={StackNavigationDemo}/>
            <Stack.Screen options={{headerShown: false}} name={"Drawer Navigation Demo"}
                          component={DrawerNavigationDemo}/>
        </Stack.Navigator>
    );
};

export default HomeStack;
