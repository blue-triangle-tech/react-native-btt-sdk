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

class BTTHTTPTracker {

    constructor(method, url) {
        this.method = method;
        this.url = url;
    }

    async start() {
        // create captured request for android
        console.log("BTTHTTPTracker::start")
        BttSdk.bttLogger()
        console.log("BTTHTTPTracker::start1")
        try {
        const result = await BttSdk.networkTrackerStart(this.url);
        this.networkTrackerID = result.networkTrackerID
        console.log(`BTTHTTPTracker::start::networkTrackerID(${this.networkTrackerID})`)

        }
        catch (error) {
          // Handle error
          console.log(`BTTHTTPTracker::error(${error})`)
        }
    }

    submitResponse(contentType, bodySize, statusCode) {
        // Submit Network request
        console.log(`BTTHTTPTracker::submitResponse(${contentType}, ${bodySize}, ${statusCode})`)
        console.log(`BTTHTTPTracker::networkTrackerID(${this.networkTrackerID})`)
        if(this.networkTrackerID != undefined){
          BttSdk.networkTrackerSubmit({
            "bttNetworkTrackerID": this.networkTrackerID,
            "bttEncodedBodySize": bodySize,
            "bttRequestType":contentType,
            "bttResponseStatusCode":statusCode
          })
        }
    }

    submitError(err) {
        console.log(`BTTHTTPTracker::submitError(${err})`)
    }

    /**
     * USAGE:
     * const tracker = BTTHTTPTracker(method, url);
     * tracker.start();
     * 
     * try {
     *      const response = makeRequest();
     *      tracker.submitResponse(contentType, bodySize, statusCode); 
     * } catch(err) {
     *      tracker.submitError(err);
     * }
     * 
     */
}

export default BTTHTTPTracker;