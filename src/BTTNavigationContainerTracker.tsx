import BTTScreenTracker from './BTTScreenTracker';

let trackerName = "";
let trackerID = "";

class BTTNavigationContainerTracker{
    
    static onContainerStateChange(navigationRef){

      let currentKey = navigationRef.getCurrentRoute().key
      let currentName = navigationRef.getCurrentRoute().name

        const previousRouteName = trackerName;
        const previousRouteId = trackerID;
        
        if(previousRouteId == null){
            BTTScreenTracker.viewStart(currentKey, currentName);
            trackerName = currentName;
            trackerID = currentKey;
          }
      
          const currentRouteName = currentName;
          const currentRouteId = currentKey;
      
          if (previousRouteId !== currentRouteId) {
      
            BTTScreenTracker.viewingEnd(previousRouteId, previousRouteName);
            BTTScreenTracker.viewStart(currentRouteId, currentRouteName);
      
            trackerName = currentName;
            trackerID = currentKey;
          }

    }
}

export default BTTNavigationContainerTracker;
