/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <RNPilgrimSdk/RNPilgrimSdk.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"RNPilgrimSample"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  
  RNPilgrimSdk *pilgrimModule = [rootView.bridge moduleForClass:[RNPilgrimSdk class]];
  [pilgrimModule intializeWithKey:@"TMKHTRWRRYO4WIZPVJNHA1Q3JU0YBED5XIONMQTOC00YYCLY"
                           secret:@"01IYW3XKATTKF40RHUOTFPU0TTFJTJ5QC1IIIXX0NLJDV1FH"];

  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

@end
