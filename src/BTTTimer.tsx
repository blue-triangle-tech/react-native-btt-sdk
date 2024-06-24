import BttSdk from './BttSdk';
import Logger from './Logger';
import PurchaseConfirmation from './PurchaseConfirmation';

class BTTTimer {
  private pageName: string;
  private timerId: string = '';

  constructor(pageName: string) {
    this.pageName = pageName;
  }

  async startTimer() {
    const dictionary = { btt_page_name: this.pageName };

    const result = await BttSdk.bttStartTimer(dictionary);

    this.timerId = result.btt_timer_id;
    Logger.instance.log(
      `Timer started: pageName: ${this.pageName}, timerId: ${this.timerId}`
    );
  }

  stopTimer(
    purchaseConfirmation: PurchaseConfirmation | undefined = undefined
  ) {
    const dictionary = {
      btt_timer_id: this.timerId,
      ...(purchaseConfirmation ? purchaseConfirmation.values() : {}),
    };
    BttSdk.bttStopTimer(dictionary);
    Logger.instance.log(
      `Timer stopped: pageName: ${this.pageName}, timerId: ${this.timerId}`
    );
  }
}

export default BTTTimer;
