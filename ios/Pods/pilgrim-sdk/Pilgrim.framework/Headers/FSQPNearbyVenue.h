//
//  FSQPNearbyVenue.h
//  PilgrimSDK
//
//  Created by Kyle Fowler on 1/9/17.
//  Copyright © 2017 Foursquare. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <CoreLocation/CoreLocation.h>

@class FSQPVenue;

NS_ASSUME_NONNULL_BEGIN

@interface FSQPNearbyVenue : NSObject <NSSecureCoding>

@property (nonatomic, readonly) FSQPVenue *venue;

@property (nonatomic, readonly) NSArray<NSString *> *matchTypes;

- (nullable instancetype)initWithNearbyVenueDict:(NSDictionary *)venueDict NS_DESIGNATED_INITIALIZER;

- (instancetype)init NS_UNAVAILABLE;

- (nullable instancetype)initWithCoder:(NSCoder *)aDecoder NS_DESIGNATED_INITIALIZER;

@end

NS_ASSUME_NONNULL_END
