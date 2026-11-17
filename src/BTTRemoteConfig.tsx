import BttSdk from './BttSdk';

/**
 * Configuration the native SDK applies for the current session (remote config + per-session
 * sampling). All remote-config decisions in JS read from here, so new fields only need a
 * method in this file.
 */
class BTTRemoteConfig {
  /**
   * Whether network requests are captured in this session. Decided by the native SDK, never
   * re-computed from `networkSampleRate` here.
   */
  static shouldNetworkCapture(): boolean {
    // Until a native module exposes it (Android pending), capture as before.
    if (typeof BttSdk.getShouldNetworkCapture !== 'function') {
      return true;
    }
    return BttSdk.getShouldNetworkCapture() === true;
  }

  /** Whether automatic (navigation) screen tracking is enabled in this session. */
  static enableScreenTracking(): boolean {
    // Until a native module exposes it (Android pending), track as before.
    if (typeof BttSdk.getEnableScreenTracking !== 'function') {
      return true;
    }
    return BttSdk.getEnableScreenTracking() === true;
  }
}

export default BTTRemoteConfig;
