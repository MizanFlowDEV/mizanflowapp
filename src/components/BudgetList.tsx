import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Card, IconButton } from 'react-native-paper';
import { useBudget } from '../contexts/BudgetContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useAppTheme } from '../hooks/useAppTheme';
import { BudgetItem } from '../contexts/BudgetContext';

interface BudgetListProps {
  onEditItem: (item: BudgetItem) => void;
  onDeleteItem: (id: string) => void;
}

export default function BudgetList({ onEditItem, onDeleteItem }: BudgetListProps) {
  const { budgetItems } = useBudget();
  const { t, isRTL } = useLanguage();
  const { colors, typography, spacing } = useAppTheme();

  const renderItem = ({ item }: { item: BudgetItem }) => (
    <Card 
      style={[
        styles.card,
        { marginBottom: spacing.components.card.margin }
      ]}
    >
      <Card.Content style={styles.cardContent}>
        <View style={styles.itemInfo}>
          <Text 
            variant="titleMedium"
            style={[
              styles.category,
              { color: colors.text.primary }
            ]}
          >
            {item.category}
          </Text>
          <Text 
            variant="bodyMedium"
            style={[
              styles.description,
              { color: colors.text.secondary }
            ]}
          >
            {item.description}
          </Text>
          <Text 
            variant="bodySmall"
            style={[
              styles.date,
              { color: colors.text.secondary }
            ]}
          >
            {new Date(item.date).toLocaleDateString()}
            {item.recurring && ` • ${t(`budget.${item.recurringInterval}`)}`}
          </Text>
        </View>
        <View style={styles.amountContainer}>
          <Text
            variant="titleMedium"
            style={[
              styles.amount,
              { 
                color: item.type === 'income' ? colors.success.main : colors.error.main,
                fontWeight: typography.fontWeight.bold
              }
            ]}
          >
            {item.type === 'income' ? '+' : '-'}
            {item.amount.toFixed(2)}
          </Text>
          <View style={styles.actions}>
            <IconButton
              icon="pencil"
              size={spacing.components.icon.size}
              onPress={() => onEditItem(item)}
              style={{ padding: spacing.components.icon.padding }}
            />
            <IconButton
              icon="delete"
              size={spacing.components.icon.size}
              onPress={() => onDeleteItem(item.id)}
              style={{ padding: spacing.components.icon.padding }}
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
      contentContainerStyle={[
        styles.list,
        { padding: spacing.layout.list }
      ]}
      ListEmptyComponent={
        <View style={[
          styles.emptyContainer,
          { padding: spacing.xl }
        ]}>
          <Text 
            variant="bodyLarge" 
            style={[
              styles.emptyText,
              { 
                textAlign: 'center',
                color: colors.text.secondary
              }
            ]}
          >
            {t('budget.noItems')}
          </Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flexGrow: 1,
  },
  card: {
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  itemInfo: {
    flex: 1,
  },
  category: {
    marginBottom: 4,
  },
  description: {
    marginBottom: 4,
  },
  date: {
    marginBottom: 4,
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    marginBottom: 4,
  },
  actions: {
    flexDirection: 'row',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    textAlign: 'center',
  },
}); 