import BTTHTTPTracker from './BTTHTTPTracker';
import XHRInterceptor from './XHRInterceptor';

const setUpXMLHTTPRequestInterceptor = () => {
  XHRInterceptor.enableInterception();
  var tracker: BTTHTTPTracker;
  var httpMethod: string;
  var requestUrl: string;
  XHRInterceptor.setOpenCallback((method: string, url: string) => {
    console.log(`setOpenCallback(${method}, ${url}`);
    httpMethod = method;
    requestUrl = url;
  });

  XHRInterceptor.setSendCallback((data: any) => {
    console.log(`setSendCallback ${data}`);
    if (data != undefined) {
      console.log(`setSendCallback ${data.length}`);
      var dataLength = data.length.toString();
      tracker = new BTTHTTPTracker(httpMethod || 'GET', requestUrl, dataLength);
      tracker.start();
    } else {
      tracker = new BTTHTTPTracker(httpMethod || 'GET', requestUrl, '');
      tracker.start();
    }
  });

  var contentType: string;
  var contentSize: string;
  XHRInterceptor.setHeaderReceivedCallback(
    (responseContentType: string, responseSize: number) => {
      contentType = responseContentType;
      if (responseSize != undefined) {
        contentSize = responseSize.toString();
      }
    }
  );

  XHRInterceptor.setResponseCallback((status: number) => {
    tracker.submitResponse(contentType, contentSize, status.toString());
  });
};

export default () => {
  setUpXMLHTTPRequestInterceptor();
};
