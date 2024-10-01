import { StyleSheet, View } from 'react-native';
import LoginButtons from 'react-native-thirdparty-logins';
import { GOOGLE_ANDROID_CLIENT_ID, GOOGLE_IOS_CLIENT_ID } from './go.config';

export default function App() {
  const handleSucess = (response: any) => {
    console.log('Success', response);
  };

  const handleError = (response: any) => {
    console.log('Error', response);
  };

  return (
    <View style={styles.container}>
      <LoginButtons
        onSuccess={handleSucess}
        onError={handleError}
        googleEnabled={true}
        googleIOSClientId={GOOGLE_IOS_CLIENT_ID}
        googleAndroidClientId={GOOGLE_ANDROID_CLIENT_ID}
        // theme="dark"
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
