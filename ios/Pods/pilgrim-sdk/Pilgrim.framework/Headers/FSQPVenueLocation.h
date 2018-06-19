//
//  FSQPVenueLocation.h
//  PilgrimSDK
//
//  Created by Mitchell Livingston on 5/3/16.
//  Copyright © 2016 Foursquare. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface FSQPVenueLocation : NSObject <NSSecureCoding>

@property (nonatomic, copy, nullable, readonly) NSString *address;
@property (nonatomic, copy, nullable, readonly) NSString *crossStreet;
@property (nonatomic, copy, nullable, readonly) NSString *city;
@property (nonatomic, copy, nullable, readonly) NSString *state;
@property (nonatomic, copy, nullable, readonly) NSString *postalCode;
@property (nonatomic, copy, nullable, readonly) NSString *country;

@property (nonatomic, readonly) CLLocationCoordinate2D coordinate;

- (instancetype)initWithVenueLocationDictionary:(NSDictionary *)dict;
- (instancetype)init NS_UNAVAILABLE;

@end

NS_ASSUME_NONNULL_END
