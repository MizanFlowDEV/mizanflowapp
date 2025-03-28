export default {
  // Common translations
  email: 'Email',
  password: 'Password',
  confirmPassword: 'Confirm Password',
  createAccount: 'Create Account',
  signUp: 'Sign Up',
  signIn: 'Sign In',
  alreadyHaveAccount: 'Already have an account?',
  acceptTerms: 'I accept the',
  termsAndConditions: 'Terms and Conditions',
  
  // Validation messages
  emailRequired: 'Email is required',
  invalidEmail: 'Please enter a valid email address',
  passwordRequired: 'Password is required',
  passwordTooShort: 'Password must be at least 6 characters',
  confirmPasswordRequired: 'Please confirm your password',
  passwordsDoNotMatch: 'Passwords do not match',
  acceptTermsRequired: 'You must accept the terms and conditions',
  signUpError: 'An error occurred during sign up',

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
        unknown: 'An error occurred. Please try again.',
      },
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
        unknown: 'An error occurred. Please try again.',
      },
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
        unknown: 'An error occurred. Please try again.',
      },
      success: {
        title: 'Check your email',
        message: 'We have sent you a password reset link',
      },
    },
    verifyEmail: {
      title: 'Verify Email',
      subtitle: 'Please check your email to verify your account',
      resendButton: 'Resend Verification Email',
      backToSignIn: 'Back to Sign In',
      errors: {
        unknown: 'An error occurred. Please try again.',
      },
      success: {
        title: 'Verification Email Sent',
        message: 'Please check your email to verify your account',
      },
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
        unknown: 'An error occurred. Please try again.',
      },
      success: {
        title: 'Password Reset',
        message: 'Your password has been reset successfully',
      },
    },
  },

  // Budget section translations
  budget: {
    monthlyOverview: 'Monthly Overview',
    income: 'Income',
    expenses: 'Expenses',
    balance: 'Balance',
    goals: {
      title: 'Budget Goals',
      noGoals: 'No goals set',
      addGoal: 'Add Goal',
      goalName: 'Goal Name',
      targetAmount: 'Target Amount',
      currentAmount: 'Current Amount',
      deadline: 'Deadline',
      category: 'Category'
    },
    categories: {
      title: 'Categories',
      noCategories: 'No categories',
      addCategory: 'Add Category',
      expenseByCategory: 'Expense by Category',
      import: 'Import',
      categoryName: 'Category Name',
      budget: 'Budget',
      spent: 'Spent',
      remaining: 'Remaining'
    },
    actions: {
      add: 'Add',
      edit: 'Edit',
      delete: 'Delete',
      save: 'Save',
      cancel: 'Cancel'
    }
  }
}; 