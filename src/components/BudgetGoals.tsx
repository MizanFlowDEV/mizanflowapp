import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Card, IconButton, TextInput, Button, Portal, Modal, ProgressBar, useTheme } from 'react-native-paper';
import { useBudget } from '../contexts/BudgetContext';
import { useLanguage } from '../contexts/LanguageContext';

interface BudgetGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: string;
}

export default function BudgetGoals() {
  const { t, isRTL } = useLanguage();
  const theme = useTheme();
  const [goals, setGoals] = useState<BudgetGoal[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingGoal, setEditingGoal] = useState<BudgetGoal | null>(null);
  const [newGoalName, setNewGoalName] = useState('');
  const [newGoalAmount, setNewGoalAmount] = useState('');
  const [newGoalDeadline, setNewGoalDeadline] = useState('');
  const [newGoalCategory, setNewGoalCategory] = useState('');

  const handleAddGoal = () => {
    if (!newGoalName || !newGoalAmount || !newGoalDeadline || !newGoalCategory) return;

    const newGoal: BudgetGoal = {
      id: Date.now().toString(),
      name: newGoalName,
      targetAmount: parseFloat(newGoalAmount),
      currentAmount: 0,
      deadline: newGoalDeadline,
      category: newGoalCategory,
    };

    setGoals([...goals, newGoal]);
    setNewGoalName('');
    setNewGoalAmount('');
    setNewGoalDeadline('');
    setNewGoalCategory('');
    setShowAddModal(false);
  };

  const handleEditGoal = (goal: BudgetGoal) => {
    setEditingGoal(goal);
    setNewGoalName(goal.name);
    setNewGoalAmount(goal.targetAmount.toString());
    setNewGoalDeadline(goal.deadline);
    setNewGoalCategory(goal.category);
    setShowAddModal(true);
  };

  const handleUpdateGoal = () => {
    if (!editingGoal || !newGoalName || !newGoalAmount || !newGoalDeadline || !newGoalCategory) return;

    setGoals(goals.map(goal =>
      goal.id === editingGoal.id
        ? {
            ...goal,
            name: newGoalName,
            targetAmount: parseFloat(newGoalAmount),
            deadline: newGoalDeadline,
            category: newGoalCategory,
          }
        : goal
    ));
    setShowAddModal(false);
    setEditingGoal(null);
    setNewGoalName('');
    setNewGoalAmount('');
    setNewGoalDeadline('');
    setNewGoalCategory('');
  };

  const handleDeleteGoal = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  const handleUpdateProgress = (id: string, amount: number) => {
    setGoals(goals.map(goal =>
      goal.id === id
        ? { ...goal, currentAmount: Math.min(goal.currentAmount + amount, goal.targetAmount) }
        : goal
    ));
  };

  const renderItem = ({ item }: { item: BudgetGoal }) => {
    const progress = item.currentAmount / item.targetAmount;
    const remainingAmount = item.targetAmount - item.currentAmount;

    return (
      <Card style={styles.goalCard}>
        <Card.Content>
          <View style={styles.goalHeader}>
            <Text variant="titleMedium">{item.name}</Text>
            <View style={styles.actions}>
              <IconButton
                icon="plus"
                size={20}
                onPress={() => handleUpdateProgress(item.id, 100)}
              />
              <IconButton
                icon="pencil"
                size={20}
                onPress={() => handleEditGoal(item)}
              />
              <IconButton
                icon="delete"
                size={20}
                onPress={() => handleDeleteGoal(item.id)}
              />
            </View>
          </View>

          <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
            {t('budget.category')}: {item.category}
          </Text>
          <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
            {t('budget.deadline')}: {new Date(item.deadline).toLocaleDateString()}
          </Text>

          <View style={styles.progressContainer}>
            <ProgressBar
              progress={progress}
              color={theme.colors.primary}
              style={styles.progressBar}
            />
            <Text variant="bodySmall" style={styles.progressText}>
              {item.currentAmount.toFixed(2)} / {item.targetAmount.toFixed(2)}
            </Text>
          </View>

          <Text variant="bodyMedium" style={styles.remainingText}>
            {t('budget.remaining')}: {remainingAmount.toFixed(2)}
          </Text>
        </Card.Content>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={goals}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text variant="bodyLarge" style={{ textAlign: 'center' }}>
              {t('budget.noGoals')}
            </Text>
          </View>
        }
      />

      <Portal>
        <Modal
          visible={showAddModal}
          onDismiss={() => {
            setShowAddModal(false);
            setEditingGoal(null);
            setNewGoalName('');
            setNewGoalAmount('');
            setNewGoalDeadline('');
            setNewGoalCategory('');
          }}
          contentContainerStyle={styles.modal}
        >
          <Text variant="titleLarge" style={styles.modalTitle}>
            {editingGoal ? t('budget.editGoal') : t('budget.addGoal')}
          </Text>

          <TextInput
            label={t('budget.goalName')}
            value={newGoalName}
            onChangeText={setNewGoalName}
            style={styles.input}
            mode="outlined"
          />

          <TextInput
            label={t('budget.targetAmount')}
            value={newGoalAmount}
            onChangeText={setNewGoalAmount}
            keyboardType="numeric"
            style={styles.input}
            mode="outlined"
          />

          <TextInput
            label={t('budget.deadline')}
            value={newGoalDeadline}
            onChangeText={setNewGoalDeadline}
            style={styles.input}
            mode="outlined"
            placeholder="YYYY-MM-DD"
          />

          <TextInput
            label={t('budget.category')}
            value={newGoalCategory}
            onChangeText={setNewGoalCategory}
            style={styles.input}
            mode="outlined"
          />

          <View style={styles.modalButtons}>
            <Button
              mode="outlined"
              onPress={() => {
                setShowAddModal(false);
                setEditingGoal(null);
                setNewGoalName('');
                setNewGoalAmount('');
                setNewGoalDeadline('');
                setNewGoalCategory('');
              }}
              style={styles.button}
            >
              {t('common.cancel')}
            </Button>
            <Button
              mode="contained"
              onPress={editingGoal ? handleUpdateGoal : handleAddGoal}
              disabled={!newGoalName || !newGoalAmount || !newGoalDeadline || !newGoalCategory}
              style={styles.button}
            >
              {editingGoal ? t('common.save') : t('common.add')}
            </Button>
          </View>
        </Modal>
      </Portal>

      <Button
        mode="contained"
        onPress={() => setShowAddModal(true)}
        style={styles.addButton}
      >
        {t('budget.addGoal')}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 16,
  },
  goalCard: {
    marginBottom: 8,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  actions: {
    flexDirection: 'row',
  },
  progressContainer: {
    marginTop: 16,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  progressText: {
    marginTop: 4,
    textAlign: 'right',
  },
  remainingText: {
    marginTop: 8,
    textAlign: 'right',
  },
  emptyContainer: {
    padding: 32,
  },
  modal: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 8,
  },
  modalTitle: {
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  button: {
    marginLeft: 8,
  },
  addButton: {
    margin: 16,
  },
}); 