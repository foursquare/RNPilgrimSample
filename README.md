# RNPilgrimSample
Pilgrim sample app using React Native

|iOS                |Android                |
|-------------------|-----------------------|
|![](images/ios.gif)|![](images/android.gif)|

## Setup instructions

1. Clone or download sample app
    * `git clone git@github.com:foursquare/RNPilgrimSample.git`
    
2. In sample app directory install dependencies
    * `npm install`

3. Autolink native modules (react-native 0.60+)
    * `cd ios/ && pod install && cd ..`

    #### iOS setup

    1. Ensure `CFBundleIdentifier` is set correctly

    2. Replace `CONSUMER_KEY` and `CONSUMER_SECRET` with the correct values in `ios/RNPilgrimSample/AppDelegate.m`

    #### Android setup

    1. Replace `CONSUMER_KEY` and `CONSUMER_SECRET` with the correct values in `android/app/src/main/java/com/rnpilgrimsample/MainApplication.java`

    2. In `android/app/build.gradle` modify the `signingConfigs` section to use your keystore file and ensure the `storePassword`, `keyAlias`, and `keyPassword` are set correctly

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

    3. (Optional) For the map view to work you need to add your [Google API Key](https://developers.google.com/maps/documentation/android-sdk/get-api-key) in `android/app/src/main/AndroidManifest.xml`.  Replace `YOUR_API_KEY` with the correct value.

4. Run the app

    `npx react-native run-ios`

    `npx react-native run-android`