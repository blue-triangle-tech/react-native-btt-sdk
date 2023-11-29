#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(BttSdk, NSObject)

RCT_EXTERN_METHOD(configure)
RCT_EXTERN_METHOD(bttConfigure:(NSDictionary *)dictionary)
RCT_EXTERN_METHOD(bttStopTimer:(NSDictionary *)dictionary)
RCT_EXTERN_METHOD(bttStartTimer:(NSDictionary *)pageDict
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(loadStarted:(NSString *)id
                  name:(NSString *)name)
RCT_EXTERN_METHOD(loadFinish:(NSString *)id
                  name:(NSString *)name)
RCT_EXTERN_METHOD(viewStart:(NSString *)id
                  name:(NSString *)name)
RCT_EXTERN_METHOD(viewingEnd:(NSString *)id
                  name:(NSString *)name)
RCT_EXTERN_METHOD(getSessionId:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
