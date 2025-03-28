import { Stack } from 'expo-router';
import { AuthProvider } from '../src/contexts/AuthContext';
import { PaperProvider } from 'react-native-paper';
import { lightTheme, darkTheme } from '../src/config/theme';
import { useColorScheme } from 'react-native';
import { LanguageProvider } from '../src/contexts/LanguageContext';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <PaperProvider theme={theme}>
      <LanguageProvider>
        <AuthProvider>
          <Stack>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </AuthProvider>
      </LanguageProvider>
    </PaperProvider>
  );
} 