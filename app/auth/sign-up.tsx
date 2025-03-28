import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, Snackbar } from 'react-native-paper';
import { Link, router } from 'expo-router';
import { useAuth } from '../../src/contexts/AuthContext';
import { useLanguage } from '../../src/contexts/LanguageContext';
import { useTranslation } from '../../src/hooks/useTranslation';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signUp } = useAuth();
  const { language, toggleLanguage } = useLanguage();
  const { t } = useTranslation();

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      setError(t('auth.errors.fillAllFields'));
      return;
    }

    if (password !== confirmPassword) {
      setError(t('auth.errors.passwordsDontMatch'));
      return;
    }

    if (password.length < 6) {
      setError(t('auth.errors.passwordTooShort'));
      return;
    }

    try {
      setLoading(true);
      setError('');
      await signUp(email, password);
      // Show success message and redirect to sign in
      setError(t('auth.success.signUp'));
      setTimeout(() => {
        router.replace('/auth/sign-in');
      }, 2000);
    } catch (err: any) {
      console.error('Sign up error:', err);
      if (err.message.includes('Email is already in use')) {
        setError(t('auth.errors.emailInUse'));
      } else if (err.message.includes('Invalid email')) {
        setError(t('auth.errors.invalidEmail'));
      } else {
        setError(t('auth.errors.genericError'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="displaySmall" style={styles.logo}>
          MizanFlow
        </Text>
        <Text variant="headlineMedium" style={styles.title}>
          {t('auth.createAccount')}
        </Text>
      </View>

      <TextInput
        label={t('auth.email')}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
        disabled={loading}
      />

      <TextInput
        label={t('auth.password')}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
        right={
          <TextInput.Icon
            icon={showPassword ? 'eye-off' : 'eye'}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
        style={styles.input}
        disabled={loading}
      />

      <TextInput
        label={t('auth.confirmPassword')}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={!showConfirmPassword}
        right={
          <TextInput.Icon
            icon={showConfirmPassword ? 'eye-off' : 'eye'}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          />
        }
        style={styles.input}
        disabled={loading}
      />

      <Button
        mode="contained"
        onPress={handleSignUp}
        loading={loading}
        disabled={loading}
        style={styles.button}
      >
        {t('auth.signUp')}
      </Button>

      <View style={styles.links}>
        <Link href="/auth/sign-in" asChild>
          <Button mode="text" disabled={loading}>
            {t('auth.haveAccount')}
          </Button>
        </Link>
        <Button mode="text" onPress={toggleLanguage} disabled={loading}>
          {language === 'en' ? 'العربية' : 'English'}
        </Button>
      </View>

      <Snackbar
        visible={!!error}
        onDismiss={() => setError('')}
        action={{
          label: t('common.ok'),
          onPress: () => setError(''),
        }}
        duration={4000}
      >
        {error}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    marginBottom: 20,
    color: '#2196F3',
    fontWeight: 'bold',
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
  links: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
}); 