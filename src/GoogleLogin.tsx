import { Image, Platform, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import type { LoginProps } from './types';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const GoogleLogin = (props: LoginProps) => {
  const theme = props.theme || 'light';
  const LOGO = require('./assets/images/GoogleLogo.png');
  const BGCOLOR = theme === 'dark' ? 'black' : 'white';
  const TXTCOLOR = theme === 'dark' ? 'white' : 'black';

  const key =
    Platform.OS === 'ios'
      ? props.googleIOSClientId
      : props.googleAndroidClientId;

  if (!key) {
    return (
      <View
        style={[
          { backgroundColor: BGCOLOR, borderColor: TXTCOLOR },
          styles.buttonContainer,
        ]}
      >
        <Text>Google Client ID is required</Text>
      </View>
    );
  }

  GoogleSignin.configure({
    webClientId: key,
    iosClientId: key,
    scopes: ['profile', 'email'],
  });

  const onGoogleButtonPress = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      if (userInfo.type === 'success') {
        let userObject = {
          token: userInfo.data.idToken,
          email: userInfo.data.user.email,
          name: userInfo.data.user.name,
        };
        props.onSuccess(userObject);
      } else {
        props.onError('Sign-in Failed');
      }
    } catch (error) {
      console.log(error);
    }
    //   try {
    //     const appleAuthRequestResponse = await appleAuth.performRequest({
    //       requestedOperation: appleAuth.Operation.LOGIN,
    //       requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    //     });

    //     // const { user, email, fullName, identityToken } = appleAuthRequestResponse;

    //     if (appleAuthRequestResponse.identityToken) {
    //       props.onSuccess(appleAuthRequestResponse)
    //     } else {
    //       props.onError('Sign-in Failed')
    //     }

    //   } catch (error) {
    //     console.error(error);
    //   }
  };

  return (
    <TouchableOpacity onPress={onGoogleButtonPress}>
      <View
        style={[
          { backgroundColor: BGCOLOR, borderColor: TXTCOLOR },
          styles.buttonContainer,
        ]}
      >
        <Image style={styles.logo} source={LOGO} />
        <Text style={[{ color: TXTCOLOR }, styles.buttonText]}>
          Sign in with Google
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default GoogleLogin;
