import BTTOptions, { CrashLevel } from './BTTOptions';
import setUpInterceptors from './networking/interceptors';
import BTTDM from './BTTDM';
import BttSdk from './BttSdk';
import Logger from './Logger';
import BTTCrashTracker from './BTTCrashTracker';

class BTTConfiguration {
  static async configure(siteId: String, bttOptions: BTTOptions) {
    const dictionary = {
      btt_site_id: siteId,
      trackAnr: bttOptions.trackAnr,
      performanceMonitoring: bttOptions.performanceMonitoring,
      performanceMonitoringInterval: bttOptions.performanceMonitoringInterval,
      memoryWarning: bttOptions.memoryWarning,
      debug: bttOptions.debug,
      launchTime: bttOptions.launchTime,
      screenTracking: bttOptions.screenTracking,
      trackNetworkState: bttOptions.trackNetworkState,
      trackAnrIntervalSec: bttOptions.trackAnrIntervalSec,
      networkSampleRate: bttOptions.networkSampleRate,
      cacheMemoryLimit: bttOptions.cacheMemoryLimit,
      cacheExpiryDuration: bttOptions.cacheExpiryDuration,
      crashLevel: bttOptions.crashLevel.toString(),
    };
    setUpInterceptors();
    const sessionId = await BttSdk.bttConfigure(dictionary);
    BTTDM.instance.bttOptions = bttOptions;
    BTTDM.instance.sessionID = sessionId;
    Logger.instance.log(
      `Configuration Done. Options: ${bttOptions}, Session ID: ${sessionId}`
    );

    if(bttOptions.crashLevel !== CrashLevel.None) {
      BTTCrashTracker.init();
    }
  }

  static getSessionId() {
    return BTTDM.instance.sessionID;
  }
}

export default BTTConfiguration;
