import { NativeModules } from 'react-native';
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

class BTTTimer {

  constructor(pageName){
    this.pageName = pageName
  }
    
  async startTimer() {
    
    const dictionary = {"btt_page_name": this.pageName};
        
    const result = await BttSdk.bttStartTimer(dictionary)

    this.timerId = result.btt_timer_id
  }

  setCartValue(cartValue){
    this.cartValue = cartValue
  }
        
  stopTimer() {
        const dictionary = {
          "btt_timer_id": this.timerId
         };
         if (this.cartValue != null){
            dictionary.btt_cartValue = this.cartValue
         }

        BttSdk.bttStopTimer(dictionary);
  }
}

export default BTTTimer;