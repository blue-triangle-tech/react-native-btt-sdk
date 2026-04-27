import { AppState } from 'react-native';
import BTTScreenTracker from './BTTScreenTracker';

let trackerName = '';
let trackerID = '';

interface NavigationRef {
  getCurrentRoute(): Route;
}

interface Route {
  key: string;
  name: string;
}

class BTTNavigationContainerTracker {

  private static isListenerAttached: Boolean = false

  static applicationDidEnterBackground(navigationRef: NavigationRef) {
    const route = navigationRef?.getCurrentRoute?.();

    if (!route) return;

    const currentKey = route?.key;
    const currentName = route?.name;

    if (currentName && currentKey) {
      BTTScreenTracker.viewingEnd(currentName, currentKey);
    }
  }
  
  static onContainerStateChange(navigationRef: NavigationRef) {
    const route = navigationRef?.getCurrentRoute?.();

    if (!route) return;

    const currentKey = route?.key;
    const currentName = route?.name;

    // Extra safety
    if (!currentKey || !currentName) return;

    if (!this.isListenerAttached) {
      this.attachBackgroundListener(navigationRef);
      this.isListenerAttached = true;
    }

    const previousRouteName = trackerName;
    const previousRouteId = trackerID;

    // First screen load
    if (previousRouteId == null) {
      BTTScreenTracker.viewStart(currentName, currentKey);
      trackerName = currentName;
      trackerID = currentKey;
      return;
    }

    // Route change
    if (previousRouteId !== currentKey) {
      if (previousRouteName && previousRouteId) {
        BTTScreenTracker.viewingEnd(previousRouteName, previousRouteId);
      }

      BTTScreenTracker.viewStart(currentName, currentKey);

      trackerName = currentName;
      trackerID = currentKey;
    }
  }

  private static attachBackgroundListener(navigationRef: NavigationRef) {
    console.log("Attached Background Listener..")
    AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        console.log("App moved to foreground")
        // do this
        BTTNavigationContainerTracker.onContainerStateChange(navigationRef);
      } else if (state === 'background') {
        console.log("App moved to background")
        // do that
        BTTNavigationContainerTracker.applicationDidEnterBackground(navigationRef);
      }
    });
  }
}

export default BTTNavigationContainerTracker;
