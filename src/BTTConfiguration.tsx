import { NativeModules } from 'react-native';
import BTTOptions from './BTTOptions';
import setUpInterceptors from './networking/interceptors'

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
               "debug": bttOptions.debug,
               "btt_session_id": bttOptions.sessionID
           };
      console.log('BTTConfiguration.configure ::', dictionary); 
    
      setUpInterceptors();
      BttSdk.bttConfigure(dictionary);
    }

}

export default BTTConfiguration;