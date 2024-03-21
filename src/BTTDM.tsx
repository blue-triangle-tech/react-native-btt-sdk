class BTTDM {
 
    constructor() {
      if (!BTTDM.instance) {
        BTTDM.instance = this;
      }
      
      return BTTDM.instance;
    }

    setScreenTracking(screenTracking) {
        this.screenTracking = screenTracking;
      }
  
      getScreenTracking() {
        return this.screenTracking;
      }
}

const instance = new BTTDM();
export default instance;