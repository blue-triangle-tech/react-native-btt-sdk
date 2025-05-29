#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(BttSdk, NSObject)

RCT_EXTERN_METHOD(configure)
RCT_EXTERN_METHOD(bttConfigure:(NSDictionary *)dictionary 
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(bttStopTimer:(NSDictionary *)dictionary)
RCT_EXTERN_METHOD(bttStartTimer:(NSDictionary *)pageDict
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(loadStarted:(NSString *)page
                  pageId:(NSString *)pageId)
RCT_EXTERN_METHOD(loadFinish:(NSString *)page
                  pageId:(NSString *)pageId)
RCT_EXTERN_METHOD(viewStart:(NSString *)page
                  pageId:(NSString *)pageId)
RCT_EXTERN_METHOD(viewingEnd:(NSString *)page
                  pageId:(NSString *)pageId)
RCT_EXTERN_METHOD(getSessionId:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(networkTrackerSubmit:(NSDictionary *)dictionary)
RCT_EXTERN_METHOD(networkTrackerStart:(NSDictionary *)dictionary
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(setCustomVariable:(NSString *)name
                  value:(NSString *)value)
RCT_EXTERN_METHOD(setCustomVariables:(NSDictionary *)variables)
RCT_EXTERN_METHOD(getCustomVariable:(NSString *)name)
RCT_EXTERN_METHOD(getCustomVariables)
RCT_EXTERN_METHOD(clearCustomVariable:(NSString *)name)
RCT_EXTERN_METHOD(clearAllCustomVariables)
RCT_EXTERN_METHOD(emulateANR)
RCT_EXTERN_METHOD(emulateMemoryWarning)
RCT_EXTERN_METHOD(emulateCrash)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
