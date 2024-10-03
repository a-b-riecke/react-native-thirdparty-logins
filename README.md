# react-native-thirdparty-logins

providing alternative ways to login

## Installation

```sh
yarn add react-native-fbsdk-next
yarn add @invertase/react-native-apple-authentication
yarn add @react-native-google-signin/google-signin@latest
yarn add react-native-thirdparty-logins
```

## Apple api setup
- remember to add "Sign in with apple" as a capability in the app - note it will not work on emulators

## Google api setup
 Set the keys up in [Google Cloud](https://peerlist.io/blog/engineering/implementing-google-signin-in-react-native#10-possible-problem-developer_error)

 its important to create android, web and ios as web i used for both android. 
 
### android

Local installation:
From your project root 
```sh
cd android && ./gradlew signingReport.
```

Scroll to the top of output, see the fingerprints. Debug fingerprint is used in dev, release fingerprint is used for release APK.

Add this to ```'android/app/build.gradle```
```
dependencies {
  implementation 'com.google.android.gms:play-services-auth:20.0.0'
}
```

Use the webapplication id for android when passing the key


### ios
Add this google ios client id to plist
```
    <key>CFBundleURLTypes</key>
    <array>
      <dict>
        <key>CFBundleURLSchemes</key>
        <array>
          <string>com.googleusercontent.apps.YOUR_GOOGLE_KEY</string>
        </array>
      </dict>
    </array>
    <key>CLIENT_ID</key>
    <string>YOUR_GOOGLE_KEY.apps.googleusercontent.com</string>
    <key>REVERSED_CLIENT_ID</key>
    <string>com.googleusercontent.apps.YOUR_GOOGLE_KEY</string>
```

## Facebook api setup
Create an app in facebook business manager and collect the app id.

### android
Add this line to ```/app/res/values/strings.xml```
```
<string name="facebook_app_id">FACEBOOK_APP_ID</string>
```

Add following lines to in ```/app/manifests/AndroidManifest.xml```
```
<uses-permission android:name="android.permission.INTERNET"/>


<application android:label="@string/app_name" ...>
    ...
    <meta-data android:name="com.facebook.sdk.ApplicationId" android:value="@string/facebook_app_id"/>
    ...
</application>
```

### ios
in ```info.plist``` add these values
```
<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>fb{FACEBOOK_APP_ID}</string>
    </array>
  </dict>
</array>
<key>FacebookAppID</key>
<string>{FACEBOOK_APP_ID}</string>
<key>FacebookDisplayName</key>
<string>{APP_NAME}</string>
<key>LSApplicationQueriesSchemes</key>
<array>
  <string>fbapi</string>
  <string>fb-messenger-share-api</string>
  <string>fbauth2</string>
  <string>fbshareextension</string>
</array>
```


add this to ```AppDelegate.m```
```
//  AppDelegate.m
#import <AuthenticationServices/AuthenticationServices.h>
#import <SafariServices/SafariServices.h>
#import <FBSDKCoreKit/FBSDKCoreKit-Swift.h>

 //Inside didFinishLaunchingWithOptions, add the following
  [[FBSDKApplicationDelegate sharedInstance] application:application
                       didFinishLaunchingWithOptions:launchOptions];
```


## Usage


```js
import { multiply } from 'react-native-thirdparty-logins';

// ...

const result = await multiply(3, 7);
```


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
