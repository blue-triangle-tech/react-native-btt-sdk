import BTTOptions from './BTTOptions';

class BTTDM {
 
    constructor() {
      if (!BTTDM.instance) {
        BTTDM.instance = this;
      }
      
      return BTTDM.instance;
    }

    setBttOption(bttOption: BTTOptions) {
        this.bttOption = bttOption;
    }
  
    getBttOption() {
        return this.bttOption;
    }

    setSessionId(sessionID) {
        this.sessionID = sessionID;
    }

    getSessionId() {
        return this.sessionID;
    }
}

const instance = new BTTDM();
export default instance;