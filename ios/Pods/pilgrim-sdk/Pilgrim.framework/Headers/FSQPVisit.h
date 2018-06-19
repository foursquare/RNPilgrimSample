//
//  FSQPVisit.h
//  PilgrimSDK
//
//  Created by Samuel Grossberg on 11/9/15.
//  Copyright © 2016 Foursquare. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <CoreLocation/CoreLocation.h>

NS_ASSUME_NONNULL_BEGIN

@class FSQPVisit;
@class FSQPVenue;
@class FSQPNearbyVenue;

typedef NS_ENUM(NSInteger, FSQPLocationType) {
    FSQPLocationTypeUnknown = 0,
    FSQPLocationTypeHome,
    FSQPLocationTypeWork,
    FSQPLocationTypeVenue,
};

typedef NS_ENUM(NSInteger, FSQPConfidence) {
    FSQPConfidenceNone = 0,
    FSQPConfidenceLow,
    FSQPConfidenceMedium,
    FSQPConfidenceHigh,
};

/**
 *  Everything Pilgrim knows about a user's location, including raw data and a probable venue.
 */
@interface FSQPVisit : NSObject <NSSecureCoding>

/**
 *  The date and time when the user arrived at this location.  This will be nil if the arrival date isn't available.
 */
@property (nonatomic, copy, nullable, readonly) NSDate *arrivalDate;

/*
 *  The location of the arrival. This will be nil if arrival information isn't available.
 */
@property (nonatomic, nullable, readonly) CLLocation *arrivalLocation;

/*
 *  The date and time when the user departed this location.  This will be nil if the user has not yet left.
 */
@property (nonatomic, copy, nullable, readonly) NSDate *departureDate;

/*
 *  The location of the departure (that is, the location where the user was no longer considered to be at the place).  This will be nil if the user has not yet left.
 */
@property (nonatomic, nullable, readonly) CLLocation *departureLocation;

/**
 *  YES if the visit was triggered by an arrival.
 */
@property (nonatomic, readonly) BOOL isArrival;

/**
 *  YES if the visit was triggered by a departure.
 */
@property (nonatomic, readonly) BOOL isDeparture;

/**
 *  What type of location the user is at, i.e. home, work, or a Foursquare Venue.
 */
@property (nonatomic, readonly) FSQPLocationType locationType;

/**
 *  How certain we are of the user's location context on a relative scale.
 */
@property (nonatomic, readonly) FSQPConfidence confidence;

/**
 *  String representation of confidence.
 *  @note For debugging purposes only.
 */
@property (nonatomic, readonly) NSString *confidenceString;

+ (NSString *)confidenceStringForValue:(FSQPConfidence)confidence;

/**
 *  The most likely Foursquare venue associated with the location. Will be nil if the user is at home or work.
 */
@property (nonatomic, nullable, readonly) FSQPVenue *venue;

@property (nonatomic, copy, nullable, readonly) NSArray<FSQPVenue *> *otherPossibleVenues;

@property (nonatomic, copy, nullable, readonly) NSArray<FSQPNearbyVenue *> *nearbyVenues DEPRECATED_MSG_ATTRIBUTE("Use [FSQPPilgrimManager fsqpPilgrimManager:didDetectNearbyVenues:] instead.");

@property (nonatomic, readonly) NSString *displayName;

/**
 *  The pilgrim identifier for this visit.
 */
@property (nonatomic, copy, nullable, readonly) NSString *pilgrimVisitId;

- (instancetype)init NS_UNAVAILABLE;

@end

NS_ASSUME_NONNULL_END
