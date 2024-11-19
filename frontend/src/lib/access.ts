const startupModule = {
	name: 'Startups',
	link: 'startups',
	hideSubmodule: true,
	subModule: [
		{
			name: 'Readiness',
			link: 'readiness-level',
			subModule: []
		},
		{
			name: 'RNA',
			link: 'rna',
			subModule: []
		},
		{
			name: 'RNS',
			link: 'rns',
			subModule: []
		},
		{
			name: 'Initiatives',
			link: 'initiatives',
			subModule: []
		},
		{
			name: 'Roadblocks',
			link: 'roadblocks',
			subModule: []
		},
		{
			name: 'Progress',
			link: 'progress-report',
			subModule: []
		},
		{
			name: 'Settings',
			link: 'settings',
			subModule: [
				{
					name: 'General',
					link: 'general'
				},
				{
					name: 'Members',
					link: 'members'
				},
				{
					name: 'Capsule Proposal',
					link: 'capsule_proposal'
				},
				{
					name: 'Elevate',
					link: 'elevate'
				},
			]
		}
	]
};

const settingsModule = {
	name: 'Account',
	link: 'account',
	hideSubmodule: true,
	subModule: [
		{
			name: 'Profile',
			link: 'profile',
			subModule: []
		},
		{
			name: 'Appearance',
			link: 'appearance',
			subModule: []
		},
		// {
		// 	name: 'Change Password',
		// 	link: 'password'
		// }
	]
};

export const access = {
	roles: {
		Startup: {
			modules: [startupModule, settingsModule]
		},
		Mentor: {
			modules: [startupModule, settingsModule]
		},
		Manager: {
			modules: [
				{
					name: 'Applications',
					link: 'applications',
					subModule: []
				},
				{
					name: 'Analytics',
					link: 'analytics',
					subModule: []
				},
				settingsModule
			]
		}
	}
};
