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
    BTTScreenTracker.viewingManualStart(this.pageName, this.customPageID);
    console.log('Started Tracking Page : ', this.pageName);
  }

  stopTracking() {
    Logger.instance.log(`Stopped tracking ${this.pageName}`);
    console.log('Stopped Tracking Page :', this.pageName);
    BTTScreenTracker.viewingManualEnd(this.pageName, this.customPageID);
  }

  static viewStart(name: String, pageId: String) {
    BttSdk.loadStarted(name, pageId); //TODO:: We should not be call load start and finished this should be handled in native. for screen if directly view start called then native sdk should implicitly do load start and load finish.
    BttSdk.loadFinish(name, pageId);
    BttSdk.viewStart(name, pageId);
  }

  static viewingEnd(name: String, pageId: String) {
    BttSdk.viewingEnd(name, pageId);
  }

  static viewingManualStart(name: String, pageId: String) {
    BttSdk.viewingManualStart(name, pageId);
  }

  static viewingManualEnd(name: String, pageId: String) {
    BttSdk.viewingManualEnd(name, pageId);
  }
}

export default BTTScreenTracker;
