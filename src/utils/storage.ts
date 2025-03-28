import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../config/supabase';
import { Database } from '../types/database';

const STORAGE_KEYS = {
  USER: 'user_data',
  SCHEDULE: 'schedule_data',
  SALARY: 'salary_data',
  BUDGET: 'budget_data',
  EXPENSES: 'expenses_data',
  SYNC_QUEUE: 'sync_queue',
  LAST_SYNC: 'last_sync'
};

type TableName = keyof Database['public']['Tables'];

interface SyncQueueItem {
  table: TableName;
  data: any;
  operation: 'insert' | 'update' | 'delete';
  timestamp: string;
}

export const storage = {
  // Local Storage Operations
  saveLocally: async (key: string, data: any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
      await AsyncStorage.setItem(`${key}_timestamp`, new Date().toISOString());
      return true;
    } catch (error) {
      console.error('Error saving locally:', error);
      return false;
    }
  },

  getLocally: async (key: string) => {
    try {
      const data = await AsyncStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error getting local data:', error);
      return null;
    }
  },

  // Remote Storage Operations
  saveToSupabase: async (table: TableName, data: any) => {
    try {
      const { error } = await supabase
        .from(table)
        .upsert(data, { onConflict: 'id' });

      if (error) throw error;
      return true;
    } catch (error) {
      // Add to sync queue if operation fails
      await storage.addToSyncQueue(table, data, 'update');
      return false;
    }
  },

  // Sync Queue Management
  addToSyncQueue: async (table: TableName, data: any, operation: SyncQueueItem['operation']) => {
    try {
      const queue = await storage.getLocally(STORAGE_KEYS.SYNC_QUEUE) || [];
      queue.push({
        table,
        data,
        operation,
        timestamp: new Date().toISOString()
      });
      await storage.saveLocally(STORAGE_KEYS.SYNC_QUEUE, queue);
    } catch (error) {
      console.error('Error adding to sync queue:', error);
    }
  },

  // Sync Strategy
  syncData: async (table: TableName, userId: string) => {
    try {
      // Get last sync timestamp
      const lastSync = await storage.getLocally(STORAGE_KEYS.LAST_SYNC) || {};
      const tableLastSync = lastSync[table] || '1970-01-01T00:00:00.000Z';

      // Try to get remote data
      const { data: remoteData, error } = await supabase
        .from(table)
        .select('*')
        .eq('user_id', userId)
        .gt('updated_at', tableLastSync);

      if (error) throw error;

      if (remoteData && remoteData.length > 0) {
        // Get current local data
        const localData = await storage.getLocally(`${table}_data`) || [];
        
        // Merge remote and local data, preferring remote for conflicts
        const mergedData = storage.mergeData(localData, remoteData);
        
        // Save merged data locally
        await storage.saveLocally(`${table}_data`, mergedData);
        
        // Update last sync timestamp
        lastSync[table] = new Date().toISOString();
        await storage.saveLocally(STORAGE_KEYS.LAST_SYNC, lastSync);
        
        return mergedData;
      }

      return await storage.getLocally(`${table}_data`);
    } catch (error) {
      console.error('Error syncing data:', error);
      return await storage.getLocally(`${table}_data`);
    }
  },

  // Data Merging
  mergeData: (localData: any[], remoteData: any[]) => {
    const merged = [...localData];
    
    remoteData.forEach(remoteItem => {
      const localIndex = merged.findIndex(item => item.id === remoteItem.id);
      
      if (localIndex >= 0) {
        // Update existing item if remote is newer
        const localUpdatedAt = new Date(merged[localIndex].updated_at);
        const remoteUpdatedAt = new Date(remoteItem.updated_at);
        
        if (remoteUpdatedAt > localUpdatedAt) {
          merged[localIndex] = remoteItem;
        }
      } else {
        // Add new item
        merged.push(remoteItem);
      }
    });
    
    return merged;
  },

  // Process Sync Queue
  processSyncQueue: async () => {
    try {
      const queue = await storage.getLocally(STORAGE_KEYS.SYNC_QUEUE) || [];
      const newQueue = [];

      for (const item of queue) {
        try {
          const { error } = await supabase
            .from(item.table)
            .upsert(item.data);

          if (error) {
            newQueue.push(item);
          }
        } catch (error) {
          newQueue.push(item);
        }
      }

      await storage.saveLocally(STORAGE_KEYS.SYNC_QUEUE, newQueue);
    } catch (error) {
      console.error('Error processing sync queue:', error);
    }
  }
}; 