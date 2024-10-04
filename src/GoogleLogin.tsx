import { Image, Platform, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import type { LoginProps, UserObject } from './types';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const GoogleLogin = (props: LoginProps) => {
  const iconOnly = props.iconOnly || false;
  const theme = props.theme || 'light';
  const LOGO = require('./assets/images/GoogleLogo.png');
  const BGCOLOR = theme === 'dark' ? 'black' : 'white';
  const TXTCOLOR = theme === 'dark' ? 'white' : 'black';
  const BORDERRADIUS = props.borderRadius ?? 0;

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
        <Text style={[{ color: TXTCOLOR }, styles.buttonText]}>
          Google Client ID is required
        </Text>
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
        let userObject: UserObject = {
          token: userInfo.data.idToken,
          email: userInfo.data.user.email,
          name: userInfo.data.user.name,
        };
        props.onSuccess(userObject);
      } else {
        props.onError(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableOpacity onPress={onGoogleButtonPress}>
      <View
        style={[
          {
            backgroundColor: BGCOLOR,
            borderColor: TXTCOLOR,
            borderRadius: BORDERRADIUS,
          },
          iconOnly ? styles.buttonContainerIcon : styles.buttonContainer,
        ]}
      >
        <Image style={styles.logo} source={LOGO} />
        {iconOnly && (
          <Text style={[{ color: TXTCOLOR }, styles.buttonText]}>
            Sign in with Google
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default GoogleLogin;
