import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, TextInput, Button, useTheme, Switch, SegmentedButtons } from 'react-native-paper';
import { router } from 'expo-router';
import { useAuth } from '../../src/hooks/useAuth';
import { useLanguage } from '../../src/contexts/LanguageContext';
import Logo from '../../src/components/Logo';

export default function SetupProfileScreen() {
  const theme = useTheme();
  const { t, isRTL } = useLanguage();
  const { user, updateAnonymousProfile, convertToFullAccount } = useAuth();

  const [name, setName] = useState(user?.profile?.name || '');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [language, setLanguage] = useState(user?.profile?.preferences?.language || 'en');
  const [themeMode, setThemeMode] = useState(user?.profile?.preferences?.theme || 'system');
  const [notifications, setNotifications] = useState(user?.profile?.preferences?.notifications ?? true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSaveProfile = async () => {
    setLoading(true);
    setError('');

    try {
      await updateAnonymousProfile({
        name,
        preferences: {
          language,
          theme: themeMode as 'light' | 'dark' | 'system',
          notifications,
        },
      });
      router.replace('/(tabs)');
    } catch (err) {
      setError(err instanceof Error ? err.message : t('profile.saveError'));
    } finally {
      setLoading(false);
    }
  };

  const handleConvertToFullAccount = async () => {
    if (!email || !password || !confirmPassword) {
      setError(t('profile.fillAllFields'));
      return;
    }

    if (password !== confirmPassword) {
      setError(t('profile.passwordsDontMatch'));
      return;
    }

    setLoading(true);
    setError('');

    try {
      await convertToFullAccount(email, password);
      router.replace('/verify-email');
    } catch (err) {
      setError(err instanceof Error ? err.message : t('profile.conversionError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={[
        styles.content,
        isRTL && styles.rtlContent
      ]}
    >
      <View style={styles.logoContainer}>
        <Logo size={120} />
      </View>

      <Text variant="headlineMedium" style={styles.title}>
        {t('profile.setupTitle')}
      </Text>

      <Text style={styles.description}>
        {t('profile.setupDescription')}
      </Text>

      <View style={styles.section}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          {t('profile.personalInfo')}
        </Text>

        <TextInput
          label={t('profile.name')}
          value={name}
          onChangeText={setName}
          style={styles.input}
          mode="outlined"
        />

        <Text variant="titleMedium" style={[styles.sectionTitle, styles.mt16]}>
          {t('profile.preferences')}
        </Text>

        <Text style={styles.label}>{t('profile.language')}</Text>
        <SegmentedButtons
          value={language}
          onValueChange={setLanguage}
          buttons={[
            { value: 'en', label: 'English' },
            { value: 'ar', label: 'العربية' },
          ]}
          style={styles.segmentedButtons}
        />

        <Text style={styles.label}>{t('profile.theme')}</Text>
        <SegmentedButtons
          value={themeMode}
          onValueChange={setThemeMode}
          buttons={[
            { value: 'light', label: t('profile.light') },
            { value: 'dark', label: t('profile.dark') },
            { value: 'system', label: t('profile.system') },
          ]}
          style={styles.segmentedButtons}
        />

        <View style={styles.switchContainer}>
          <Text style={styles.label}>{t('profile.notifications')}</Text>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            color={theme.colors.primary}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          {t('profile.convertToFullAccount')}
        </Text>

        <TextInput
          label={t('auth.email')}
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          mode="outlined"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          label={t('auth.password')}
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          mode="outlined"
          secureTextEntry
        />

        <TextInput
          label={t('auth.confirmPassword')}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.input}
          mode="outlined"
          secureTextEntry
        />

        <Button
          mode="contained"
          onPress={handleConvertToFullAccount}
          loading={loading}
          style={styles.button}
        >
          {t('profile.convertButton')}
        </Button>
      </View>

      {error ? (
        <Text style={[styles.errorText, { color: theme.colors.error }]}>
          {error}
        </Text>
      ) : null}

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handleSaveProfile}
          loading={loading}
          style={styles.button}
        >
          {t('profile.saveButton')}
        </Button>

        <Button
          mode="text"
          onPress={() => router.replace('/(tabs)')}
          style={styles.button}
        >
          {t('profile.skipButton')}
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  rtlContent: {
    direction: 'rtl',
  },
  logoContainer: {
    alignItems: 'center',
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
  },
  segmentedButtons: {
    marginBottom: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonContainer: {
    marginTop: 16,
  },
  button: {
    marginVertical: 8,
  },
  errorText: {
    textAlign: 'center',
    marginBottom: 16,
  },
  mt16: {
    marginTop: 16,
  },
}); 