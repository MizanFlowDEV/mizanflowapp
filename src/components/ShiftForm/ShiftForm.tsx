import React from 'react';
import { View, ScrollView } from 'react-native';
import { TextInput, Button, HelperText, SegmentedButtons, Chip, Switch, Text, useTheme } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useForm, Controller } from 'react-hook-form';
import { useLanguage } from '../../contexts/LanguageContext';
import { strings } from '../../i18n/strings';
import { styles } from './styles';
import { ShiftFormProps, ShiftFormValues } from './types';

const DAYS_OF_WEEK = [
  { label: 'Sun', value: 0 },
  { label: 'Mon', value: 1 },
  { label: 'Tue', value: 2 },
  { label: 'Wed', value: 3 },
  { label: 'Thu', value: 4 },
  { label: 'Fri', value: 5 },
  { label: 'Sat', value: 6 },
];

export const ShiftForm: React.FC<ShiftFormProps> = ({
  initialValues,
  onSubmit,
  onCancel,
  isLoading,
}) => {
  const { t } = useLanguage();
  const { colors } = useTheme();
  
  // State for date pickers
  const [showStartPicker, setShowStartPicker] = React.useState(false);
  const [showEndPicker, setShowEndPicker] = React.useState(false);

  const { control, handleSubmit, formState: { errors }, setValue } = useForm<ShiftFormValues>({
    defaultValues: {
      title: initialValues?.title || '',
      description: initialValues?.description || '',
      startDate: initialValues?.startDate || new Date(),
      endDate: initialValues?.endDate || new Date(),
      isRecurring: initialValues?.isRecurring || false,
    },
  });

  const onSubmitForm = (data: ShiftFormValues) => {
    onSubmit(data);
  };

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Controller
        control={control}
        name="title"
        rules={{ required: 'Title is required' }}
        render={({ field: { onChange, value } }) => (
          <View style={styles.field}>
            <TextInput
              label={t(strings.shift.title)}
              value={value}
              onChangeText={onChange}
              error={!!errors.title}
              mode="outlined"
            />
            {errors.title && (
              <HelperText type="error">{errors.title.message}</HelperText>
            )}
          </View>
        )}
      />

      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value } }) => (
          <View style={styles.field}>
            <TextInput
              label={t(strings.shift.description)}
              value={value}
              onChangeText={onChange}
              mode="outlined"
              multiline
              numberOfLines={3}
            />
          </View>
        )}
      />

      <Controller
        control={control}
        name="startDate"
        rules={{ required: 'Start date is required' }}
        render={({ field: { onChange, value } }) => (
          <View style={styles.field}>
            <Button
              mode="outlined"
              onPress={() => setShowStartPicker(true)}
              style={styles.dateButton}
            >
              {value ? formatDate(value) : t(strings.shift.startDate)}
            </Button>
            {errors.startDate && (
              <HelperText type="error">{errors.startDate.message}</HelperText>
            )}
          </View>
        )}
      />

      <Controller
        control={control}
        name="endDate"
        rules={{ required: 'End date is required' }}
        render={({ field: { onChange, value } }) => (
          <View style={styles.field}>
            <Button
              mode="outlined"
              onPress={() => setShowEndPicker(true)}
              style={styles.dateButton}
            >
              {value ? formatDate(value) : t(strings.shift.endDate)}
            </Button>
            {errors.endDate && (
              <HelperText type="error">{errors.endDate.message}</HelperText>
            )}
          </View>
        )}
      />

      <Controller
        control={control}
        name="isRecurring"
        render={({ field: { onChange, value } }) => (
          <View style={styles.field}>
            <View style={styles.switchContainer}>
              <Switch value={value} onValueChange={onChange} />
              <Text>{t(strings.shift.isRecurring)}</Text>
            </View>
          </View>
        )}
      />

      <View style={styles.actions}>
        {onCancel && (
          <Button
            mode="outlined"
            onPress={onCancel}
            style={styles.button}
          >
            {t(strings.common.cancel)}
          </Button>
        )}
        <Button
          mode="contained"
          onPress={handleSubmit(onSubmitForm)}
          style={styles.button}
          loading={isLoading}
        >
          {t(strings.common.save)}
        </Button>
      </View>

      {showStartPicker && (
        <DateTimePicker
          value={control._formValues.startDate}
          mode="date"
          onChange={(event, date) => {
            setShowStartPicker(false);
            if (date) {
              setValue('startDate', date);
            }
          }}
        />
      )}

      {showEndPicker && (
        <DateTimePicker
          value={control._formValues.endDate}
          mode="date"
          onChange={(event, date) => {
            setShowEndPicker(false);
            if (date) {
              setValue('endDate', date);
            }
          }}
        />
      )}
    </ScrollView>
  );
}; 