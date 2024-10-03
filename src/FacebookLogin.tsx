import { Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import type { LoginProps, UserObject } from './types';
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

  const getInfoFromToken = async (accessToken: string) => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: 'id,name,email',
      },
    };

    const profileRequest = new GraphRequest(
      '/me',
      { accessToken, parameters: PROFILE_REQUEST_PARAMS },
      (error, user: any) => {
        if (error) {
          props.onError(false);
        } else {
          let userObject: UserObject = {
            token: accessToken,
            email: user.email,
            name: user.name,
          };

          props.onSuccess(userObject);
        }
      }
    );

    new GraphRequestManager().addRequest(profileRequest).start();
  };

  const onFacbookButtonPress = async () => {
    try {
      LoginManager.logInWithPermissions(['public_profile', 'email']).then(
        (login) => {
          if (login.isCancelled) {
            console.log('Login cancelled');
            props.onError(false);
          } else {
            AccessToken.getCurrentAccessToken().then(async (data) => {
              if (!data) {
                props.onError(false);
              } else {
                const accessToken = data.accessToken.toString();
                await getInfoFromToken(accessToken);
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
