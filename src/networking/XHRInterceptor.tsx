const originalXHROpen = XMLHttpRequest.prototype.open;
const originalXHRSend = XMLHttpRequest.prototype.send;
const originalXHRSetRequestHeader = XMLHttpRequest.prototype.setRequestHeader;

type OpenCallback =
  | ((method: string, url: string, request: XMLHttpRequest) => void)
  | undefined;
type RequestHeaderCallback =
  | ((header: string, value: string, request: XMLHttpRequest) => void)
  | undefined;
type SendCallback =
  | ((data?: any, request?: XMLHttpRequest) => void)
  | undefined;
type HeaderReceivedCallback =
  | ((
      responseContentType: string | undefined,
      responseSize: number | undefined,
      responseHeader: string,
      request?: XMLHttpRequest
    ) => void)
  | undefined;
type ResponseCallback =
  | ((
      status: number,
      timeout: number,
      response: any,
      responseURL: string,
      responseType: XMLHttpRequestResponseType,
      request: XMLHttpRequest
    ) => void)
  | undefined;

var openCallback: OpenCallback;
var sendCallback: SendCallback;
var requestHeaderCallback: RequestHeaderCallback;
var headerReceivedCallback: HeaderReceivedCallback;
var responseCallback: ResponseCallback;

var isInterceptorEnabled = false;

/**
 * A network interceptor which monkey-patches XMLHttpRequest methods
 * to gather all network requests/responses, in order to show their
 * information in the React Native inspector development tool.
 * This supports interception with XMLHttpRequest API, including Fetch API
 * and any other third party libraries that depend on XMLHttpRequest.
 */
const XHRInterceptor = {
  /**
   * Invoked before XMLHttpRequest.open(...) is called.
   */
  setOpenCallback(callback: OpenCallback) {
    openCallback = callback;
  },

  /**
   * Invoked before XMLHttpRequest.send(...) is called.
   */
  setSendCallback(callback: SendCallback) {
    sendCallback = callback;
  },

  /**
   * Invoked after xhr's readyState becomes xhr.HEADERS_RECEIVED.
   */
  setHeaderReceivedCallback(callback: HeaderReceivedCallback) {
    headerReceivedCallback = callback;
  },

  /**
   * Invoked after xhr's readyState becomes xhr.DONE.
   */
  setResponseCallback(callback: ResponseCallback) {
    responseCallback = callback;
  },

  /**
   * Invoked before XMLHttpRequest.setRequestHeader(...) is called.
   */
  setRequestHeaderCallback(callback: RequestHeaderCallback) {
    requestHeaderCallback = callback;
  },

  isInterceptorEnabled() {
    return isInterceptorEnabled;
  },

  enableInterception() {
    if (isInterceptorEnabled) {
      return;
    }
    // Override `open` method for all XHR requests to intercept the request
    // method and url, then pass them through the `openCallback`.
    XMLHttpRequest.prototype.open = function (...args) {
      if (openCallback) {
        openCallback(args[0], args[1], this);
      }
      originalXHROpen.apply(this, args);
    };

    // Override `setRequestHeader` method for all XHR requests to intercept
    // the request headers, then pass them through the `requestHeaderCallback`.
    XMLHttpRequest.prototype.setRequestHeader = function (header, value) {
      if (requestHeaderCallback) {
        requestHeaderCallback(header, value, this);
      }
      originalXHRSetRequestHeader.apply(this, [header, value]);
    };

    // Override `send` method of all XHR requests to intercept the data sent,
    // register listeners to intercept the response, and invoke the callbacks.
    XMLHttpRequest.prototype.send = function (data) {
      if (sendCallback) {
        sendCallback(data, this);
      }
      if (this.addEventListener) {
        this.addEventListener('readystatechange', () => {
          if (!isInterceptorEnabled) {
            return;
          }
          if (this.readyState === this.HEADERS_RECEIVED) {
            const contentTypeString = this.getResponseHeader('Content-Type');
            const contentLengthString =
              this.getResponseHeader('Content-Length');
            let responseContentType, responseSize;
            if (contentTypeString) {
              responseContentType = contentTypeString.split(';')[0];
            }
            if (contentLengthString) {
              responseSize = parseInt(contentLengthString, 10);
            }
            if (headerReceivedCallback) {
              headerReceivedCallback(
                responseContentType,
                responseSize,
                this.getAllResponseHeaders(),
                this
              );
            }
          }
          if (this.readyState === this.DONE) {
            if (responseCallback) {
              responseCallback(
                this.status,
                this.timeout,
                this.response,
                this.responseURL,
                this.responseType,
                this
              );
            }
          }
        });
      }
      originalXHRSend.apply(this, [data]);
    };
    isInterceptorEnabled = true;
  },

  // Unpatch XMLHttpRequest methods and remove the callbacks.
  disableInterception() {
    if (!isInterceptorEnabled) {
      return;
    }
    isInterceptorEnabled = false;
    XMLHttpRequest.prototype.send = originalXHRSend;
    XMLHttpRequest.prototype.open = originalXHROpen;
    XMLHttpRequest.prototype.setRequestHeader = originalXHRSetRequestHeader;
    responseCallback = undefined;
    openCallback = undefined;
    sendCallback = undefined;
    headerReceivedCallback = undefined;
    requestHeaderCallback = undefined;
  },
};

export default XHRInterceptor;
