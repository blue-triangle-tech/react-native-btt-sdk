import BTTScreenTracker from './BTTScreenTracker';
import Logger from './Logger';

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
  static applicationDidEnterBackground(navigationRef: NavigationRef) {
    let currentKey = navigationRef.getCurrentRoute().key;
    let currentName = navigationRef.getCurrentRoute().name;
    if (currentName != null) {
      BTTScreenTracker.viewingEnd(currentName, currentKey);
    }
  }

  static onContainerStateChange(navigationRef: NavigationRef) {
    const currentRoute = navigationRef?.getCurrentRoute?.();
    if (!currentRoute) {
      Logger.instance.log(
       `NavigationRef or current route is null or invalid`
      );
    }
    let currentKey = navigationRef.getCurrentRoute().key;
    let currentName = navigationRef.getCurrentRoute().name;

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
}

export default BTTNavigationContainerTracker;
