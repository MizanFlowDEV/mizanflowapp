# MizanFlow Mobile App

MizanFlow is a mobile application designed for professionals working on rotating shift schedules (14/7). It helps users track their work calendar, manage finances, and plan savings while supporting both Arabic and English languages with offline capabilities.

## 🎯 Current Status & Features

### Core Features
- **Authentication System**
  - Email/Password Sign In
  - New User Registration
  - "Continue Without Account" option
  - Secure authentication state management
  - Email verification
  - Password reset functionality

- **Internationalization**
  - Bilingual support (English/Arabic)
  - RTL (Right-to-Left) support for Arabic
  - Language persistence
  - Easy language switching

- **Theme System**
  - Custom navy and gold theme
  - Dark/Light mode support
  - Responsive design
  - React Native Paper UI components

- **Smart Navigation**
  - Tab-based interface
  - Intuitive user flow
  - Persistent state management
  - Smooth transitions

### Planned Features
- **Smart Schedule Tracking**: Automatically generates work calendars based on shift cycle start date
- **Salary Calculator**: Computes monthly earnings including overtime and bonuses
- **Deduction Management**: Tracks loans, GOSI, SAND, and other deductions
- **Budget Planning**: Helps manage monthly expenses and savings
- **Bill Reminders**: Sends notifications for upcoming payments
- **Zakat Planning**: Assists in calculating and preparing for zakat
- **Offline First**: Works without constant internet connection
- **Data Sync**: Seamless synchronization between local and cloud storage

## 🏗 Project Structure

```
mizanflow/
├── app/
│   ├── _layout.tsx (Root layout with providers)
│   │   ├── _layout.tsx
│   │   ├── sign-in.tsx
│   │   └── sign-up.tsx
│   └── (tabs)/
│       ├── _layout.tsx
│       ├── index.tsx (Home)
│       ├── budget.tsx
│       ├── salary.tsx
│       ├── schedule.tsx
│       └── settings.tsx
├── src/
│   ├── components/
│   │   └── Logo.tsx
│   ├── contexts/
│   │   ├── AuthContext.tsx
│   │   └── LanguageContext.tsx
│   ├── hooks/
│   │   └── useAuth.ts
│   ├── config/
│   │   └── theme.ts
│   ├── translations/
│   ├── utils/
│   └── types/
└── assets/
```

## 🛠 Technical Stack

### Core Technologies
- React Native
- Expo (SDK latest)
- TypeScript

### Key Libraries
- `expo-router` for navigation
- `react-native-paper` for UI components
- `react-native-svg` for vector graphics
- `@react-native-async-storage/async-storage` for local storage
- `@supabase/supabase-js` for backend services
- `i18next` for internationalization

### State Management
- React Context API for global state
- Custom hooks for business logic

## 📱 Screens Overview

### Authentication Screens
- Sign In: Email/password login
- Sign Up: New user registration
- Anonymous access option
- Forgot Password
- Email Verification
- Terms and Conditions

### Main App Screens
- Home: Dashboard view
- Budget: Financial planning
- Salary: Income tracking
- Schedule: Work timetable
- Settings: App configuration

## 🔄 Hybrid Storage System

The app implements a robust hybrid storage system that combines local and cloud storage:

1. **Local Storage (AsyncStorage)**
   - Stores data locally on the device
   - Works offline
   - Faster access
   - Persists between app restarts

2. **Remote Storage (Supabase)**
   - Stores data in the cloud
   - Syncs across devices
   - Backup of data
   - Accessible from other devices

3. **Sync Strategy**
   - When loading data:
     1. Tries to get data from Supabase
     2. If successful, updates local storage
     3. If Supabase fails, uses local data
   - When saving data:
     1. Saves to both local and remote storage
     2. Shows error if either save fails

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or later)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/MizanFlowDEV/mizanflowapp.git
cd mizanflow
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory with your Supabase credentials:
```bash
EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm start
# or
yarn start
```

5. Run on iOS simulator:
```bash
npm run ios
# or
yarn ios
```

## 🔜 Next Steps
1. Implement remaining screen functionality
2. Add animations for better UX
3. Integrate with backend services
4. Add data persistence
5. Implement push notifications
6. Add error boundaries and fallbacks
7. Enhance accessibility features

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
