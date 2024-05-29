import packageJson from '../package.json';
import BTTDM from './BTTDM';
import Logger from './Logger';

class BTTWebViewTracker {
  static injectSession() {
    const sessionId: string | undefined = BTTDM.instance.sessionID;
    const version: string = packageJson.version;
    const networkSampleRate = BTTDM.instance.bttOptions?.networkSampleRate;
    const networkCaptureEnabled = networkSampleRate === 0 ? 'on' : 'off';
    const sdkVersion = 'iOS_' + version + '';

    const expirationTime = new Date(new Date().getTime() + 1800000);
    const expires = expirationTime.getTime().toString();

    const injectScript =
      this.localStorageItem('BTT_X0siD', sessionId, expires) +
      this.localStorageItem('BTT_SDK_VER', sdkVersion, expires) +
      this.localStorageItem('BTT_WCD_Collect', networkCaptureEnabled, expires);

    Logger.instance.log(
      `Generated inject script For WebView Tracking: ${injectScript}`
    );

    return injectScript;
  }

  private static localStorageItem(
    key: string,
    value: string | undefined,
    expires: string
  ) {
    const data = JSON.stringify({
      value,
      expires,
    });
    return `window.localStorage.setItem('${key}', '${data}');true;`;
  }
}

export default BTTWebViewTracker;
