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
    let currentKey = navigationRef.getCurrentRoute().key;
    let currentName = navigationRef.getCurrentRoute().name;
    if (currentName != null) {
      BTTScreenTracker.viewingEnd(currentName, currentKey);
    }
  }

  static onContainerStateChange(navigationRef: NavigationRef) {
    let currentKey = navigationRef.getCurrentRoute().key;
    let currentName = navigationRef.getCurrentRoute().name;

    if(!this.isListenerAttached) {
      this.attachBackgroundListener(navigationRef)
      this.isListenerAttached = true
    }
    const previousRouteName = trackerName;
    const previousRouteId = trackerID;

    if (previousRouteId == null) {
      BTTScreenTracker.viewStart(currentName, currentKey);
      trackerName = currentName;
      trackerID = currentKey;
    }

    const currentRouteName = currentName;
    const currentRouteId = currentKey;

    if (previousRouteId !== currentRouteId) {
      BTTScreenTracker.viewingEnd(previousRouteName, previousRouteId);
      BTTScreenTracker.viewStart(currentRouteName, currentRouteId);

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
