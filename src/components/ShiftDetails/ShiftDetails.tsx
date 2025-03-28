import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Button, IconButton, Chip, SegmentedButtons, Divider } from 'react-native-paper';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAppTheme } from '../../hooks/useAppTheme';
import { Shift } from '../../types/shift';
import { styles } from './styles';
import { ShiftDetailsProps } from './types';

const DAYS_OF_WEEK = [
  { label: 'Sun', value: 0 },
  { label: 'Mon', value: 1 },
  { label: 'Tue', value: 2 },
  { label: 'Wed', value: 3 },
  { label: 'Thu', value: 4 },
  { label: 'Fri', value: 5 },
  { label: 'Sat', value: 6 },
];

export const ShiftDetails: React.FC<ShiftDetailsProps> = ({
  shift,
  onEdit,
  onDelete,
  onStatusChange,
  showActions = true,
}) => {
  const { t } = useLanguage();
  const { colors, typography, spacing } = useAppTheme();

  // Format time to display in a consistent, localized way
  // Using 24-hour format for precision and to avoid AM/PM confusion
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  // Calculate shift duration in hours with 2 decimal places
  // Using getTime() for precise millisecond calculations
  const duration = (
    (shift.endTime.getTime() - shift.startTime.getTime()) /
    (1000 * 60 * 60)
  ).toFixed(2);

  // Format date to show day of week and date
  // Using long format for better readability in details view
  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Get status color based on shift status
  // Using semantic colors to maintain consistency across the app
  const getStatusColor = (status: Shift['status']) => {
    switch (status) {
      case 'scheduled':
        return colors.status.scheduled;
      case 'in_progress':
        return colors.status.inProgress;
      case 'completed':
        return colors.status.completed;
      case 'cancelled':
        return colors.status.cancelled;
      default:
        return colors.text.secondary;
    }
  };

  // Get type icon based on shift type
  // Using appropriate icons to visually distinguish shift types
  const getTypeIcon = (type: Shift['type']) => {
    switch (type) {
      case 'work':
        return 'briefcase';
      case 'prayer':
        return 'mosque';
      case 'personal':
        return 'account';
      default:
        return 'calendar';
    }
  };

  // Handle status change with validation
  // Only allowing certain status transitions to maintain data integrity
  const handleStatusChange = (newStatus: Shift['status']) => {
    // Validate status transition
    if (shift.status === 'completed' && newStatus !== 'completed') {
      return;
    }
    onStatusChange?.(newStatus);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text
            variant="headlineMedium"
            style={[
              styles.title,
              { color: colors.text.primary }
            ]}
          >
            {shift.title}
          </Text>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(shift.status) }
            ]}
          >
            <Text
              variant="labelMedium"
              style={[
                styles.statusText,
                { color: colors.text.onPrimary }
              ]}
            >
              {t(`schedule.status.${shift.status}`)}
            </Text>
          </View>
        </View>

        <View style={styles.actions}>
          <IconButton
            icon="pencil"
            size={24}
            onPress={() => onEdit?.(shift)}
          />
          <IconButton
            icon="delete"
            size={24}
            onPress={() => onDelete?.(shift)}
          />
        </View>
      </View>

      <Divider style={styles.divider} />

      <View style={styles.section}>
        <Text
          variant="titleMedium"
          style={[
            styles.sectionTitle,
            { color: colors.text.primary }
          ]}
        >
          {t('schedule.details')}
        </Text>

        <View style={styles.detailRow}>
          <IconButton
            icon={getTypeIcon(shift.type)}
            size={20}
            iconColor={colors.text.secondary}
          />
          <Text
            variant="bodyLarge"
            style={[
              styles.detailText,
              { color: colors.text.secondary }
            ]}
          >
            {t(`schedule.types.${shift.type}`)}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <IconButton
            icon="clock-outline"
            size={20}
            iconColor={colors.text.secondary}
          />
          <Text
            variant="bodyLarge"
            style={[
              styles.detailText,
              { color: colors.text.secondary }
            ]}
          >
            {formatTime(shift.startTime)} - {formatTime(shift.endTime)}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <IconButton
            icon="calendar"
            size={20}
            iconColor={colors.text.secondary}
          />
          <Text
            variant="bodyLarge"
            style={[
              styles.detailText,
              { color: colors.text.secondary }
            ]}
          >
            {formatDate(shift.startTime)}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <IconButton
            icon="timer-outline"
            size={20}
            iconColor={colors.text.secondary}
          />
          <Text
            variant="bodyLarge"
            style={[
              styles.detailText,
              { color: colors.text.secondary }
            ]}
          >
            {duration} {t('schedule.hours')}
          </Text>
        </View>

        {shift.location && (
          <View style={styles.detailRow}>
            <IconButton
              icon="map-marker-outline"
              size={20}
              iconColor={colors.text.secondary}
            />
            <Text
              variant="bodyLarge"
              style={[
                styles.detailText,
                { color: colors.text.secondary }
              ]}
            >
              {shift.location}
            </Text>
          </View>
        )}
      </View>

      {shift.description && (
        <>
          <Divider style={styles.divider} />
          <View style={styles.section}>
            <Text
              variant="titleMedium"
              style={[
                styles.sectionTitle,
                { color: colors.text.primary }
              ]}
            >
              {t('schedule.description')}
            </Text>
            <Text
              variant="bodyLarge"
              style={[
                styles.description,
                { color: colors.text.secondary }
              ]}
            >
              {shift.description}
            </Text>
          </View>
        </>
      )}

      {shift.isRecurring && (
        <>
          <Divider style={styles.divider} />
          <View style={styles.section}>
            <Text
              variant="titleMedium"
              style={[
                styles.sectionTitle,
                { color: colors.text.primary }
              ]}
            >
              {t('schedule.recurring')}
            </Text>
            <Text
              variant="bodyLarge"
              style={[
                styles.recurringText,
                { color: colors.text.secondary }
              ]}
            >
              {t(`schedule.patterns.${shift.recurringPattern}`)}
            </Text>
          </View>
        </>
      )}

      {onStatusChange && shift.status !== 'completed' && (
        <View style={styles.statusActions}>
          {shift.status === 'scheduled' && (
            <Button
              mode="contained"
              onPress={() => handleStatusChange('in_progress')}
              style={styles.statusButton}
            >
              {t('schedule.actions.start')}
            </Button>
          )}
          {shift.status === 'in_progress' && (
            <Button
              mode="contained"
              onPress={() => handleStatusChange('completed')}
              style={styles.statusButton}
            >
              {t('schedule.actions.complete')}
            </Button>
          )}
          <Button
            mode="outlined"
            onPress={() => handleStatusChange('cancelled')}
            style={styles.statusButton}
          >
            {t('schedule.actions.cancel')}
          </Button>
        </View>
      )}
    </ScrollView>
  );
}; 