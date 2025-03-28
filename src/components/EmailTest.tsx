import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, TextInput, Snackbar } from 'react-native-paper';
import { supabase } from '../config/supabase';

export default function EmailTest() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [testEmail, setTestEmail] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const testEmailTemplates = async () => {
    try {
      // Reset states
      setLoading(true);
      setMessage('');
      setError('');

      // Validate email
      if (!testEmail) {
        setError('Please enter an email address');
        return;
      }

      if (!validateEmail(testEmail)) {
        setError('Please enter a valid email address');
        return;
      }

      console.log('Testing email configuration with:', testEmail);

      // Test signup email
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: testEmail,
        password: 'TestPassword123!',
        options: {
          emailRedirectTo: 'mizanflow://auth/callback',
          data: {
            platform: 'test',
            purpose: 'email_test'
          }
        },
      });

      if (signUpError) throw signUpError;

      // Test magic link
      const { data: magicLinkData, error: magicLinkError } = await supabase.auth.signInWithOtp({
        email: testEmail,
        options: {
          emailRedirectTo: 'mizanflow://auth/callback',
          data: {
            platform: 'test',
            purpose: 'email_test'
          }
        },
      });

      if (magicLinkError) throw magicLinkError;

      console.log('Email test results:', {
        signUpSuccess: !!signUpData,
        magicLinkSuccess: !!magicLinkData
      });

      setMessage('Test emails sent! Please check your email inbox and spam folder.');
      setTestEmail(''); // Clear the input
    } catch (err: any) {
      console.error('Email test error:', err);
      setError(err.message || 'Failed to send test emails');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.description}>
        Enter your email address to test the email configuration. This will send test emails to verify the system is working.
      </Text>

      <TextInput
        label="Test Email Address"
        value={testEmail}
        onChangeText={setTestEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        mode="outlined"
        style={styles.input}
        error={!!error}
      />

      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : null}

      <Button
        mode="outlined"
        onPress={testEmailTemplates}
        loading={loading}
        disabled={loading || !testEmail}
        style={styles.button}
      >
        Send Test Emails
      </Button>

      {message ? (
        <Text style={styles.success}>{message}</Text>
      ) : null}

      <Snackbar
        visible={!!message}
        onDismiss={() => setMessage('')}
        duration={8000}
        action={{
          label: 'OK',
          onPress: () => setMessage(''),
        }}
      >
        {message}
      </Snackbar>

      <Snackbar
        visible={!!error}
        onDismiss={() => setError('')}
        duration={8000}
        action={{
          label: 'OK',
          onPress: () => setError(''),
        }}
        style={styles.errorSnackbar}
      >
        {error}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  description: {
    marginBottom: 16,
    color: '#666',
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
  success: {
    color: '#4caf50',
    marginTop: 16,
    textAlign: 'center',
  },
  errorText: {
    color: '#f44336',
    marginBottom: 16,
    textAlign: 'center',
  },
  errorSnackbar: {
    backgroundColor: '#ffebee',
  },
}); 