import { View } from 'react-native';
import AppleLogin from './AppleLogin';
import appleAuth from '@invertase/react-native-apple-authentication';
import GoogleLogin from './GoogleLogin';
import FacebookLogin from './FacebookLogin';
import { styles } from './styles';
import type { LoginProps } from './types';

const LoginButtons = (props: LoginProps) => {
  return (
    <View style={styles.buttonWrapper}>
      {appleAuth.isSupported && props.iosEnabled !== false && (
        <AppleLogin {...props} />
      )}
      {props.googleEnabled !== false && <GoogleLogin {...props} />}
      {props.facebookEnabled !== false && <FacebookLogin {...props} />}
    </View>
  );
};

export default LoginButtons;
