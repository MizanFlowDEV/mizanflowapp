import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, FAB, Portal, Modal, useTheme, SegmentedButtons } from 'react-native-paper';
import { useSchedule, ScheduleItem } from '../../src/contexts/ScheduleContext';
import { useLanguage } from '../../src/contexts/LanguageContext';
import ScheduleList from '../../src/components/ScheduleList';
import AddScheduleItem from '../../src/components/AddScheduleItem';

export default function ScheduleScreen() {
  const { scheduleItems, deleteScheduleItem, toggleScheduleItem, getScheduleForDay, getUpcomingSchedule } = useSchedule();
  const { t } = useLanguage();
  const theme = useTheme();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<ScheduleItem | null>(null);
  const [activeTab, setActiveTab] = useState('today');

  const handleEditItem = (item: ScheduleItem) => {
    setEditingItem(item);
    setShowAddModal(true);
  };

  const handleDeleteItem = async (id: string) => {
    try {
      await deleteScheduleItem(id);
    } catch (error) {
      console.error('Error deleting schedule item:', error);
    }
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditingItem(null);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'today':
        return (
          <>
            <View style={styles.section}>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                {t('schedule.today')}
              </Text>
              <ScheduleList
                items={getScheduleForDay(new Date())}
                onEditItem={handleEditItem}
                onDeleteItem={handleDeleteItem}
                onToggleItem={toggleScheduleItem}
              />
            </View>

            <View style={styles.section}>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                {t('schedule.upcoming')}
              </Text>
              <ScheduleList
                items={getUpcomingSchedule(5)}
                onEditItem={handleEditItem}
                onDeleteItem={handleDeleteItem}
                onToggleItem={toggleScheduleItem}
              />
            </View>
          </>
        );
      case 'all':
        return (
          <ScheduleList
            items={scheduleItems}
            onEditItem={handleEditItem}
            onDeleteItem={handleDeleteItem}
            onToggleItem={toggleScheduleItem}
          />
        );
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
          { value: 'today', label: t('schedule.today') },
          { value: 'all', label: t('schedule.all') },
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
          <AddScheduleItem
            onClose={handleCloseModal}
            editingItem={editingItem}
          />
        </Modal>
      </Portal>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => setShowAddModal(true)}
      />
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginHorizontal: 16,
    marginBottom: 8,
  },
  modal: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 8,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
}); 