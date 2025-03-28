import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from './AuthContext';
import * as Notifications from 'expo-notifications';

export interface BudgetItem {
  id: string;
  category: string;
  amount: number;
  type: 'income' | 'expense';
  date: string;
  description?: string;
  recurring?: boolean;
  recurringInterval?: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

export interface BudgetCategory {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export interface BudgetGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: string;
}

interface BudgetContextType {
  budgetItems: BudgetItem[];
  categories: BudgetCategory[];
  goals: BudgetGoal[];
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  addBudgetItem: (item: Omit<BudgetItem, 'id'>) => Promise<void>;
  updateBudgetItem: (id: string, item: Partial<BudgetItem>) => Promise<void>;
  deleteBudgetItem: (id: string) => Promise<void>;
  addCategory: (category: Omit<BudgetCategory, 'id'>) => Promise<void>;
  updateCategory: (id: string, category: Partial<BudgetCategory>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  addGoal: (goal: Omit<BudgetGoal, 'id'>) => Promise<void>;
  updateGoal: (id: string, goal: Partial<BudgetGoal>) => Promise<void>;
  deleteGoal: (id: string) => Promise<void>;
  updateGoalProgress: (id: string, amount: number) => Promise<void>;
  exportBudgetData: () => Promise<string>;
  importBudgetData: (data: string) => Promise<void>;
  scheduleNotification: (item: BudgetItem) => Promise<void>;
  isLoading: boolean;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export function BudgetProvider({ children }: { children: React.ReactNode }) {
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([]);
  const [categories, setCategories] = useState<BudgetCategory[]>([]);
  const [goals, setGoals] = useState<BudgetGoal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    loadBudgetData();
    setupNotifications();
  }, []);

  const setupNotifications = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      console.log('Notification permissions not granted');
      return;
    }

