import { shiftTranslations } from './shift';

export default {
  // Common translations
  common: {
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    createAccount: 'Create Account',
    signUp: 'Sign Up',
    signIn: 'Sign In',
    alreadyHaveAccount: 'Already have an account?',
    acceptTerms: 'I accept the',
    termsAndConditions: 'Terms and Conditions',
    validation: {
      emailRequired: 'Email is required',
      invalidEmail: 'Please enter a valid email address',
      passwordRequired: 'Password is required',
      passwordTooShort: 'Password must be at least 6 characters',
      confirmPasswordRequired: 'Please confirm your password',
      passwordsDoNotMatch: 'Passwords do not match',
      acceptTermsRequired: 'You must accept the terms and conditions',
      signUpError: 'An error occurred during sign up'
    }
  },

  // Auth section translations
  auth: {
    signIn: {
      title: 'Welcome Back',
      subtitle: 'Sign in to continue',
      emailLabel: 'Email',
      emailPlaceholder: 'Enter your email',
      passwordLabel: 'Password',
      passwordPlaceholder: 'Enter your password',
      forgotPassword: 'Forgot Password?',
      signInButton: 'Sign In',
      noAccount: "Don't have an account?",
      signUpLink: 'Sign Up',
      continueWithoutAccount: 'Continue without account',
      errors: {
        invalidEmail: 'Please enter a valid email address',
        invalidPassword: 'Password must be at least 6 characters',
        invalidCredentials: 'Invalid email or password',
        emailNotVerified: 'Please verify your email before signing in',
        unknown: 'An error occurred. Please try again.'
      }
    },
    signUp: {
      title: 'Create Account',
      subtitle: 'Sign up to get started',
      emailLabel: 'Email',
      emailPlaceholder: 'Enter your email',
      passwordLabel: 'Password',
      passwordPlaceholder: 'Create a password',
      confirmPasswordLabel: 'Confirm Password',
      confirmPasswordPlaceholder: 'Confirm your password',
      termsLabel: 'I agree to the Terms and Conditions',
      signUpButton: 'Sign Up',
      haveAccount: 'Already have an account?',
      signInLink: 'Sign In',
      errors: {
        invalidEmail: 'Please enter a valid email address',
        invalidPassword: 'Password must be at least 6 characters',
        passwordsDontMatch: 'Passwords do not match',
        termsRequired: 'You must agree to the terms and conditions',
        emailInUse: 'This email is already registered',
        unknown: 'An error occurred. Please try again.'
      }
    },
    forgotPassword: {
      title: 'Reset Password',
      subtitle: 'Enter your email to reset your password',
      emailLabel: 'Email',
      emailPlaceholder: 'Enter your email',
      resetButton: 'Reset Password',
      backToSignIn: 'Back to Sign In',
      errors: {
        invalidEmail: 'Please enter a valid email address',
        unknown: 'An error occurred. Please try again.'
      },
      success: {
        title: 'Check your email',
        message: 'We have sent you a password reset link'
      }
    },
    verifyEmail: {
      title: 'Verify Email',
      subtitle: 'Please check your email to verify your account',
      resendButton: 'Resend Verification Email',
      backToSignIn: 'Back to Sign In',
      errors: {
        unknown: 'An error occurred. Please try again.'
      },
      success: {
        title: 'Verification Email Sent',
        message: 'Please check your email to verify your account'
      }
    },
    resetPassword: {
      title: 'Reset Password',
      subtitle: 'Enter your new password',
      passwordLabel: 'New Password',
      passwordPlaceholder: 'Enter new password',
      confirmPasswordLabel: 'Confirm New Password',
      confirmPasswordPlaceholder: 'Confirm new password',
      resetButton: 'Reset Password',
      errors: {
        invalidPassword: 'Password must be at least 6 characters',
        passwordsDontMatch: 'Passwords do not match',
        unknown: 'An error occurred. Please try again.'
      },
      success: {
        title: 'Password Reset',
        message: 'Your password has been reset successfully'
      }
    }
  },

  // Budget section translations
  budget: {
    title: 'Budget',
    overview: 'Overview',
    income: {
      title: 'Income',
      add: 'Add Income',
      edit: 'Edit Income',
      delete: 'Delete Income',
      noIncome: 'No income added yet',
      total: 'Total Income',
      monthly: 'Monthly Income',
      source: 'Income Source',
      amount: 'Amount',
      date: 'Date',
      category: 'Category',
      description: 'Description',
      recurring: 'Recurring',
      frequency: 'Frequency'
    },
    expenses: {
      title: 'Expenses',
      add: 'Add Expense',
      edit: 'Edit Expense',
      delete: 'Delete Expense',
      noExpenses: 'No expenses added yet',
      total: 'Total Expenses',
      monthly: 'Monthly Expenses'
    },
    categories: {
      title: 'Budget Categories',
      add: 'Add Category',
      edit: 'Edit Category',
      delete: 'Delete Category',
      noCategories: 'No categories added yet'
    },
    goals: {
      title: 'Budget Goals',
      add: 'Add Goal',
      edit: 'Edit Goal',
      delete: 'Delete Goal',
      noGoals: 'No goals set yet'
    },
    balance: 'Balance',
    totalIncome: 'Total Income',
    totalExpenses: 'Total Expenses',
    recurring: {
      daily: 'Daily',
      weekly: 'Weekly',
      monthly: 'Monthly',
      yearly: 'Yearly'
    },
    actions: {
      add: 'Add',
      edit: 'Edit',
      delete: 'Delete',
      save: 'Save',
      cancel: 'Cancel'
    },
    importExport: {
      export: 'Export',
      import: 'Import',
      exportSuccess: 'Budget data exported successfully',
      exportError: 'Failed to export budget data',
      importSuccess: 'Budget data imported successfully',
      importError: 'Failed to import budget data'
    },
    validation: {
      invalidAmount: 'Please enter a valid amount',
      categoryRequired: 'Category is required',
      amountRequired: 'Amount is required',
      descriptionRequired: 'Description is required'
    }
  },

  // Schedule section translations
  schedule: shiftTranslations
}; 