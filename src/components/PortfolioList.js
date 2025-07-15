import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { colors, typography, spacing } from '../styles/theme';

const PortfolioList = ({ portfolio, onRemoveStock, onExportPortfolio }) => {
  const calculatePortfolioSummary = () => {
    let totalValue = 0;
    let totalPurchaseValue = 0;
    let totalGainLoss = 0;
    portfolio.forEach(stock => {
      totalValue += stock.current_value;
      totalPurchaseValue += stock.purchase_value;
      totalGainLoss += stock.current_value - stock.purchase_value;
    });
    return { totalValue, totalPurchaseValue, totalGainLoss };
  };

  const renderPortfolioItem = ({ item }) => {
    const gainLoss = item.current_value - item.purchase_value;
    const gainLossPercent = (gainLoss / item.purchase_value) * 100;
    const gainLossColor = gainLoss >= 0 ? colors.success : colors.danger;

    return (
      <View style={styles.portfolioItem}>
        <View style={styles.rowSpace}>
          <Text style={styles.stockTitle}>{item.ticker}</Text>
          <TouchableOpacity onPress={() => onRemoveStock(item.id)}>
            <Text style={styles.removeText}>Remove</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.detailText}>Quantity: {item.quantity}</Text>
        <Text style={styles.detailText}>
          Purchase Date: {item.purchase_date}
        </Text>
        <Text style={styles.detailText}>
          Purchase Value: PKR {item.purchase_value.toFixed(2)}
        </Text>
        <Text style={styles.detailText}>
          Current Value: PKR {item.current_value.toFixed(2)}
        </Text>
        <Text style={[styles.detailText, { color: gainLossColor }]}>
          Gain/Loss: PKR {gainLoss.toFixed(2)} ({gainLossPercent.toFixed(2)}%)
        </Text>
      </View>
    );
  };

  const { totalValue, totalPurchaseValue, totalGainLoss } =
    calculatePortfolioSummary();
  const gainLossColor = totalGainLoss >= 0 ? colors.success : colors.danger;

  return (
    <View style={styles.card}>
      <View style={styles.headerContainer}>
        <Text style={styles.subheader}>Current Portfolio</Text>
        {portfolio.length > 0 && (
          <TouchableOpacity
            style={styles.exportBtn}
            onPress={onExportPortfolio}
          >
            <Text style={styles.exportBtnText}>Export Portfolio</Text>
          </TouchableOpacity>
        )}
      </View>

      {portfolio.length > 0 ? (
        <>
          <FlatList
            data={portfolio}
            renderItem={renderPortfolioItem}
            keyExtractor={item => item.id}
          />
          <View style={styles.summary}>
            <Text style={styles.summaryText}>
              Total Portfolio Value: PKR {totalValue.toFixed(2)}
            </Text>
            <Text style={styles.summaryText}>
              Total Purchase Value: PKR {totalPurchaseValue.toFixed(2)}
            </Text>
            <Text style={[styles.summaryText, { color: gainLossColor }]}>
              Total Gain/Loss: PKR {totalGainLoss.toFixed(2)}
            </Text>
          </View>
        </>
      ) : (
        <Text style={styles.noPortfolioText}>No stocks in portfolio yet.</Text>
      )}
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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  subheader: {
    ...typography.subheader,
  },
  portfolioItem: {
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  stockTitle: {
    ...typography.subheader,
  },
  rowSpace: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  removeText: {
    color: colors.danger,
    ...typography.button,
  },
  summary: {
    marginTop: spacing.md,
    padding: spacing.sm,
    backgroundColor: colors.lightGray,
    borderRadius: spacing.xs,
  },
  summaryText: {
    ...typography.body,
    marginBottom: spacing.xs,
  },
  noPortfolioText: {
    color: colors.textSecondary,
    ...typography.body,
    textAlign: 'center',
    marginTop: spacing.md,
  },
  exportBtn: {
    backgroundColor: colors.secondary,
    padding: spacing.xs,
    borderRadius: spacing.xs,
  },
  exportBtnText: {
    color: colors.white,
    ...typography.button,
  },
  detailText: {
    ...typography.body,
    marginTop: spacing.xs,
  },
});

export default PortfolioList;
