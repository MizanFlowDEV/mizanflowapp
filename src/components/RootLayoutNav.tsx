import { useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';

export default function RootLayoutNav() {
  const { session, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!session && !inAuthGroup) {
      // Redirect to sign-in if not authenticated
      router.replace('/(auth)/sign-in');
    } else if (session && inAuthGroup) {
      // Redirect to home if authenticated and trying to access auth screens
      router.replace('/(tabs)');
    }
  }, [session, loading, segments]);

  if (loading) {
    return null; // Or a loading screen
  }

  return null; // We don't need to render anything here as the Stack handles the rendering
} 