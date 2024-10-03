import { Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import type { LoginProps, UserObject } from './types';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';
import axios from 'axios';

const FacebookLogin = (props: LoginProps) => {
  const theme = props.theme || 'dark';
  const LOGO =
    theme === 'dark'
      ? require('./assets/images/FacebookLogoWhite.png')
      : require('./assets/images/FacebookLogoBlue.png');
  const BGCOLOR = theme === 'dark' ? '#0866ff' : 'white';
  const TXTCOLOR = theme === 'dark' ? 'white' : 'black';

  const getInfoFromToken = async (accessToken: string) => {
    try {
      const response = await axios.get(`https://graph.facebook.com/v21.0/me`, {
        params: {
          fields: 'id,name,email',
          access_token: accessToken,
        },
      });

      let userObject: UserObject = {
        token: accessToken,
        email: response.data.email,
        name: response.data.name,
      };
      props.onSuccess(userObject);
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.log(
          'Facebook Graph API Error:',
          error.response?.data || error.message
        );
        props.onError(false);
      }
      throw error;
    }
    // const profileRequest = new GraphRequest(
    //   '/me',
    //   {
    //     accessToken: accessToken,
    //     httpMethod: 'GET',
    //     parameters: {
    //       fields: {
    //         string: 'id,name,email',
    //       },
    //     },
    //     version: 'v21.0',
    //   },
    //   (error, user: any) => {
    //     if (error) {
    //       console.log('Error fetching data: ', error);
    //       props.onError(false);
    //     } else {
    //       console.log('user', user);
    //       let userObject: UserObject = {
    //         token: accessToken,
    //         email: user.email,
    //         name: user.name,
    //       };
    //       props.onSuccess(userObject);
    //     }
    //   }
    // );

    // new GraphRequestManager().addRequest(profileRequest).start();
  };

  const onFacbookButtonPress = async () => {
    try {
      LoginManager.logInWithPermissions(['public_profile', 'email']).then(
        (login) => {
          console.log('login', login);
          if (login.isCancelled) {
            console.log('Login cancelled');
            props.onError(false);
          } else {
            AccessToken.getCurrentAccessToken().then(async (data) => {
              if (!data) {
                props.onError(false);
              } else {
                console.log('fbdata', data);
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
