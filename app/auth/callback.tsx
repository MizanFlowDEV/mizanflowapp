import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useAuth } from '../../src/contexts/AuthContext';

export default function AuthCallback() {
  const { refreshSession } = useAuth();
  const params = useLocalSearchParams();

  useEffect(() => {
    async function handleCallback() {
      try {
        await refreshSession();
        router.replace('/app/home');
      } catch (error) {
        console.error('Error handling auth callback:', error);
        router.replace('/auth/sign-in');
      }
    }

    handleCallback();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#007AFF" />
    </View>
  );
} 