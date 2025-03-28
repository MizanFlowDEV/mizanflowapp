import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Card, IconButton, useTheme } from 'react-native-paper';
import { useBudget } from '../contexts/BudgetContext';
import { useLanguage } from '../contexts/LanguageContext';
import { BudgetItem } from '../contexts/BudgetContext';

interface BudgetListProps {
  onEditItem: (item: BudgetItem) => void;
  onDeleteItem: (id: string) => void;
}

export default function BudgetList({ onEditItem, onDeleteItem }: BudgetListProps) {
  const { budgetItems } = useBudget();
  const { t, isRTL } = useLanguage();
  const theme = useTheme();

  const renderItem = ({ item }: { item: BudgetItem }) => (
    <Card style={styles.card}>
      <Card.Content style={styles.cardContent}>
        <View style={styles.itemInfo}>
          <Text variant="titleMedium">{item.category}</Text>
          <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
            {item.description}
          </Text>
          <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
            {new Date(item.date).toLocaleDateString()}
            {item.recurring && ` • ${t(`budget.${item.recurringInterval}`)}`}
          </Text>
        </View>
        <View style={styles.amountContainer}>
          <Text
            variant="titleMedium"
            style={[
              styles.amount,
              { color: item.type === 'income' ? theme.colors.primary : theme.colors.error }
            ]}
          >
            {item.type === 'income' ? '+' : '-'}
            {item.amount.toFixed(2)}
          </Text>
          <View style={styles.actions}>
            <IconButton
              icon="pencil"
              size={20}
              onPress={() => onEditItem(item)}
            />
            <IconButton
              icon="delete"
              size={20}
              onPress={() => onDeleteItem(item.id)}
            />
          </View>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <FlatList
      data={budgetItems}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.list}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text variant="bodyLarge" style={{ textAlign: 'center' }}>
            {t('budget.noItems')}
          </Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  card: {
    marginBottom: 8,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  itemInfo: {
    flex: 1,
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  actions: {
    flexDirection: 'row',
  },
  emptyContainer: {
    padding: 32,
  },
}); 