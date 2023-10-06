// BTTScreenTracker.js
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

class BTTScreenTracker  {

     static loadStarted(id : String,  name : String){
         BttSdk.loadStarted(id , name)
      }

      static viewStart(id : String,  name : String){
        BttSdk.loadStarted(id , name) //TODO:: We should not be call load start and finished this should be handled in native. for screen if directly view start called then native sdk should implicitly do load start and load finish.
        BttSdk.loadFinish(id , name)
        BttSdk.viewStart(id , name)
      }
      
      static viewingEnd(id : String,  name : String){
        BttSdk.viewingEnd(id , name)
      }
  }
  
  module.exports = BTTScreenTracker;
  