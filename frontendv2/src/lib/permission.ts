export const permissions = {
  startup: {
    view: ['startups', 'settings'],
    edit: ['profile', 'appearance', 'changePassword'],
    create: ['application'],
    generate: []
  },
  mentor: {
    view: ['startups', 'settings'],
    edit: [],
    create: [],
    generate: ['rna', 'rns', 'initiatives', 'roadblocks', 'readinessLevels'],
  },
  manager: {
    view: ['dashboard', 'analytics', 'settings'],
    edit: [],
    create: [],
    generate: [],
  }
}