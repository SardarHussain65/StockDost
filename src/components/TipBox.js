import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../styles/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TipBox = ({ tip, onRefresh }) => {
  return (
    <View style={styles.tipBox}>
      <Text style={styles.tipText}>💡 {tip}</Text>
      <TouchableOpacity onPress={onRefresh} style={styles.refreshBtn}>
        <Icon name="refresh" size={20} color={colors.textSecondary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tipBox: {
    backgroundColor: colors.tipBackground,
    padding: spacing.md,
    borderRadius: spacing.sm,
    marginBottom: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tipText: {
    color: colors.tipText,
    ...typography.body,
    flex: 1,
  },
  refreshBtn: {
    padding: spacing.xs,
  },
});

export default TipBox;
