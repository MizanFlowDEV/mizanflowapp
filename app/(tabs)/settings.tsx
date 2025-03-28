import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme, Button } from 'react-native-paper';
import { useAuth } from '../../src/hooks/useAuth';
import { router } from 'expo-router';

export default function SettingsScreen() {
  const theme = useTheme();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace('/(auth)/sign-in');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text variant="headlineMedium" style={{ color: theme.colors.primary }}>
        Settings
      </Text>
      <Text variant="bodyLarge" style={{ color: theme.colors.onBackground, marginTop: 16, marginBottom: 32 }}>
        Manage your app preferences
      </Text>
      
      <Button 
        mode="outlined" 
        onPress={handleSignOut}
        style={styles.button}
      >
        Sign Out
      </Button>
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
  button: {
    width: '100%',
    maxWidth: 300,
  },
}); 