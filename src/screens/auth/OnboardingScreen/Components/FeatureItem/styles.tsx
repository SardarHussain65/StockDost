import { StyleSheet } from 'react-native';
import { mvs } from '../../../../../config/metrices';
import { colors } from '../../../../../styles/colors';

export const styles = StyleSheet.create({
  containner: {
    flex: 1,
    gap: mvs(110),
    alignItems: 'center',
    padding: mvs(20),
    paddingTop: mvs(30),
  },
  image: {
    width: '100%',
    height: mvs(450),
    borderRadius: 20,
    marginTop: mvs(20),
    resizeMode: "cover"
  },
  title: {
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    gap: mvs(15),
  },
  TextContent: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
    color: colors.secondaryText,
  },
});
