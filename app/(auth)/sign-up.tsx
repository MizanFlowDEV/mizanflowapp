import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { TextInput, Button, Text, useTheme, Checkbox } from 'react-native-paper';
import { Link, router } from 'expo-router';
import { useAuth } from '../../src/hooks/useAuth';
import { useLanguage } from '../../src/contexts/LanguageContext';
import Logo from '../../src/components/Logo';
import * as EmailValidator from 'email-validator';

export default function SignUpScreen() {
  const theme = useTheme();
  const { signUp } = useAuth();
  const { t, isRTL } = useLanguage();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form validation
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [termsError, setTermsError] = useState('');

  const validateForm = () => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setTermsError('');

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

    if (!confirmPassword) {
      setConfirmPasswordError(t('confirmPasswordRequired'));
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError(t('passwordsDoNotMatch'));
      isValid = false;
    }

    if (!acceptedTerms) {
      setTermsError(t('acceptTermsRequired'));
      isValid = false;
    }

    return isValid;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      await signUp(email, password);
      router.replace('/(tabs)');
    } catch (err) {
      setError(err instanceof Error ? err.message : t('signUpError'));
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
          {t('createAccount')}
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

          <TextInput
            mode="outlined"
            label={t('confirmPassword')}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
            error={!!confirmPasswordError}
            disabled={loading}
            style={[styles.input, isRTL && styles.rtlInput]}
            right={
              <TextInput.Icon
                icon={showConfirmPassword ? 'eye-off' : 'eye'}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            }
          />
          {confirmPasswordError ? (
            <Text style={[styles.fieldError, { color: theme.colors.error }]}>
              {confirmPasswordError}
            </Text>
          ) : null}

          <View style={styles.termsContainer}>
            <Checkbox.Android
              status={acceptedTerms ? 'checked' : 'unchecked'}
              onPress={() => setAcceptedTerms(!acceptedTerms)}
              disabled={loading}
            />
            <Text style={styles.termsText}>
              {t('acceptTerms')}{' '}
              <Link href="/terms" style={{ color: theme.colors.primary }}>
                {t('termsAndConditions')}
              </Link>
            </Text>
          </View>
          {termsError ? (
            <Text style={[styles.fieldError, { color: theme.colors.error }]}>
              {termsError}
            </Text>
          ) : null}

          <Button
            mode="contained"
            onPress={handleSignUp}
            loading={loading}
            disabled={loading}
            style={styles.button}
          >
            {t('signUp')}
          </Button>

          <View style={styles.links}>
            <Link href="/sign-in" asChild>
              <Button mode="text">
                {t('alreadyHaveAccount')}
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
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  termsText: {
    flex: 1,
    marginLeft: 8,
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
  fieldError: {
    fontSize: 12,
    marginBottom: 8,
    marginStart: 8,
  },
}); 