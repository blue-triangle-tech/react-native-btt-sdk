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

    constructor(method, url, requestBodylength) {
        this.method = method;
        this.url = url;
        this.requestBodylength = requestBodylength;
    }

    async start() {
        // create captured request for android
        console.log("BTTHTTPTracker::start")
        try {
          const dictionary = {"networkUrl": this.url, "requestMethod": this.method, "bodyLength": this.requestBodylength};

        const result = await BttSdk.networkTrackerStart(dictionary);
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

          if(statusCode == 0){
            statusCode == 600
          }

          BttSdk.networkTrackerSubmit({
            "networkTrackerID": this.networkTrackerID,
            "encodedBodySize": bodySize,
            "requestType":contentType,
            "responseStatusCode":statusCode
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