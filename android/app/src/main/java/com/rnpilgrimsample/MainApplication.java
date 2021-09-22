package com.rnpilgrimsample;

import android.app.Application;
import android.content.Context;

import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import com.foursquare.pilgrim.LogLevel;
import com.foursquare.pilgrim.PilgrimSdk;

import java.lang.reflect.InvocationTargetException;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            @SuppressWarnings("UnnecessaryLocalVariable")
            List<ReactPackage> packages = new PackageList(this).getPackages();
            // Packages that cannot be autolinked yet can be added manually here, for
            // example:
            // packages.add(new MyReactNativePackage());
            return packages;
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
        initializeFlipper(this, getReactNativeHost().getReactInstanceManager());

        PilgrimSdk.Builder builder = new PilgrimSdk.Builder(this).consumer("CONSUMER_KEY", "CONSUMER_SECRET")
                .logLevel(LogLevel.DEBUG).enableDebugLogs();
        PilgrimSdk.with(builder);
    }

    /**
     * Loads Flipper in React Native templates. Call this in the onCreate method
     * with something like initializeFlipper(this,
     * getReactNativeHost().getReactInstanceManager());
     *
     * @param context
     * @param reactInstanceManager
     */
    private static void initializeFlipper(Context context, ReactInstanceManager reactInstanceManager) {
        if (BuildConfig.DEBUG) {
            try {
                /*
                 * We use reflection here to pick up the class that initializes Flipper, since
                 * Flipper library is not available in release mode
                 */
                Class<?> aClass = Class.forName("com.rnpilgrimsample.ReactNativeFlipper");
                aClass.getMethod("initializeFlipper", Context.class, ReactInstanceManager.class).invoke(null, context,
                        reactInstanceManager);
            } catch (ClassNotFoundException | NoSuchMethodException | IllegalAccessException | InvocationTargetException e) {
                e.printStackTrace();
            }
        }
    }
}
