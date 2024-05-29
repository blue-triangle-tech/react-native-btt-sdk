import BlueTriangle

@objc(BttSdk)
class BttSdk: NSObject {
    
    private var timer : BTTimer?
    private var timerDict = [String: BTTimer]()
    private var screenTrackerDict = [String: BTTScreenTracker]()
    private var networkTrackerDict = [String: NetworkCaptureTracker]()

    @objc(bttConfigure:withResolver:withRejecter:)
    func bttConfigure(_ dictionary: [String: Any], resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) {
        
        debugPrint(" configure Dictionary Print Here")
        BlueTriangle.configure { config in
            
            if let siteID = dictionary["btt_site_id"] as? String {
                config.siteID = siteID
            }
            
            if let trackAnr = dictionary["trackAnr"] as? Bool {
                config.ANRMonitoring = trackAnr
            }
            
            if let performanceMonitoring = dictionary["performanceMonitoring"] as? Bool {
                config.isPerformanceMonitorEnabled = performanceMonitoring
            }
            
            if let performanceMonitoringInterval = dictionary["performanceMonitoringInterval"] as? Double  {
                let secondsInInterval: Double = performanceMonitoringInterval / 1000
                config.performanceMonitorSampleRate = secondsInInterval
            }
            
            if let memoryWarning = dictionary["memoryWarning"] as? Bool {
                config.enableMemoryWarning = memoryWarning
            }
            
            if let trackCrash = dictionary["trackCrash"] as? Bool {
                if(trackCrash){
                    config.crashTracking  = .nsException
                }
                else{
                    config.crashTracking = .none
                }
            }
            
            if let debug = dictionary["debug"] as? Bool {
                config.enableDebugLogging = debug
            }
            
            if let sessionID = dictionary["btt_session_id"] as? String {
                if let uintValue = UInt64(sessionID) {
                    config.sessionID = uintValue
                }
            }
            if let screenTracking = dictionary["screenTracking"] as? Bool {
                config.enableScreenTracking = screenTracking
            }
            
            if let networkState = dictionary["trackNetworkState"] as? Bool {
                config.enableTrackingNetworkState = networkState
            }
            config.ignoreViewControllers = ["RNSScreen", "UIViewController"]
            
            if let anrWarningTimeInterval = dictionary["trackAnrIntervalSec"] as? Double  {
                config.ANRWarningTimeInterval = anrWarningTimeInterval //config.ANRWarningTimeInterval = 1
            }
            
            if let networkSampleRate = dictionary["networkSampleRate"] as? Double  {
                config.networkSampleRate = networkSampleRate //config.networkSampleRate = 1
            }
           
            if let cacheMemoryLimit = dictionary["cacheMemoryLimit"] as? Double  {
                config.cacheMemoryLimit = UInt(cacheMemoryLimit) //config.cacheMemoryLimit = 20 * 1024
            }
            
            if let cacheExpiryDuration = dictionary["cacheExpiryDuration"] as? Double  {
                config.cacheExpiryDuration = Millisecond(cacheExpiryDuration) //config.cacheExpiryDuration = 5 * 60 * 1000
            }

            if let launchTime = dictionary["launchTime"] as? Bool {
                config.enableLaunchTime = launchTime
            }
        }
        // Process the dictionary as needed
        // For example, log its contents
        print("Received dictionary: \(dictionary)")
        let sessionID = BlueTriangle.sessionID
        resolve(String(sessionID))
    }
    
    @objc(getSessionId:withRejecter:)
    func getSessionId( resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        let sessionID = BlueTriangle.sessionID
        resolve(String(sessionID))
    }
    
    @objc func bttDefaultConfigure() {
      debugPrint(" Print Here ")
      // Configure BlueTriangle
      BlueTriangle.configure { config in
        config.siteID = "sdkdemo26621z"
        config.enableDebugLogging = true
        config.performanceMonitorSampleRate = 1
        config.crashTracking  = .nsException
        config.ANRMonitoring = true
        config.ANRWarningTimeInterval = 1
        config.enableScreenTracking = true
      }
    }
    
    @objc(bttStartTimer:withResolver:withRejecter:)
    func bttStartTimer(_ pageDict: [String: Any], resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
         
        print("bttStartTimer Received dictionary: \(pageDict)")

        guard let pageName = pageDict["btt_page_name"] as? String else {
            //reject
            return
        }
        let timer:BTTimer = BlueTriangle.startTimer(page: Page(pageName:pageName))
        
        let timerID = UUID().uuidString
        let dictionary: [String: Any] = [
               "btt_timer_id": timerID//TODO::
           ]
        timerDict[timerID] = timer
           resolve(dictionary)
       }
    
