import { Platform, View } from 'react-native';
import AppleLogin from './AppleLogin';
import GoogleLogin from './GoogleLogin';
import FacebookLogin from './FacebookLogin';
import { styles } from './styles';
import type { LoginProps } from './types';

const LoginButtons = (props: LoginProps) => {
  const iconOnly = props.iconOnly || false;

  return (
    <View style={iconOnly ? styles.buttonWrapperIcon : styles.buttonWrapper}>
      {Platform.OS === 'ios' && props.iosEnabled !== false && (
        <AppleLogin {...props} />
      )}
      {props.googleEnabled !== false && <GoogleLogin {...props} />}
      {props.facebookEnabled !== false && <FacebookLogin {...props} />}
    </View>
  );
};

export default LoginButtons;
