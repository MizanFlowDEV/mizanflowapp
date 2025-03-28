import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../config/supabase';
import { Session, User as SupabaseUser } from '@supabase/supabase-js';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logger } from '../utils/logger';

interface User {
  id: string;
  email: string;
  isAnonymous: boolean;
  emailVerified?: boolean;
  profile?: {
    name?: string;
    avatar?: string;
    preferences?: {
      language?: string;
      theme?: 'light' | 'dark' | 'system';
      notifications?: boolean;
    };
  };
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, platform: string) => Promise<void>;
  signOut: () => Promise<void>;
  continueWithoutAccount: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
  resendVerificationEmail: () => Promise<void>;
  updateAnonymousProfile: (profile: Partial<User['profile']>) => Promise<void>;
  convertToFullAccount: (email: string, password: string) => Promise<void>;
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
          // Fetch user profile from the database
          const { data: profile, error: profileError } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (profileError) {
            logger.error('Error fetching user profile:', profileError);
            throw profileError;
          }

          const userData: User = {
            id: session.user.id,
            email: session.user.email || '',
            isAnonymous: false,
            emailVerified: session.user.email_confirmed_at !== null,
            profile: {
              name: profile.profile_name,
              preferences: profile.preferences,
            },
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
        // Fetch user profile from the database
        const { data: profile, error: profileError } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (profileError) {
          logger.error('Error fetching user profile:', profileError);
          throw profileError;
        }

        const userData: User = {
          id: session.user.id,
          email: session.user.email || '',
          isAnonymous: false,
          emailVerified: session.user.email_confirmed_at !== null,
          profile: {
            name: profile.profile_name,
            preferences: profile.preferences,
          },
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
      logger.error('Error loading user:', error);
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

      if (error) {
        logger.error('Error signing in:', error);
        throw error;
      }

      if (data.user && !data.user.email_confirmed_at) {
        throw new Error('Please verify your email before signing in');
      }
    } catch (error) {
      logger.error('Error signing in:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, platform: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: 'mizanflow://verify-email',
          data: {
            email,
            email_verified: false,
            is_temporary: false,
            phone_verified: false,
            platform,
            profile_name: email.split('@')[0],
          }
        },
      });

      if (error) {
        logger.error('Error signing up:', error);
        throw error;
      }

      // Create user profile in the database
      const { error: profileError } = await supabase
        .from('users')
        .insert([
          {
            id: data.user?.id,
            email: email,
            profile_name: email.split('@')[0],
            platform: platform,
            preferences: {
              language: 'en',
              theme: 'system',
              notifications: true
            }
          }
        ]);

      if (profileError) {
        logger.error('Error creating user profile:', profileError);
        // Attempt to delete the auth user if profile creation fails
        await supabase.auth.admin.deleteUser(data.user?.id as string);
        throw new Error('Failed to create user profile');
      }

      // Don't set the user here - wait for email verification
    } catch (error) {
      logger.error('Error signing up:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        logger.error('Error signing out:', error);
        throw error;
      }
      
      await AsyncStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      logger.error('Error signing out:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const continueWithoutAccount = async () => {
    setIsLoading(true);
    try {
      // Create a temporary anonymous user
      const anonymousUser: User = {
        id: `anonymous_${Date.now()}`,
        email: '',
        isAnonymous: true,
        profile: {
          preferences: {
            language: 'en',
            theme: 'system',
            notifications: true,
          },
        },
      };

      // Save to AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(anonymousUser));
      setUser(anonymousUser);
    } catch (error) {
      logger.error('Error continuing without account:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateAnonymousProfile = async (profile: Partial<User['profile']>) => {
    if (!user?.isAnonymous) {
      throw new Error('User is not anonymous');
    }

    setIsLoading(true);
    try {
      const updatedUser: User = {
        ...user,
        profile: {
          ...user.profile,
          ...profile,
        },
      };

      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      logger.error('Error updating anonymous profile:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const convertToFullAccount = async (email: string, password: string) => {
    if (!user?.isAnonymous) {
      throw new Error('User is not anonymous');
    }

    setIsLoading(true);
    try {
      // Sign up the user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: 'mizanflow://verify-email',
        },
      });

      if (error) throw error;

      // Save the anonymous user's profile data to be restored after verification
      await AsyncStorage.setItem('pending_anonymous_profile', JSON.stringify(user.profile));
      
      // Clear the anonymous user data
      await AsyncStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      logger.error('Error converting to full account:', error);
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
      logger.error('Error resetting password:', error);
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

      // If there's a pending anonymous profile, restore it
      const pendingProfile = await AsyncStorage.getItem('pending_anonymous_profile');
      if (pendingProfile) {
        const { data: { user: verifiedUser } } = await supabase.auth.getUser();
        if (verifiedUser) {
          const userData: User = {
            id: verifiedUser.id,
            email: verifiedUser.email || '',
            isAnonymous: false,
            emailVerified: true,
            profile: JSON.parse(pendingProfile),
          };
          await AsyncStorage.setItem('user', JSON.stringify(userData));
          setUser(userData);
          await AsyncStorage.removeItem('pending_anonymous_profile');
        }
      }
    } catch (error) {
      logger.error('Error verifying email:', error);
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
      logger.error('Error resending verification email:', error);
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
        updateAnonymousProfile,
        convertToFullAccount,
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