
# Blue Triangle React Native SDK

## Installation

Add the SDK to the your project using the following command:
```
yarn add '@bluetriangle/react-native-btt-sdk'
```

## Configuration

Before using BTT SDK, It needs to be configured. It is recommended to configure sdk in your `index.js` file.

Import the `BTTConfiguration` and `BTTOptions` as shown in the below code snippet. Then configure it using `BTTConfiguration.configure(<siteId>, <bttOptions>)` with `<siteId>` and `BTTOptions`.

```js
//First import the BTTConfiguration and BTTOptions
import {BTTConfiguration, BTTOptions} from '@bluetriangle/react-native-btt-sdk';

//Add the code snippet to configure sdk
const bttOptions = new BTTOptions()
bttOptions.trackAnr = false
bttOptions.performanceMonitoring = true
bttOptions.performanceMonitoringInterval = 1000
bttOptions.memoryWarning = true
bttOptions.trackCrash = true
bttOptions.debug = true
bttOptions.screenTracking = true
bttOptions.trackNetworkState = true

BTTConfiguration.configure(<siteId>, bttOptions)
```
In place of \<siteId>, put your project's siteId.

## Timer

a) Using Manual Timers:<br/>

To use a manual timer, you need to first import the `BTTTimer` object from `@bluetriangle/react-native-btt-sdk`. Create timer object with pageName.

The `BTTTimer` object has the following functions:
- `timer.startTimer()`:
- `timer.stopTimer()`:

 ```js
import {BTTTimer} from '@bluetriangle/react-native-btt-sdk';

const timer = new BTTTimer(pageName)
timer.startTimer()
timer.stopTimer()
```

b) Cart Value:

We can set cart value to `BTTTimer` object using following function.

- `timer.setCartValue(cartValue)`:

 ```js
import {BTTTimer} from '@bluetriangle/react-native-btt-sdk';

const timer = new BTTTimer(pageName)
timer.startTimer()
timer.setCartValue(cartValue)
timer.stopTimer()
 ```

##  Performance Monitor

Performance monitoring allows the tracking of CPU and Memory usage of the app. This usage information is associated with all the currently running timers.

