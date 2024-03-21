import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

import {BTTConfiguration, BTTOptions} from 'react-native-btt-sdk';
import Utility from './src/Utility';

const sessionID = Utility.currentFormatDate()

const bttOptions = new BTTOptions()
bttOptions.trackAnr = false
bttOptions.performanceMonitoring = true
bttOptions.performanceMonitoringInterval = 500
bttOptions.memoryWarning = true
bttOptions.trackCrash = true
bttOptions.debug = true
bttOptions.screenTracking = true
bttOptions.trackNetworkState = true
bttOptions.trackAnrIntervalSec = 1
bttOptions.networkSampleRate = 1
bttOptions.cacheMemoryLimit = 20 * 1024
bttOptions.cacheExpiryDuration = 5 * 60 * 1000

BTTConfiguration.configure('sdkdemo26621z', bttOptions)

AppRegistry.registerComponent(appName, () => App);
