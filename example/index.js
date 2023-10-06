import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

import {BTTConfiguration, BTTOptions} from 'react-native-btt-sdk';
const bttOptions = new BTTOptions()
bttOptions.trackAnr = true
bttOptions.performanceMonitoring = true
bttOptions.performanceMonitoringInterval = 500
bttOptions.memoryWarning = true
bttOptions.trackCrash = true
bttOptions.debug = false
BTTConfiguration.configure('sdkdemo26621z', bttOptions)

AppRegistry.registerComponent(appName, () => App);
