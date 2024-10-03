import { Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import type { LoginProps } from './types';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk-next';

const FacebookLogin = (props: LoginProps) => {
  const theme = props.theme || 'dark';
  const LOGO =
    theme === 'dark'
      ? require('./assets/images/FacebookLogoWhite.png')
      : require('./assets/images/FacebookLogoBlue.png');
  const BGCOLOR = theme === 'dark' ? '#0866ff' : 'white';
  const TXTCOLOR = theme === 'dark' ? 'white' : 'black';

  const getInfoFromToken = (accessToken: string) => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: 'id,name,first_name,last_name',
      },
    };

    const profileRequest = new GraphRequest(
      '/me',
      { accessToken, parameters: PROFILE_REQUEST_PARAMS },
      (error, user) => {
        if (error) {
          console.log('login info has error: ' + error);
          return false;
        } else {
          console.log('result:', user);
          return user;
        }
      }
    );

    new GraphRequestManager().addRequest(profileRequest).start();
  };

  const onFacbookButtonPress = async () => {
    console.log('Facebook Login');
    try {
      LoginManager.logInWithPermissions(['public_profile']).then(
        (login) => {
          if (login.isCancelled) {
            console.log('Login cancelled');
            props.onError(false);
          } else {
            AccessToken.getCurrentAccessToken().then((data) => {
              if (!data) {
                props.onError(false);
              } else {
                const accessToken = data.accessToken.toString();
                let user = getInfoFromToken(accessToken);
                console.log('facebook user:', user);
              }
            });
          }
        },
        (error) => {
          props.onError(false);
          console.log('Login fail with error: ' + error);
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TouchableOpacity onPress={onFacbookButtonPress}>
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

export default FacebookLogin;
