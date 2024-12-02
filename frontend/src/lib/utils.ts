import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { browser } from '$app/environment';
import type { Role } from './types';
import axiosInstance from './axios';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const readiness = [
	'Technology',
	'Investment',
	'Acceptance',
	'Regulatory',
	'Organizational',
	'Market'
];

export const getRole = (role: 'M' | 'ME' | 'S' | 'MME') => {
	const roles = {
		M: 'Manager',
		ME: 'Mentor',
		S: 'Startup',
		MME: 'Manager as Mentor'
	};

	return roles[`${role}`];
};

export const setLocal = (name: string, value: any) => {
	if (browser) {
		localStorage.setItem(name, value);
	}
};

export const getLocal = (name: string) => {
	if (browser) {
		return localStorage.getItem(name);
	}
};

export const getColumns = () => {
	return [
		{
			name: 'Scheduled',
			value: 4,
			items: [],
			show: true
		},
		{
			name: 'Track',
			value: 5,
			items: [],
			show: true
		},
		{
			name: 'Delayed',
			value: 3,
			items: [],
			show: true
		},
		{
			name: 'Completed',
			value: 6,
			items: [],
			show: true
		},
		{
			name: 'Discontinued',
			value: 2,
			items: [],
			show: true
		}
	];
};

export const getReadiness = () => {
	return [
		{
			name: 'Technology',
			show: true
		},
		{
			name: 'Investment',
			show: true
		},
		{
			name: 'Regulatory',
			show: true
		},
		{
			name: 'Acceptance',
			show: true
		},
		{
			name: 'Organizational',
			show: true
		},
		{
			name: 'Market',
			show: true
		}
	];
};

export const updateTab = (name: string, tab: string) => {
	if (getAllowedTabs(name).includes(tab)) {
		setLocal(name, tab);
		const url = new URL(window.location.href);
		url.searchParams.set('tab', tab);
		window.history.replaceState({}, '', url);

		return tab;
	} else {
		return getAllowedTabs(name)[0];
	}
};

export const getAllowedTabs = (name: string) => {
	return [name, `ai-${name}`];
};

export const isMentor = (role: Role) => {
	if (['Mentor', 'Manager as Mentor'].includes(role)) return true;

	return false;
};

export const getSelectedTab = (name: string): string => {
	if (getAllowedTabs(name).includes(getLocal(name) ?? '')) return getLocal(name)!;
	return name;
};

export const getSavedTab = (name: string, searchParam: any) => {
	const savedTab = getLocal('initiatives');
	let selectedTab;

	if (searchParam && getAllowedTabs(name).includes(searchParam)) {
		selectedTab = searchParam;
		setLocal(name, searchParam);
	} else if (savedTab && getAllowedTabs(name).includes(savedTab)) {
		selectedTab = savedTab;

		const url = new URL(window.location.href);
		url.searchParams.set('tab', savedTab);
		window.history.replaceState({}, '', url);
	} else {
		selectedTab = name;
		const url = new URL(window.location.href);
		url.searchParams.set('tab', name);
		window.history.replaceState({}, '', url);
		setLocal(name, name);
	}

	return selectedTab;
};

export const getData = async (url: string, access: string) => {
	const response = await axiosInstance.get(url, {
		headers: {
			Authorization: `Bearer ${access}`
		}
	});
	return response.data;
};

export const zIndex = ['z-50', 'z-40', 'z-30', 'z-20', 'z-10', 'z-0'];

export const profileColor = [
	'bg-red-500',
	'bg-blue-500',
	'bg-green-500',
	'bg-yellow-500',
	'bg-purple-500',
	'bg-pink-500',
	'bg-orange-500',
	'bg-teal-500',
	'bg-indigo-500',
	'bg-cyan-500',
	'bg-lime-500',
	'bg-amber-500',
	'bg-rose-500',
	'bg-sky-500',
	'bg-emerald-500',
	'bg-violet-500',
	'bg-fuchsia-500',
	'bg-gray-500',
	'bg-slate-500',
	'bg-zinc-500',
	'bg-stone-500'
];

export function getProfileColor(firstName: string) {
	if (!firstName || typeof firstName !== 'string') {
		return 'bg-gray-500'; // Default color if no valid name is provided
	}

	// Get the ASCII value of the first letter, convert it to uppercase for consistency
	const firstChar = firstName[0].toUpperCase();
	const asciiValue = firstChar.charCodeAt(0);

	// Map the ASCII value to an index in the profileColor array
	const colorIndex = asciiValue % profileColor.length;

	return profileColor[colorIndex];
}

export const getReadinessTypes = () => {
	return [
		{
			id: 1,
			name: 'Technology'
		},
		{
			id: 2,
			name: 'Market'
		},
		{
			id: 3,
			name: 'Acceptance'
		},
		{
			id: 4,
			name: 'Organizational'
		},
		{
			id: 5,
			name: 'Regulatory'
		},
		{
			id: 6,
			name: 'Investment'
		}
	];
};

export const getReadinessLevels = (
	readiness: 'Technology' | 'Market' | 'Acceptance' | 'Organizational' | 'Regulatory' | 'Investment'
) => {
	const levels = {
		Technology: [
			{ id: 1, level: 1 },
			{ id: 2, level: 2 },
			{ id: 3, level: 3 },
			{ id: 4, level: 4 },
			{ id: 5, level: 5 },
			{ id: 6, level: 6 },
			{ id: 7, level: 7 },
			{ id: 8, level: 8 },
			{ id: 9, level: 9 }
		],
		Market: [
			{ id: 10, level: 1 },
			{ id: 11, level: 2 },
			{ id: 12, level: 3 },
			{ id: 13, level: 4 },
			{ id: 14, level: 5 },
			{ id: 15, level: 6 },
			{ id: 16, level: 7 },
			{ id: 17, level: 8 },
			{ id: 18, level: 9 }
		],
		Acceptance: [
			{ id: 19, level: 1 },
			{ id: 20, level: 2 },
			{ id: 21, level: 3 },
			{ id: 22, level: 4 },
			{ id: 23, level: 5 },
			{ id: 24, level: 6 },
			{ id: 25, level: 7 },
			{ id: 26, level: 8 },
			{ id: 27, level: 9 }
		],
		Organizational: [
			{ id: 28, level: 1 },
			{ id: 29, level: 2 },
			{ id: 30, level: 3 },
			{ id: 31, level: 4 },
			{ id: 32, level: 5 },
			{ id: 33, level: 6 },
			{ id: 34, level: 7 },
			{ id: 35, level: 8 },
			{ id: 36, level: 9 }
		],
		Regulatory: [
			{ id: 37, level: 1 },
			{ id: 38, level: 2 },
			{ id: 39, level: 3 },
			{ id: 40, level: 4 },
			{ id: 41, level: 5 },
			{ id: 42, level: 6 },
			{ id: 43, level: 7 },
			{ id: 44, level: 8 },
			{ id: 45, level: 9 }
		],
		Investment: [
			{ id: 46, level: 1 },
			{ id: 47, level: 2 },
			{ id: 48, level: 3 },
			{ id: 49, level: 4 },
			{ id: 50, level: 5 },
			{ id: 51, level: 6 },
			{ id: 52, level: 7 },
			{ id: 53, level: 8 },
			{ id: 54, level: 9 }
		]
	};

	return levels[readiness];
};

export const getStatusName = (s: 2 | 3 | 4 | 5 | 6) => {
	const status = {
		6: 'Completed',
		5: 'Track',
		4: 'Scheduled',
		3: 'Delayed',
		2: 'Discontinued'
	};

	return status[s];
};
