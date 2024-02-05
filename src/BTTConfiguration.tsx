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
               "screenTracking": bttOptions.screenTracking,
               "trackNetworkState": bttOptions.trackNetworkState          
               };
      console.log('BTTConfiguration.configure ::', dictionary); 
    
      setUpInterceptors();
      BttSdk.bttConfigure(dictionary);
    }

    static async getSessionId(){
      console.log('SessionId:1');

      try {
      const sessionId = await BttSdk.getSessionId()
      console.log('SessionId:', sessionId);
      return sessionId;
       } catch (error) {
           console.error('Error fetching SessionId:', error);
         throw error; // Rethrow the error for the calling code to handle
       }
    }
}

export default BTTConfiguration;
