import { Image, Platform, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import type { LoginProps, UserObject } from './types';
import {
  AccessToken,
  AuthenticationToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk-next';

const FacebookLogin = (props: LoginProps) => {
  const iconOnly = props.iconOnly || false;
  const theme = props.theme || 'dark';
  const LOGO =
    theme === 'dark'
      ? require('./assets/images/FacebookLogoWhite.png')
      : require('./assets/images/FacebookLogoBlue.png');
  const BGCOLOR = theme === 'dark' ? '#0866ff' : 'white';
  const TXTCOLOR = theme === 'dark' ? 'white' : 'black';
  const BORDERRADIUS = props.borderRadius ?? 0;
  const BORDERCOLOR = props.borderColor ?? TXTCOLOR;
  const BORDERENABLED = props.borderEnabled === false ? false : true;
  const BORDERWIDTH = props.borderEnabled ? 1 : 0;

  const getInfoFromToken = async (accessToken: string, iosToken: string) => {
    try {
      const profileRequest = new GraphRequest(
        '/me',
        {
          accessToken: accessToken.toString(),
          parameters: {
            fields: {
              string: 'id,name,email',
            },
          },
        },
        (error, user: any) => {
          if (error) {
            console.log('Error fetching data: ', error);
            props.onError(false);
          } else {
            let userObject: UserObject = {
              token: iosToken !== '' ? iosToken : accessToken,
              email: user.email,
              name: user.name,
              provider: 'facebook',
            };
            props.onSuccess(userObject);
          }
        }
      );
      new GraphRequestManager().addRequest(profileRequest).start();
    } catch (error) {
      props.onError(false);
    }
  };

  const onFacbookButtonPress = async () => {
    try {
      await LoginManager.logInWithPermissions(
        ['public_profile', 'email'],
        'limited'
      );

      let iosToken = '';
      if (Platform.OS === 'ios') {
        const authTokenResponse =
          await AuthenticationToken.getAuthenticationTokenIOS();
        iosToken = authTokenResponse?.authenticationToken ?? '';
      }

      const accesTokenResponse = await AccessToken.getCurrentAccessToken();
      if (accesTokenResponse?.accessToken) {
        getInfoFromToken(accesTokenResponse?.accessToken, iosToken);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableOpacity onPress={onFacbookButtonPress}>
      <View
        style={[
          {
            backgroundColor: BGCOLOR,
            borderRadius: BORDERRADIUS,
          },
          BORDERENABLED && {
            borderColor: BORDERCOLOR,
            borderWidth: BORDERWIDTH,
          },
          iconOnly ? styles.buttonContainerIcon : styles.buttonContainer,
        ]}
      >
        <Image style={styles.logo} source={LOGO} />
        {!iconOnly && (
          <Text style={[{ color: TXTCOLOR }, styles.buttonText]}>
            Login with Facebook
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default FacebookLogin;
