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
  - Anonymous to full account conversion

- **Shift Management**
  - Create and manage work shifts
  - Filter shifts by date range and status
  - Detailed shift information view
  - Shift status tracking (upcoming, completed, cancelled)
  - Shift notes and attachments
  - Shift statistics and analytics

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
│   ├── (auth)/
│   │   ├── _layout.tsx
│   │   ├── sign-in.tsx
│   │   ├── sign-up.tsx
│   │   └── verify-email.tsx
│   └── (tabs)/
│       ├── _layout.tsx
│       ├── index.tsx (Home)
│       ├── budget.tsx
│       ├── salary.tsx
│       ├── schedule.tsx
│       └── settings.tsx
├── src/
│   ├── components/
│   │   ├── Logo.tsx
│   │   ├── BudgetList/
│   │   ├── ShiftCard/
│   │   ├── ShiftDetails/
│   │   ├── ShiftFilters/
│   │   ├── ShiftForm/
│   │   └── ShiftList/
│   ├── contexts/
│   │   ├── AuthContext.tsx
│   │   ├── BudgetContext.tsx
│   │   ├── LanguageContext.tsx
│   │   └── ShiftContext.tsx
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   └── useAppTheme.ts
│   ├── config/
│   │   └── theme/
│   │       ├── colors.ts
│   │       ├── spacing.ts
│   │       └── typography.ts
│   ├── i18n/
│   │   ├── translations/
│   │   └── strings.ts
│   ├── utils/
│   │   └── logger.ts
│   └── types/
│       └── shift.ts
└── assets/
    └── fonts/
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
- `@react-native-community/datetimepicker` for date/time selection

### State Management
- React Context API for global state
- Custom hooks for business logic
- Supabase for backend state management

## 📱 Screens Overview

### Authentication Screens
- Sign In: Email/password login
- Sign Up: New user registration
- Email Verification
- Anonymous access option
- Password Reset

### Shift Management Screens
- Shift List: Overview of all shifts
- Shift Details: Detailed view of a single shift
- Shift Form: Create/Edit shift information
- Shift Filters: Filter and search shifts
- Shift Statistics: Analytics and insights

### Settings & Profile
- Language selection
- Theme preferences
- Notification settings
- Profile management
- Account settings

## 🔒 Security Features
- Secure authentication with Supabase
- Email verification
- Password reset functionality
- Row Level Security (RLS) in database
- Secure session management
- Protected routes

## 🌐 Offline Capabilities
- Local data persistence
- Offline-first architecture
- Background sync
- Conflict resolution

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/MizanFlowDEV/mizanflowapp.git
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your Supabase credentials
```

4. Start the development server:
```bash
npx expo start
```

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
