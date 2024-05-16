export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10')
];

export const server_loads = [2];

export const dictionary = {
		"/(app)": [~4,[2]],
		"/(auth)/forgotpassword": [8,[3]],
		"/(auth)/login": [~9,[3]],
		"/(auth)/register": [~10,[3]],
		"/(app)/startups": [5,[2]],
		"/(app)/startups/[startup]": [~6,[2]],
		"/(app)/test": [7,[2]]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),

	reroute: (() => {})
};

export { default as root } from '../root.svelte';