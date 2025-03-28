import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, FAB, Portal, Modal, useTheme, SegmentedButtons, Button } from 'react-native-paper';
import { useBudget } from '../../src/contexts/BudgetContext';
import { useLanguage } from '../../src/contexts/LanguageContext';
import BudgetList from '../../src/components/BudgetList';
import AddBudgetItem from '../../src/components/AddBudgetItem';
import BudgetAnalytics from '../../src/components/BudgetAnalytics';
import BudgetCategories from '../../src/components/BudgetCategories';
import BudgetGoals from '../../src/components/BudgetGoals';
import { BudgetItem } from '../../src/contexts/BudgetContext';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as DocumentPicker from 'expo-document-picker';

export default function BudgetScreen() {
  const { totalIncome, totalExpenses, balance, deleteBudgetItem, updateBudgetItem, exportBudgetData, importBudgetData } = useBudget();
  const { t, isRTL } = useLanguage();
  const theme = useTheme();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<BudgetItem | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  const handleEditItem = (item: BudgetItem) => {
    setEditingItem(item);
    setShowAddModal(true);
  };

  const handleDeleteItem = async (id: string) => {
    try {
      await deleteBudgetItem(id);
    } catch (error) {
      console.error('Error deleting budget item:', error);
    }
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditingItem(null);
  };

  const handleExport = async () => {
    try {
      const data = await exportBudgetData();
      const fileUri = `${FileSystem.documentDirectory}budget_data.json`;
      await FileSystem.writeAsStringAsync(fileUri, data);
      await Sharing.shareAsync(fileUri);
    } catch (error) {
      console.error('Error exporting budget data:', error);
    }
  };

  const handleImport = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/json',
      });

      if (result.assets && result.assets.length > 0) {
        const fileContent = await FileSystem.readAsStringAsync(result.assets[0].uri);
        await importBudgetData(fileContent);
      }
    } catch (error) {
      console.error('Error importing budget data:', error);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <>
            <View style={styles.summary}>
              <View style={styles.summaryCard}>
                <Text variant="titleMedium" style={styles.summaryTitle}>
                  {t('budget.totalIncome')}
                </Text>
                <Text variant="headlineMedium" style={[styles.amount, { color: theme.colors.primary }]}>
                  {totalIncome.toFixed(2)}
                </Text>
              </View>

              <View style={styles.summaryCard}>
                <Text variant="titleMedium" style={styles.summaryTitle}>
                  {t('budget.totalExpenses')}
                </Text>
                <Text variant="headlineMedium" style={[styles.amount, { color: theme.colors.error }]}>
                  {totalExpenses.toFixed(2)}
                </Text>
              </View>

              <View style={styles.summaryCard}>
                <Text variant="titleMedium" style={styles.summaryTitle}>
                  {t('budget.balance')}
                </Text>
                <Text
                  variant="headlineMedium"
                  style={[
                    styles.amount,
                    { color: balance >= 0 ? theme.colors.primary : theme.colors.error }
                  ]}
                >
                  {balance.toFixed(2)}
                </Text>
              </View>
            </View>

            <BudgetAnalytics />

            <BudgetList
              onEditItem={handleEditItem}
              onDeleteItem={handleDeleteItem}
            />
          </>
        );
      case 'categories':
        return <BudgetCategories />;
      case 'goals':
        return <BudgetGoals />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <SegmentedButtons
        value={activeTab}
        onValueChange={setActiveTab}
        buttons={[
          { value: 'overview', label: t('budget.overview') },
          { value: 'categories', label: t('budget.categories') },
          { value: 'goals', label: t('budget.goals') },
        ]}
        style={styles.segmentedButtons}
      />

      <ScrollView style={styles.scrollView}>
        {renderContent()}
      </ScrollView>

      <Portal>
        <Modal
          visible={showAddModal}
          onDismiss={handleCloseModal}
          contentContainerStyle={styles.modal}
        >
          <AddBudgetItem
            onClose={handleCloseModal}
          />
        </Modal>
      </Portal>

      <View style={styles.fabContainer}>
        <Button
          mode="outlined"
          onPress={handleExport}
          style={styles.actionButton}
        >
          {t('budget.export')}
        </Button>
        <Button
          mode="outlined"
          onPress={handleImport}
          style={styles.actionButton}
        >
          {t('budget.import')}
        </Button>
        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => setShowAddModal(true)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  segmentedButtons: {
    margin: 16,
  },
  summary: {
    flexDirection: 'row',
    padding: 16,
    gap: 8,
  },
  summaryCard: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    backgroundColor: 'white',
    elevation: 2,
  },
  summaryTitle: {
    marginBottom: 8,
    textAlign: 'center',
  },
  amount: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  modal: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 8,
  },
  fabContainer: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    marginRight: 8,
  },
  fab: {
    marginLeft: 8,
  },
}); 