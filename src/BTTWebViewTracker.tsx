import { NativeModules } from 'react-native';
import packageJson from '../package.json';
import BTTDM from './BTTDM'
import BTTOptions from './BTTOptions';

const BttSdk = NativeModules.BttSdk
  ? NativeModules.BttSdk
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

    class BTTWebViewTracker {

        static injectSession(){
            
            const sessionId = BTTDM.getSessionId()
            const version = packageJson.version;
            var isNetworkCapture =  "off"
            const bttOption : BTTOptions = BTTDM.getBttOption()
            if(bttOption.screenTracking){
                isNetworkCapture =  "on"
            }
            
            const currentTime = new Date();
            const newTime = new Date(currentTime.getTime() + 1800000);
            const setSession = "{\"value\":\"" + sessionId + "\",\"expires\":\"" + newTime.getTime() + "\"}"
            const sdkVersion =  "iOS_" + version + ""
            const bttVersionValues = "{\"value\":\"" + sdkVersion + "\",\"expires\":\"" + newTime.getTime() + "\"}"
            const bttWCDCollectValues = "{\"value\":\"" + isNetworkCapture + "\",\"expires\":\"" + newTime.getTime() + "\"}"
            
            const injectedSessionJavaScript = "window.localStorage.setItem('BTT_X0siD', '" + setSession + "');true;"
            const injectedVersionJavaScript = "window.localStorage.setItem('BTT_SDK_VER', '" + bttVersionValues + "');true;"
            const injectedWCDJavaScript = "window.localStorage.setItem('BTT_WCD_Collect', '" + bttWCDCollectValues + "');true;"
          
            const combinedScript = `${injectedSessionJavaScript} ${injectedVersionJavaScript} ${injectedWCDJavaScript}`;
            return combinedScript
          }
    }


export default BTTWebViewTracker;