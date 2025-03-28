import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Text, SegmentedButtons, Switch, Portal, Modal } from 'react-native-paper';
import { useSchedule, ScheduleItem } from '../contexts/ScheduleContext';
import { useLanguage } from '../contexts/LanguageContext';
import DateTimePicker from '@react-native-community/datetimepicker';

interface AddScheduleItemProps {
  onClose: () => void;
  editingItem?: ScheduleItem;
}

export default function AddScheduleItem({ onClose, editingItem }: AddScheduleItemProps) {
  const { addScheduleItem, updateScheduleItem } = useSchedule();
  const { t } = useLanguage();
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'prayer' | 'work' | 'personal'>('personal');
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [days, setDays] = useState<string[]>([]);
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringInterval, setRecurringInterval] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [reminder, setReminder] = useState<number | undefined>(undefined);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  useEffect(() => {
    if (editingItem) {
      setTitle(editingItem.title);
      setType(editingItem.type);
      setStartTime(new Date(editingItem.startTime));
      setEndTime(new Date(editingItem.endTime));
      setDays(editingItem.days);
      setLocation(editingItem.location || '');
      setDescription(editingItem.description || '');
      setIsRecurring(editingItem.isRecurring);
      setRecurringInterval(editingItem.recurringInterval || 'daily');
      setReminder(editingItem.reminder);
    }
  }, [editingItem]);

  const handleSubmit = async () => {
    try {
      const scheduleItem = {
        title,
        type,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        days,
        location,
        description,
        isRecurring,
        recurringInterval,
        reminder,
        isEnabled: true,
      };

      if (editingItem) {
        await updateScheduleItem(editingItem.id, scheduleItem);
      } else {
        await addScheduleItem(scheduleItem);
      }

      onClose();
    } catch (error) {
      console.error('Error saving schedule item:', error);
    }
  };

  const toggleDay = (day: string) => {
    setDays(prev =>
      prev.includes(day)
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  const weekDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  return (
    <ScrollView style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        {editingItem ? t('schedule.editItem') : t('schedule.addItem')}
      </Text>

      <TextInput
        label={t('schedule.title')}
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <SegmentedButtons
        value={type}
        onValueChange={value => setType(value as 'prayer' | 'work' | 'personal')}
        buttons={[
          { value: 'prayer', label: t('schedule.prayer') },
          { value: 'work', label: t('schedule.work') },
          { value: 'personal', label: t('schedule.personal') },
        ]}
        style={styles.segmentedButtons}
      />

      <View style={styles.timeContainer}>
        <Button
          mode="outlined"
          onPress={() => setShowStartPicker(true)}
          style={styles.timeButton}
        >
          {t('schedule.startTime')}: {startTime.toLocaleTimeString()}
        </Button>
        <Button
          mode="outlined"
          onPress={() => setShowEndPicker(true)}
          style={styles.timeButton}
        >
          {t('schedule.endTime')}: {endTime.toLocaleTimeString()}
        </Button>
      </View>

      <TextInput
        label={t('schedule.location')}
        value={location}
        onChangeText={setLocation}
        style={styles.input}
      />

      <TextInput
        label={t('schedule.description')}
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={3}
        style={styles.input}
      />

      <View style={styles.switchContainer}>
        <Text>{t('schedule.recurring')}</Text>
        <Switch
          value={isRecurring}
          onValueChange={setIsRecurring}
        />
      </View>

      {isRecurring && (
        <>
          <SegmentedButtons
            value={recurringInterval}
            onValueChange={value => setRecurringInterval(value as 'daily' | 'weekly' | 'monthly')}
            buttons={[
              { value: 'daily', label: t('schedule.daily') },
              { value: 'weekly', label: t('schedule.weekly') },
              { value: 'monthly', label: t('schedule.monthly') },
            ]}
            style={styles.segmentedButtons}
          />

          {recurringInterval === 'weekly' && (
            <View style={styles.daysContainer}>
              {weekDays.map(day => (
                <Button
                  key={day}
                  mode={days.includes(day) ? 'contained' : 'outlined'}
                  onPress={() => toggleDay(day)}
                  style={styles.dayButton}
                >
                  {t(`schedule.days.${day}`)}
                </Button>
              ))}
            </View>
          )}
        </>
      )}

      <TextInput
        label={t('schedule.reminder')}
        value={reminder?.toString() || ''}
        onChangeText={value => setReminder(value ? parseInt(value) : undefined)}
        keyboardType="numeric"
        style={styles.input}
      />

      <View style={styles.buttonContainer}>
        <Button
          mode="outlined"
          onPress={onClose}
          style={styles.button}
        >
          {t('common.cancel')}
        </Button>
        <Button
          mode="contained"
          onPress={handleSubmit}
          style={styles.button}
        >
          {editingItem ? t('common.update') : t('common.add')}
        </Button>
      </View>

      <Portal>
        <Modal
          visible={showStartPicker}
          onDismiss={() => setShowStartPicker(false)}
          contentContainerStyle={styles.modal}
        >
          <DateTimePicker
            value={startTime}
            mode="time"
            onChange={(event, date) => {
              setShowStartPicker(false);
              if (date) setStartTime(date);
            }}
          />
        </Modal>

        <Modal
          visible={showEndPicker}
          onDismiss={() => setShowEndPicker(false)}
          contentContainerStyle={styles.modal}
        >
          <DateTimePicker
            value={endTime}
            mode="time"
            onChange={(event, date) => {
              setShowEndPicker(false);
              if (date) setEndTime(date);
            }}
          />
        </Modal>
      </Portal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  segmentedButtons: {
    marginBottom: 16,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  timeButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  dayButton: {
    flex: 1,
    minWidth: '30%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  button: {
    minWidth: 100,
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
}); 