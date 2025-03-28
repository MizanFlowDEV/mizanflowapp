import { useEffect } from 'react';
import { Stack, Slot, useRouter, useSegments } from 'expo-router';
import { useAuth } from '../src/hooks/useAuth';
import { AuthProvider } from '../src/contexts/AuthContext';
import { PaperProvider } from 'react-native-paper';
import { lightTheme, darkTheme } from '../src/config/theme';
import { useColorScheme } from 'react-native';
import { LanguageProvider } from '../src/contexts/LanguageContext';
import { ThemeProvider } from '../src/contexts/ThemeContext';
import { BudgetProvider } from '../src/contexts/BudgetContext';
import { ScheduleProvider } from '../src/contexts/ScheduleContext';

// This can be moved to a separate file
function useProtectedRoute(user: any) {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';
    const inTabsGroup = segments[0] === '(tabs)';
    const inSetupProfile = segments[0] === 'setup-profile';

    if (!user && !inAuthGroup) {
      // Redirect to the sign-in page.
      router.replace('/sign-in');
    } else if (user && inAuthGroup) {
      // Redirect away from the sign-in page.
      if (user.isAnonymous) {
        router.replace('/setup-profile');
      } else {
        router.replace('/(tabs)');
      }
    } else if (user?.isAnonymous && !inSetupProfile && !inAuthGroup) {
      // Redirect anonymous users to profile setup
      router.replace('/setup-profile');
    }
  }, [user, segments]);
}

function RootLayoutNav() {
  const { user } = useAuth();
  useProtectedRoute(user);

  return <Slot />;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <AuthProvider>
      <LanguageProvider>
        <ThemeProvider>
          <PaperProvider theme={theme}>
            <BudgetProvider>
              <ScheduleProvider>
                <RootLayoutNav />
              </ScheduleProvider>
            </BudgetProvider>
          </PaperProvider>
        </ThemeProvider>
      </LanguageProvider>
    </AuthProvider>
  );
} 