package com.bttsdk

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import android.app.Application
import android.content.Context
import com.bluetriangle.analytics.BlueTriangleConfiguration
import com.bluetriangle.analytics.Timer
import com.bluetriangle.analytics.Tracker
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

    var siteID = dictionary.getString("btt_site_id")
    println("siteID: $siteID")

    var sessionID = dictionary.getString("btt_session_id")


    val config = BlueTriangleConfiguration()
    config.siteId = siteID
    config.isDebug = true
    config.isTrackCrashesEnabled = true
    config.isTrackAnrEnabled = true
    config.isScreenTrackingEnabled = true

    if (sessionID?.isNotEmpty() == true)
    {
      config.sessionId = sessionID
    }
    Tracker.init(reactApplicationContext.applicationContext as Application, config)

    config.logger?.debug("configure")
  }

  //private var timer: Timer?=null
  private var timerMap: MutableMap<String, Timer> = mutableMapOf()

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
}
