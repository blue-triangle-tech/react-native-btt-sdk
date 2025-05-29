import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

import {
  BTTConfiguration,
  BTTOptions,
  CrashLevel
} from '@bluetriangle/react-native-btt-sdk';

const bttOptions = new BTTOptions();
bttOptions.trackAnr = true;
bttOptions.performanceMonitoring = true;
bttOptions.performanceMonitoringInterval = 500;
bttOptions.memoryWarning = true;
bttOptions.crashLevel = CrashLevel.All;
bttOptions.debug = true;
bttOptions.screenTracking = true;
bttOptions.trackNetworkState = true;
bttOptions.trackAnrIntervalSec = 1;
bttOptions.networkSampleRate = 1;
bttOptions.cacheMemoryLimit = 20 * 1024;
bttOptions.cacheExpiryDuration = 5 * 60 * 1000;

BTTConfiguration.configure('sdkdemo26621z', bttOptions);

AppRegistry.registerComponent(appName, () => App);
