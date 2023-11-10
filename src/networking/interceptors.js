import BTTHTTPTracker from "./BTTHTTPTracker";



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
    setUpXMLHTTPRequestInterceptor();
    setUpFetchInterceptor();
}