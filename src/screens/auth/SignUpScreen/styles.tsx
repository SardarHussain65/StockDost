import { StyleSheet } from 'react-native';
import { colors } from '../../../styles/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: "100%",
    height: 280,
    marginVertical: 20,
  },
  signInText: {
    color: colors.primary,
    marginTop: 20,
  },
  button: {
    marginTop: 30
  }
});
