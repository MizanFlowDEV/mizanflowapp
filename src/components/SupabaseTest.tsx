import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { supabase } from '../config/supabase';

export function SupabaseTest() {
  const [status, setStatus] = useState<'LOADING' | 'SUCCESS' | 'ERROR'>('LOADING');
  const [error, setError] = useState<string | null>(null);

  const checkConnection = async () => {
    try {
      setStatus('LOADING');
      setError(null);
      
      // Test the connection by checking the auth state
      const { data: { session }, error: authError } = await supabase.auth.getSession();
      
      if (authError) throw authError;
      
      // If we get here, the connection is working
      setStatus('SUCCESS');
      console.log('Connection successful. Session:', session ? 'Active' : 'No active session');
    } catch (err: any) {
      console.error('Supabase connection error:', err);
      setStatus('ERROR');
      setError(err.message);
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  return (
    <View style={{ padding: 16 }}>
      <Text>Supabase Connection Status: {status}</Text>
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
      <Button mode="contained" onPress={checkConnection}>
        Retry Connection
      </Button>
    </View>
  );
} 