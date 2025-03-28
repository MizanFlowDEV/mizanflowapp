import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

export default function SalaryScreen() {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text variant="headlineMedium" style={{ color: theme.colors.primary }}>
        Salary
      </Text>
      <Text variant="bodyLarge" style={{ color: theme.colors.onBackground, marginTop: 16 }}>
        Track your salary and earnings
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 