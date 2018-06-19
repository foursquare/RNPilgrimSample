//
//  FSQPVenue.h
//  PilgrimSDK
//
//  Created by Samuel Grossberg on 11/9/15.
//  Copyright © 2015 Foursquare. All rights reserved.
//

#import <Foundation/Foundation.h>

@class FSQPVenueLocation;
@class FSQPCategoryIcon;

NS_ASSUME_NONNULL_BEGIN

/**
 *  Foursquare category for a venue.
 */
@interface FSQPCategory : NSObject <NSSecureCoding>

/**
 *  Unique identifier of the category in the Foursquare API.
 */
@property (nonatomic, copy, readonly) NSString *foursquareID;

/**
 *  Displayable name of the category.
 */
@property (nonatomic, copy, readonly) NSString *name;

/**
 *  Displayable plural name of the category.
 */
@property (nonatomic, copy, nullable, readonly) NSString *pluralName;

/**
 *  Displayable short name of the category.
 */
@property (nonatomic, copy, nullable, readonly) NSString *shortName;

/**
 *  Icon information for representing the category.
 */
@property (nonatomic, nullable, readonly) FSQPCategoryIcon *icon;

/**
 *  YES if this is the primary category for the venue.
 */
@property (nonatomic, readonly) BOOL isPrimary;

@end


/**
 *  The icon image information for a category.
 */
@interface FSQPCategoryIcon : NSObject <NSSecureCoding>

/**
 *  URL prefix for generating the icon.
 */
@property (nonatomic, copy, readonly) NSString *prefix;

/**
 *  URL suffix for generating the icon.
 */
@property (nonatomic, copy, readonly) NSString *suffix;

@end


/**
 *  Foursquare representation of a chain of venues, i.e. Starbucks.
 */
@interface FSQPChain : NSObject <NSSecureCoding>

/**
 *  Unique identifier of the chain in the Foursquare API.
 */
@property (nonatomic, copy, readonly) NSString *foursquareID;

@end

/**
 *  Representation of a venue in the Foursquare Places database.
 */
@interface FSQPVenue : NSObject <NSSecureCoding>

/**
 *  Unique identifier of the venue in the Foursquare API.
 */
@property (nonatomic, copy, readonly) NSString *foursquareID;

/**
 *  Displayable name of the venue.
 */
@property (nonatomic, copy, readonly) NSString *name;

/**
 * Probability that this venue is associated with the visit.
 * Values range from 0.0 - 1.0
 */
@property (nullable, nonatomic, copy, readonly) NSNumber *probability;

/**
 *  If you are a partner who uses venue harmonization this is venue id corresponding to your harmonized place.
 */
@property (nonatomic, copy, nullable, readonly) NSString *partnerVenueId;

/**
 *  Location information of the venue.
 */
@property (nonatomic, nullable, readonly) FSQPVenueLocation *locationInformation;

/**
 *  Any chain objects associated with the venue. Will be empty if no chain data exists for the venue.
 */
@property (nonatomic, copy, readonly) NSArray<FSQPChain *> *chains;

/**
 *  Foursquare categories associated with the venue. Every venue has exactly one primary category, and up to two
 *  secondary categories.
 */
@property (nonatomic, copy, readonly) NSArray<FSQPCategory *> *categories;

/**
 *  Venue parents.
 */
@property (nonatomic, copy, readonly) NSArray<FSQPVenue *> *hierarchy;

// TODO: this should maybe be private and follow the same designated initializer pattern as FSQPVisit
// but this makes testing easier for now
- (nullable instancetype)initWithVenueDict:(NSDictionary *)venueDict;

@end

NS_ASSUME_NONNULL_END
