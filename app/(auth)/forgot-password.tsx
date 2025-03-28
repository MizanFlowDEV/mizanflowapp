import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';
import { Link, router } from 'expo-router';
import { useAuth } from '../../src/hooks/useAuth';
import { useLanguage } from '../../src/contexts/LanguageContext';
import Logo from '../../src/components/Logo';
import * as EmailValidator from 'email-validator';

export default function ForgotPasswordScreen() {
  const theme = useTheme();
  const { resetPassword } = useAuth();
  const { t, isRTL } = useLanguage();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [emailError, setEmailError] = useState('');

  const validateForm = () => {
    let isValid = true;
    setEmailError('');

    if (!email) {
      setEmailError(t('emailRequired'));
      isValid = false;
    } else if (!EmailValidator.validate(email)) {
      setEmailError(t('invalidEmail'));
      isValid = false;
    }

    return isValid;
  };

  const handleResetPassword = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await resetPassword(email);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('resetPasswordError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logoContainer}>
          <Logo size={160} />
        </View>

        <Text variant="headlineMedium" style={styles.title}>
          {t('forgotPasswordTitle')}
        </Text>

        <Text style={styles.description}>
          {t('forgotPasswordDescription')}
        </Text>

        {error ? (
          <Text style={[styles.errorText, { color: theme.colors.error }]}>
            {error}
          </Text>
        ) : null}

        {success ? (
          <Text style={[styles.successText, { color: theme.colors.primary }]}>
            {t('resetPasswordSuccess')}
          </Text>
        ) : null}

        <View style={styles.form}>
          <TextInput
            mode="outlined"
            label={t('email')}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            error={!!emailError}
            disabled={loading || success}
            style={[styles.input, isRTL && styles.rtlInput]}
            right={emailError ? <TextInput.Icon icon="alert" color={theme.colors.error} /> : null}
          />
          {emailError ? (
            <Text style={[styles.fieldError, { color: theme.colors.error }]}>
              {emailError}
            </Text>
          ) : null}

          <Button
            mode="contained"
            onPress={handleResetPassword}
            loading={loading}
            disabled={loading || success}
            style={styles.button}
          >
            {t('resetPassword')}
          </Button>

          <View style={styles.links}>
            <Link href="/sign-in" asChild>
              <Button mode="text">
                {t('backToSignIn')}
              </Button>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 24,
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: 'bold',
  },
  description: {
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 32,
  },
  form: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  input: {
    marginBottom: 8,
  },
  rtlInput: {
    textAlign: 'right',
  },
  button: {
    marginTop: 16,
  },
  links: {
    alignItems: 'center',
    marginTop: 16,
  },
  errorText: {
    textAlign: 'center',
    marginBottom: 16,
  },
  successText: {
    textAlign: 'center',
    marginBottom: 16,
  },
  fieldError: {
    fontSize: 12,
    marginBottom: 8,
    marginStart: 8,
  },
}); 