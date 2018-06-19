//
//  FSQPNearbyTrigger.h
//  PilgrimSDK
//
//  Created by Kyle Fowler on 1/9/17.
//  Copyright © 2017 Foursquare. All rights reserved.
//

#import <Foundation/Foundation.h>

typedef NS_ENUM(NSInteger, FSQPNearbyTriggerType) {
    FSQPNearbyTriggerVenue = 0, // visit's venue matches foursquareID
    FSQPNearbyTriggerCategory = 1, // visit's venue's category, or a venue in its hierarchy's category, has a matching foursquareID
    FSQPNearbyTriggerChain = 2 // visit's venue's chain matches foursquareID
};

@interface FSQPNearbyTrigger : NSObject

@property (nonatomic, readonly) int radius;

@property (nonatomic, readonly) FSQPNearbyTriggerType triggerType;

@property (nonatomic, readonly) NSString *fsqId;

- (instancetype) initWithTriggerType:(FSQPNearbyTriggerType) triggerType
                                  fsqId:(NSString *) fsqId;

- (instancetype) initWithTriggerType:(FSQPNearbyTriggerType) triggerType
                                  fsqId:(NSString *) fsqId
                              radius:(int) triggerRadius;

@end
