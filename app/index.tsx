import { Redirect } from 'expo-router';
import { useAuth } from '../src/contexts/AuthContext';

export default function Index() {
  const { session } = useAuth();
  return session ? <Redirect href="/app/home" /> : <Redirect href="/auth/sign-in" />;
} 