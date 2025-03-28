import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

// Log the environment variables (with partial key hiding for security)
console.log('Supabase Configuration:', {
  url: supabaseUrl,
  key: supabaseAnonKey ? `${supabaseAnonKey.substring(0, 8)}...${supabaseAnonKey.substring(-8)}` : 'missing',
  platform: Platform.OS
});

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Create Supabase client with proper configuration
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    flowType: 'pkce',
    debug: __DEV__,
  },
  global: {
    headers: {
      'X-Client-Info': `mizanflow-${Platform.OS}`,
    },
  },
});

// Test connection and configuration
const testConnection = async () => {
  try {
    console.log('Testing Supabase connection...');
    
    // Test basic connection
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      // Only log as error if it's not the AuthSessionMissingError
      if (sessionError.message !== 'Auth session missing!') {
        console.error('Supabase session error:', sessionError);
      } else {
        console.log('No active session (normal for first launch or logged out state)');
      }
      return;
    }

    if (session) {
      console.log('Active session found:', {
        user: session.user?.email,
        expiresAt: new Date(session.expires_at! * 1000).toLocaleString()
      });
    } else {
      console.log('No active session (user not logged in)');
    }

  } catch (error: any) {
    // Only log as error if it's not the AuthSessionMissingError
    if (error.message !== 'Auth session missing!') {
      console.error('Supabase connection error:', error);
    } else {
      console.log('No active session (normal for first launch or logged out state)');
    }
  }
};

// Run connection test
testConnection(); 