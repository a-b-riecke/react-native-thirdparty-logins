import appleAuth from '@invertase/react-native-apple-authentication';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import type { LoginProps, UserObject } from './types';

const AppleLogin = (props: LoginProps) => {
  const iconOnly = props.iconOnly || false;
  const theme = props.theme || 'dark';
  const LOGO =
    theme === 'dark'
      ? require('./assets/images/AppleLogoWhite.png')
      : require('./assets/images/AppleLogoBlack.png');
  const BGCOLOR = theme === 'dark' ? 'black' : 'white';
  const TXTCOLOR = theme === 'dark' ? 'white' : 'black';
  const BORDERRADIUS = props.borderRadius ?? 0;

  const onAppleButtonPress = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      if (appleAuthRequestResponse.identityToken) {
        const userObject: UserObject = {
          token: appleAuthRequestResponse.identityToken,
          email: appleAuthRequestResponse.email,
          name:
            appleAuthRequestResponse.fullName?.givenName +
            ' ' +
            appleAuthRequestResponse.fullName?.familyName,
        };
        props.onSuccess(userObject);
      } else {
        props.onError(false);
      }
    } catch (error) {
      console.error(error);
      props.onError(true);
    }
  };

  return (
    <TouchableOpacity onPress={onAppleButtonPress}>
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
        {!iconOnly && (
          <Text style={[{ color: TXTCOLOR }, styles.buttonText]}>
            Sign in with Apple
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default AppleLogin;
