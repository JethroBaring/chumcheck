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
	() => import('./nodes/31'),
	() => import('./nodes/32'),
	() => import('./nodes/33'),
	() => import('./nodes/34'),
	() => import('./nodes/35'),
	() => import('./nodes/36')
];

export const server_loads = [3,4,5,6,7,8,9];

export const dictionary = {
		"/(app)": [~10],
		"/(auth)/forgotpassword": [11,[2]],
		"/(auth)/login": [~12,[2]],
		"/(auth)/logout": [~13,[2]],
		"/(protected)/manager": [~15,[3]],
		"/(protected)/manager/dashboard/pending": [~16,[3,4]],
		"/(protected)/manager/dashboard/qualified": [~17,[3,4]],
		"/(protected)/manager/dashboard/rated": [~18,[3,4]],
		"/(protected)/manager/startups": [~19,[3]],
		"/(protected)/manager/startups/[startup]/i": [~20,[3,5]],
		"/(protected)/manager/startups/[startup]/rb": [~21,[3,5]],
		"/(protected)/manager/startups/[startup]/rl": [~22,[3,5]],
		"/(protected)/manager/startups/[startup]/rna": [~23,[3,5]],
		"/(protected)/manager/startups/[startup]/rns": [~24,[3,5]],
		"/(protected)/mentor": [~25,[6]],
		"/(protected)/mentor/startup/[startup]/i": [~26,[6,7]],
		"/(protected)/mentor/startup/[startup]/rb": [~27,[6,7]],
		"/(protected)/mentor/startup/[startup]/rl": [~28,[6,7]],
		"/(protected)/mentor/startup/[startup]/rna": [~29,[6,7]],
		"/(protected)/mentor/startup/[startup]/rns": [~30,[6,7]],
		"/(auth)/register": [~14,[2]],
		"/(protected)/user": [~31,[8]],
		"/(protected)/user/startup/[startup]/i": [~32,[8,9]],
		"/(protected)/user/startup/[startup]/rb": [~33,[8,9]],
		"/(protected)/user/startup/[startup]/rl": [~34,[8,9]],
		"/(protected)/user/startup/[startup]/rna": [~35,[8,9]],
		"/(protected)/user/startup/[startup]/rns": [~36,[8,9]]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),

	reroute: (() => {})
};

export { default as root } from '../root.svelte';