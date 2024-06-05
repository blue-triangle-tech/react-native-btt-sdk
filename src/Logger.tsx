import BTTDM from './BTTDM';

class Logger {
  private static _instance?: Logger;

  public static get instance() {
    return this._instance || (this._instance = new Logger());
  }

  private constructor() {}

  log(message?: any) {
    if (BTTDM.instance.bttOptions?.debug) {
      console.log(message);
    }
  }
}

export default Logger;
