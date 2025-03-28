import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../../src/contexts/AuthContext';
import { router } from 'expo-router';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileName, setProfileName] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, tempProfileSignIn } = useAuth();

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      await signIn(email, password);
      router.replace('/app/home');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const handleTempProfile = async () => {
    if (!profileName) {
      Alert.alert('Error', 'Please enter a profile name');
      return;
    }

    try {
      setLoading(true);
      await tempProfileSignIn(profileName);
      router.replace('/app/home');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to create temporary profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleSignIn}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Signing In...' : 'Sign In'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => router.push('/auth/sign-up')}
      >
        <Text style={styles.linkText}>
          Don't have an account? Sign Up
        </Text>
      </TouchableOpacity>

      <View style={styles.divider}>
        <Text style={styles.dividerText}>OR</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Enter Profile Name"
        value={profileName}
        onChangeText={setProfileName}
        autoCapitalize="words"
        autoCorrect={false}
      />

      <TouchableOpacity
        style={[styles.button, styles.tempButton, loading && styles.buttonDisabled]}
        onPress={handleTempProfile}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Creating Profile...' : 'Continue Without Account'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  tempButton: {
    backgroundColor: '#34C759',
  },
  buttonDisabled: {
    backgroundColor: '#999',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  linkButton: {
    marginTop: 15,
    padding: 10,
  },
  linkText: {
    color: '#007AFF',
    textAlign: 'center',
    fontSize: 16,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerText: {
    flex: 1,
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
  },
}); 