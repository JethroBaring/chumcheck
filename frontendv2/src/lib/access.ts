export const access = {
	roles: {
		startup: [
			{
				module: 'Startups',
				subModule: []
			},
			{
				module: 'Settings',
				subModule: ['Profile', 'Appearance', 'ChangePassword']
			}
		],
		mentor: [
			{
				module: 'Startups',
				subModule: []
			},
			{
				module: 'Settings',
				subModule: ['Profile', 'Appearance', 'Change Password']
			}
		],
		manager: [
			{
				module: 'Dashboard',
				subModule: []
			},
			{
				module: 'Analytics',
				subModule: ['Profile', 'Appearance', 'Change Password']
			},
			{
				module: 'Settings',
				subModule: ['Profile', 'Appearance', 'Change Password']
			}
		]
	}
};
