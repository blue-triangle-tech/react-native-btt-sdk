import BTTOptions from './BTTOptions';

class BTTDM {
 
    public bttOptions?:BTTOptions
    public sessionID?:string

    private static _instance?:BTTDM = undefined

    public static get instance() {
        return BTTDM._instance || (BTTDM._instance = new BTTDM())
    }
    
    private constructor() {

    }
}

export default BTTDM;