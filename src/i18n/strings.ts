export const strings = {
  // Common strings
  common: {
    save: 'common.save',
    cancel: 'common.cancel',
    delete: 'common.delete',
    edit: 'common.edit',
    reset: 'common.reset',
    search: 'common.search',
    loading: 'common.loading',
    error: 'common.error',
    success: 'common.success',
    noData: 'common.noData',
  },

  // Shift related strings
  shift: {
    // Status
    status: {
      scheduled: 'shift.status.scheduled',
      in_progress: 'shift.status.in_progress',
      completed: 'shift.status.completed',
      cancelled: 'shift.status.cancelled',
    },

    // Types
    type: {
      work: 'shift.type.work',
      prayer: 'shift.type.prayer',
      personal: 'shift.type.personal',
    },

    // Form fields
    title: 'shift.title',
    description: 'shift.description',
    location: 'shift.location',
    startTime: 'shift.startTime',
    endTime: 'shift.endTime',
    startDate: 'shift.startDate',
    endDate: 'shift.endDate',
    search: 'shift.search',
    details: 'shift.details',
    recurring: {
      label: 'shift.recurring.label',
      pattern: {
        daily: 'shift.recurring.daily',
        weekly: 'shift.recurring.weekly',
        monthly: 'shift.recurring.monthly',
        yearly: 'shift.recurring.yearly'
      }
    },
    showRecurring: 'shift.showRecurring',
    noShifts: 'shift.noShifts',
    isRecurring: 'shift.isRecurring',

    // Validation messages
    titleRequired: 'shift.titleRequired',
    startTimeRequired: 'shift.startTimeRequired',
    endTimeRequired: 'shift.endTimeRequired',
    invalidTime: 'shift.invalidTime',
    typeRequired: 'shift.typeRequired',
    recurringIntervalRequired: 'shift.recurringIntervalRequired',
    daysRequired: 'shift.daysRequired',

    // Days of week
    days: {
      sun: 'shift.days.sun',
      mon: 'shift.days.mon',
      tue: 'shift.days.tue',
      wed: 'shift.days.wed',
      thu: 'shift.days.thu',
      fri: 'shift.days.fri',
      sat: 'shift.days.sat',
    },

    hours: 'shift.hours',
    start: 'shift.start',
    complete: 'shift.complete',
    cancel: 'shift.cancel',
  },

  // Budget related strings
  budget: {
    // Overview
    overview: 'budget.overview',
    categories: 'budget.categories',
    goals: 'budget.goals',
    income: 'budget.income',
    expenses: 'budget.expenses',
    balance: 'budget.balance',
    noItems: 'budget.noItems',

    // Actions
    export: 'budget.export',
    import: 'budget.import',

    // Recurring intervals
    daily: 'budget.daily',
    weekly: 'budget.weekly',
    monthly: 'budget.monthly',
    yearly: 'budget.yearly',
  },

  // Schedule related strings
  schedule: {
    // Views
    today: 'schedule.today',
    all: 'schedule.all',
    upcoming: 'schedule.upcoming',
    noItems: 'schedule.noItems',

    // Types
    work: 'schedule.work',
    prayer: 'schedule.prayer',
    personal: 'schedule.personal',

    // Recurring
    daily: 'schedule.daily',
    weekly: 'schedule.weekly',
    monthly: 'schedule.monthly',
    yearly: 'schedule.yearly',

    // Days
    days: {
      sun: 'schedule.days.sun',
      mon: 'schedule.days.mon',
      tue: 'schedule.days.tue',
      wed: 'schedule.days.wed',
      thu: 'schedule.days.thu',
      fri: 'schedule.days.fri',
      sat: 'schedule.days.sat',
    },
  },
} as const; 

export default strings; 