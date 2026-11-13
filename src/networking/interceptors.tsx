import BTTHTTPTracker from './BTTHTTPTracker';
import XHRInterceptor from './XHRInterceptor';

type RequestState = {
  method: string;
  url: string;
  tracker?: BTTHTTPTracker;
  contentType?: string;
  contentSize?: string;
};

// State is kept per XMLHttpRequest so concurrent requests never overwrite each other.
const requests = new WeakMap<XMLHttpRequest, RequestState>();

const setUpXMLHTTPRequestInterceptor = () => {
  XHRInterceptor.enableInterception();

  XHRInterceptor.setOpenCallback((method, url, request) => {
    requests.set(request, { method: method || 'GET', url });
  });

  XHRInterceptor.setSendCallback((data, request) => {
    const state = request && requests.get(request);
    if (!state) {
      return;
    }
    try {
      const bodyLength = data?.length !== undefined ? String(data.length) : '';
      state.tracker = new BTTHTTPTracker(state.method, state.url, bodyLength);
      state.tracker.start();
    } catch (e) {
      console.error(e);
    }
  });

  XHRInterceptor.setHeaderReceivedCallback(
    (responseContentType, responseSize, _responseHeader, request) => {
      const state = request && requests.get(request);
      if (!state) {
        return;
      }
      state.contentType = responseContentType;
      if (responseSize !== undefined) {
        state.contentSize = responseSize.toString();
      }
    }
  );

  XHRInterceptor.setResponseCallback(
    (
      status,
      _timeout,
      _response,
      _responseURL,
      _responseType,
      request,
      failure
    ) => {
      const state = requests.get(request);
      requests.delete(request);
      if (!state?.tracker) {
        return;
      }
      // Aborted requests were cancelled by the app, they are not network errors.
      if (failure && failure.type !== 'abort') {
        state.tracker.submitError(failure.message);
      } else {
        state.tracker.submitResponse(
          state.contentType ?? '',
          state.contentSize ?? '',
          status.toString()
        );
      }
    }
  );
};

export default () => {
  setUpXMLHTTPRequestInterceptor();
};
