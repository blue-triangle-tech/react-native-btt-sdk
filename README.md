
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
bttOptions.trackCrash = true
bttOptions.debug = false
BTTConfiguration.configure(siteId, bttOptions)
AppRegistry.registerComponent(appName, () => App);
```
### Using Manual Timers
To use a manual timer, you need to first import the `BTTTimer` object from `react-native-btt-sdk`. Create timer object with pageName.

 The `BTTTimer` object
has the following functions:
- `timer.startTimer()`:
- `timer.setCartValue(cartValue)`:
- `timer.stopTimer()`:

```js
const timer = new BTTTimer(pageName)
timer.startTimer()
timer.stopTimer()
```

The following code snippet shows the usage of `startTimer` and `stopTimer`:
```javascript
import {BTTTimer} from 'react-native-btt-sdk';
import React, {useRef} from 'react';
import {View, Button} from 'react-native';
function YourComponent() {
  
  var timer:BTTTimer

  const startTimer = async () => {
    timer = new BTTTimer(startTimerPageValue)
    timer.startTimer()
  }

  const stopTimer = () => {
   timer.stopTimer()
  }
  return (
    <View>
        <Button title={'Start Timer'} onPress={startTimer} />
        <Button title={'Stop Timer'} onPress={stopTimer} />
    </View>
  )
}
```
### Manual Screen Tracking

To use a manual timer, you need to first import the `BTTScreenTracker` object from `react-native-btt-sdk`. Create timer object with pageName.

 The `BTTScreenTracker` object has the following functions:
- `manualTracker.startTracking()`:
- `manualTracker.stopTracking()`:

 ```js
import React, { useEffect } from 'react';
import {BTTScreenTracker} from 'react-native-btt-sdk';

function App({ }) {
var manualTracker:BTTScreenTracker

  useEffect(() => {

    // This is similar to viewWillAppear
    const unsubscribeFocus = navigation.addListener('focus', () =>{

      if(manualTracker == undefined){
        manualTracker = new BTTScreenTracker("PageName")
      }
      manualTracker.startTracking()
      
    });
    const unsubscribeBlur = navigation.addListener('blur', () =>{
      manualTracker.stopTracking()
    });

    return () => {

    };
  }, []);

  return (
     {/* ... */}
  );
}

 ```


### Screen Tracking for React Navigation
At the time of this writing, Screen tracking is supported for [React Navigation](https://reactnavigation.org/) only. The following code snippet shows how to use `BTTNavigationContainerTracker` from `react-native-btt-sdk` to enable Screen tracking:
```js
import React from 'react';
import `BTTNavigationContainerTracker` from `react-native-btt-sdk`
import 'NavigationContainer, {useNavigationContainerRef} from '@react-navigation/native';
function App() {
  const navigationRef = useNavigationContainerRef();
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
          BTTNavigationContainerTracker.onContainerStateChange(navigationRef)
      }}
      onStateChange={async () => {
          BTTNavigationContainerTracker.onContainerStateChange(navigationRef)
      }}
    >
      {/* ... */}
    </NavigationContainer>
  );
}
```
