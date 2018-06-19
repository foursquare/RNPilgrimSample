//
//  FSQPDebugLog.h
//  PilgrimSDK
//
//  Created by Samuel Grossberg on 1/7/16.
//  Copyright © 2016 Foursquare. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

typedef NS_ENUM(NSInteger, FSQPLogLevel) {
    FSQPLogLevelDebug = 0,
    FSQPLogLevelInfo,
    FSQPLogLevelWarn,
    FSQPLogLevelError
};

typedef NS_ENUM(NSInteger, FSQPLogType) {
    FSQPLogTypeGeneral = 0,
    FSQPLogTypeBattery,
    FSQPLogTypeLocation,
    FSQPLogTypeNetwork
};

NSString* stringForFSQPLogLevel(FSQPLogLevel logLevel);
FSQPLogLevel fsqpLogLevelForString(NSString *string);
NSString* stringForFSQPLogType(FSQPLogType eventType);
FSQPLogType fsqpLogTypeForString(NSString *string);

/**
 *  An individual log statement.
 */
@interface FSQPDebugLog : NSObject <NSCoding>

/**
 *  Time that the event was recorded.
 */
@property (nonatomic, copy) NSDate *timestamp;

@property (nonatomic) FSQPLogLevel level;
@property (nonatomic) FSQPLogType type;

/**
 *  Associated data for detailed debugging.
 */
@property (nonatomic, copy, nullable) NSObject<NSCoding> *data;

/**
 *  A short string describing the event.
 */
@property (nonatomic, copy) NSString *eventDescription;

- (instancetype)init NS_UNAVAILABLE;

@end

NS_ASSUME_NONNULL_END
