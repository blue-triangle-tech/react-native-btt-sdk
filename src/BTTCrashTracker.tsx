import BttSdk from './BttSdk';
import BTTStackTraceFormatter from './BTTStackTraceFormatter';
import Logger from './Logger';

type GlobalErrorHandler = (error: any, isFatal?: boolean) => void;

/**
 * Captures JS errors and reports them through the native Blue Triangle SDKs.
 *
 * JS global errors are reported as fatal or non-fatal.
 * Fatal / non-fatal sampling is applied by the native SDKs.
 */
class BTTCrashTracker {
  private static isInitialized = false;

  static init() {
    if (BTTCrashTracker.isInitialized) {
      return;
    }
    BTTCrashTracker.isInitialized = true;

    BTTCrashTracker.trackGlobalErrors();
  }

  // MARK: - Global JS errors

  private static trackGlobalErrors() {
    const previousHandler: GlobalErrorHandler | undefined =
      ErrorUtils.getGlobalHandler?.();

    ErrorUtils.setGlobalHandler((error: any, isFatal?: boolean) => {
      BTTCrashTracker.report(error, isFatal === true);

      // Preserve default behavior (red box / app termination)
      previousHandler?.(error, isFatal);
    });
  }

  // MARK: - Reporting

  private static report(error: unknown, isFatal: boolean) {
    try {
      const { title, stackTrace } = BTTStackTraceFormatter.format(error);
      Logger.instance.log(
        `BTTCrashTracker: ${isFatal ? 'Fatal' : 'Non-fatal'} JS error: ${title}`
      );
      BttSdk.trackJsError(title, stackTrace, isFatal);
    } catch (e) {
      // Crash reporting must never break the app's own error handling.
      Logger.instance.log(`BTTCrashTracker: Failed to report JS error: ${e}`);
    }
  }
}

export default BTTCrashTracker;
