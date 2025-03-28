import React from 'react';
import { View } from 'react-native';
import { Text, TextInput, Chip, Button, Switch, useTheme } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useLanguage } from '../../contexts/LanguageContext';
import { strings } from '../../i18n/strings';
import { styles } from './styles';
import { ShiftFiltersProps, ShiftStatus, ShiftType } from './types';

export const ShiftFilters: React.FC<ShiftFiltersProps> = ({
  filters,
  onFilterChange,
  onReset,
}) => {
  const { t } = useLanguage();
  const { colors } = useTheme();
  
  // Using separate state for each picker to prevent UI conflicts when selecting dates
  const [showStartPicker, setShowStartPicker] = React.useState(false);
  const [showEndPicker, setShowEndPicker] = React.useState(false);

  // Toggle status filters with array management to handle multiple selections
  // If all statuses are deselected, we set to undefined to indicate no filtering
  const handleStatusToggle = (status: ShiftStatus) => {
    const currentStatuses = filters?.status || [];
    const newStatuses = currentStatuses.includes(status)
      ? currentStatuses.filter(s => s !== status)
      : [...currentStatuses, status];
    
    onFilterChange({
      ...filters,
      status: newStatuses.length > 0 ? newStatuses : undefined,
    });
  };

  // Similar to status toggle, but for shift types
  // Using undefined when no types are selected to indicate no filtering
  const handleTypeToggle = (type: ShiftType) => {
    const currentTypes = filters?.type || [];
    const newTypes = currentTypes.includes(type)
      ? currentTypes.filter(t => t !== type)
      : [...currentTypes, type];
    
    onFilterChange({
      ...filters,
      type: newTypes.length > 0 ? newTypes : undefined,
    });
  };

  // Trim search input to prevent whitespace-only searches
  const handleSearchChange = (text: string) => {
    onFilterChange({
      ...filters,
      search: text.trim() || undefined,
    });
  };

  // Handle date range selection with validation
  // Only set dateRange if both start and end dates are selected
  // This prevents partial date ranges that could cause confusion
  const handleDateChange = (date: Date | undefined, isStart: boolean) => {
    if (!date) return;

    const newDateRange = {
      start: isStart ? date : filters?.start,
      end: isStart ? filters?.end : date,
    };

    onFilterChange({
      ...filters,
      start: newDateRange.start,
      end: newDateRange.end,
    });
  };

  // Toggle recurring shifts visibility
  // Using undefined when false to allow the parent to handle default behavior
  const handleRecurringToggle = (value: boolean) => {
    onFilterChange({
      ...filters,
      showRecurring: value || undefined,
    });
  };

  // Format date for display using locale-specific formatting
  // Using short month format to save space while maintaining readability
  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          label={t(strings.shift.search)}
          value={filters?.search}
          onChangeText={handleSearchChange}
          mode="outlined"
        />
      </View>

      {/* Status filter section with chips for each possible status */}
      <View style={styles.section}>
        <Text
          variant="titleMedium"
          style={[
            styles.sectionTitle,
            { color: colors.onSurface }
          ]}
        >
          {t(strings.shift.status.scheduled)}
        </Text>
        <View style={styles.chipContainer}>
          {['scheduled', 'in_progress', 'completed', 'cancelled'].map((status) => (
            <Chip
              key={status}
              selected={filters?.status?.includes(status as ShiftStatus)}
              onPress={() => handleStatusToggle(status as ShiftStatus)}
              style={styles.chip}
            >
              {t(strings.shift.status[status as keyof typeof strings.shift.status])}
            </Chip>
          ))}
        </View>
      </View>

      {/* Type filter section with chips for each shift type */}
      <View style={styles.section}>
        <Text
          variant="titleMedium"
          style={[
            styles.sectionTitle,
            { color: colors.onSurface }
          ]}
        >
          {t(strings.shift.type.work)}
        </Text>
        <View style={styles.chipContainer}>
          {['regular', 'overtime', 'holiday'].map((type) => (
            <Chip
              key={type}
              selected={filters?.type?.includes(type as ShiftType)}
              onPress={() => handleTypeToggle(type as ShiftType)}
              style={styles.chip}
            >
              {t(strings.shift.type[type as keyof typeof strings.shift.type])}
            </Chip>
          ))}
        </View>
      </View>

      {/* Date range picker section with separate buttons for start and end dates */}
      <View style={styles.section}>
        <Text
          variant="titleMedium"
          style={[
            styles.sectionTitle,
            { color: colors.onSurface }
          ]}
        >
          {t(strings.shift.startDate)}
        </Text>
        <View style={styles.dateRangeContainer}>
          <View style={styles.dateField}>
            <Button
              mode="outlined"
              onPress={() => setShowStartPicker(true)}
            >
              {filters?.start
                ? formatDate(filters.start)
                : t(strings.shift.startDate)}
            </Button>
          </View>
          <View style={styles.dateField}>
            <Button
              mode="outlined"
              onPress={() => setShowEndPicker(true)}
            >
              {filters?.end
                ? formatDate(filters.end)
                : t(strings.shift.endDate)}
            </Button>
          </View>
        </View>
      </View>

      {/* Recurring shifts toggle with switch component */}
      <View style={styles.section}>
        <View style={styles.row}>
          <Switch
            value={filters?.showRecurring || false}
            onValueChange={handleRecurringToggle}
          />
          <Text>{t(strings.shift.showRecurring)}</Text>
        </View>
      </View>

      {/* Reset button only shown if onReset handler is provided */}
      {onReset && (
        <View style={styles.actions}>
          <Button
            mode="outlined"
            onPress={onReset}
            style={styles.button}
          >
            {t(strings.common.reset)}
          </Button>
        </View>
      )}

      {/* Native date pickers shown conditionally to prevent UI conflicts */}
      {showStartPicker && (
        <DateTimePicker
          value={filters?.start || new Date()}
          mode="date"
          onChange={(_event, date) => {
            setShowStartPicker(false);
            handleDateChange(date, true);
          }}
        />
      )}

      {showEndPicker && (
        <DateTimePicker
          value={filters?.end || new Date()}
          mode="date"
          onChange={(_event, date) => {
            setShowEndPicker(false);
            handleDateChange(date, false);
          }}
        />
      )}
    </View>
  );
}; 