To enable Performance Monitoring, we need to set `performanceMonitoring` to `true` from `BTTOptions` at the time of configuration. Also, you can set `performanceMonitoringInterval` which is in milliseconds. You can refer [Configuration](#configuration).

### Screen Tracker

Screen tracking captures screen views which can be seen on our dashboard.

a) Screen Tracking for [React Navigation](https://reactnavigation.org/):

If you are using react navigation library to perform screen navigation in your app, then all screen can be track by BTTSdk automatically by just adding two lines of code in the `NavigationContainer`, as shown in below example.

 ```js
import React from 'react';
import BTTNavigationContainerTracker from '@bluetriangle/react-native-btt-sdk';
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
BTTNavigationContainerTracker has a single method for screen tracking which is called in onReady and onStateChange. These two lines of code can track all the happening in the navigation container.

 This solution is based on [React Navigation](https://reactnavigation.org/docs/screen-tracking/) reference for screen tracking analytics.

 With the above setup, all screens can be track except when the app put in background. In that case, we don't get onStateChange callback. Hence, to overcome this we need to add another listener to track when app is put in background and when it comes back to foreground. To do that add the following code snippet in your app component.

 ```js
AppState.addEventListener('change', state => {
    if (state === 'active') {
      // do this
      BTTNavigationContainerTracker.onContainerStateChange(navigationRef)
    }
    else if (state === 'background') {
      // do that
      BTTNavigationContainerTracker.applicationDidEnterBackground(navigationRef)
    }
  });
  ```

b) Manual Tracker

If you are using any other way to perform screen navigation in your app or you want to track only  a certain set of screen in your app, you can use manual tracking.

To use a manual tracker, you need to first import the `BTTScreenTracker` object from `'@bluetriangle/react-native-btt-sdk'`. Create timer object with pageName.

 The `BTTScreenTracker` object has the following functions:
- `manualTracker.startTracking()`:
- `manualTracker.stopTracking()`:

You need to call the function `startTracking` when the component that you want track is rendered for the first time, and you need to call `stopTracking` when the component is about to disappear. You can refer to following code snippet.

 ```js
import React, { useEffect } from 'react';
import {BTTScreenTracker} from '@bluetriangle/react-native-btt-sdk';

function YourComponent({ }) {
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

## Track Crash

The SDK provides automatic tracking and reporting of crashes. To enable this feature, just set the `trackCrash` property to true from `BTTOptions` at the time of configuration. You can refer [Configuration](#configuration).

## Caching

To support offline usage tracking, timer and crash reports that cannot be sent immediately will be
cached in the application's cache directory and retried after some time.

**Memory Limit**

The amount of memory the cache uses (in bytes) can be configured using the `cacheMemoryLimit` property of the
BTTOptions object:
```js
const bttOptions = new BTTOptions()
bttOptions.cacheMemoryLimit = 200000L
```

If new data is sent to the cache after the memory limit exceeds, the cache deletes the oldest data
and then adds the new data. So, only the most recently captured user data is tracked by the cache. By default the memory limit is 30Mb.

**Expiry Duration**

The amount of time (in milliseconds) the data is kept in the cache before it expires can be configured using the `cacheExpiryDuration` property of the BTTOptions object:
```
const bttOptions = new BTTOptions()
bttOptions.cacheExpiryDuration = 86400000L
```

The data that is kept longer in cache than the expiry duration is automatically deleted. By default the expiry duration is 48 hours.

## Network State Capture

BlueTriangle SDK allows capturing of network state data. Network state refers to the availability of any network interfaces on the device. Network interfaces include wifi, ethernet, cellular, etc. Once Network state capturing is enabled, the Network state is associated with all Timers, Errors and Network Requests captured by the SDK.

To enable Network state capture, use the `trackNetworkState` property on the BTTOptions object as follows:

```js
const bttOptions = new BTTOptions()
bttOptions.trackNetworkState = true
```

#### Permission on Android

In Android, Network state capturing requires android.permission.ACCESS_NETWORK_STATE permission. So, include the permission into your AndroidManifest.xml file as follows:

```xml
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

Note:

- If Network state capture is enabled and `ACCESS_NETWORK_STATE` permission is not granted, then the SDK won't track network state as it won't be able to.
- This feature is only available on API Level 21 and above.

## ANR Detection

The ANR Detector identifies blocks in the main thread over a specified period of time and reports them as Application
Not Responding (ANR) incidents.

To enable ANR detection, set the `trackAnr` property to true from `BTTOptions` at the time of configuration.You can refer [Configuration](#configuration).

You can also configure the ANR Interval (sec), by setting `trackAnrIntervalSec` property in BTTOption.

By default, the ANR interval is set to 5 seconds.

## Network Capture

The tracker now also supports capturing network requests. This can be done automatically
for Fetch and Axios APIs.

#### Sample rate

Sample rate defines the percentage of user sessions for which network calls will be captured. A value of 0.025 means
that 2.5% of user session's network requests will be tracked.
A value of 0.0 means that no network requests will be captured for any user sessions, and a value of 1.0 will track all
network requests for all user sessions. Whether network requests will be
tracked is determined on application start, and will either be set to on or off for the entirety of the user session.

You can configure the sample rate by setting the `networkSampleRate` property in the configuration object as shown
below:

```js
const bttOptions = new BTTOptions()
bttOptions.networkSampleRate = 0.025
```

The recommended setting is 1.0 to capture all network requests.

## Memory Warning

#### Android
Memory warning is an error that is reported when the code uses up more than 80% of the app's available memory (heap capacity).

Currently, Memory Warning is only captured for memory used by the native modules. Memory used in react code is not considered in memory warning.

#### iOS
Track ios reported low memory worning. iOS reported memory warnings can be tracked by btt.

#### How to enable

To enable memory warning, set the `memoryWarning` property to true from `BTTOptions` at the time of configuration.You can refer [Configuration](#configuration).

## WebView Tracking

Websites shown in webview that are tracked by BlueTriangle can be tracked in the
same session as the react app. To achieve this, follow the steps below to configure the WebView:


```js
import {BTTWebViewTracker} from '@bluetriangle/react-native-btt-sdk'
const MyWebView = ({navigation, route}) => {
 return (<WebView
    domStorageEnabled={true}
    javaScriptEnabled={true}
    injectedJavaScriptBeforeContentLoaded={BTTWebViewTracker.injectSession()} >
</WebView> );
};

export default MyWebView;
```

If you are already using `injectedJavaScriptBeforeContentLoaded` to inject any of your script. Append your script to `BTTWebViewTracker.injectSession()` like below.

```js
import {BTTWebViewTracker} from '@bluetriangle/react-native-btt-sdk'
const MyWebView = ({navigation, route}) => {
 return (<WebView
    domStorageEnabled={true}
    javaScriptEnabled={true}
    injectedJavaScriptBeforeContentLoaded={BTTWebViewTracker.injectSession() + "YOUR SCRIPT"}>

</WebView> );
};

export default MyWebView;
```
