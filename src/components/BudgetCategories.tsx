import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Card, IconButton, TextInput, Button, Portal, Modal, useTheme } from 'react-native-paper';
import { useBudget } from '../contexts/BudgetContext';
import { useLanguage } from '../contexts/LanguageContext';

interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export default function BudgetCategories() {
  const { t, isRTL } = useLanguage();
  const theme = useTheme();
  const [categories, setCategories] = useState<Category[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryIcon, setNewCategoryIcon] = useState('');

  const handleAddCategory = () => {
    if (!newCategoryName || !newCategoryIcon) return;

    const newCategory: Category = {
      id: Date.now().toString(),
      name: newCategoryName,
      color: `#${Math.floor(Math.random()*16777215).toString(16)}`,
      icon: newCategoryIcon,
    };

    setCategories([...categories, newCategory]);
    setNewCategoryName('');
    setNewCategoryIcon('');
    setShowAddModal(false);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setNewCategoryName(category.name);
    setNewCategoryIcon(category.icon);
    setShowAddModal(true);
  };

  const handleUpdateCategory = () => {
    if (!editingCategory || !newCategoryName || !newCategoryIcon) return;

    setCategories(categories.map(cat =>
      cat.id === editingCategory.id
        ? { ...cat, name: newCategoryName, icon: newCategoryIcon }
        : cat
    ));
    setShowAddModal(false);
    setEditingCategory(null);
    setNewCategoryName('');
    setNewCategoryIcon('');
  };

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  const renderItem = ({ item }: { item: Category }) => (
    <Card style={styles.categoryCard}>
      <Card.Content style={styles.categoryContent}>
        <View style={styles.categoryInfo}>
          <IconButton
            icon={item.icon}
            size={24}
            iconColor={item.color}
          />
          <Text variant="titleMedium">{item.name}</Text>
        </View>
        <View style={styles.actions}>
          <IconButton
            icon="pencil"
            size={20}
            onPress={() => handleEditCategory(item)}
          />
          <IconButton
            icon="delete"
            size={20}
            onPress={() => handleDeleteCategory(item.id)}
          />
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text variant="bodyLarge" style={{ textAlign: 'center' }}>
              {t('budget.noCategories')}
            </Text>
          </View>
        }
      />

      <Portal>
        <Modal
          visible={showAddModal}
          onDismiss={() => {
            setShowAddModal(false);
            setEditingCategory(null);
            setNewCategoryName('');
            setNewCategoryIcon('');
          }}
          contentContainerStyle={styles.modal}
        >
          <Text variant="titleLarge" style={styles.modalTitle}>
            {editingCategory ? t('budget.editCategory') : t('budget.addCategory')}
          </Text>

          <TextInput
            label={t('budget.categoryName')}
            value={newCategoryName}
            onChangeText={setNewCategoryName}
            style={styles.input}
            mode="outlined"
          />

          <TextInput
            label={t('budget.categoryIcon')}
            value={newCategoryIcon}
            onChangeText={setNewCategoryIcon}
            style={styles.input}
            mode="outlined"
            placeholder="material-community-icons name"
          />

          <View style={styles.modalButtons}>
            <Button
              mode="outlined"
              onPress={() => {
                setShowAddModal(false);
                setEditingCategory(null);
                setNewCategoryName('');
                setNewCategoryIcon('');
              }}
              style={styles.button}
            >
              {t('common.cancel')}
            </Button>
            <Button
              mode="contained"
              onPress={editingCategory ? handleUpdateCategory : handleAddCategory}
              disabled={!newCategoryName || !newCategoryIcon}
              style={styles.button}
            >
              {editingCategory ? t('common.save') : t('common.add')}
            </Button>
          </View>
        </Modal>
      </Portal>

      <Button
        mode="contained"
        onPress={() => setShowAddModal(true)}
        style={styles.addButton}
      >
        {t('budget.addCategory')}
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
  categoryCard: {
    marginBottom: 8,
  },
  categoryContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actions: {
    flexDirection: 'row',
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