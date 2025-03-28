import { Linking } from 'react-native';

export async function testDeepLink() {
  try {
    // Test if the app can handle the auth callback URL
    const url = 'mizanflow://auth/callback?type=signup&token=test';
    const canOpen = await Linking.canOpenURL(url);
    console.log('Can open URL:', canOpen);
    
    if (canOpen) {
      // Try opening the URL
      await Linking.openURL(url);
      console.log('URL opened successfully');
    }
  } catch (error) {
    console.error('Deep linking test error:', error);
  }
} 