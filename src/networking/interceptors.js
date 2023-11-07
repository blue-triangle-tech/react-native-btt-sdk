import BTTHTTPTracker from "./BTTHTTPTracker";

const setUpXMLHTTPRequestInterceptor = () => {
    // const xhrOpen = XMLHttpRequest.prototype.open;
    // const xhrSend = XMLHttpRequest.prototype.send;

    // XMLHttpRequest.prototype.open = (method, url, async, user, password) => {
    //     console.log("Open: ", method, url, async, user, password);
    //     xhrOpen(method, url, async, user, password);
    // }

    // XMLHttpRequest.prototype.send = (data) => {
    //     console.log("Send: ", data);
    //     xhrSend(data);
    // }
}

const setUpFetchInterceptor = () => {
    const { fetch:originalFetch } = window;

    window.fetch = async (...args) => {
        let [resource, config ] = args;
        // request interceptor here
        const tracker = new BTTHTTPTracker(config ? config.method : "GET", resource);
        try {
            const response = await originalFetch(resource, config);
            const bodySize = response.headers.get("Content-Length");
            const contentType = response.headers.get("Content-Type");
            // response interceptor here
            tracker.submitResponse(contentType, bodySize, response.status);
        } catch(err) {
            tracker.submitError(err)
            // Forward error to the calling function
            throw err
        }
        return response;
    };
}

export default setUpInterceptors = ()=> {
    setUpXMLHTTPRequestInterceptor();
    setUpFetchInterceptor();
}