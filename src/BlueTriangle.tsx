// BlueTriangle.tsx
import BttSdk from './BttSdk';
import Logger from './Logger';

class BlueTriangle {
   
    static setAbTestID(value?: String) {
        BttSdk.setAbTestID(value)
        Logger.instance.log(`Set AB testing ${value}`);
    }

    static setCampaignMedium(value?: String) {
        BttSdk.setCampaignMedium(value)
        Logger.instance.log(`Set Campaign Medium ${value}`);
    }

    static setCampaignName(value?: String){
        BttSdk.setCampaignName(value)
        Logger.instance.log(`Set Campaign Name ${value}`);
    }

    static setCampaignSource(value?: String) {
        BttSdk.setCampaignSource(value)
        Logger.instance.log(`Set Campaign Source ${value}`);
    }

    static setDataCenter(value?: String) {
         BttSdk.setDataCenter(value)
        Logger.instance.log(`Set Campaign Source ${value}`);
    }

    static setCustomCategory1(value?: String) {
        BttSdk.setCustomCategory1(value)
        Logger.instance.log(`Set Custom Category1 ${value}`);
    }

    static setCustomCategory2(value?: String) {
         BttSdk.setCustomCategory2(value)
        Logger.instance.log(`Set Custom Category2 ${value}`);
    }

    static setCustomCategory3(value?: String) {
        BttSdk.setCustomCategory3(value)
        Logger.instance.log(`Set Custom Category3 ${value}`);
    }

    static setCustomCategory4(value?: String) {
         BttSdk.setCustomCategory4(value)
        Logger.instance.log(`Set Custom Category4 ${value}`);
    }

    static setCustomCategory5(value?: String) {
        BttSdk.setCustomCategory5(value)
        Logger.instance.log(`Set Custom Category5 ${value}`);
    }
}

export default BlueTriangle;