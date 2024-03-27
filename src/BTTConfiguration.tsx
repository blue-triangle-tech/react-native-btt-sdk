import { NativeModules } from 'react-native';
import BTTOptions from './BTTOptions';
import setUpInterceptors from './networking/interceptors'
import BTTDM from './BTTDM'

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
    static async configure (siteId: String, bttOptions: BTTOptions) {
        const dictionary = {
               "btt_site_id": siteId,
               "trackAnr": bttOptions.trackAnr,
               "performanceMonitoring": bttOptions.performanceMonitoring,
               "performanceMonitoringInterval": bttOptions.performanceMonitoringInterval,
               "memoryWarning": bttOptions.memoryWarning,
               "trackCrash" : bttOptions.trackCrash,
               "debug": bttOptions.debug,
               "screenTracking": bttOptions.screenTracking,
               "trackNetworkState": bttOptions.trackNetworkState,
               "trackAnrIntervalSec": bttOptions.trackAnrIntervalSec,
               "networkSampleRate": bttOptions.networkSampleRate,
               "cacheMemoryLimit": bttOptions.cacheMemoryLimit,
               "cacheExpiryDuration": bttOptions.cacheExpiryDuration           
               };
      setUpInterceptors();
      BTTDM.setBttOption(bttOptions)
      const sessionId = await BttSdk.bttConfigure(dictionary);
      BTTDM.setSessionId(sessionId)
    }

    static async getSessionId(){

      try {
      const sessionId = await BttSdk.getSessionId()
      BTTDM.setSessionId(sessionId)
      return sessionId;
       } catch (error) {
           console.error('Error fetching SessionId:', error);
         throw error; // Rethrow the error for the calling code to handle
       }
    }
}

export default BTTConfiguration;
