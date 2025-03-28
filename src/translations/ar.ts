const ar = {
  common: {
    // Top-level translations for direct access
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    signIn: 'تسجيل الدخول',
    signUp: 'إنشاء حساب',
    createAccount: 'إنشاء حساب جديد',
    confirmPassword: 'تأكيد كلمة المرور',
    emailRequired: 'البريد الإلكتروني مطلوب',
    invalidEmail: 'يرجى إدخال بريد إلكتروني صحيح',
    passwordRequired: 'كلمة المرور مطلوبة',
    passwordTooShort: 'يجب أن تكون كلمة المرور 6 أحرف على الأقل',
    confirmPasswordRequired: 'يرجى تأكيد كلمة المرور',
    passwordsDoNotMatch: 'كلمات المرور غير متطابقة',
    acceptTermsRequired: 'يرجى قبول الشروط والأحكام',
    signUpError: 'فشل في إنشاء الحساب. يرجى المحاولة مرة أخرى.',
    acceptTerms: 'أوافق على',
    termsAndConditions: 'الشروط والأحكام',
    alreadyHaveAccount: 'لديك حساب بالفعل؟ تسجيل الدخول',
    backToSignIn: 'العودة إلى تسجيل الدخول',
    welcomeBack: 'مرحباً بعودتك',
    continueWithoutAccount: 'المتابعة بدون حساب',
    forgotPassword: 'نسيت كلمة المرور؟',
    
    // Navigation labels
    home: 'الرئيسية',
    settings: {
      title: 'الإعدادات',
      language: 'اللغة',
      theme: 'المظهر',
      notifications: 'الإشعارات',
      about: 'حول التطبيق',
      darkMode: 'الوضع الداكن',
      lightMode: 'الوضع الفاتح',
      signOut: 'تسجيل الخروج',
      save: 'حفظ',
      cancel: 'إلغاء',
      delete: 'حذف',
      edit: 'تعديل',
      reset: 'إعادة تعيين',
      search: 'بحث',
      loading: 'جاري التحميل...',
      error: 'خطأ',
      success: 'تم بنجاح',
      signInError: 'فشل تسجيل الدخول. يرجى التحقق من بياناتك.',
      genericError: 'حدث خطأ ما. يرجى المحاولة مرة أخرى.',
    }
  },
  budget: {
    title: 'الميزانية',
    overview: 'نظرة عامة',
    income: {
      title: 'الدخل',
      add: 'إضافة دخل',
      edit: 'تعديل الدخل',
      delete: 'حذف الدخل',
      source: 'المصدر',
      amount: 'المبلغ',
      date: 'التاريخ',
      category: 'الفئة',
      description: 'الوصف',
      recurring: 'متكرر',
      frequency: 'التكرار',
      noIncome: 'لا يوجد دخل حتى الآن'
    },
    expenses: {
      title: 'المصروفات',
      add: 'إضافة مصروف',
      edit: 'تعديل المصروف',
      delete: 'حذف المصروف',
      amount: 'المبلغ',
      date: 'التاريخ',
      category: 'الفئة',
      description: 'الوصف',
      recurring: 'متكرر',
      frequency: 'التكرار',
      noExpenses: 'لا توجد مصروفات حتى الآن'
    },
    balance: 'الرصيد',
    totalIncome: 'إجمالي الدخل',
    totalExpenses: 'إجمالي المصروفات',
    categories: {
      title: 'الفئات',
      add: 'إضافة فئة',
      edit: 'تعديل الفئة',
      delete: 'حذف الفئة',
      name: 'الاسم',
      color: 'اللون',
      icon: 'الأيقونة',
      noCategories: 'لا توجد فئات حتى الآن'
    },
    addItem: 'إضافة عنصر ميزانية',
    category: 'الفئة',
    amount: 'المبلغ',
    description: 'الوصف',
    date: 'التاريخ',
    recurring: 'متكرر',
    daily: 'يومي',
    weekly: 'أسبوعي',
    monthly: 'شهري',
    yearly: 'سنوي',
    expense: 'مصروف',
    incomeType: 'دخل',
    noItems: 'لا توجد عناصر ميزانية بعد. أضف عنصرك الأول للبدء!',
    editItem: 'تعديل عنصر الميزانية',
    deleteItem: 'حذف عنصر الميزانية',
    deleteConfirm: 'هل أنت متأكد من حذف هذا العنصر؟',
    deleteSuccess: 'تم حذف العنصر بنجاح',
    deleteError: 'فشل في حذف العنصر',
    saveSuccess: 'تم حفظ العنصر بنجاح',
    saveError: 'فشل في حفظ العنصر',
    invalidAmount: 'يرجى إدخال مبلغ صحيح',
    categoryRequired: 'الفئة مطلوبة',
    amountRequired: 'المبلغ مطلوب',
    // Analytics
    monthlyOverview: 'نظرة شهرية',
    expenseByCategory: 'المصروفات حسب الفئة',
    // Goals
    goals: 'الأهداف',
    noGoals: 'لا توجد أهداف بعد. أضف هدفك الأول للبدء!',
    addGoal: 'إضافة هدف',
    editGoal: 'تعديل الهدف',
    goalName: 'اسم الهدف',
    targetAmount: 'المبلغ المستهدف',
    deadline: 'الموعد النهائي',
    remaining: 'المتبقي',
    // Export/Import
    export: 'تصدير',
    import: 'استيراد',
    exportSuccess: 'تم تصدير بيانات الميزانية بنجاح',
    exportError: 'فشل في تصدير بيانات الميزانية',
    importSuccess: 'تم استيراد بيانات الميزانية بنجاح',
    importError: 'فشل في استيراد بيانات الميزانية',
    // Notifications
    notificationTitle: 'تذكير الميزانية',
    notificationBody: '{type}: {amount} لـ {category}'
  },
  salary: {
    title: 'الراتب',
    details: {
      title: 'تفاصيل الراتب',
      amount: 'المبلغ',
      date: 'التاريخ',
      category: 'الفئة',
      description: 'الوصف',
      recurring: 'متكرر',
      frequency: 'التكرار'
    },
    salary: 'الراتب'
  },
  schedule: {
    title: 'الجدول',
    overview: 'نظرة عامة',
    details: 'التفاصيل',
    addItem: 'إضافة موعد',
    editItem: 'تعديل الموعد',
    type: 'النوع',
    prayer: 'صلاة',
    work: 'عمل',
    personal: 'شخصي',
    startTime: 'وقت البدء',
    endTime: 'وقت الانتهاء',
    location: 'الموقع',
    description: 'الوصف',
    recurring: 'متكرر',
    daily: 'يومي',
    weekly: 'أسبوعي',
    monthly: 'شهري',
    reminder: 'التذكير',
    days: {
      sunday: 'الأحد',
      monday: 'الاثنين',
      tuesday: 'الثلاثاء',
      wednesday: 'الأربعاء',
      thursday: 'الخميس',
      friday: 'الجمعة',
      saturday: 'السبت'
    },
    today: 'اليوم',
    all: 'الكل',
    upcoming: 'القادم',
    noItems: 'لا توجد عناصر جدول بعد. أضف عنصرك الأول للبدء!',
    deleteConfirm: 'هل أنت متأكد من حذف هذا العنصر؟',
    deleteSuccess: 'تم حذف العنصر بنجاح',
    deleteError: 'فشل في حذف العنصر',
    saveSuccess: 'تم حفظ العنصر بنجاح',
    saveError: 'فشل في حفظ العنصر',
    invalidTime: 'يرجى إدخال أوقات صحيحة',
    titleRequired: 'العنوان مطلوب'
  },
  shift: {
    title: 'العنوان',
    description: 'الوصف',
    startDate: 'تاريخ البداية',
    endDate: 'تاريخ النهاية',
    isRecurring: 'متكرر',
    status: {
      scheduled: 'مجدول',
      in_progress: 'قيد التنفيذ',
      completed: 'مكتمل',
      cancelled: 'ملغي',
    },
  },
};

module.exports = ar; 