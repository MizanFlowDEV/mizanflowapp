import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { useAuth } from '../../src/hooks/useAuth';

export default function HomeScreen() {
  const theme = useTheme();
  const { user } = useAuth();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text variant="headlineMedium" style={{ color: theme.colors.primary }}>
        Welcome{user?.user_metadata?.profile_name ? `, ${user.user_metadata.profile_name}` : ''}
      </Text>
      <Text variant="bodyLarge" style={{ color: theme.colors.onBackground, marginTop: 16 }}>
        Your financial management companion
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