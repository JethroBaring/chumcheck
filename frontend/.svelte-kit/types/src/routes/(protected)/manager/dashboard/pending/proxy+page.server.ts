// @ts-nocheck
import type { PageServerLoad } from './$types';

export const load = async ({ cookies }: Parameters<PageServerLoad>[0]) => {
	const response = await fetch('http://127.0.0.1:8000/startups/ranking-by-urat/', {
		method: 'get',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${cookies.get('Access')}`
		}
	});

	const data = await response.json();
	if (response.ok) {
		console.log(data)
		return {
			applicants: data,
			access: cookies.get('Access')
		};
	}
};
