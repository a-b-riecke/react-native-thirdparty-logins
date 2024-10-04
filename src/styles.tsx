import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  buttonWrapper: {
    width: '100%',
    gap: 10,
  },
  buttonWrapperIcon: {
    flexDirection: 'row',
    gap: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    minWidth: 140,
    minHeight: 50,
  },
  buttonContainerIcon: {
    height: 50,
    width: 50,
    alignItems: 'center',
    overflow: 'hidden',
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
