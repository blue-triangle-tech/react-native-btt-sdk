import BlueTriangle

@objc(BttSdk)
class BttSdk: NSObject {
    
    private var timer : BTTimer?
    private var timerDict = [String: BTTimer]()

    @objc
    func bttConfigure(_ dictionary: [String: Any]) {
        
        debugPrint(" configure Dictionary Print Here")
        BlueTriangle.configure { config in
            
            if let siteID = dictionary["btt_site_id"] as? String {
                config.siteID = siteID
            }
            
            if let trackAnr = dictionary["trackAnr"] as? Bool {
                config.ANRMonitoring = trackAnr
            }
            
            if let performanceMonitoring = dictionary["performanceMonitoring"] as? Bool {
            }
            
            if let performanceMonitoringInterval = dictionary["performanceMonitoringInterval"] as? Double  {
                let secondsInInterval: Double = performanceMonitoringInterval / 1000
                config.performanceMonitorSampleRate = secondsInInterval
            }
            
            if let memoryWarning = dictionary["memoryWarning"] as? Bool {
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
            config.ANRWarningTimeInterval = 1
            config.enableScreenTracking = true
        }
        // Process the dictionary as needed
        // For example, log its contents
        print("Received dictionary: \(dictionary)")
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
    
    @objc
    func loadStarted(_ id : String, name : String){
        
    }
    
    @objc
    func loadFinish(_ id : String, name : String){
        
    }
    
    @objc
    func viewStart(_ id : String, name : String){
        
    }
    
    @objc
    func viewingEnd(_ id : String, name : String){
        
    }
}
