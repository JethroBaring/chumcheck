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
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15'),
	() => import('./nodes/16'),
	() => import('./nodes/17'),
	() => import('./nodes/18'),
	() => import('./nodes/19'),
	() => import('./nodes/20'),
	() => import('./nodes/21'),
	() => import('./nodes/22'),
	() => import('./nodes/23'),
	() => import('./nodes/24'),
	() => import('./nodes/25'),
	() => import('./nodes/26'),
	() => import('./nodes/27'),
	() => import('./nodes/28'),
	() => import('./nodes/29'),
	() => import('./nodes/30'),
	() => import('./nodes/31')
];

export const server_loads = [3, 4, 5, 6, 7];

export const dictionary = {
	'/(app)': [~8],
	'/(auth)/forgotpassword': [12, [2]],
	'/(auth)/login': [~13, [2]],
	'/(auth)/logout': [~14, [2]],
	'/(protected)/manager': [~16, [3]],
	'/(protected)/manager/pending': [~17, [3]],
	'/(protected)/manager/qualified': [~18, [3]],
	'/(protected)/manager/rated': [~19, [3]],
	'/(protected)/mentor': [~20, [4]],
	'/(protected)/mentor/startup/[startup]/i': [21, [4, 5]],
	'/(protected)/mentor/startup/[startup]/rb': [22, [4, 5]],
	'/(protected)/mentor/startup/[startup]/rl': [~23, [4, 5]],
	'/(protected)/mentor/startup/[startup]/rna': [24, [4, 5]],
	'/(protected)/mentor/startup/[startup]/rns': [~25, [4, 5]],
	'/(auth)/register': [~15, [2]],
	'/(app)/startups': [9],
	'/(app)/startups/[startup]': [~10],
	'/(app)/test': [11],
	'/(protected)/user': [~26, [6]],
	'/(protected)/user/startup/[startup]/i': [27, [6, 7]],
	'/(protected)/user/startup/[startup]/rb': [28, [6, 7]],
	'/(protected)/user/startup/[startup]/rl': [29, [6, 7]],
	'/(protected)/user/startup/[startup]/rna': [30, [6, 7]],
	'/(protected)/user/startup/[startup]/rns': [~31, [6, 7]]
};

export const hooks = {
	handleError: ({ error }) => {
		console.error(error);
	},

	reroute: () => {}
};

export { default as root } from '../root.svelte';
