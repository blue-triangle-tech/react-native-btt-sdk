import { NativeModules } from 'react-native';

const BTT_SDK_LINKING_ERROR: string = 'Unable to Link BttSdk Native Module';

const BttSdk = NativeModules.BttSdk
  ? NativeModules.BttSdk
  : new Proxy(
      {},
      {
        get() {
          throw new Error(BTT_SDK_LINKING_ERROR);
        },
      }
    );

export default BttSdk;
