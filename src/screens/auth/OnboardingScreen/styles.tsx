import { StyleSheet } from 'react-native';
import { colors } from '../../../styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  activeStepIndicator: {
    height: 5, width: 30, borderRadius: 5
  },
  onboardingProgress: { flexDirection: "row", gap: 5, alignSelf: "center", marginVertical: 30 }
});
export { styles };
