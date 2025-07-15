import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { colors, typography, spacing } from '../styles/theme';

const PortfolioInput = ({
  ticker,
  setTicker,
  quantity,
  setQuantity,
  purchasePrice,
  setPurchasePrice,
  purchaseDate,
  setPurchaseDate,
  onAddStock,
  onResetPortfolio,
  error,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.subheader}>Portfolio Management</Text>
      {error && <Text style={styles.error}>{error}</Text>}

      <Text style={styles.label}>Ticker Symbol (e.g., HUBC)</Text>
      <TextInput
        style={styles.input}
        value={ticker}
        onChangeText={setTicker}
        placeholder="Enter ticker"
        placeholderTextColor={colors.textSecondary}
      />

      <Text style={styles.label}>Quantity</Text>
      <TextInput
        style={styles.input}
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
        placeholder="Enter quantity"
        placeholderTextColor={colors.textSecondary}
      />

      <Text style={styles.label}>Purchase Price (PKR)</Text>
      <TextInput
        style={styles.input}
        value={purchasePrice}
        onChangeText={setPurchasePrice}
        keyboardType="numeric"
        placeholder="Enter purchase price"
        placeholderTextColor={colors.textSecondary}
      />

      <Text style={styles.label}>Purchase Date</Text>
      <TextInput
        style={styles.input}
        value={purchaseDate}
        onChangeText={setPurchaseDate}
        placeholder="YYYY-MM-DD"
        placeholderTextColor={colors.textSecondary}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.primaryBtn} onPress={onAddStock}>
          <Text style={styles.primaryBtnText}>Add Stock</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resetBtn} onPress={onResetPortfolio}>
          <Text style={styles.resetBtnText}>Reset Portfolio</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: spacing.sm,
    marginBottom: spacing.lg,
    elevation: 3,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  subheader: {
    ...typography.subheader,
    marginBottom: spacing.md,
  },
  label: {
    ...typography.label,
    marginTop: spacing.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.sm,
    borderRadius: spacing.xs,
    backgroundColor: colors.inputBackground,
    marginVertical: spacing.xs,
    ...typography.body,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.md,
  },
  primaryBtn: {
    backgroundColor: colors.primary,
    padding: spacing.sm,
    borderRadius: spacing.xs,
    flex: 1,
    marginRight: spacing.xs,
    alignItems: 'center',
  },
  primaryBtnText: {
    color: colors.white,
    ...typography.button,
  },
  resetBtn: {
    backgroundColor: colors.danger,
    padding: spacing.sm,
    borderRadius: spacing.xs,
    flex: 1,
    marginLeft: spacing.xs,
    alignItems: 'center',
  },
  resetBtnText: {
    color: colors.white,
    ...typography.button,
  },
  error: {
    color: colors.danger,
    marginBottom: spacing.sm,
    ...typography.body,
  },
});

export default PortfolioInput;
