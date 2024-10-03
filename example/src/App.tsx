import { StyleSheet, View } from 'react-native';
import LoginButtons from 'react-native-thirdparty-logins';
import { GOOGLE_ANDROID_CLIENT_ID, GOOGLE_IOS_CLIENT_ID } from './go.config';
import { UserObject } from '../../src/types';

export default function App() {
  const handleSucess = (response: UserObject) => {
    console.log('Success', response);
  };

  const handleError = (response: boolean) => {
    console.log('Error', response);
  };

  return (
    <View style={styles.container}>
      <LoginButtons
        onSuccess={handleSucess}
        onError={handleError}
        googleIOSClientId={GOOGLE_IOS_CLIENT_ID}
        googleAndroidClientId={GOOGLE_ANDROID_CLIENT_ID}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    // paddingVertical: 250,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
