import React, { useState } from 'react';
import { View, StyleSheet, FlatList, SectionList } from 'react-native';
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
  const { t } = useLanguage();
  const theme = useTheme();
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const handleCloseModal = () => {
    setShowAddModal(false);
  };

  const handleExport = async () => {
    try {
      await exportBudgetData();
    } catch (error) {
      console.error('Error exporting budget data:', error);
    }
  };

  const handleImport = async () => {
    try {
      await importBudgetData();
    } catch (error) {
      console.error('Error importing budget data:', error);
    }
  };

  const renderHeader = () => (
    <>
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
      {activeTab === 'overview' && (
        <View style={styles.summary}>
          <View style={styles.summaryCard}>
            <Text variant="bodyMedium" style={styles.summaryTitle}>{t('budget.income')}</Text>
            <Text variant="titleLarge" style={[styles.amount, { color: theme.colors.primary }]}>
              {totalIncome.toFixed(2)}
            </Text>
          </View>
          <View style={styles.summaryCard}>
            <Text variant="bodyMedium" style={styles.summaryTitle}>{t('budget.expenses')}</Text>
            <Text variant="titleLarge" style={[styles.amount, { color: theme.colors.error }]}>
              {totalExpenses.toFixed(2)}
            </Text>
          </View>
          <View style={styles.summaryCard}>
            <Text variant="bodyMedium" style={styles.summaryTitle}>{t('budget.balance')}</Text>
            <Text variant="titleLarge" style={[styles.amount, { color: balance >= 0 ? theme.colors.primary : theme.colors.error }]}>
              {balance.toFixed(2)}
            </Text>
          </View>
        </View>
      )}
    </>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <>
            <BudgetAnalytics />
            <BudgetList onEditItem={() => {}} onDeleteItem={deleteBudgetItem} />
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
      <SectionList
        sections={[{ data: [], renderItem: () => null }]}
        renderSectionHeader={() => renderHeader()}
        renderSectionFooter={() => renderContent()}
        contentContainerStyle={styles.contentContainer}
        stickySectionHeadersEnabled={false}
      />

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
  contentContainer: {
    flexGrow: 1,
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