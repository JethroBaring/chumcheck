export const permissions = {
  // Dashboard Module
  dashboard: {
    canView: 'can_view_dashboard',
  },

  // Startups Module
  startups: {
    canView: 'can_view_startups',
    canApply: 'can_apply_startups',
    details: {
      canViewRNA: 'can_view_rna',
      canViewRNS: 'can_view_rns',
      canViewInitiatives: 'can_view_initiatives',
      canViewRoadblocks: 'can_view_roadblocks',
      canViewReadinessLevels: 'can_view_readiness_levels',

      // Actions
      canGenerateRNA: 'can_generate_rna',
      canGenerateRNS: 'can_generate_rns',
      canGenerateInitiatives: 'can_generate_initiatives',
      canGenerateRoadblocks: 'can_generate_roadblocks',
      canAnswerRubrics: 'can_answer_rubrics',
    }
  },

  // Analytics Module
  analytics: {
    canView: 'can_view_analytics',
  },

  // Settings Module
  settings: {
    canView: 'can_view_settings',
    canViewProfile: 'can_view_profile',
    canEditProfile: 'can_edit_profile', // Added edit capability for profile
    canViewAppearance: 'can_view_appearance',
    canEditAppearance: 'can_edit_appearance',
    canViewChangePassword: 'can_view_change_password',
    canEditChangePassword: 'can_edit_change_password',
    canToggleMentorRole: 'can_toggle_mentor_role',
  },

  // UI Permissions
  ui: {
    canViewNavbarDashboard: 'can_view_navbar_dashboard',
    canViewNavbarStartups: 'can_view_navbar_startups',
    canViewNavbarAnalytics: 'can_view_navbar_analytics',
    canViewNavbarSettings: 'can_view_navbar_settings',
  },
}

// Base permissions for startups and settings
const baseStartupDetailsPermission = [
  permissions.startups.details.canViewRNA,
  permissions.startups.details.canViewRNS,
  permissions.startups.details.canViewInitiatives,
  permissions.startups.details.canViewRoadblocks,
  permissions.startups.details.canViewReadinessLevels,
]

const baseSettingsPermission = [
  permissions.settings.canViewProfile,
  permissions.settings.canViewAppearance,
  permissions.settings.canViewChangePassword,
]

// Role-based permissions, extending startup base
export const roles = {
  startup: [
    permissions.startups.canView,
    permissions.settings.canView,
    permissions.startups.canApply,
    ...baseStartupDetailsPermission,
    ...baseSettingsPermission
  ],
  mentor: [
    permissions.startups.canView,
    permissions.settings.canView,
    permissions.startups.details.canGenerateRNA,
    permissions.startups.details.canGenerateRNS,
    permissions.startups.details.canGenerateInitiatives,
    permissions.startups.details.canGenerateRoadblocks,
    permissions.startups.details.canAnswerRubrics,
    ...baseStartupDetailsPermission,
    ...baseSettingsPermission
  ],
  manager: [
    permissions.startups.canView,
    permissions.settings.canView,
    permissions.settings.canToggleMentorRole,
    ...baseStartupDetailsPermission,
    ...baseSettingsPermission
  ]
}
