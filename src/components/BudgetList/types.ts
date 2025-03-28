import { BudgetItem } from '../../contexts/BudgetContext';

export interface BudgetListProps {
  onEditItem: (item: BudgetItem) => void;
  onDeleteItem: (id: string) => void;
} 