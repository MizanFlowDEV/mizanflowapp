import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../config/supabase';
import { Session, User as SupabaseUser } from '@supabase/supabase-js';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  email: string;
  isAnonymous: boolean;
  emailVerified?: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  continueWithoutAccount: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
  resendVerificationEmail: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    loadUser();
    
    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const userData: User = {
            id: session.user.id,
            email: session.user.email || '',
            isAnonymous: false,
            emailVerified: session.user.email_confirmed_at !== null,
          };
          setUser(userData);
          await AsyncStorage.setItem('user', JSON.stringify(userData));
        } else {
          setUser(null);
          await AsyncStorage.removeItem('user');
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loadUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const userData: User = {
          id: session.user.id,
          email: session.user.email || '',
          isAnonymous: false,
          emailVerified: session.user.email_confirmed_at !== null,
        };
        setUser(userData);
        await AsyncStorage.setItem('user', JSON.stringify(userData));
      } else {
        const savedUser = await AsyncStorage.getItem('user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      }
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user && !data.user.email_confirmed_at) {
        throw new Error('Please verify your email before signing in');
      }
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: 'mizanflow://verify-email',
        },
      });

      if (error) throw error;

      // Don't set the user here - wait for email verification
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      await AsyncStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const continueWithoutAccount = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: `anonymous_${Date.now()}@mizanflow.temp`,
        password: 'anonymous',
      });

      if (error) throw error;

      const anonymousUser = {
        id: data.user?.id || `anonymous-${Date.now()}`,
        email: '',
        isAnonymous: true,
      };
      setUser(anonymousUser);
      await AsyncStorage.setItem('user', JSON.stringify(anonymousUser));
    } catch (error) {
      console.error('Error continuing without account:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'mizanflow://reset-password',
      });
      
      if (error) throw error;
    } catch (error) {
      console.error('Error resetting password:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyEmail = async (token: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.verifyOtp({
        token_hash: token,
        type: 'email',
      });
      
      if (error) throw error;
    } catch (error) {
      console.error('Error verifying email:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const resendVerificationEmail = async () => {
    if (!user?.email) throw new Error('No email address available');

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: user.email,
      });
      
      if (error) throw error;
    } catch (error) {
      console.error('Error resending verification email:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn,
        signUp,
        signOut,
        continueWithoutAccount,
        resetPassword,
        verifyEmail,
        resendVerificationEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 