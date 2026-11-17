import BttSdk from './BttSdk';
import Logger from './Logger';
import PurchaseConfirmation from './PurchaseConfirmation';

/**
 * One `startTimer()` call. It keeps its own native timer ID, so a stop always reaches the
 * timer it belongs to, whatever order the native calls return in.
 */
type TimerRun = {
  /** Resolves once the native start has returned (never rejects). */
  started: Promise<void>;
  /** Native timer ID; empty until the start returns, or if it failed. */
  timerId: string;
  /** Set by the first `stopTimer()` for this run, so it's never stopped twice. */
  stopped: boolean;
};

class BTTTimer {
  private pageName: string;
  /** Latest run; `stopTimer()` stops this one. */
  private run?: TimerRun;

  constructor(pageName: string) {
    this.pageName = pageName;
  }

  async startTimer() {
    if (this.run && !this.run.stopped) {
      this.log('startTimer called again before stopTimer, previous timer discarded');
    }

    const run: TimerRun = { started: Promise.resolve(), timerId: '', stopped: false };
    run.started = BttSdk.bttStartTimer({ btt_page_name: this.pageName }).then(
      (result?: { btt_timer_id?: string }) => {
        run.timerId = result?.btt_timer_id ?? '';
        this.log(`Timer started, timerId: ${run.timerId}`);
      },
      (error: unknown) => this.log(`Timer start failed, error: ${error}`)
    );

    this.run = run;
    return run.started;
  }

  stopTimer(
    purchaseConfirmation: PurchaseConfirmation | undefined = undefined
  ) {
    const run = this.run;
    if (!run || run.stopped) {
      this.log(`stopTimer ignored: timer ${run ? 'already stopped' : 'not started'}`);
      return;
    }

    run.stopped = true;
    // Captured now, so a delayed stop still sends the same values.
    const values = purchaseConfirmation ? purchaseConfirmation.values() : {};
    // Runs right after the native start returns (or at once if it already has).
    run.started.then(() => this.sendStop(run, values));
  }

  private sendStop(run: TimerRun, values: object) {
    if (!run.timerId) {
      this.log('stopTimer ignored: timer start failed');
      return;
    }
    BttSdk.bttStopTimer({ btt_timer_id: run.timerId, ...values });
    this.log(`Timer stopped, timerId: ${run.timerId}`);
  }

  private log(message: string) {
    Logger.instance.log(`${message}, pageName: ${this.pageName}`);
  }
}

export default BTTTimer;
