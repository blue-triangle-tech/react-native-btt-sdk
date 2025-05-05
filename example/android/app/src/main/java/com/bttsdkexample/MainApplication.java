package com.bttsdkexample;

import static com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load;

import android.app.Application;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactHost;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.defaults.DefaultReactHost;
import com.facebook.react.defaults.DefaultReactNativeHost;
import com.facebook.react.soloader.OpenSourceMergedSoMapping;
import com.facebook.soloader.SoLoader;

import java.io.IOException;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost =
        new DefaultReactNativeHost(this) {
            @Override
            public boolean getUseDeveloperSupport() {
                return true;
            }

            @Override
            protected List<ReactPackage> getPackages() {
                @SuppressWarnings("UnnecessaryLocalVariable")
                List<ReactPackage> packages = new PackageList(this).getPackages();
                // Packages that cannot be autolinked yet can be added manually here, for example:
                // packages.add(new MyReactNativePackage());
                return packages;
            }

            @Override
            protected String getJSMainModuleName() {
                return "index";
            }

            @Override
            protected boolean isNewArchEnabled() {
                return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
            }

            @Override
            protected Boolean isHermesEnabled() {
                return BuildConfig.IS_HERMES_ENABLED;
            }
        };

    @Override
    public void onCreate() {
        super.onCreate();
        try {
            SoLoader.init(getApplicationContext(), OpenSourceMergedSoMapping.INSTANCE);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
            // If you opted-in for the New Architecture, we load the native entry point for this app.
            load();
        }
    }

    @NonNull
    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Nullable
    @Override
    public ReactHost getReactHost() {
        return DefaultReactHost.getDefaultReactHost(getApplicationContext(), mReactNativeHost);
    }
}
