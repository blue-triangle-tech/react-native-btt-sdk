import BttSdk from './BttSdk'

export default class BTTTestsEmulator {

    emulateANR() {
        BttSdk.emulateANR()
    }

    emulateCrash() {
        BttSdk.emulateCrash()
    }

    emulateMemoryWarning() {
        BttSdk.emulateMemoryWarning()
    }

}