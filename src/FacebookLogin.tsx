import { Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import type { LoginProps } from './types';

const GoogleLogin = (props: LoginProps) => {
  const theme = props.theme || 'dark';

  const LOGO =
    theme === 'dark'
      ? require('./assets/images/FacebookLogoWhite.png')
      : require('./assets/images/FacebookLogoBlue.png');

  const BGCOLOR = theme === 'dark' ? '#0866ff' : 'white';

  const TXTCOLOR = theme === 'dark' ? 'white' : 'black';

  const onGoogleButtonPress = async () => {
    console.log('Facebook Login');
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
          Login with Facebook
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default GoogleLogin;
