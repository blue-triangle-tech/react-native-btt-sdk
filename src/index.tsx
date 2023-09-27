import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-btt-sdk' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

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

interface Dictionary {
  [key: string]: any;
}

export function bttConfigure (dictionary: Dictionary) {
    console.log('bttConfigure::', dictionary); 
   BttSdk.bttConfigure(dictionary);
}

export async function bttStartTimer(dictionary: Dictionary) {

try {
        //const dictionary = {
           // "btt_page_name": "Heavy Loop Test Case"
      //  };

    const result = await BttSdk.bttStartTimer(dictionary);
    console.log('Async operation completed::',result);
    return result
  } catch (error) {
    console.error(error);
  }
}

export function bttStopTimer(dictionary: Dictionary) {
   BttSdk.bttStopTimer(dictionary);
}

