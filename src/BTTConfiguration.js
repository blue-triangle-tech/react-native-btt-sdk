import { NativeModules, Platform } from 'react-native';
import BTTOptions from './BTTOptions';

const BttSdk = NativeModules.BttSdk
  ? NativeModules.BttSdk
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

class BTTConfiguration  {
    static configure (siteId: String, bttOptions: BTTOptions) {
        const dictionary = {
               "btt_site_id": siteId,
               "trackAnr": bttOptions.trackAnr,
               "performanceMonitoring": bttOptions.performanceMonitoring,
               "performanceMonitoringInterval": bttOptions.performanceMonitoringInterval,
               "memoryWarning": bttOptions.memoryWarning,
               "trackCrash" : bttOptions.trackCrash,
               "debug": bttOptions.debug
           };
      console.log('BTTConfiguration.configure ::', dictionary); 

       BttSdk.bttConfigure(dictionary);
    }

}

export default BTTConfiguration;