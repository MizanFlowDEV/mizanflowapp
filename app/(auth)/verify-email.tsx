import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';
import { router, useLocalSearchParams } from 'expo-router';
import { useAuth } from '../../src/hooks/useAuth';
import { useLanguage } from '../../src/contexts/LanguageContext';
import { Logo } from '../../src/components/Logo';

export default function VerifyEmailScreen() {
  const theme = useTheme();
  const { t } = useLanguage();
  const { verifyEmail, resendVerificationEmail } = useAuth();
  const params = useLocalSearchParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  useEffect(() => {
    const token = params.token as string;
    if (token) {
      handleVerification(token);
    }
  }, [params]);

  const handleVerification = async (token: string) => {
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await verifyEmail(token);
      setSuccess(true);
      // Redirect to sign in after a short delay
      setTimeout(() => {
        router.replace('/sign-in');
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('emailVerification.verificationError'));
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    setResendLoading(true);
    setError('');
    setResendSuccess(false);

    try {
      await resendVerificationEmail();
      setResendSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('emailVerification.resendError'));
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Logo size={160} />
        </View>

        <Text variant="headlineMedium" style={styles.title}>
          {t('emailVerification.title')}
        </Text>

        <Text style={styles.description}>
          {t('emailVerification.description')}
        </Text>

        {error ? (
          <Text style={[styles.errorText, { color: theme.colors.error }]}>
            {error}
          </Text>
        ) : null}

        {success ? (
          <Text style={[styles.successText, { color: theme.colors.primary }]}>
            {t('emailVerification.verificationSuccess')}
          </Text>
        ) : null}

        {resendSuccess ? (
          <Text style={[styles.successText, { color: theme.colors.primary }]}>
            {t('emailVerification.resendSuccess')}
          </Text>
        ) : null}

        {!success && (
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={handleResendVerification}
              loading={resendLoading}
              disabled={loading || resendLoading || resendSuccess}
              style={styles.button}
            >
              {t('emailVerification.resendButton')}
            </Button>

            <Button
              mode="text"
              onPress={() => router.replace('/sign-in')}
              style={styles.button}
            >
              {t('backToSignIn')}
            </Button>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
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
  buttonContainer: {
    width: '100%',
    maxWidth: 400,
    marginTop: 16,
  },
  button: {
    marginVertical: 8,
  },
  errorText: {
    textAlign: 'center',
    marginBottom: 16,
  },
  successText: {
    textAlign: 'center',
    marginBottom: 16,
  },
}); 