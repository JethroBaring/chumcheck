import { PUBLIC_API_URL } from '$env/static/public';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const response = await fetch(`${PUBLIC_API_URL}/startups/ranking-by-rubrics/`, {
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
