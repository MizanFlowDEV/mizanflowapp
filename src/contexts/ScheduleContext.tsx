import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

export interface ScheduleItem {
  id: string;
  title: string;
  type: 'prayer' | 'work' | 'personal';
  startTime: string;
  endTime: string;
  days: string[];
  location?: string;
  description?: string;
  isRecurring: boolean;
  recurringInterval?: 'daily' | 'weekly' | 'monthly';
  reminder?: number; // minutes before
  isEnabled: boolean;
}

interface ScheduleContextType {
  scheduleItems: ScheduleItem[];
  addScheduleItem: (item: Omit<ScheduleItem, 'id'>) => Promise<void>;
  updateScheduleItem: (id: string, item: Partial<ScheduleItem>) => Promise<void>;
  deleteScheduleItem: (id: string) => Promise<void>;
  toggleScheduleItem: (id: string) => Promise<void>;
  getScheduleForDay: (date: Date) => ScheduleItem[];
  getUpcomingSchedule: (limit?: number) => ScheduleItem[];
}

const ScheduleContext = createContext<ScheduleContextType | undefined>(undefined);

export function ScheduleProvider({ children }: { children: React.ReactNode }) {
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([]);

  useEffect(() => {
    loadScheduleData();
    setupNotifications();
  }, []);

  const loadScheduleData = async () => {
    try {
      const data = await AsyncStorage.getItem('scheduleItems');
      if (data) {
        setScheduleItems(JSON.parse(data));
      }
    } catch (error) {
      console.error('Error loading schedule data:', error);
    }
  };

  const saveScheduleData = async (items: ScheduleItem[]) => {
    try {
      await AsyncStorage.setItem('scheduleItems', JSON.stringify(items));
      setScheduleItems(items);
    } catch (error) {
      console.error('Error saving schedule data:', error);
    }
  };

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

  const scheduleNotification = async (item: ScheduleItem) => {
    if (!item.reminder || !item.isEnabled) return;

    const startTime = new Date(item.startTime);
    const reminderTime = new Date(startTime.getTime() - item.reminder * 60000);

    if (reminderTime > new Date()) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: item.title,
          body: `Reminder: ${item.title} starts in ${item.reminder} minutes`,
        },
        trigger: {
          date: reminderTime,
        },
      });
    }
  };

  const addScheduleItem = async (item: Omit<ScheduleItem, 'id'>) => {
    const newItem: ScheduleItem = {
      ...item,
      id: Date.now().toString(),
      isEnabled: true,
    };

    const updatedItems = [...scheduleItems, newItem];
    await saveScheduleData(updatedItems);
    await scheduleNotification(newItem);
  };

  const updateScheduleItem = async (id: string, updates: Partial<ScheduleItem>) => {
    const updatedItems = scheduleItems.map(item =>
      item.id === id ? { ...item, ...updates } : item
    );
    await saveScheduleData(updatedItems);

    const updatedItem = updatedItems.find(item => item.id === id);
    if (updatedItem) {
      await scheduleNotification(updatedItem);
    }
  };

  const deleteScheduleItem = async (id: string) => {
    const updatedItems = scheduleItems.filter(item => item.id !== id);
    await saveScheduleData(updatedItems);
  };

  const toggleScheduleItem = async (id: string) => {
    const item = scheduleItems.find(item => item.id === id);
    if (item) {
      await updateScheduleItem(id, { isEnabled: !item.isEnabled });
    }
  };

  const getScheduleForDay = (date: Date): ScheduleItem[] => {
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    return scheduleItems.filter(item => {
      if (!item.isEnabled) return false;
      if (item.isRecurring) {
        return item.days.includes(dayOfWeek);
      }
      const itemDate = new Date(item.startTime);
      return itemDate.toDateString() === date.toDateString();
    });
  };

  const getUpcomingSchedule = (limit: number = 5): ScheduleItem[] => {
    const now = new Date();
    return scheduleItems
      .filter(item => item.isEnabled)
      .filter(item => {
        const startTime = new Date(item.startTime);
        return startTime > now;
      })
      .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
      .slice(0, limit);
  };

  return (
    <ScheduleContext.Provider
      value={{
        scheduleItems,
        addScheduleItem,
        updateScheduleItem,
        deleteScheduleItem,
        toggleScheduleItem,
        getScheduleForDay,
        getUpcomingSchedule,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
}

export function useSchedule() {
  const context = useContext(ScheduleContext);
  if (context === undefined) {
    throw new Error('useSchedule must be used within a ScheduleProvider');
  }
  return context;
} 