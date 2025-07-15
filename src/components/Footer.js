import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../styles/theme';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>Developed by Basharat Hussain</Text>
      <Text style={styles.footerText}>
        For more projects, visit basharathussain.com
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  footerText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
});

export default Footer;
