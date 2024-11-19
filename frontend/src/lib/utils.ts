import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { browser } from '$app/environment';
import type { Role } from './types';

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
