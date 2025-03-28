import { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';
import { User } from '../types/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchUser(session.user.id);
      } else {
        checkAnonymousUser();
      }
    });

    // Listen for changes on auth state (logged in, signed out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchUser(session.user.id);
      } else {
        checkAnonymousUser();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAnonymousUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.isAnonymous) {
          setUser(parsedUser);
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Error checking anonymous user:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async (userId: string) => {
    try {
      // First try to get the auth user
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser) {
        throw new Error('No authenticated user found');
      }

      // Try to get user from database
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No user found in database, create one
          const newUser: User = {
            id: authUser.id,
            email: authUser.email || '',
            isAnonymous: false,
            profile: {
              name: authUser.user_metadata?.full_name || authUser.email?.split('@')[0] || '',
              preferences: {
                language: 'en',
                theme: 'system',
                notifications: true,
              },
            },
          };
          
          // Insert the new user
          const { error: insertError } = await supabase
            .from('users')
            .insert([{
              id: newUser.id,
              email: newUser.email,
              profile_name: newUser.profile.name,
              preferences: newUser.profile.preferences,
            }]);
          
          if (insertError) {
            console.error('Error creating user profile:', insertError);
            throw insertError;
          }

          setUser(newUser);
          return;
        }
        throw error;
      }
      
      // Transform the database data to match our User type
      const user: User = {
        id: data.id,
        email: data.email,
        isAnonymous: false,
        profile: {
          name: data.profile_name,
          preferences: data.preferences || {
            language: 'en',
            theme: 'system',
            notifications: true,
          },
        },
      };
      
      setUser(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      // Sign up the user with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });
      if (authError) throw authError;

      if (!authData.user) {
        throw new Error('No user data returned from signup');
      }

      // Create the user profile in the database
      const newUser: User = {
        id: authData.user.id,
        email: authData.user.email || '',
        isAnonymous: false,
        profile: {
          name: fullName || email.split('@')[0],
          preferences: {
            language: 'en',
            theme: 'system',
            notifications: true,
          },
        },
      };

      const { error: insertError } = await supabase
        .from('users')
        .insert([{
          id: newUser.id,
          email: newUser.email,
          profile_name: newUser.profile.name,
          preferences: newUser.profile.preferences,
        }]);

      if (insertError) {
        // If profile creation fails, attempt to delete the auth user
        await supabase.auth.admin.deleteUser(authData.user.id);
        throw new Error('Failed to create user profile');
      }

      return { data: authData, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      await AsyncStorage.removeItem('user');
      setUser(null);
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) return { error: new Error('No user logged in') };

    try {
      if (user.isAnonymous) {
        const updatedUser = {
          ...user,
          ...updates,
        };
        await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        return { data: updatedUser, error: null };
      }

      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;
      setUser(data);
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const continueWithoutAccount = async () => {
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

      await AsyncStorage.setItem('user', JSON.stringify(anonymousUser));
      setUser(anonymousUser);
      return { data: anonymousUser, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
    continueWithoutAccount,
  };
} 