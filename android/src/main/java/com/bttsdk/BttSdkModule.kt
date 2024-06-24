package com.bttsdk

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import android.app.Application
import android.util.Log
import com.bluetriangle.analytics.BlueTriangleConfiguration
import com.bluetriangle.analytics.Timer
import com.bluetriangle.analytics.Tracker
import com.bluetriangle.analytics.screenTracking.BTTScreenTracker
import com.bluetriangle.analytics.networkcapture.CapturedRequest
import com.bluetriangle.analytics.networkcapture.RequestType
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableMap
import java.lang.Long.parseLong

class BttSdkModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName() = NAME

    companion object {
        const val NAME = "BttSdk"
    }

    @ReactMethod
    fun bttConfigure(dictionary: ReadableMap, promise: Promise) {
        Log.d("bttConfigure", dictionary.toString())

        val sessionID = dictionary.getString("btt_session_id")

        val config = BlueTriangleConfiguration()
        config.siteId = dictionary.getString("btt_site_id")
        config.isDebug = dictionary.getBoolean("debug")
        config.isTrackCrashesEnabled = dictionary.getBoolean("trackCrash")
        config.isScreenTrackingEnabled = dictionary.getBoolean("screenTracking")
        config.isTrackAnrEnabled = dictionary.getBoolean("trackAnr")
        config.isPerformanceMonitorEnabled = dictionary.getBoolean("performanceMonitoring")
        config.performanceMonitorIntervalMs =
            dictionary.getDouble("performanceMonitoringInterval").toLong()
        config.isMemoryWarningEnabled = dictionary.getBoolean("memoryWarning")
        config.isTrackNetworkStateEnabled = dictionary.getBoolean("trackNetworkState")
        config.trackAnrIntervalSec = dictionary.getInt("trackAnrIntervalSec")
        config.networkSampleRate = dictionary.getDouble("networkSampleRate")
        config.cacheMemoryLimit = dictionary.getDouble("cacheMemoryLimit").toLong()
        config.cacheExpiryDuration = dictionary.getDouble("cacheExpiryDuration").toLong()
        config.isLaunchTimeEnabled = dictionary.getBoolean("launchTime")

        if (sessionID?.isNotEmpty() == true) {
            config.sessionId = sessionID
        }
        Tracker.init(reactApplicationContext.applicationContext as Application, config)
        Log.d("BlueTriangle", "Logger" + config.logger)
        config.logger?.debug("configure")
        promise.resolve(config.sessionId)
    }

    @ReactMethod
    fun getSessionId(promise: Promise) {
        promise.resolve(Tracker.instance?.configuration?.sessionId)
    }

    //private var timer: Timer?=null
    private var timerMap: MutableMap<String, Timer> = mutableMapOf()
    private var networkTrackerMap: MutableMap<String, CapturedRequest> = mutableMapOf()
    private var screenTrackerMap: MutableMap<String, BTTScreenTracker> = mutableMapOf()

    fun generateRandomString(length: Int): String {
        val allowedChars = ('A'..'Z') + ('a'..'z') + ('0'..'9')
        return (1..length)
            .map { allowedChars.random() }
            .joinToString("")
    }

    @ReactMethod
    fun bttStartTimer(dictionary: ReadableMap, promise: Promise) {
        val bttPageName = dictionary.getString("btt_page_name")

        Tracker.instance?.configuration?.logger?.debug("bttStartTimer.")
        val timer = Timer(bttPageName, "")
        timer.start()
        val timerID: String = generateRandomString(10)

        this.timerMap[timerID] = timer

        try {
            val outputMap: WritableMap = Arguments.createMap()
            outputMap.putString("btt_timer_id", timerID)
            promise.resolve(outputMap)
        } catch (e: Exception) {
            promise.reject("ERROR", e.message)
        }
    }

    @ReactMethod
    fun bttStopTimer(dictionary: ReadableMap) {
        Tracker.instance?.configuration?.logger?.debug("bttStopTimer. ${dictionary.toHashMap()}")

        val timerID = dictionary.getString("btt_timer_id")

        val timer: Timer? = timerMap[timerID]
        Tracker.instance?.configuration?.logger?.debug("bttStopTimer.$timer")

        timer?.apply {
            dictionary.runIfHasValue("cartValue", dictionary::getDouble, this::setCartValue)
            dictionary.runIfHasValue("orderTime", dictionary::getString) { setOrderTime(parseLong(it))}
            dictionary.runIfHasValue("orderNumber", dictionary::getString, this::setOrderNumber)
            dictionary.runIfHasValue("brandValue", dictionary::getDouble, this::setBrandValue)
            dictionary.runIfHasValue("cartCount", dictionary::getInt, this::setCartCount)
            dictionary.runIfHasValue("cartCountCheckout", dictionary::getInt, timer::setCartCountCheckout)
        }
        timer?.submit()
        timerMap.remove(timerID)
    }

    /**
     * If the corresponding key is present in the ReadableMap and it's @param retrieve function call's result not null it forwards it to the @param forward function
     */
    private fun <T, U> ReadableMap.runIfHasValue(key:String, retrieve:(String)->T?, forward: (T)-> U) {
        if(hasKey(key)) {
            val result = retrieve(key)
            if(result != null)
                forward(result)
        }
    }

    private fun getScreenTracker(page: String, pageId: String): BTTScreenTracker {
        // create a captured request object
        val tracker: BTTScreenTracker? = screenTrackerMap.get(pageId)
        if (tracker == null) {
            val newTracker = BTTScreenTracker(page)
            this.screenTrackerMap[pageId] = newTracker
            return newTracker
        }
        return tracker
    }

    @ReactMethod
    fun loadStarted(page: String, pageId: String) {
        val tracker: BTTScreenTracker? = getScreenTracker(page, pageId)
        tracker?.onLoadStarted()
        Tracker.instance?.configuration?.logger?.debug("Android :: loadStarted.")
        Tracker.instance?.configuration?.logger?.debug("Android :: loadStarted." + tracker)
    }

    @ReactMethod
    fun loadFinish(page: String, pageId: String) {
        val tracker: BTTScreenTracker? = getScreenTracker(page, pageId)
        tracker?.onLoadEnded()
        Tracker.instance?.configuration?.logger?.debug("Android :: loadFinish.")
        Tracker.instance?.configuration?.logger?.debug("Android :: loadFinish." + tracker)
    }

    @ReactMethod
    fun viewStart(page: String, pageId: String) {
        val tracker: BTTScreenTracker? = getScreenTracker(page, pageId)
        tracker?.onViewStarted()
        Tracker.instance?.configuration?.logger?.debug("Android :: viewStart." + tracker)
    }

    @ReactMethod
    fun viewingEnd(page: String, pageId: String) {
        val tracker: BTTScreenTracker? = getScreenTracker(page, pageId)
        tracker?.onViewEnded()
        Tracker.instance?.configuration?.logger?.debug("Android :: viewingEnd." + tracker)
        screenTrackerMap.remove(pageId)
    }

    @ReactMethod
    fun networkTrackerStart(dictionary: ReadableMap, promise: Promise) {

        val networkUrl = dictionary.getString("networkUrl")
        val requestMethod = dictionary.getString("requestMethod")
        val bodyLength = dictionary.getString("bodyLength")

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
    fun networkTrackerSubmit(dictionary: ReadableMap) {
        Tracker.instance?.configuration?.logger?.debug("Android :: networkTrackerSubmit.")

        val networkTrackerID = dictionary.getString("networkTrackerID")
        val encodedBodySize = dictionary.getString("encodedBodySize")
        val requestType = dictionary.getString("requestType")
        var responseStatusCode = dictionary.getInt("responseStatusCode")
        if (responseStatusCode == 0) {
            responseStatusCode = 600
        }

        Tracker.instance?.configuration?.logger?.debug("Android :: networkTrackerID." + networkTrackerID.toString())

        val capturedRequest: CapturedRequest = networkTrackerMap?.get(networkTrackerID) ?: return
        Log.d("capturedRequest", capturedRequest.toString())
        Tracker.instance?.configuration?.logger?.debug("Android :: capturedRequest." + capturedRequest.toString())

        capturedRequest?.encodedBodySize = encodedBodySize?.toLong() ?: 0
        capturedRequest?.requestType = RequestType.fromFilePath(requestType)
        capturedRequest?.responseStatusCode = responseStatusCode

        capturedRequest?.stop()
        Tracker.instance?.configuration?.logger?.debug("Android :: capturedRequest.stop.")

        // submit the captured request to the tracker instance
        Tracker.instance?.submitCapturedRequest(capturedRequest)
        Tracker.instance?.configuration?.logger?.debug("Android :: submitCapturedRequest.")
        networkTrackerMap.remove(networkTrackerID)

    }

}