    @objc
    func bttStopTimer(_ dictionary: [String: Any]) {
        if let timerID = dictionary["btt_timer_id"] as? String{
            if let t = timerDict[timerID]{
                print("Stop timer DONE")
                
                if let cValue = dictionary["btt_cartValue"] as? String{
                    let purchaseConfirmation = PurchaseConfirmation.init(cartValue:  Decimal(string: cValue) ?? 0.0)
                    
                    
                    BlueTriangle.endTimer(t, purchaseConfirmation:purchaseConfirmation)
                }
                else{
                    BlueTriangle.endTimer(t)
                }
                timer = nil
                timerDict.removeValue(forKey: timerID)
            }
        }
    }
    
    private func getScreenTracker(_ page : String, pageId : String) -> BTTScreenTracker{
        if let screenTracker:BTTScreenTracker = screenTrackerDict[pageId]{
            return screenTracker
        }
        let screenTracker = BTTScreenTracker(page)
        screenTrackerDict[pageId] = screenTracker
        return screenTracker
    }
    
    @objc
    func loadStarted(_ page : String, pageId : String){
        print("loadStarted")
        let screenTracker:BTTScreenTracker = self.getScreenTracker(page, pageId: pageId)
        screenTracker.loadStarted()
    }
    
    @objc
    func loadFinish(_ page : String, pageId : String){
        print("loadFinish")
        let screenTracker:BTTScreenTracker = self.getScreenTracker(page, pageId: pageId)
        screenTracker.loadEnded()
    }
    
    @objc
    func viewStart(_ page : String, pageId : String){
        print("viewStart")

        let screenTracker:BTTScreenTracker = self.getScreenTracker(page, pageId: pageId)
        screenTracker.viewStart()
    }
    
    @objc
    func viewingEnd(_ page : String, pageId : String){
        print("viewingEnd")

        let screenTracker:BTTScreenTracker = self.getScreenTracker(page, pageId: pageId)
        screenTracker.viewingEnd()
        screenTrackerDict.removeValue(forKey: pageId)
    }
    
    @objc(networkTrackerStart:withResolver:withRejecter:)
    func networkTrackerStart(_ dictionary: [String: Any], resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        print("networkTrackerStart: \(dictionary)")
        var requestUrl = ""
        var requestMethod = ""
        var bodyLength = ""
        
        if let rUrl = dictionary["networkUrl"] as? String {
            requestUrl = rUrl
        }
        
        if let rMethod = dictionary["requestMethod"] as? String {
            requestMethod = rMethod
        }
        
        if let bLength = dictionary["bodyLength"] as? String {
            bodyLength = bLength
        }
        
        let tracker = NetworkCaptureTracker.init(url: requestUrl, method: requestMethod, requestBodylength: Int64(bodyLength) ?? 0)
        let networkTrackerID = UUID().uuidString
        let ntDict: [String: Any] = [
               "networkTrackerID": networkTrackerID
           ]
        networkTrackerDict[networkTrackerID] = tracker
        resolve(ntDict)
    }
    
    @objc
    func networkTrackerSubmit(_ dictionary: [String: Any]) {
        print("networkTrackerSubmit dictionary: \(dictionary)")
        if let networkTrackerID = dictionary["networkTrackerID"] as? String{
            if let tracker = networkTrackerDict[networkTrackerID]{
                
                var statusCode = 0
                var bodyLength = ""
                var requestType = ""
                
                if let sCode = dictionary["responseStatusCode"] as? Int {
                    statusCode = sCode
                }
                
                if statusCode == 0{
                    statusCode = 600
                }
                
                if let rBodyLength = dictionary["encodedBodySize"] as? String {
                    bodyLength = rBodyLength
                }
                
                if let rType = dictionary["requestType"] as? String {
                    requestType = rType
                }
                
                print("networkTrackerSubmit:statusCode: \(statusCode) bodyLength:\(bodyLength) requestType:\(requestType)")
                
                tracker.submit(Int64(statusCode), responseBodyLength: Int64(bodyLength) ?? 0, contentType: requestType)
                networkTrackerDict.removeValue(forKey: networkTrackerID)
            }
        }
    }
}
