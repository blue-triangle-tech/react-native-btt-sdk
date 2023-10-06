
[//]: # (# react-native-btt-sdk)
[//]: # ()
[//]: # (This is Btt SDK)
[//]: # ()
[//]: # (## Installation)
[//]: # ()
[//]: # (```sh)
[//]: # (npm install react-native-btt-sdk)
[//]: # (```)
[//]: # ()
[//]: # (## Usage)
[//]: # ()
[//]: # (```js)
[//]: # (import { multiply } from 'react-native-btt-sdk';)
[//]: # ()
[//]: # (// ...)
[//]: # ()
[//]: # (const result = await multiply&#40;3, 7&#41;;)
[//]: # (```)
[//]: # ()
[//]: # (## Contributing)
[//]: # ()
[//]: # (See the [contributing guide]&#40;CONTRIBUTING.md&#41; to learn how to contribute to the repository and the development workflow.)
[//]: # ()
[//]: # (## License)
[//]: # ()
[//]: # (MIT)
[//]: # ()
[//]: # (---)
[//]: # ()
[//]: # (Made with [create-react-native-library]&#40;https://github.com/callstack/react-native-builder-bob&#41;)
# Blue Triangle React Native SDK
### Installation
Add the SDK to the project using the following command:
```
yarn add 'file:/<project-code-location>/react-native-btt-sdk'
```
replace `<project-code-location>` with the local directory location where you have saved the SDK.
### Configuration
To configure, in your `index.js` file, add the following snippet:
```js
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {BTTConfiguration, BTTOptions} from 'react-native-btt-sdk';
const bttOptions = new BTTOptions()
bttOptions.anr = true
bttOptions.performanceMonitoring = true
bttOptions.performanceMonitoringInterval = true
bttOptions.memoryWarning = true
bttOptions.debug = false
BTTConfiguration.configure(siteId, bttOptions)
AppRegistry.registerComponent(appName, () => App);
```
### Using Manual Timers
To use a manual timer, you need to first import the `BTTTimer` object from `react-native-btt-sdk`. The `BTTTimer` object
has the following functions:
- `startTimer(timerOptions)`:
  startTimer is used to start a manual timer. It takes a `timerOptions` object where you need to pass a `btt_page_name`
  which will be
  the page name which will be displayed in the portal. It returns a promise object which resolves in a result
  object containing `btt_timer_id` which is an identifier for the started timer.
- `stopTimer(timerOptions)`:
  stopTimer is used to stop a running timer. It takes a `timerOptions` object in which you need to pass a `btt_timer_id`
  which will be the identifier that you recieved from the promise that `startTimer` returned.
The following code snippet shows the usage of `startTimer` and `stopTimer`:
```javascript
import {BTTTimer} from 'react-native-btt-sdk';
import React, {useRef} from 'react';
import {View, Button} from 'react-native';
function YourComponent() {
  const timerId = useRef(0)
  const startTimer = async () => {
    const result = await BTTTimer.startTimer({
      "btt_page_name":"<YourPageName>"
    })
    timerId.current = result.btt_timer_id
  }
  const stopTimer = () => {
    BTTTimer.stopTimer({
      "btt_timer_id": timerId.current
    })
  }
  return (
    <View>
        <Button title={'Start Timer'} onPress={startTimer} />
        <Button title={'Stop Timer'} onPress={stopTimer} />
    </View>
  )
}
```
### Screen Tracking
At the time of this writing, Screen tracking is supported for [React Navigation](https://reactnavigation.org/) only. The following code snippet shows how to use `BTTScreenTracker` from `react-native-btt-sdk` to enable Screen tracking:
```
import React, {useRef} from 'react';
import `BTTScreenTracker` from `react-native-btt-sdk`
import 'NavigationContainer, {useNavigationContainerRef} from '@react-navigation/native';
function App() {
  const navigationRef = useNavigationContainerRef();
  const routeNameRef = useRef();
  const routeIDRef = useRef();
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.getCurrentRoute().name;
        routeIDRef.current = navigationRef.getCurrentRoute().key;
        // Notify BTTScreenTracker about Navigation ready state
        BTTScreenTracker.viewStart(
            navigationRef.getCurrentRoute().key,
            navigationRef.getCurrentRoute().name
        );
      }}
      onStateChange={async () => {
        // Get the Route info for the page that the user just left
        const previousRouteName = routeNameRef.current;
        const previousRouteId = routeIDRef.current;
        // Get the route info for the page that the user just navigated to
        const currentRouteName = navigationRef.getCurrentRoute().name;
        const currentRouteId = navigationRef.getCurrentRoute().key;
        if (previousRouteName !== currentRouteName) {
          BTTScreenTracker.viewingEnd(previousRouteId, previousRouteName);
          BTTScreenTracker.viewStart(currentRouteId, currentRouteName);
          // Save the current route data for later comparison
          routeNameRef.current = currentRouteName;
          routeIDRef.current = currentRouteId;
        }
      }}
    >
      {/* ... */}
    </NavigationContainer>
  );
}
```
