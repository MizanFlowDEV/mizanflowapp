import React from 'react';
import { View, StyleSheet, SectionList } from 'react-native';
import { Text } from 'react-native-paper';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAppTheme } from '../../hooks/useAppTheme';
import { Shift } from '../../contexts/ShiftContext';
import { ShiftCard } from '../ShiftCard';
import { styles } from './styles';
import { ShiftListProps } from './types';

export const ShiftList: React.FC<ShiftListProps> = ({
  shifts,
  onPress,
  onEdit,
  onDelete,
  showActions = true,
  ListEmptyComponent,
  ListHeaderComponent,
  ListFooterComponent,
  contentContainerStyle,
}) => {
  const { t } = useLanguage();
  const { colors, typography, spacing } = useAppTheme();

  // Group shifts by date for sectioned list
  // Using a Map for efficient lookups and maintaining order
  const groupedShifts = React.useMemo(() => {
    const groups = new Map<string, Shift[]>();
    
    shifts.forEach(shift => {
      // Format date as YYYY-MM-DD for consistent grouping
      const dateKey = shift.startTime.toISOString().split('T')[0];
      
      if (!groups.has(dateKey)) {
        groups.set(dateKey, []);
      }
      
      groups.get(dateKey)?.push(shift);
    });
    
    // Convert Map to array of sections for SectionList
    return Array.from(groups.entries()).map(([date, data]) => ({
      title: date,
      data,
    }));
  }, [shifts]);

  // Format section header date
  // Using localized date format for better user experience
  const renderSectionHeader = ({ section: { title } }: { section: { title: string } }) => {
    const date = new Date(title);
    return (
      <View style={[styles.sectionHeader, { backgroundColor: colors.surface.primary }]}>
        <Text
          variant="titleMedium"
          style={[
            styles.sectionTitle,
            { color: colors.text.primary }
          ]}
        >
          {date.toLocaleDateString([], {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
          })}
        </Text>
      </View>
    );
  };

  // Render individual shift item
  // Using ShiftCard component for consistent styling and behavior
  const renderItem = ({ item }: { item: Shift }) => (
    <ShiftCard
      shift={item}
      onPress={() => onPress?.(item)}
      onEdit={() => onEdit?.(item)}
      onDelete={() => onDelete?.(item)}
      showActions={showActions}
    />
  );

  // Render empty state when no shifts are available
  // Using provided ListEmptyComponent or default message
  const renderEmptyComponent = () => {
    if (ListEmptyComponent) return ListEmptyComponent;
    
    return (
      <View style={[styles.emptyContainer, { backgroundColor: colors.surface.primary }]}>
        <Text
          variant="bodyLarge"
          style={[
            styles.emptyText,
            { color: colors.text.secondary }
          ]}
        >
          {t('schedule.empty')}
        </Text>
      </View>
    );
  };

  return (
    <SectionList
      sections={groupedShifts}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={renderEmptyComponent}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={ListFooterComponent}
      contentContainerStyle={[
        styles.contentContainer,
        contentContainerStyle,
        { backgroundColor: colors.surface.primary }
      ]}
      stickySectionHeadersEnabled={true}
      showsVerticalScrollIndicator={false}
    />
  );
}; 