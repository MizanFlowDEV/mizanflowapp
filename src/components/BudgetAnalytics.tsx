import React, { useMemo } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text, Card, useTheme } from 'react-native-paper';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { useBudget } from '../contexts/BudgetContext';
import { useLanguage } from '../contexts/LanguageContext';

const screenWidth = Dimensions.get('window').width;

export default function BudgetAnalytics() {
  const { budgetItems } = useBudget();
  const { t, isRTL } = useLanguage();
  const theme = useTheme();

  const monthlyData = useMemo(() => {
    const currentDate = new Date();
    const last6Months = Array.from({ length: 6 }, (_, i) => {
      const date = new Date(currentDate);
      date.setMonth(date.getMonth() - i);
      return date;
    }).reverse();

    return last6Months.map(date => {
      const monthItems = budgetItems.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate.getMonth() === date.getMonth() &&
               itemDate.getFullYear() === date.getFullYear();
      });

      return {
        month: date.toLocaleString('default', { month: 'short' }),
        income: monthItems
          .filter(item => item.type === 'income')
          .reduce((sum, item) => sum + item.amount, 0),
        expenses: monthItems
          .filter(item => item.type === 'expense')
          .reduce((sum, item) => sum + item.amount, 0),
      };
    });
  }, [budgetItems]);

  const categoryData = useMemo(() => {
    const categories = new Map<string, number>();
    budgetItems
      .filter(item => item.type === 'expense')
      .forEach(item => {
        categories.set(
          item.category,
          (categories.get(item.category) || 0) + item.amount
        );
      });

    return Array.from(categories.entries()).map(([category, amount]) => ({
      name: category,
      amount,
      color: `#${Math.floor(Math.random()*16777215).toString(16)}`,
      legendFontColor: theme.colors.onSurface,
    }));
  }, [budgetItems, theme.colors.onSurface]);

  const chartConfig = {
    backgroundColor: theme.colors.surface,
    backgroundGradientFrom: theme.colors.surface,
    backgroundGradientTo: theme.colors.surface,
    decimalPlaces: 0,
    color: (opacity = 1) => theme.colors.primary,
    labelColor: (opacity = 1) => theme.colors.onSurface,
    style: {
      borderRadius: 16,
    },
  };

  return (
    <View style={styles.container}>
      <Card style={styles.chartCard}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.chartTitle}>
            {t('budget.monthlyOverview')}
          </Text>
          <LineChart
            data={{
              labels: monthlyData.map(d => d.month),
              datasets: [
                {
                  data: monthlyData.map(d => d.income),
                  color: (opacity = 1) => theme.colors.primary,
                  strokeWidth: 2,
                },
                {
                  data: monthlyData.map(d => d.expenses),
                  color: (opacity = 1) => theme.colors.error,
                  strokeWidth: 2,
                },
              ],
              legend: [t('budget.income'), t('budget.expense')],
            }}
            width={screenWidth - 48}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </Card.Content>
      </Card>

      <Card style={styles.chartCard}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.chartTitle}>
            {t('budget.expenseByCategory')}
          </Text>
          <PieChart
            data={categoryData}
            width={screenWidth - 48}
            height={220}
            chartConfig={chartConfig}
            accessor="amount"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
            style={styles.chart}
          />
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  chartCard: {
    marginBottom: 16,
  },
  chartTitle: {
    marginBottom: 16,
    textAlign: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
}); 