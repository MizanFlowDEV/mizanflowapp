import React, { createContext, useContext, useState } from 'react';

export interface Shift {
  id: string;
  title: string;
  type: 'work' | 'prayer' | 'personal';
  startTime: Date;
  endTime: Date;
  location?: string;
  description?: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  isRecurring: boolean;
  recurringPattern?: 'daily' | 'weekly' | 'monthly';
}

interface ShiftContextType {
  shifts: Shift[];
  addShift: (shift: Omit<Shift, 'id'>) => void;
  updateShift: (id: string, shift: Partial<Shift>) => void;
  deleteShift: (id: string) => void;
  updateShiftStatus: (id: string, status: Shift['status']) => void;
}

const ShiftContext = createContext<ShiftContextType | undefined>(undefined);

export const useShift = () => {
  const context = useContext(ShiftContext);
  if (!context) {
    throw new Error('useShift must be used within a ShiftProvider');
  }
  return context;
};

export const ShiftProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [shifts, setShifts] = useState<Shift[]>([]);

  const addShift = (shift: Omit<Shift, 'id'>) => {
    const newShift: Shift = {
      ...shift,
      id: Math.random().toString(36).substr(2, 9),
    };
    setShifts(prev => [...prev, newShift]);
  };

  const updateShift = (id: string, shift: Partial<Shift>) => {
    setShifts(prev =>
      prev.map(s => (s.id === id ? { ...s, ...shift } : s))
    );
  };

  const deleteShift = (id: string) => {
    setShifts(prev => prev.filter(s => s.id !== id));
  };

  const updateShiftStatus = (id: string, status: Shift['status']) => {
    setShifts(prev =>
      prev.map(s => (s.id === id ? { ...s, status } : s))
    );
  };

  return (
    <ShiftContext.Provider
      value={{
        shifts,
        addShift,
        updateShift,
        deleteShift,
        updateShiftStatus,
      }}
    >
      {children}
    </ShiftContext.Provider>
  );
}; 