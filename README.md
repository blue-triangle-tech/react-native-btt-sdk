
# Blue Triangle React Native SDK

The Blue Triangle SDK for Android enables application owners to track their users’ experience so they can focus on user experience issues that impact their business outcomes.

## Supported metrics

- Performance & Network Timings
- Main Timers
- Network Timers
- Custom Timers
- Errors & Crashes
- Application Not Responding (ANR)
- HTTP Response Codes
- App Crashes
- Device Stats & Session Attributes
- OS/OS Version
- App Version
- Device Type
- Geographical/Country
- CPU Usage
- Memory Warnings
- Memory/Out of Memory
- Hot/Cold Launch
- Network Type


## Mandatory Installation Steps

### SDK Installation

<!-- SDK Version 0.2.0 -->

Add the SDK to the your project using the following command:
```shell
yarn add '@bluetriangle/react-native-btt-sdk'
```

###  Site ID Configuration

Before using BTT SDK, It needs to be configured. It is recommended to configure the SDK in your `index.js` file.

Import the `BTTConfiguration` and `BTTOptions` as shown in the below code snippet. Then configure it using `BTTConfiguration.configure(<siteId>, <bttOptions>)` with `<siteId>` and `BTTOptions`.

```js
//First import the BTTConfiguration and BTTOptions
import {BTTConfiguration, BTTOptions} from '@bluetriangle/react-native-btt-sdk';

//Add the code snippet to configure sdk
const bttOptions = new BTTOptions()

BTTConfiguration.configure(<siteId>, bttOptions)
```

In place of &lt;siteId>, put your project's siteId.

### Native View Performance Tracking- Mandatory

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

### Native View/Webview Tracking/Session Stitching- Mandatory

Websites shown in webview that are tracked by BlueTriangle can be tracked in the
same session as the react app. To achieve this, follow the steps below to configure the WebView:

```js
import {BTTWebViewTracker} from '@bluetriangle/react-native-btt-sdk'

const MyWebView = ({navigation, route}) => {
    return (
        <WebView
                domStorageEnabled={true}
                javaScriptEnabled={true}
                injectedJavaScriptBeforeContentLoaded={BTTWebViewTracker.injectSession()} >
        </WebView>
    );
};

export default MyWebView;
```

If you are already using `injectedJavaScriptBeforeContentLoaded` to inject any of your script. Append your script to `BTTWebViewTracker.injectSession()` like below.

```js
import {BTTWebViewTracker} from '@bluetriangle/react-native-btt-sdk'

const MyWebView = ({navigation, route}) => {
    return (
        <WebView
            domStorageEnabled={true}
            javaScriptEnabled={true}
            injectedJavaScriptBeforeContentLoaded={BTTWebViewTracker.injectSession() + "YOUR SCRIPT"}>

        </WebView>
    );
};

export default MyWebView;
```


### Network State Capture

BlueTriangle SDK allows capturing of network state data. Network state refers to the availability of any network interfaces on the device. Network interfaces include wifi, ethernet, cellular, etc. Once Network state capturing is enabled, the Network state is associated with all Timers, Errors and Network Requests captured by the SDK.

#### Permission on Android

In Android, Network state capturing requires android.permission.ACCESS_NETWORK_STATE permission. So, include the permission into your AndroidManifest.xml file as follows:

