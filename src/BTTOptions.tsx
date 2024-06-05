class BTTOptions {
  trackAnr = true;
  performanceMonitoring = true;
  performanceMonitoringInterval = 500;
  memoryWarning = true;
  trackCrash = true;
  screenTracking = true;
  trackNetworkState = true;
  launchTime = true;
  debug = false;
  trackAnrIntervalSec = 5;
  networkSampleRate = 1;
  cacheMemoryLimit = 30 * 1024;
  cacheExpiryDuration = 48 * 60 * 1000;
}

export default BTTOptions;
