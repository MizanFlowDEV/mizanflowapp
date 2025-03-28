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