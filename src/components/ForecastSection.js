import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import { colors, typography, spacing } from '../styles/theme';

const ForecastSection = ({
  ticker,
  setTicker,
  forecastData,
  setForecastData,
  currentPrice,
  setCurrentPrice,
  loading,
  setLoading,
  error,
  setError,
  lastUpdated,
  setLastUpdated,
}) => {
  const generateForecast = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://stockdost-375231164382.europe-west1.run.app/forecast/${ticker}`,
      );
      setCurrentPrice(response.data.currentPrice);
      setForecastData(response.data.forecast);
      setLastUpdated(new Date().toLocaleString());
    } catch (err) {
      setError('Error fetching forecast data.');
    }
    setLoading(false);
  };

  const renderForecastItem = ({ item }) => (
    <View style={styles.forecastItem}>
      <Text style={styles.forecastText}>Date: {item.Date}</Text>
      <Text style={styles.forecastText}>
        Forecast: PKR {item.Forecast.toFixed(2)}
      </Text>
    </View>
  );

  return (
    <View style={styles.card}>
      <Text style={styles.subheader}>Stock Forecasting</Text>
      <TextInput
        style={styles.input}
        value={ticker}
        onChangeText={setTicker}
        placeholder="Enter PSX Ticker (e.g., HUBC)"
        placeholderTextColor={colors.textSecondary}
      />
      <TouchableOpacity style={styles.primaryBtn} onPress={generateForecast}>
        <Text style={styles.primaryBtnText}>Generate Forecast</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color={colors.primary} />}
      {error && <Text style={styles.error}>{error}</Text>}
      {currentPrice && (
        <Text style={styles.priceText}>
          Current Price: PKR {currentPrice.toFixed(2)}
        </Text>
      )}
      {lastUpdated && (
        <Text style={styles.lastUpdated}>Last updated: {lastUpdated}</Text>
      )}
      {forecastData && (
        <>
          <Text style={styles.sectionTitle}>Forecast Data:</Text>
          <FlatList
            data={forecastData}
            renderItem={renderForecastItem}
            keyExtractor={(item, index) => index.toString()}
          />
          <Text style={styles.sectionTitle}>Recommendations</Text>
          <Text style={styles.recommendationText}>
            {forecastData.length > 1
              ? forecastData[forecastData.length - 1].Forecast >
                forecastData[0].Forecast
                ? '✅ Recommendation: The forecast suggests a potential upward trend. Consider holding or buying.'
                : '⚠️ Recommendation: The forecast suggests a potential downward trend. Consider selling or monitoring closely.'
              : 'Not enough forecast data for recommendation.'}
          </Text>
        </>
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
  subheader: {
    ...typography.subheader,
    marginBottom: spacing.md,
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
  primaryBtn: {
    backgroundColor: colors.primary,
    padding: spacing.sm,
    borderRadius: spacing.xs,
    alignItems: 'center',
    marginVertical: spacing.sm,
  },
  primaryBtnText: {
    color: colors.white,
    ...typography.button,
  },
  forecastItem: {
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  forecastText: {
    ...typography.body,
    marginBottom: spacing.xs,
  },
  error: {
    color: colors.danger,
    marginVertical: spacing.sm,
    ...typography.body,
  },
  priceText: {
    ...typography.body,
    fontWeight: 'bold',
    marginVertical: spacing.sm,
  },
  lastUpdated: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  sectionTitle: {
    ...typography.sectionTitle,
    marginVertical: spacing.sm,
  },
  recommendationText: {
    ...typography.body,
    marginTop: spacing.xs,
  },
});

export default ForecastSection;
