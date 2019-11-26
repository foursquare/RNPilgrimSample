# React Native Pilgrim SDK Sample App
Pilgrim sample app using React Native

|iOS                |Android                |
|-------------------|-----------------------|
|![](images/ios.gif)|![](images/android.gif)|

## Setup instructions


### Prerequisites

Use of this sample app requires a Pilgrim enabled account from (https://developer.foursquare.com).


### Download and Install

1. Clone or [download](https://github.com/foursquare/RNPilgrimSample) the sample app:

    `git clone git@github.com:foursquare/RNPilgrimSample.git`

2. Navigate to the sample app directory:

    `cd RNPilgrimSample`

3. Install dependencies:

    `npm install`


### iOS Setup

4. Autolink native modules (react-native 0.60+)

    `cd ios/ && pod install && cd ..`

5. In `ios/RNPilgrimSample/AppDelegate.m`, replace `CONSUMER_KEY` and `CONSUMER_SECRET` with the values of your Foursquare app, found in your [Foursquare Developer Console](https://foursquare.com/developers/apps/).


6. Ensure the `CFBundleIdentifier` of your project's `Info.plist` is correctly added to your Foursquare [Developer Console](https://foursquare.com/developers/apps/) app's iOS Bundle IDs setting.

7. Run the app:

    `npx react-native run-ios`



### Android Setup

4. In `android/app/src/main/java/com/rnpilgrimsample/MainApplication.java`, replace `CONSUMER_KEY` and `CONSUMER_SECRET` with the values of your Foursquare App, found in your [Foursquare Developer Console](https://developer.foursquare.com).

5. In `android/app/build.gradle` modify the `signingConfigs` section to use your keystore file and ensure the `storePassword`, `keyAlias`, and `keyPassword` are set correctly

    ```
    signingConfigs {
        debug {
            storeFile file('/path/to/file.keystore')
            storePassword 'storePassword'
            keyAlias 'keyAlias'
            keyPassword 'keyPassword'
        }
    }
    ```

6. (Optional) For the map view to work you need to add your [Google API Key](https://developers.google.com/maps/documentation/android-sdk/get-api-key) in `android/app/src/main/AndroidManifest.xml`.  Replace `YOUR_API_KEY` with the correct value.

7. Run the app:

    `npx react-native run-android`


## Common Issues

1. If you are using the simulator, make sure you set the simulator's location. Using a [GPX file](https://www.gpxgenerator.com/) should also help, as simulating location can be notoriously tricky.

2. See an "Access Credentials Missing" error? This happens for two reasons:

    i. You have forgotten to add or added incorrect Pilgrim enabled Foursquare `CONSUMER_KEY` and `CONSUMER_SECRET` correctly, or
    
    ii. You have forgotten to add or added incorrect Bundle ID (iOS) or Key Hashes (Android) to your Foursquare account's settings.

