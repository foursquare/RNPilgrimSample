//
//  FSQPUserInfo.h
//  PilgrimSDK
//
//  Created by Kyle Fowler on 1/9/17.
//  Copyright © 2017 Foursquare. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

extern NSString * const kFSQPUserInfoUserIdString;
extern NSString * const kFSQPUserInfoGenderString;
extern NSString * const kFSQPUserInfoBirthdayString;

@interface FSQPUserInfo : NSObject

@property (nonatomic, copy, readonly) NSDictionary<NSString *, NSString*> *source;

- (void)setData:(NSString *)data forKey:(NSString *)key;

- (void)setUserId:(NSString *)userId;

- (void)setGender:(NSString *)object;

- (void)setBirthday:(NSDate *)birthday;

@end

NS_ASSUME_NONNULL_END