```xml
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

> Note:
>
> - If Network state capture is enabled and `ACCESS_NETWORK_STATE` permission is not granted, then the SDK won't track network state as it won't be able to.
> - This feature is only available on API Level 21 and above.


To disable Network state capture, use the `trackNetworkState` property on the BTTOptions object as follows:

```js
const bttOptions = new BTTOptions()
bttOptions.trackNetworkState = false
```


## Recommended (Optional) Configurations

### Network Capture Sample Rate

Network Sample rate defines the percentage of user sessions for which network calls will be captured. A value of 0.025 means
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

To disable network capture set 0.0 to 'bttOptions.networkSampleRate' during configuration.

It is recommended to have 100% sample rate while developing/debugging. By setting 'bttOptions.networkSampleRate' to 1.0 during configuration.

### Custom Timer

While **Screen Views are automatically tracked upon installation**, Custom Timers can also be configured if needed.

a) Using Custom Timer:
To use a custom timer, you need to first import the `BTTTimer` object from `@bluetriangle/react-native-btt-sdk`. Create timer object with pageName.

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

## Optional Configuration Steps

### ANR Detection

The ANR Detector automatically identifies blocks in the main thread over a specified period of time and reports them as Application
Not Responding (ANR) incidents.

You can also configure the ANR Interval (sec), by setting `trackAnrIntervalSec` property in BTTOption.

By default, the ANR interval is set to 5 seconds.

To disable ANR detection, set the `trackAnr` property to false from `BTTOptions` at the time of configuration.You can refer [Configuration](#configuration).

### Memory Warning

The SDK automatically tracks and reports memory warnings based on the memory usage of the app. Depending on the platform, the definition of memory warning defers. They are explained below:

#### Android
Memory warning is an error that is reported when the code uses up more than 80% of the app's available memory (heap capacity).

Currently, Memory Warning is only captured for memory used by the native modules. Memory used in react code is not considered in memory warning.

#### iOS
Track ios reported low memory worning. iOS reported memory warnings can be tracked by btt.

#### How to disable

To disable memory warning, set the `memoryWarning` property to false from `BTTOptions` at the time of configuration.You can refer [Configuration](#configuration).


### Memory Usage
Memory usage is the amount of memory used by the code during the Timer interval. This is measured in number of bytes.

Against each timer, 3 Memory measurements are being sent, minimum, maximum and average.

To set the interval (in ms) at which the Memory usage is being captured, set the following field:

```js
const bttOptions = new BTTOptions()
bttOptions.performanceMonitoringInterval = 1000
```
To disable Memory usage set the following field:

```js
const bttOptions = new BTTOptions()
bttOptions.performanceMonitoring = false
```

### CPU Usage

CPU Usage is the amount of CPU being used by the code during the Timer interval. This is measured in the form of 0-100%.

Against each timer, 3 CPU measurements are being sent, minimum, maximum and average.

To set the interval (in ms) at which the CPU usage is being captured, set the following field in BlueTriangleConfiguration:

```js
const bttOptions = new BTTOptions()
bttOptions.performanceMonitoringInterval = 1000
```
To disable CPU usage set the following field in `BTTOptions`:

```js
const bttOptions = new BTTOptions()
bttOptions.performanceMonitoring = false
```

### Track Crash

The SDK automatic tracks and reports crashes. To disable this feature, just set the `trackCrash` property to false from `BTTOptions` at the time of configuration. You can refer [Configuration](#configuration).

### Caching

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


### Launch Time

BlueTriangle tracks app launch performance. Launch time refers to the duration it takes for an app to become ready for user interaction after it has been started. BlueTriangle automatically tracks both hot launch and cold launch.

#### Cold Launch
A cold launch is a launch wherein the app process was not already in main memory. This can happen if the System or user terminated your apps process or the app is launching for the first time since it's installed/updated or since the device was booted.

The latency for cold launch is calculated differently based on the platform. It's as follows:&nbsp;&nbsp;
##### Android
It is the time between the `onCreate` of the BlueTriangle SDK's ContentProvider and onResume call for the first Activity.

##### iOS
It is the time between the process start time and end of 'applicationDidBecomeActive(:)'

#### Hot Launch

A hot launch is launch when app process was already in main memory. This can happen when user launches the app from the background.

The latency for hot launch is calculated differently based on the platform. It's as follows:&nbsp;&nbsp;
##### Android
It is the time between the onStart and onResume of the first Activity after the app is brought into foreground.

#### iOS
It is the time between the end of 'applicationWillEnterForeground(:)' and end of 'applicationDidBecomeActive(:)'. So that hot launch time taken by 'applicationDidBecomeActive(:)'.

In both the platforms, Locking and Unlocking the device is considered as a Hot Launch.


You can disable Launch Time feature by setting the following field in `BTTOptions`:
```js
const bttOptions = new BTTOptions()
bttOptions.launchTime = false
```
