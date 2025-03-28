import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';
import { Link, router } from 'expo-router';
import { useAuth } from '../../src/hooks/useAuth';
import { useLanguage } from '../../src/contexts/LanguageContext';
import { Logo } from '../../src/components/Logo';
import * as EmailValidator from 'email-validator';

export default function SignInScreen() {
  const theme = useTheme();
  const { signIn, continueWithoutAccount } = useAuth();
  const { t, isRTL } = useLanguage();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form validation
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateForm = () => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');

    if (!email) {
      setEmailError(t('emailRequired'));
      isValid = false;
    } else if (!EmailValidator.validate(email)) {
      setEmailError(t('invalidEmail'));
      isValid = false;
    }

    if (!password) {
      setPasswordError(t('passwordRequired'));
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError(t('passwordTooShort'));
      isValid = false;
    }

    return isValid;
  };

  const handleSignIn = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      await signIn(email, password);
      router.replace('/(tabs)');
    } catch (err) {
      setError(err instanceof Error ? err.message : t('signInError'));
    } finally {
      setLoading(false);
    }
  };

  const handleContinueWithoutAccount = async () => {
    setLoading(true);
    try {
      await continueWithoutAccount();
      router.replace('/(tabs)');
    } catch (err) {
      setError(err instanceof Error ? err.message : t('genericError'));
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
          {t('welcomeBack')}
        </Text>

        {error ? (
          <Text style={[styles.errorText, { color: theme.colors.error }]}>
            {error}
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
            disabled={loading}
            style={[styles.input, isRTL && styles.rtlInput]}
            right={emailError ? <TextInput.Icon icon="alert" color={theme.colors.error} /> : null}
          />
          {emailError ? (
            <Text style={[styles.fieldError, { color: theme.colors.error }]}>
              {emailError}
            </Text>
          ) : null}

          <TextInput
            mode="outlined"
            label={t('password')}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            error={!!passwordError}
            disabled={loading}
            style={[styles.input, isRTL && styles.rtlInput]}
            right={
              <TextInput.Icon
                icon={showPassword ? 'eye-off' : 'eye'}
                onPress={() => setShowPassword(!showPassword)}
              />
            }
          />
          {passwordError ? (
            <Text style={[styles.fieldError, { color: theme.colors.error }]}>
              {passwordError}
            </Text>
          ) : null}

          <Button
            mode="contained"
            onPress={handleSignIn}
            loading={loading}
            disabled={loading}
            style={styles.button}
          >
            {t('signIn')}
          </Button>

          <Button
            mode="outlined"
            onPress={handleContinueWithoutAccount}
            disabled={loading}
            style={styles.button}
          >
            {t('continueWithoutAccount')}
          </Button>

          <View style={styles.links}>
            <Link href="/forgot-password" asChild>
              <Button mode="text" compact>
                {t('forgotPassword')}
              </Button>
            </Link>

            <Link href="/sign-up" asChild>
              <Button mode="text" compact>
                {t('signUp')}
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
    marginBottom: 24,
    fontWeight: 'bold',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  errorText: {
    textAlign: 'center',
    marginBottom: 16,
  },
  fieldError: {
    fontSize: 12,
    marginBottom: 8,
    marginStart: 8,
  },
}); 