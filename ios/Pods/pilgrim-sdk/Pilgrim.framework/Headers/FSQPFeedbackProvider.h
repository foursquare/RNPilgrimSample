//
//  FSQPFeedbackProvider.h
//  PilgrimSDK
//
//  Created by Mitchell Livingston on 3/2/16.
//  Copyright © 2016 Foursquare. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

typedef NS_ENUM(NSInteger, FSQPVisitFeedback) {
    FSQPVisitFeedbackConfirm,
    FSQPVisitFeedbackFalseStop,
    FSQPVisitFeedbackWrongVenue,
    FSQPVisitFeedbackDeny,
};

/**
 *  FSQPFeedbackProvider class contains methods for providing feedback on pilgrim visits and venues.
 *
 *  ## Notes
 *
 *  You should not initialize your own instance of this class but instead access the shared
 *  feedback provider on FSQPPilgrimManager.
 *
 *  @see FSQPPilgrimManager
 */
@interface FSQPFeedbackProvider : NSObject

- (instancetype)init NS_UNAVAILABLE;

/**
 *  Provide feedback on a previous visit.
 *
 *  @param pVisitId         The visit ID to provide feedback for.
 *  @param feedback         See FSQPVisitFeedback for options.
 *  @param actualVenueId    If the correct venue ID is known, this will inform pilgrim.
 *  @param completion       A completion handler called when the transaction finishes.
 */
- (void)provideFeedbackForPVisit:(NSString *)pVisitId feedback:(FSQPVisitFeedback)feedback actualVenueId:(nullable NSString *)actualVenueId completion:(nullable void (^)(NSError * _Nullable error))completion;

/**
 *  Inform Pilgrim that the device is known to be at a specific venue. Used to improve our
 *  ability to detect visits at the Foursquare venue ID provided.
 *
 *  @param foursquareVenueId    The foursquare venue ID where you believe the device is currently at.
 */
- (void)checkInAtVenueWithFoursquareVenueId:(NSString *)foursquareVenueId;

/**
 *  Inform Pilgrim that the device is known to be at a specific venue. Used to improve our
 *  ability to detect visits at the partner venue ID provided. In order to use this, make sure
 *  your venue IDs are harmonized with Foursquare.
 *
 *  @param partnerVenueId   A partner venue ID where you believe the device is currently at.
 */
- (void)checkInAtVenueWithPartnerVenueId:(NSString *)partnerVenueId;

@end

NS_ASSUME_NONNULL_END
