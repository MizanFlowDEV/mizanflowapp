import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  list: {
    flexGrow: 1,
  },
  card: {
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  itemInfo: {
    flex: 1,
  },
  category: {
    marginBottom: 4,
  },
  description: {
    marginBottom: 4,
  },
  date: {
    marginBottom: 4,
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    marginBottom: 4,
  },
  actions: {
    flexDirection: 'row',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    textAlign: 'center',
  },
}); 