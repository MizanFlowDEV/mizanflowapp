import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';
import { useAuth } from '../src/hooks/useAuth';
import { AuthProvider } from '../src/contexts/AuthContext';
import { PaperProvider } from 'react-native-paper';
import { lightTheme, darkTheme } from '../src/config/theme';
import { useColorScheme } from 'react-native';
import { LanguageProvider } from '../src/contexts/LanguageContext';
import { ThemeProvider } from '../src/contexts/ThemeContext';
import { BudgetProvider } from '../src/contexts/BudgetContext';
import { ScheduleProvider } from '../src/contexts/ScheduleContext';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

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

  useEffect(() => {
    // Hide splash screen after resources are loaded
    SplashScreen.hideAsync();
  }, []);

  return (
    <AuthProvider>
      <LanguageProvider>
        <ThemeProvider>
          <PaperProvider theme={theme}>
            <BudgetProvider>
              <ScheduleProvider>
                <GestureHandlerRootView style={{ flex: 1 }}>
                  <View style={{ flex: 1 }}>
                    <Stack
                      screenOptions={{
                        headerShown: false,
                      }}
                    >
                      <RootLayoutNav />
                    </Stack>
                  </View>
                </GestureHandlerRootView>
              </ScheduleProvider>
            </BudgetProvider>
          </PaperProvider>
        </ThemeProvider>
      </LanguageProvider>
    </AuthProvider>
  );
} 