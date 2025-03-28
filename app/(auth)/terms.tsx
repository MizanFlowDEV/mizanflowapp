import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, useTheme, Button } from 'react-native-paper';
import { router } from 'expo-router';
import { useLanguage } from '../../src/contexts/LanguageContext';

export default function TermsScreen() {
  const theme = useTheme();
  const { t, isRTL } = useLanguage();

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[
          styles.content,
          isRTL && styles.rtlContent
        ]}
      >
        <Text variant="headlineMedium" style={styles.title}>
          {t('termsAndConditions')}
        </Text>

        <View style={styles.section}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            1. {t('terms.acceptance')}
          </Text>
          <Text style={styles.paragraph}>
            {t('terms.acceptanceText')}
          </Text>
        </View>

        <View style={styles.section}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            2. {t('terms.services')}
          </Text>
          <Text style={styles.paragraph}>
            {t('terms.servicesText')}
          </Text>
        </View>

        <View style={styles.section}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            3. {t('terms.privacy')}
          </Text>
          <Text style={styles.paragraph}>
            {t('terms.privacyText')}
          </Text>
        </View>

        <View style={styles.section}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            4. {t('terms.userContent')}
          </Text>
          <Text style={styles.paragraph}>
            {t('terms.userContentText')}
          </Text>
        </View>

        <View style={styles.section}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            5. {t('terms.liability')}
          </Text>
          <Text style={styles.paragraph}>
            {t('terms.liabilityText')}
          </Text>
        </View>

        <View style={styles.section}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            6. {t('terms.changes')}
          </Text>
          <Text style={styles.paragraph}>
            {t('terms.changesText')}
          </Text>
        </View>

        <View style={styles.section}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            7. {t('terms.contact')}
          </Text>
          <Text style={styles.paragraph}>
            {t('terms.contactText')}
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          mode="contained"
          onPress={handleBack}
          style={styles.button}
        >
          {t('back')}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  rtlContent: {
    direction: 'rtl',
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  paragraph: {
    lineHeight: 24,
    textAlign: 'justify',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: 'white',
  },
  button: {
    marginTop: 8,
  },
}); 