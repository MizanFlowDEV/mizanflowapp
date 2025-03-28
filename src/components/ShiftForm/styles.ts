import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  typeContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  typeButton: {
    flex: 1,
  },
  timeContainer: {
    marginBottom: 16,
  },
  timeButton: {
    width: '100%',
  },
  recurringContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  patternContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  patternButton: {
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  button: {
    marginHorizontal: 8,
  },
  form: {
    gap: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  field: {
    marginBottom: 16,
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  dayChip: {
    marginRight: 8,
    marginBottom: 8,
  },
  error: {
    marginTop: 4,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dateButton: {
    width: '100%',
    justifyContent: 'flex-start',
  },
}); 