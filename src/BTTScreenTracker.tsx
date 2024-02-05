// BTTScreenTracker.js
import { NativeModules } from 'react-native';

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

  constructor(pageName){
    this.pageName = pageName
    this.customPageID =  Math.random().toString(36).substr(2, 9);
  }

  startTracking(){
    BTTScreenTracker.viewStart(this.pageName, this.customPageID )
  }

  stopTracking(){
    BTTScreenTracker.viewingEnd(this.pageName, this.customPageID )
  }
 
     static loadStarted(name : String, pageId : String){
      console.log("React loadStarted")

         BttSdk.loadStarted(name, pageId)
      }

      static viewStart(name : String, pageId : String){
        console.log("React viewStart")
        BttSdk.loadStarted(name, pageId) //TODO:: We should not be call load start and finished this should be handled in native. for screen if directly view start called then native sdk should implicitly do load start and load finish.
        BttSdk.loadFinish(name, pageId)
        BttSdk.viewStart(name, pageId)
      }
      
      static viewingEnd(name : String, pageId : String){
        console.log("React viewingEnd")

        BttSdk.viewingEnd(name, pageId)
      }
  }
  
export default BTTScreenTracker;
  