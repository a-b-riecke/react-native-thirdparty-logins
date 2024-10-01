import { Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

const GoogleLogin = (props: any) => {
  const theme = props.theme || 'light';

  const LOGO = require('./assets/images/GoogleLogo.png');

  const BGCOLOR = theme === 'dark' ? 'black' : 'white';

  const TXTCOLOR = theme === 'dark' ? 'white' : 'black';

  const onGoogleButtonPress = async () => {
    console.log('Google Login');
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
