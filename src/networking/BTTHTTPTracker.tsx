import BttSdk from '../BttSdk';

class BTTHTTPTracker {
  private method: string;
  private url: string;
  private requestBodyLength: string;
  private networkTrackerID: string | undefined;

  constructor(method: string, url: string, requestBodyLength: string) {
    this.method = method;
    this.url = url;
    this.requestBodyLength = requestBodyLength;
  }

  async start() {
    // create captured request for android
    try {
      const dictionary = {
        networkUrl: this.url,
        requestMethod: this.method,
        bodyLength: this.requestBodyLength,
      };

      const result = await BttSdk.networkTrackerStart(dictionary);
      this.networkTrackerID = result.networkTrackerID;
    } catch (error) {
      // Handle error
      console.error(error);
    }
  }

  submitResponse(
    contentType: string | undefined,
    bodySize: string,
    statusCode: string
  ) {
    // Submit Network request
    if (this.networkTrackerID !== undefined) {
      if (statusCode === '0') {
        statusCode = '600';
      }

      BttSdk.networkTrackerSubmit({
        networkTrackerID: this.networkTrackerID,
        encodedBodySize: bodySize,
        requestType: contentType,
        responseStatusCode: parseInt(statusCode, 10),
      });
    }
  }

  submitError(err: Error) {
    console.error(err);
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
