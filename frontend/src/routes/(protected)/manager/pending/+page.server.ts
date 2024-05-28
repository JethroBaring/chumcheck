import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const response = await fetch('http://127.0.0.1:8000/startups/ranking-by-urat/', {
		method: 'get',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${cookies.get('Access')}`
		}
	});

	const data = await response.json();
	if (response.ok) {
		return {
			applicants: data
		};
	}
};
