export type ShiftStatus = 'scheduled' | 'in_progress' | 'completed' | 'cancelled';

export type ShiftType = 'regular' | 'overtime' | 'holiday';

export interface ShiftFilters {
  start?: Date;
  end?: Date;
  status?: ShiftStatus[];
  type?: ShiftType[];
  search?: string;
  showRecurring?: boolean;
}

export interface ShiftFiltersProps {
  filters?: ShiftFilters;
  onFilterChange: (filters: ShiftFilters) => void;
  onReset?: () => void;
} 