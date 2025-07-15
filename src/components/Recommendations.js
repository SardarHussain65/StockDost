import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../styles/theme';

const Recommendations = () => {
  const recommendations = [
    {
      ticker: 'HUBC',
      description: 'A strong performer with consistent growth.',
    },
    { ticker: 'OGDC', description: 'Promising due to increasing oil prices.' },
    { ticker: 'PSO', description: 'A major player in the oil sector.' },
    { ticker: 'Ufone', description: 'Excellent growth potential in telecom.' },
  ];

  return (
    <View style={styles.card}>
      <Text style={styles.subheader}>Stock Recommendations</Text>
      {recommendations.map((rec, index) => (
        <Text key={index} style={styles.recommendationText}>
          {index + 1}. {rec.ticker}: {rec.description}
        </Text>
      ))}
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
  recommendationText: {
    ...typography.body,
    marginBottom: spacing.xs,
  },
});

export default Recommendations;
