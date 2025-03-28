import { Tabs } from 'expo-router';
import { useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLanguage } from '../../src/contexts/LanguageContext';

export default function TabsLayout() {
  const theme = useTheme();
  const { t } = useLanguage();

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: theme.colors.onPrimary,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceDisabled,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('home'),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="budget"
        options={{
          title: t('budget'),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="wallet" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="salary"
        options={{
          title: t('salary'),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cash" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="schedule"
        options={{
          title: t('schedule'),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="calendar" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t('settings'),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
} 