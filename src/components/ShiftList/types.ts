import { Shift } from '../../contexts/ShiftContext';

export interface ShiftListProps {
  shifts: Shift[];
  onPress?: (shift: Shift) => void;
  onEdit?: (shift: Shift) => void;
  onDelete?: (id: string) => void;
  showActions?: boolean;
  ListEmptyComponent?: React.ReactElement;
  ListHeaderComponent?: React.ReactElement;
  ListFooterComponent?: React.ReactElement;
  contentContainerStyle?: any;
} 