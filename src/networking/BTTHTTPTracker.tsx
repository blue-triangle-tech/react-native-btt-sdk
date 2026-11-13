import BttSdk from '../BttSdk';

/** Status code the native SDKs use for a request that got no response. */
const NO_RESPONSE_STATUS_CODE = 600;

class BTTHTTPTracker {
  private method: string;
  private url: string;
  private requestBodyLength: string;
  private networkTrackerID: Promise<string | undefined> | undefined;

  constructor(method: string, url: string, requestBodyLength: string) {
    this.method = method;
    this.url = url;
    this.requestBodyLength = requestBodyLength;
  }

  start() {
    this.networkTrackerID = BttSdk.networkTrackerStart({
      networkUrl: this.url,
      requestMethod: this.method,
      bodyLength: this.requestBodyLength,
    })
      .then((result: { networkTrackerID?: string }) => result?.networkTrackerID)
      .catch((error: unknown) => {
        console.error(error);
        return undefined;
      });
    return this.networkTrackerID;
  }

  /** Request completed with an HTTP response (any status code). */
  submitResponse(
    contentType: string | undefined,
    bodySize: string,
    statusCode: string
  ) {
    const code = parseInt(statusCode, 10);
    this.submit({
      encodedBodySize: bodySize,
      requestType: contentType ?? '',
      responseStatusCode: code > 0 ? code : NO_RESPONSE_STATUS_CODE,
    });
  }

  /**
   * Request failed without a response (no connectivity, DNS, TLS, timeout, ...).
   * Reported natively as a network error, subject to the non-fatal error sample rate.
   */
  submitError(errorMessage: string) {
    this.submit({
      encodedBodySize: '0',
      requestType: '',
      responseStatusCode: NO_RESPONSE_STATUS_CODE,
      errorMessage,
    });
  }

  private submit(response: {
    encodedBodySize: string;
    requestType: string;
    responseStatusCode: number;
    errorMessage?: string;
  }) {
    // Waits for `start()`: a fast response can finish before the native tracker ID resolves.
    this.networkTrackerID?.then((networkTrackerID) => {
      if (networkTrackerID === undefined) {
        return;
      }
      BttSdk.networkTrackerSubmit({ networkTrackerID, ...response });
    });
  }

  /**
   * USAGE:
   * const tracker = new BTTHTTPTracker(method, url, requestBodyLength);
   * tracker.start();
   *
   * try {
   *      const response = await makeRequest();
   *      tracker.submitResponse(contentType, bodySize, statusCode);
   * } catch (err) {
   *      tracker.submitError(err.message);
   * }
   */
}

export default BTTHTTPTracker;
