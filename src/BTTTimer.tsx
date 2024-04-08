import BttSdk from './BttSdk';

class BTTTimer {

  private pageName:string 
  private timerId:string = ""
  private cartValue:number = 0.0

  constructor(pageName:string) {
    this.pageName = pageName;
  }

  async startTimer() {
    const dictionary = { btt_page_name: this.pageName };

    const result = await BttSdk.bttStartTimer(dictionary);

    this.timerId = result.btt_timer_id;
  }

  setCartValue(cartValue:number) {
    this.cartValue = cartValue;
  }

  stopTimer() {
    const dictionary = {
      btt_timer_id: this.timerId,
      ...(this.cartValue ? {btt_cartValue:this.cartValue} : {})
    };

    BttSdk.bttStopTimer(dictionary);
  }
}

export default BTTTimer;
