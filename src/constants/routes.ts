// Route constants for the application
export const ROUTES = {
  // Dashboard
  HOME: '/',
  ANALYTICS: '/analytics',
  HEATMAPS: '/heatmaps',

  // Financial
  DOLLARS: '/dollars',
  LIQUIDATION: '/liquidation',
  JUDGMENT_PERFORMANCE: '/judgment-performance',

  // Inventory
  INVENTORY: '/inventory',
  INV_CHART_BATCHES: '/inv-chart-batches',

  // Administration
  ADMINISTRATION: '/administration',
  SETTINGS: '/settings',
  PROFILE: '/profile',

  // Reports
  REPORTS: '/reports',
  SCHEDULE_BATCH_REPORT: '/schedule-batch-report',
  TIMELINE: '/timeline',

  // Support
  FAQ: '/faq',
  HELP_CENTER: '/help-center',
  CLIENT_GUIDE: '/client-guide',
  NOTICES: '/notices',

  // Shared
  DOCUMENT_TRANSFER: '/document-transfer',
  STATE_ISSUES: '/state-issues',
  NOT_FOUND: '*',
} as const

export type RouteKey = keyof typeof ROUTES
export type RoutePath = typeof ROUTES[RouteKey]