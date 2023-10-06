import { NativeModules, Platform } from 'react-native';
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

class BTTTimer {
    
    static startTimer(dictionary: Dictionary) {

        try {
        
            const result = BttSdk.bttStartTimer(dictionary);
            console.log('Async operation completed::',result);
            return result
          } catch (error) {
            console.error(error);
          }
        }
        
        static stopTimer(dictionary: Dictionary) {
           BttSdk.bttStopTimer(dictionary);
        }
}

module.exports = BTTTimer;