    await Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });
  };

  const loadBudgetData = async () => {
    try {
      const userId = user?.id || 'anonymous';
      const [storedItems, storedCategories, storedGoals] = await Promise.all([
        AsyncStorage.getItem(`budget_${userId}`),
        AsyncStorage.getItem(`categories_${userId}`),
        AsyncStorage.getItem(`goals_${userId}`),
      ]);

      if (storedItems) setBudgetItems(JSON.parse(storedItems));
      if (storedCategories) setCategories(JSON.parse(storedCategories));
      if (storedGoals) setGoals(JSON.parse(storedGoals));
    } catch (error) {
      console.error('Error loading budget data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveBudgetData = async () => {
    try {
      const userId = user?.id || 'anonymous';
      await Promise.all([
        AsyncStorage.setItem(`budget_${userId}`, JSON.stringify(budgetItems)),
        AsyncStorage.setItem(`categories_${userId}`, JSON.stringify(categories)),
        AsyncStorage.setItem(`goals_${userId}`, JSON.stringify(goals)),
      ]);
    } catch (error) {
      console.error('Error saving budget data:', error);
    }
  };

  const addBudgetItem = async (item: Omit<BudgetItem, 'id'>) => {
    const newItem: BudgetItem = {
      ...item,
      id: Date.now().toString(),
    };
    const updatedItems = [...budgetItems, newItem];
    setBudgetItems(updatedItems);
    await saveBudgetData();
    if (item.recurring) {
      await scheduleNotification(newItem);
    }
  };

  const updateBudgetItem = async (id: string, updates: Partial<BudgetItem>) => {
    const updatedItems = budgetItems.map(item =>
      item.id === id ? { ...item, ...updates } : item
    );
    setBudgetItems(updatedItems);
    await saveBudgetData();
  };

  const deleteBudgetItem = async (id: string) => {
    const updatedItems = budgetItems.filter(item => item.id !== id);
    setBudgetItems(updatedItems);
    await saveBudgetData();
  };

  const addCategory = async (category: Omit<BudgetCategory, 'id'>) => {
    const newCategory: BudgetCategory = {
      ...category,
      id: Date.now().toString(),
    };
    const updatedCategories = [...categories, newCategory];
    setCategories(updatedCategories);
    await saveBudgetData();
  };

  const updateCategory = async (id: string, updates: Partial<BudgetCategory>) => {
    const updatedCategories = categories.map(category =>
      category.id === id ? { ...category, ...updates } : category
    );
    setCategories(updatedCategories);
    await saveBudgetData();
  };

  const deleteCategory = async (id: string) => {
    const updatedCategories = categories.filter(category => category.id !== id);
    setCategories(updatedCategories);
    await saveBudgetData();
  };

  const addGoal = async (goal: Omit<BudgetGoal, 'id'>) => {
    const newGoal: BudgetGoal = {
      ...goal,
      id: Date.now().toString(),
    };
    const updatedGoals = [...goals, newGoal];
    setGoals(updatedGoals);
    await saveBudgetData();
  };

  const updateGoal = async (id: string, updates: Partial<BudgetGoal>) => {
    const updatedGoals = goals.map(goal =>
      goal.id === id ? { ...goal, ...updates } : goal
    );
    setGoals(updatedGoals);
    await saveBudgetData();
  };

  const deleteGoal = async (id: string) => {
    const updatedGoals = goals.filter(goal => goal.id !== id);
    setGoals(updatedGoals);
    await saveBudgetData();
  };

  const updateGoalProgress = async (id: string, amount: number) => {
    const updatedGoals = goals.map(goal =>
      goal.id === id
        ? { ...goal, currentAmount: Math.min(goal.currentAmount + amount, goal.targetAmount) }
        : goal
    );
    setGoals(updatedGoals);
    await saveBudgetData();
  };

  const exportBudgetData = async () => {
    const data = {
      budgetItems,
      categories,
      goals,
    };
    return JSON.stringify(data);
  };

  const importBudgetData = async (data: string) => {
    try {
      const importedData = JSON.parse(data);
      setBudgetItems(importedData.budgetItems || []);
      setCategories(importedData.categories || []);
      setGoals(importedData.goals || []);
      await saveBudgetData();
    } catch (error) {
      console.error('Error importing budget data:', error);
      throw error;
    }
  };

  const scheduleNotification = async (item: BudgetItem) => {
    if (!item.recurring || !item.recurringInterval) return;

    const now = new Date();
    const itemDate = new Date(item.date);
    let nextDate = new Date(itemDate);

    // Calculate next occurrence based on interval
    switch (item.recurringInterval) {
      case 'daily':
        nextDate.setDate(now.getDate() + 1);
        break;
      case 'weekly':
        nextDate.setDate(now.getDate() + 7);
        break;
      case 'monthly':
        nextDate.setMonth(now.getMonth() + 1);
        break;
      case 'yearly':
        nextDate.setFullYear(now.getFullYear() + 1);
        break;
    }

    // Schedule notification
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `${item.type === 'income' ? 'Income' : 'Expense'} Reminder`,
        body: `${item.category}: ${item.amount}`,
      },
      trigger: {
        date: nextDate,
      },
    });
  };

  const totalIncome = budgetItems
    .filter(item => item.type === 'income')
    .reduce((sum, item) => sum + item.amount, 0);

  const totalExpenses = budgetItems
    .filter(item => item.type === 'expense')
    .reduce((sum, item) => sum + item.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <BudgetContext.Provider
      value={{
        budgetItems,
        categories,
        goals,
        totalIncome,
        totalExpenses,
        balance,
        addBudgetItem,
        updateBudgetItem,
        deleteBudgetItem,
        addCategory,
        updateCategory,
        deleteCategory,
        addGoal,
        updateGoal,
        deleteGoal,
        updateGoalProgress,
        exportBudgetData,
        importBudgetData,
        scheduleNotification,
        isLoading,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
}

export function useBudget() {
  const context = useContext(BudgetContext);
  if (context === undefined) {
    throw new Error('useBudget must be used within a BudgetProvider');
  }
  return context;
} 