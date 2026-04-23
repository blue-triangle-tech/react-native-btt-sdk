@file:Suppress("INVISIBLE_REFERENCE", "INVISIBLE_MEMBER")
package com.bttsdk

import com.bluetriangle.analytics.Tracker
import com.facebook.react.bridge.ReactContext

object ActivityRegisterer {

    fun registerActivity(tracker: Tracker?, context: ReactContext) {
        context.currentActivity?.let {
            tracker?.activityLifecycleTracker?.onActivityCreated(it, null)
            tracker?.activityLifecycleTracker?.onActivityResumed(it)
        }
    }
}
