import BttSdk from '../BttSdk';

class BTTHTTPTracker {
  private method: string;
  private url: string;
  private requestBodyLength: string;
  private networkTrackerID!: string;

  constructor(method: string, url: string, requestBodyLength: string) {
    this.method = method;
    this.url = url;
    this.requestBodyLength = requestBodyLength;
  }

  async start() {
    // create captured request for android
    console.log('BTTHTTPTracker::start');
    try {
      const dictionary = {
        networkUrl: this.url,
        requestMethod: this.method,
        bodyLength: this.requestBodyLength,
      };

      const result = await BttSdk.networkTrackerStart(dictionary);
      this.networkTrackerID = result.networkTrackerID;
      console.log(
        `BTTHTTPTracker::start::networkTrackerID(${this.networkTrackerID})`
      );
    } catch (error) {
      // Handle error
      console.log(`BTTHTTPTracker::error(${error})`);
    }
  }

  submitResponse(contentType: string, bodySize: string, statusCode: string) {
    // Submit Network request
    console.log(`BTTHTTPTracker::networkTrackerID(${this.networkTrackerID})`);
    if (this.networkTrackerID != undefined) {
      if (statusCode == '0') {
        statusCode = '600';
      }
      console.log(
        `BTTHTTPTracker::submitResponse(${contentType}, ${bodySize}, ${statusCode})`
      );

      BttSdk.networkTrackerSubmit({
        networkTrackerID: this.networkTrackerID,
        encodedBodySize: bodySize,
        requestType: contentType,
        responseStatusCode: statusCode,
      });
    }
  }

  submitError(err: Error) {
    console.log(`BTTHTTPTracker::submitError(${err})`);
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
