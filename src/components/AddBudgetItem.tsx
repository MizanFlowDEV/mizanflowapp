import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, SegmentedButtons, Switch, Text } from 'react-native-paper';
import { useBudget } from '../contexts/BudgetContext';
import { useLanguage } from '../contexts/LanguageContext';
import DateTimePicker from '@react-native-community/datetimepicker';

interface AddBudgetItemProps {
  onClose: () => void;
}

export default function AddBudgetItem({ onClose }: AddBudgetItemProps) {
  const { addBudgetItem } = useBudget();
  const { t, isRTL } = useLanguage();
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [recurring, setRecurring] = useState(false);
  const [recurringInterval, setRecurringInterval] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('monthly');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!category || !amount) return;

    setLoading(true);
    try {
      await addBudgetItem({
        category,
        amount: parseFloat(amount),
        type,
        description,
        date: date.toISOString(),
        recurring,
        recurringInterval: recurring ? recurringInterval : undefined,
      });
      onClose();
    } catch (error) {
      console.error('Error adding budget item:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, isRTL && styles.rtlContainer]}>
      <Text variant="titleLarge" style={styles.title}>
        {t('budget.addItem')}
      </Text>

      <SegmentedButtons
        value={type}
        onValueChange={value => setType(value as 'income' | 'expense')}
        buttons={[
          { value: 'expense', label: t('budget.expense') },
          { value: 'income', label: t('budget.income') },
        ]}
        style={styles.segmentedButtons}
      />

      <TextInput
        label={t('budget.category')}
        value={category}
        onChangeText={setCategory}
        style={styles.input}
        mode="outlined"
      />

      <TextInput
        label={t('budget.amount')}
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={styles.input}
        mode="outlined"
      />

      <TextInput
        label={t('budget.description')}
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        mode="outlined"
        multiline
        numberOfLines={3}
      />

      <Button
        mode="outlined"
        onPress={() => setShowDatePicker(true)}
        style={styles.input}
      >
        {date.toLocaleDateString()}
      </Button>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              setDate(selectedDate);
            }
          }}
        />
      )}

      <View style={styles.recurringContainer}>
        <Text>{t('budget.recurring')}</Text>
        <Switch
          value={recurring}
          onValueChange={setRecurring}
        />
      </View>

      {recurring && (
        <SegmentedButtons
          value={recurringInterval}
          onValueChange={value => setRecurringInterval(value as typeof recurringInterval)}
          buttons={[
            { value: 'daily', label: t('budget.daily') },
            { value: 'weekly', label: t('budget.weekly') },
            { value: 'monthly', label: t('budget.monthly') },
            { value: 'yearly', label: t('budget.yearly') },
          ]}
          style={styles.segmentedButtons}
        />
      )}

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
          loading={loading}
          disabled={!category || !amount}
          style={styles.button}
        >
          {t('common.save')}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  rtlContainer: {
    direction: 'rtl',
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
  recurringContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  button: {
    marginLeft: 8,
  },
}); 