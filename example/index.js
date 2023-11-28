import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

import {BTTConfiguration, BTTOptions} from 'react-native-btt-sdk';
import Utility from './src/Utility';
import DataManagement from './src/DataManagement'

const sessionID = Utility.currentFormatDate()

const bttOptions = new BTTOptions()
bttOptions.trackAnr = true
bttOptions.performanceMonitoring = false
bttOptions.performanceMonitoringInterval = 500
bttOptions.memoryWarning = false
bttOptions.trackCrash = true
bttOptions.debug = true
bttOptions.sessionID = sessionID

DataManagement.setSessionId(sessionID)
BTTConfiguration.configure('sdkdemo26621z', bttOptions)

AppRegistry.registerComponent(appName, () => App);
