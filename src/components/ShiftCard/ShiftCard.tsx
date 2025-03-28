import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Text, IconButton, Menu, Portal } from 'react-native-paper';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAppTheme } from '../../hooks/useAppTheme';
import { Shift } from '../../contexts/ShiftContext';
import { styles } from './styles';
import { ShiftCardProps } from './types';

export const ShiftCard: React.FC<ShiftCardProps> = ({
  shift,
  onPress,
  onEdit,
  onDelete,
  showActions = true,
}) => {
  const { t } = useLanguage();
  const { colors, typography, spacing } = useAppTheme();
  // Using state for menu to handle touch interactions properly on mobile
  const [menuVisible, setMenuVisible] = React.useState(false);

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
  // Using short format to save space while maintaining readability
  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
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

  // Handle menu visibility with proper cleanup
  // Using Portal to ensure menu renders above other content
  const handleMenuToggle = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: pressed ? colors.surface.pressed : colors.surface.primary,
          borderColor: getStatusColor(shift.status),
        },
      ]}
    >
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text
            variant="titleMedium"
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
              variant="labelSmall"
              style={[
                styles.statusText,
                { color: colors.text.onPrimary }
              ]}
            >
              {t(`schedule.status.${shift.status}`)}
            </Text>
          </View>
        </View>

        {showActions && (
          <Portal>
            <Menu
              visible={menuVisible}
              onDismiss={handleMenuToggle}
              anchor={
                <IconButton
                  icon="dots-vertical"
                  onPress={handleMenuToggle}
                  size={20}
                />
              }
            >
              <Menu.Item
                onPress={() => {
                  handleMenuToggle();
                  onEdit?.(shift);
                }}
                title={t('schedule.actions.edit')}
                leadingIcon="pencil"
              />
              <Menu.Item
                onPress={() => {
                  handleMenuToggle();
                  onDelete?.(shift);
                }}
                title={t('schedule.actions.delete')}
                leadingIcon="delete"
              />
            </Menu>
          </Portal>
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.row}>
          <IconButton
            icon={getTypeIcon(shift.type)}
            size={16}
            iconColor={colors.text.secondary}
          />
          <Text
            variant="bodyMedium"
            style={[
              styles.typeText,
              { color: colors.text.secondary }
            ]}
          >
            {t(`schedule.types.${shift.type}`)}
          </Text>
        </View>

        <View style={styles.row}>
          <IconButton
            icon="clock-outline"
            size={16}
            iconColor={colors.text.secondary}
          />
          <Text
            variant="bodyMedium"
            style={[
              styles.timeText,
              { color: colors.text.secondary }
            ]}
          >
            {formatTime(shift.startTime)} - {formatTime(shift.endTime)}
          </Text>
        </View>

        <View style={styles.row}>
          <IconButton
            icon="calendar"
            size={16}
            iconColor={colors.text.secondary}
          />
          <Text
            variant="bodyMedium"
            style={[
              styles.dateText,
              { color: colors.text.secondary }
            ]}
          >
            {formatDate(shift.startTime)}
          </Text>
        </View>

        <View style={styles.row}>
          <IconButton
            icon="timer-outline"
            size={16}
            iconColor={colors.text.secondary}
          />
          <Text
            variant="bodyMedium"
            style={[
              styles.durationText,
              { color: colors.text.secondary }
            ]}
          >
            {duration} {t('schedule.hours')}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}; 