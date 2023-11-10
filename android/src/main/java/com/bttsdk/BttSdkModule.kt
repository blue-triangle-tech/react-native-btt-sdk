package com.bttsdk

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import android.app.Application
import android.content.Context
import android.util.Log
import com.bluetriangle.analytics.BlueTriangleConfiguration
import com.bluetriangle.analytics.Timer
import com.bluetriangle.analytics.Tracker
import com.bluetriangle.analytics.model.Screen
import com.bluetriangle.analytics.model.ScreenType
import com.bluetriangle.analytics.networkcapture.CapturedRequest
import com.bluetriangle.analytics.networkcapture.RequestType
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableMap

class BttSdkModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return NAME
  }

  // Example method
  // See https://reactnative.dev/docs/native-modules-android
  @ReactMethod
  fun multiply(a: Double, b: Double, promise: Promise) {
    promise.resolve(a * b)
  }

  companion object {
    const val NAME = "BttSdk"

    fun bttDefaultConfigure(context: Context) {
      val config = BlueTriangleConfiguration()
      config.siteId = "sdkdemo26621z"
      config.isDebug = true
      config.isTrackCrashesEnabled = true
      config.isTrackAnrEnabled = true
      config.isScreenTrackingEnabled = true

      Tracker.init(context.applicationContext as Application, config)

      config.logger?.debug("BttSdkModule:: bttDefaultConfigure")
    }
  }

  @ReactMethod
  fun bttConfigure(dictionary: ReadableMap) {

    var sessionID = dictionary.getString("btt_session_id")
   // var memoryWarning = dictionary.getBoolean("memoryWarning")

    val config = BlueTriangleConfiguration()
    config.siteId = dictionary.getString("btt_site_id")
    config.isDebug = dictionary.getBoolean("debug")
    config.isTrackCrashesEnabled = dictionary.getBoolean("trackCrash")
    config.isScreenTrackingEnabled = true
    config.isTrackAnrEnabled = dictionary.getBoolean("trackAnr")
    config.isPerformanceMonitorEnabled = dictionary.getBoolean("performanceMonitoring")
    config.performanceMonitorIntervalMs = dictionary.getDouble("performanceMonitoringInterval").toLong()

    if (sessionID?.isNotEmpty() == true)
    {
      config.sessionId = sessionID
    }
    Tracker.init(reactApplicationContext.applicationContext as Application, config)

    config.logger?.debug("configure")
  }

  //private var timer: Timer?=null
  private var timerMap: MutableMap<String, Timer> = mutableMapOf()
  private var networkTrackerMap: MutableMap<String, CapturedRequest> = mutableMapOf()

  fun generateRandomString(length: Int): String {
    val allowedChars = ('A'..'Z') + ('a'..'z') + ('0'..'9')
    return (1..length)
      .map { allowedChars.random() }
      .joinToString("")
  }

  @ReactMethod
  fun bttStartTimer(dictionary: ReadableMap, promise: Promise) {
    var bttPageName = dictionary.getString("btt_page_name")

    Tracker.instance?.configuration?.logger?.debug("bttStartTimer.")
    //timer?.submit()
    var timer: Timer = Timer(bttPageName,"")
    timer?.start()
    val timerID: String = generateRandomString(10)

    this.timerMap?.put(timerID, timer)

    try {
      val dictionary: WritableMap = Arguments.createMap()
      dictionary.putString("btt_timer_id", timerID)
      promise.resolve(dictionary)
    } catch (e: Exception) {
      promise.reject("ERROR", e.message)
    }
  }

  @ReactMethod
  fun bttStopTimer(dictionary: ReadableMap) {

    Tracker.instance?.configuration?.logger?.debug("bttStopTimer.")

    val timerID = dictionary.getString("btt_timer_id")
    val cartVal = dictionary.getString("btt_cartValue")

    val timer: Timer? = timerMap?.get(timerID)
    if(cartVal?.isNotEmpty() == true) {
      cartVal?.toDoubleOrNull()?.let { timer?.setCartValue(it) }
    }
    timer?.submit()
    timerMap.remove(timerID)
  }

  @ReactMethod
  fun loadStarted(id : String , name : String){
    var screen = Screen(id, name, ScreenType.Composable)
    Tracker.instance?.screenTrackMonitor?.onLoadStarted(screen)
    Tracker.instance?.configuration?.logger?.debug("Android :: loadStarted.")
  }

  @ReactMethod
  fun loadFinish(id : String , name : String){
    var screen = Screen(id, name, ScreenType.Composable)
    Tracker.instance?.screenTrackMonitor?.onLoadEnded(screen)
    Tracker.instance?.configuration?.logger?.debug("Android :: loadFinish.")
  }

  @ReactMethod
  fun viewStart(id : String , name : String){
    var screen = Screen(id, name, ScreenType.Composable)
    Tracker.instance?.screenTrackMonitor?.onViewStarted(screen)
    Tracker.instance?.configuration?.logger?.debug("Android :: viewStart.")
  }

  @ReactMethod
  fun viewingEnd(id : String , name : String){
    var screen = Screen(id, name, ScreenType.Composable)
    Tracker.instance?.screenTrackMonitor?.onViewEnded(screen)
    Tracker.instance?.configuration?.logger?.debug("Android :: viewingEnd.")
  }

  @ReactMethod
  fun networkTrackerStart(networkUrl : String ,promise: Promise){

    // create a captured request object
    val capturedRequest = CapturedRequest()
    capturedRequest.url = networkUrl

    val networkTrackerID: String = generateRandomString(10)
    this.networkTrackerMap?.put(networkTrackerID, capturedRequest)

    // start timing the request
    capturedRequest.start()

    try {
      val dictionary: WritableMap = Arguments.createMap()

      dictionary.putString("networkTrackerID", networkTrackerID)
      promise.resolve(dictionary)
    } catch (e: Exception) {
      promise.reject("ERROR", e.message)
    }
  }

  @ReactMethod
  fun networkTrackerSubmit(dictionary: ReadableMap){
    val networkTrackerID = dictionary.getString("bttNetworkTrackerID")
    val encodedBodySize = dictionary.getString("bttEncodedBodySize")
    val requestType = dictionary.getString("bttRequestType")
    val responseStatusCode = dictionary.getInt("bttResponseStatusCode")

    val capturedRequest: CapturedRequest? = networkTrackerMap?.get(networkTrackerID)
    capturedRequest?.encodedBodySize = encodedBodySize?.toLong() ?: 0
    capturedRequest?.requestType = RequestType.fromFilePath(requestType)
    capturedRequest?.responseStatusCode = responseStatusCode

    capturedRequest?.stop()
    // submit the captured request to the tracker instance
    Tracker.instance?.submitCapturedRequest(capturedRequest)
  }
}
