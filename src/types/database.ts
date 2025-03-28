export interface User {
  id: string;
  email: string;
  isAnonymous?: boolean;
  profile?: {
    name?: string;
    preferences?: {
      language: 'en' | 'ar';
      theme: 'light' | 'dark' | 'system';
      notifications: boolean;
    };
  };
  created_at?: string;
  updated_at?: string;
}

export interface Schedule {
  id: string;
  user_id: string;
  start_date: string;
  end_date: string;
  days_worked: number;
  days_off: number;
  created_at: string;
  updated_at: string;
}

export interface Salary {
  id: string;
  user_id: string;
  month: string;
  year: number;
  base_salary: number;
  overtime: number;
  allowances: number;
  deductions: number;
  net_salary: number;
  created_at: string;
  updated_at: string;
}

export interface Deduction {
  id: string;
  user_id: string;
  type: 'GOSI' | 'SANID' | 'LOAN' | 'OTHER';
  amount: number;
  description: string;
  date: string;
  created_at: string;
  updated_at: string;
}

export interface Expense {
  id: string;
  user_id: string;
  category: 'HOUSING' | 'TRANSPORTATION' | 'FOOD' | 'OTHER';
  amount: number;
  description: string;
  date: string;
  created_at: string;
  updated_at: string;
}

export interface Budget {
  id: string;
  user_id: string;
  month: string;
  year: number;
  total_income: number;
  total_expenses: number;
  savings: number;
  created_at: string;
  updated_at: string;
}

export interface Database {
  public: {
    Tables: {
      users: {
        Row: User;
        Insert: Omit<User, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<User, 'id' | 'created_at' | 'updated_at'>>;
      };
      schedules: {
        Row: Schedule;
        Insert: Omit<Schedule, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Schedule, 'id' | 'created_at' | 'updated_at'>>;
      };
      salaries: {
        Row: Salary;
        Insert: Omit<Salary, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Salary, 'id' | 'created_at' | 'updated_at'>>;
      };
      deductions: {
        Row: Deduction;
        Insert: Omit<Deduction, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Deduction, 'id' | 'created_at' | 'updated_at'>>;
      };
      expenses: {
        Row: Expense;
        Insert: Omit<Expense, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Expense, 'id' | 'created_at' | 'updated_at'>>;
      };
      budgets: {
        Row: Budget;
        Insert: Omit<Budget, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Budget, 'id' | 'created_at' | 'updated_at'>>;
      };
    };
  };
} 