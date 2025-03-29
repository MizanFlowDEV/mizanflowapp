import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { useBudget } from '../../src/contexts/BudgetContext';
import { useLanguage } from '../../src/contexts/LanguageContext';

export default function TransactionsScreen() {
  const { budgetItems } = useBudget();
  const { t } = useLanguage();
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text variant="headlineMedium" style={{ color: theme.colors.primary }}>
        {t('budget.transactions.title')}
      </Text>
      <Text variant="bodyLarge" style={{ color: theme.colors.onBackground, marginTop: 16 }}>
        {t('budget.transactions.noTransactions')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 