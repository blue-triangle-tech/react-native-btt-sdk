import BTTOptions from './BTTOptions';

class BTTDM {
 
    private _bttOptions:BTTOptions
    private _sessionID:string

    public get sessionID() {
        return this._sessionID
    }

    public get bttOptions() {
        return this._bttOptions
    }

    private static _instance?:BTTDM = undefined
    
    public static readonly instance:BTTDM
        get() {
            return BTTDM._instance
        }

    public static init(bttOptions:BTTOptions, sessionID:string) {
        BTTDM._instance = new BTTDM(bttOptions, sessionID)
    }
    
    private constructor(bttOptions:BTTOptions, sessionID:string) {
        this._bttOptions = bttOptions;
        this._sessionID = sessionID;
    }
  
    getBttOption() {
        return this._bttOptions;
    }

    getSessionId() {
        return this._sessionID;
    }
}

export default BTTDM;