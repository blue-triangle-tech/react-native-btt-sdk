// BTTScreenTracker.js
import BttSdk from './BttSdk';
import Logger from './Logger';

class BTTScreenTracker {
  private pageName: string;
  private customPageID: string;

  constructor(pageName: string) {
    this.pageName = pageName;
    this.customPageID = Math.random().toString(36).substring(2, 11);
  }

  startTracking() {
    Logger.instance.log(`Started tracking ${this.pageName}`);
    BTTScreenTracker.viewStart(this.pageName, this.customPageID);
  }

  stopTracking() {
    Logger.instance.log(`Stopped tracking ${this.pageName}`);
    BTTScreenTracker.viewingEnd(this.pageName, this.customPageID);
  }

  static loadStarted(name: String, pageId: String) {
    BttSdk.loadStarted(name, pageId);
  }

  static viewStart(name: String, pageId: String) {
    BttSdk.loadStarted(name, pageId); //TODO:: We should not be call load start and finished this should be handled in native. for screen if directly view start called then native sdk should implicitly do load start and load finish.
    BttSdk.loadFinish(name, pageId);
    BttSdk.viewStart(name, pageId);
  }

  static viewingEnd(name: String, pageId: String) {
    BttSdk.viewingEnd(name, pageId);
  }
}

export default BTTScreenTracker;
