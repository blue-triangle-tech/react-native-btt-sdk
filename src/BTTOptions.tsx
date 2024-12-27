class BTTOptions {
  trackAnr = true;
  performanceMonitoring = true;
  performanceMonitoringInterval = 500;
  memoryWarning = true;
  crashLevel = CrashLevel.All;
  screenTracking = true;
  trackNetworkState = true;
  launchTime = true;
  debug = false;
  trackAnrIntervalSec = 5;
  networkSampleRate = 0.05;
  cacheMemoryLimit = 30 * 1024;
  cacheExpiryDuration = 48 * 60 * 1000;
}

export default BTTOptions;

enum CrashLevel {
  None,
  All, //JS + Native Exceptional handler + Signal Handler
}

export { CrashLevel };
