import { Shift } from '../../contexts/ShiftContext';

export interface ShiftCardProps {
  shift: Shift;
  onPress?: (shift: Shift) => void;
  onEdit?: (shift: Shift) => void;
  onDelete?: (id: string) => void;
  showActions?: boolean;
} 