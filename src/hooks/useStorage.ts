import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { useAuth } from './useAuth';
import { Database } from '../types/database';

type TableName = keyof Database['public']['Tables'];

export function useStorage<T>(table: TableName) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    if (!user) return;
    
    setLoading(true);
    const result = await storage.syncData(table, user.id);
    setData(result);
    setLoading(false);
  };

  const saveData = async (newData: T) => {
    if (!user) return;

    await storage.saveLocally(`${table}_data`, newData);
    await storage.saveToSupabase(table, {
      ...newData,
      user_id: user.id,
      updated_at: new Date().toISOString()
    });
    
    setData(newData);
  };

  return {
    data,
    loading,
    saveData,
    refreshData: loadData
  };
} 