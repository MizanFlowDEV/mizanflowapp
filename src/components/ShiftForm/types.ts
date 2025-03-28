import { Shift } from '../../types/shift';

export interface ShiftFormValues {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  isRecurring: boolean;
}

export interface ShiftFormProps {
  initialValues?: ShiftFormValues;
  onSubmit: (values: ShiftFormValues) => void;
  onCancel?: () => void;
  isLoading?: boolean;
} 