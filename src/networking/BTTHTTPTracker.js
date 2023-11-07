class BTTHTTPTracker {

    constructor(method, url) {
        this.method = method;
        this.url = url;
    }

    start() {
        // create captured request for android
        console.log("BTTHTTPTracker::start")
    }

    submitResponse(contentType, bodySize, statusCode) {
        // Submit Network request
        console.log(`BTTHTTPTracker::submitResponse(${contentType}, ${bodySize}, ${statusCode})`)
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