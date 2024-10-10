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
import { Buffer } from 'buffer';

const decodeJWT = (token: string) => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid token format');
    }

    // Decode the payload (second part)
    const payload = parts[1];
    if (!payload) {
      throw new Error('Token missing payload');
    }
    const paddedPayload = payload + '='.repeat((4 - (payload.length % 4)) % 4);
    const decoded = Buffer.from(paddedPayload, 'base64').toString('utf8');

    return JSON.parse(decoded);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

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

  const getInfoFromJwtToken = (authToken: string) => {
    const decodedToken: any = decodeJWT(authToken);
    console.log(decodedToken);

    let userObject: UserObject = {
      token: authToken,
      email: decodedToken?.email,
      name: decodedToken?.name,
      provider: 'facebook',
    };

    props.onSuccess(userObject);
  };

  const getInfoFromToken = async (accessToken: string) => {
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
            props.onError(false);
          } else {
            let userObject: UserObject = {
              token: accessToken,
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
      if (Platform.OS === 'ios') {
        await LoginManager.logInWithPermissions(
          ['public_profile', 'email'],
          'limited'
        );

        const authTokenResponse =
          await AuthenticationToken.getAuthenticationTokenIOS();

        if (authTokenResponse?.authenticationToken) {
          getInfoFromJwtToken(authTokenResponse?.authenticationToken);
        } else {
          props.onError(false);
        }
      } else {
        await LoginManager.logInWithPermissions(['public_profile', 'email']);
        const accesTokenResponse = await AccessToken.getCurrentAccessToken();
        if (accesTokenResponse?.accessToken) {
          getInfoFromToken(accesTokenResponse?.accessToken);
        } else {
          props.onError(false);
        }
      }
    } catch (error) {
      console.log(error);
      props.onError(false);
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
