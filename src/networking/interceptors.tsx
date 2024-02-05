import BTTHTTPTracker from "./BTTHTTPTracker";
import XHRInterceptor from "./XHRInterceptor";

const setUpXMLHTTPRequestInterceptor = () => {
    //  const xhrOpen = XMLHttpRequest.prototype.open;
    //  const xhrSend = XMLHttpRequest.prototype.send;

    //  XMLHttpRequest.prototype.open = (method, url, async) => {
    //      console.log("Open: ", method, url, async);
    //      xhrOpen(method, url, async);
    //  }

    //  XMLHttpRequest.prototype.send = (data) => {
    //      console.log("Send: ", data);
    //      xhrSend(data);
    //  }
    console.log("::setUpXMLHTTPRequestInterceptor::")

    XHRInterceptor.enableInterception()
    var tracker
    var httpMethod
    var requestUrl
    XHRInterceptor.setOpenCallback((method, url)=>{
        console.log(`setOpenCallback(${method}, ${url}`)
        httpMethod = method
        requestUrl = url
    });

    XHRInterceptor.setSendCallback(( data) => {
        console.log(`setSendCallback ${data}`)
        if(data != undefined){
            console.log(`setSendCallback ${data.length}`)
        var dataLength = data.length.toString()
         tracker = new BTTHTTPTracker(httpMethod || "GET", requestUrl, dataLength);
         tracker.start()
        }
        else{
            tracker = new BTTHTTPTracker(httpMethod || "GET", requestUrl, "");
            tracker.start()
        }
    });

    var contentType
    var contentSize
    XHRInterceptor.setHeaderReceivedCallback(( responseContentType,
        responseSize) => {
            console.log(`setHeaderReceivedCallback(${responseContentType}, ${responseSize}`)
        contentType = responseContentType
        if(responseSize != undefined){
            contentSize = responseSize.toString()
        }
    });

    XHRInterceptor.setResponseCallback((status,
        timeout,
        response,
       responseURL,
        responseType)=>{
            console.log(`setResponseCallback(${status}, ${contentSize}, ${contentType}`)
        tracker.submitResponse(contentType, contentSize, status);
    });
}

const setUpFetchInterceptor = () => {
    const { fetch:originalFetch } = window;

    window.fetch = async (...args) => {
        let [resource, config ] = args;

        console.log("::setUpFetchInterceptor::")

        // request interceptor here
        const tracker = new BTTHTTPTracker(config.method || "GET", resource);
        tracker.start()
        try {
            const response = await originalFetch(resource, config);
            const bodySize = response.headers.get("Content-Length");
            const contentType = response.headers.get("Content-Type");
            // response interceptor here
            tracker.submitResponse(contentType, bodySize, response.status);
            return response;
        } catch(err) {
            tracker.submitError(err)
            // Forward error to the calling function
            throw err
        }
    };
}

export default setUpInterceptors = ()=> {
    console.log("::setUpInterceptors::")
    setUpXMLHTTPRequestInterceptor();
    //setUpFetchInterceptor();
}