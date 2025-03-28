import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Card, IconButton, useTheme } from 'react-native-paper';
import { useSchedule, ScheduleItem } from '../contexts/ScheduleContext';
import { useLanguage } from '../contexts/LanguageContext';

interface ScheduleListProps {
  onEditItem: (item: ScheduleItem) => void;
  onDeleteItem: (id: string) => void;
  onToggleItem: (id: string) => void;
  items: ScheduleItem[];
}

export default function ScheduleList({
  onEditItem,
  onDeleteItem,
  onToggleItem,
  items,
}: ScheduleListProps) {
  const { t } = useLanguage();
  const theme = useTheme();

  const getTypeColor = (type: ScheduleItem['type']) => {
    switch (type) {
      case 'prayer':
        return theme.colors.primary;
      case 'work':
        return theme.colors.secondary;
      case 'personal':
        return theme.colors.tertiary;
      default:
        return theme.colors.primary;
    }
  };

  const renderItem = ({ item }: { item: ScheduleItem }) => {
    const startTime = new Date(item.startTime).toLocaleTimeString();
    const endTime = new Date(item.endTime).toLocaleTimeString();
    const typeColor = getTypeColor(item.type);

    return (
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <Text variant="titleMedium" style={styles.title}>
                {item.title}
              </Text>
              <Text
                variant="bodySmall"
                style={[styles.type, { color: typeColor }]}
              >
                {t(`schedule.${item.type}`)}
              </Text>
            </View>
            <IconButton
              icon={item.isEnabled ? 'check-circle' : 'circle-outline'}
              onPress={() => onToggleItem(item.id)}
              iconColor={item.isEnabled ? theme.colors.primary : theme.colors.outline}
            />
          </View>

          <View style={styles.timeContainer}>
            <Text variant="bodyMedium">
              {startTime} - {endTime}
            </Text>
            {item.location && (
              <Text variant="bodySmall" style={styles.location}>
                📍 {item.location}
              </Text>
            )}
          </View>

          {item.description && (
            <Text variant="bodySmall" style={styles.description}>
              {item.description}
            </Text>
          )}

          {item.isRecurring && (
            <View style={styles.recurringContainer}>
              <Text variant="bodySmall" style={styles.recurringText}>
                {t(`schedule.${item.recurringInterval}`)}
                {item.recurringInterval === 'weekly' && item.days.length > 0 && (
                  <Text>
                    {' '}
                    ({item.days.map(day => t(`schedule.days.${day}`)).join(', ')})
                  </Text>
                )}
              </Text>
            </View>
          )}
        </Card.Content>

        <Card.Actions>
          <IconButton
            icon="pencil"
            onPress={() => onEditItem(item)}
          />
          <IconButton
            icon="delete"
            onPress={() => onDeleteItem(item.id)}
          />
        </Card.Actions>
      </Card>
    );
  };

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.list}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text variant="bodyLarge" style={styles.emptyText}>
            {t('schedule.noItems')}
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
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    marginBottom: 4,
  },
  type: {
    textTransform: 'capitalize',
  },
  timeContainer: {
    marginBottom: 8,
  },
  location: {
    marginTop: 4,
  },
  description: {
    marginBottom: 8,
  },
  recurringContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recurringText: {
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
  },
}); 