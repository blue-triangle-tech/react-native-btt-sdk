
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

bttOptions.performanceMonitoring = true
bttOptions.performanceMonitoringInterval = true
bttOptions.trackCrash = true
bttOptions.debug = false
BTTConfiguration.configure(<siteId>, bttOptions)
AppRegistry.registerComponent(appName, () => App);
```

In the place of `<siteId>`, put your project's siteId.

### Timer<br/>

a) Using Manual Timers:<br/>

To use a manual timer, you need to first import the `BTTTimer` object from `react-native-btt-sdk`. Create timer object with pageName.

 The `BTTTimer` object
has the following functions: 
- `timer.startTimer()`:
- `timer.stopTimer()`:

 ```js
import {BTTTimer} from 'react-native-btt-sdk';

const timer = new BTTTimer(pageName)
timer.startTimer()
timer.stopTimer()
```

b) Cart Value:

We can set cart value to `BTTTimer` object using following function.

- `timer.setCartValue(cartValue)`:

 ```js
import {BTTTimer} from 'react-native-btt-sdk';

const timer = new BTTTimer(pageName)
timer.startTimer()
timer.setCartValue(cartValue)
timer.stopTimer()
 ```

c) Performance Monitor:

PerformanceMonitoring - enables or disables tracking of memory and CPU usage. To enable Performance Monitor we need to enable performanceMonitoring from `BTTOptions` at the time of configuration. Also you can set `performanceMonitoringInterval` which is in milliseconds.

 ```js
import {BTTConfiguration, BTTOptions} from 'react-native-btt-sdk';

const bttOptions = new BTTOptions()
bttOptions.performanceMonitoring = true
bttOptions.performanceMonitoringInterval = 500

BTTConfiguration.configure(siteId, bttOptions)
 ```

### Screen Tracker <br/>

a) Manual Tracker

To use a manual tracker, you need to first import the `BTTScreenTracker` object from `react-native-btt-sdk`. Create timer object with pageName.

 The `BTTScreenTracker` object has the following functions:
- `manualTracker.startTracking()`:
- `manualTracker.stopTracking()`:

 ```js
import React, { useEffect } from 'react';
import {BTTScreenTracker} from 'react-native-btt-sdk';

function App({ }) {
var manualTracker:BTTScreenTracker

  useEffect(() => {

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
        unsubscribeFocus()
        unsubscribeBlur()
    };
  }, []);

  return (
     {/* ... */}
  );
}

 ```

b) Screen Tracking for [React Navigation](https://reactnavigation.org/):

All screen can be tracked by adding two lines of code in container, as shown in below example.


 ```js
 import React from 'react';
import BTTNavigationContainerTracker from 'react-native-btt-sdk';
import NavigationContainer, {useNavigationContainerRef} from '@react-navigation/native';

function App() {
  const navigationRef = useNavigationContainerRef();
  return (
    <NavigationContainer
      ref = { navigationRef }
      onReady = {() => {
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
BTTNavigationContainerTracker has a single method for screen tracking which is called in onReady and onStateChange.This two line of code can track all the happening in the navigation controller, This solution is based on [React Navigation](https://reactnavigation.org/docs/screen-tracking/) reference for screen tracking analytics.


### Track Crash<br/>

TrackCrash - enable or disable collecting and sending crash reports to the server. To enable crash tracking we need to enable trackCrash and debug from `BTTOptions` at the time of configuration.


 ```js
import {BTTConfiguration, BTTOptions} from 'react-native-btt-sdk';

const bttOptions = new BTTOptions()
bttOptions.trackCrash = true
bttOptions.debug = true

BTTConfiguration.configure(siteId, bttOptions)
 ```