import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  buttonWrapper: {
    width: '100%',
    gap: 10,
  },
  buttonContainer: {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    overflow: 'hidden',
    minWidth: 140,
    minHeight: 50,
  },
  logo: {
    width: 50,
    height: 50,
  },
  buttonText: {
    textAlign: 'center',
    flex: 1,
    marginLeft: -50,
    fontWeight: 'bold',
  },
});
