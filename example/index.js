import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

import {
  BTTConfiguration,
  BTTOptions,
} from '@bluetriangle/react-native-btt-sdk';
// Site ID comes from the git-ignored btt.config.js. If it can't be resolved, run in the
// example folder: cp btt.config.example.js btt.config.js, then set your site ID in it.
import { BTT_SITE_ID } from './btt.config';

if (!BTT_SITE_ID || BTT_SITE_ID === '<your-site-id>') {
  throw new Error(
    [
      'Blue Triangle site ID is not set.',
      '',
      'To set it:',
      '1. In the example folder, copy the template:',
      '     cp btt.config.example.js btt.config.js',
      '2. Open example/btt.config.js and replace <your-site-id> with your site ID:',
      "     export const BTT_SITE_ID = 'yoursiteid';",
      '3. Reload the app (press r in Metro).',
      '',
      'btt.config.js is git-ignored, so your site ID is never committed.',
    ].join('\n')
  );
}

const bttOptions = new BTTOptions();
bttOptions.trackAnr = true;
bttOptions.performanceMonitoring = true;
bttOptions.performanceMonitoringInterval = 500;
bttOptions.memoryWarning = true;
bttOptions.trackCrash = true;
bttOptions.debug = true;
bttOptions.screenTracking = true;
bttOptions.trackNetworkState = true;
bttOptions.trackAnrIntervalSec = 1;
bttOptions.networkSampleRate = 1;
bttOptions.cacheMemoryLimit = 20 * 1024;
bttOptions.cacheExpiryDuration = 5 * 60 * 1000;

BTTConfiguration.configure(BTT_SITE_ID, bttOptions);

AppRegistry.registerComponent(appName, () => App);
