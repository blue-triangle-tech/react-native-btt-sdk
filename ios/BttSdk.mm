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

RCT_EXTERN_METHOD(setAbTestID:(NSString *)value)
RCT_EXTERN_METHOD(setCampaignMedium:(NSString *)value)
RCT_EXTERN_METHOD(setCampaignName:(NSString *)value)
RCT_EXTERN_METHOD(setCampaignSource:(NSString *)value)
RCT_EXTERN_METHOD(setDataCenter:(NSString *)value)
RCT_EXTERN_METHOD(setCustomCategory1:(NSString *)value)
RCT_EXTERN_METHOD(setCustomCategory2:(NSString *)value)
RCT_EXTERN_METHOD(setCustomCategory3:(NSString *)value)
RCT_EXTERN_METHOD(setCustomCategory4:(NSString *)value)
RCT_EXTERN_METHOD(setCustomCategory5:(NSString *)value)

// method exposed for getting the js stack
RCT_EXTERN_METHOD(trackJsError:(NSString *)title
                  stackTrace:(NSString *)stackTrace
                  isFatal:(BOOL)isFatal)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
