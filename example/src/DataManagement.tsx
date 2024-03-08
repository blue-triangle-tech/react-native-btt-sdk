class DataManagement {
 
    constructor() {
      if (!DataManagement.instance) {
        DataManagement.instance = this;
      }
      
      return DataManagement.instance;
    }
  
    setSessionId(sessionId) {
        console.log(sessionId)
      this.sessionId = sessionId;
    }
  
    getSessionId() {
      return this.sessionId;
    }
  }
  
  const instance = new DataManagement();
  export default instance;