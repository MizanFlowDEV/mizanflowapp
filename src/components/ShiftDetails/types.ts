import { Shift } from '../../contexts/ShiftContext';

export interface ShiftDetailsProps {
  shift: Shift;
  onEdit?: (shift: Shift) => void;
  onDelete?: (shift: Shift) => void;
  onStatusChange?: (status: Shift['status']) => void;
  showActions?: boolean;
} 