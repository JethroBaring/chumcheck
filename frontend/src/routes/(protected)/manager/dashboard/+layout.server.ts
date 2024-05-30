import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url, fetch, cookies }) => {
	const current = url.pathname.split('/').pop();
	if (!locals.user) {
		redirect(302, '/');
	}

	if (locals.user.type === 'ME') {
		redirect(302, '/mentor');
	} else if (locals.user.type === 'S') {
		redirect(302, '/user');
	} else if (locals.user.type === 'M') {
		const response = await fetch('http://127.0.0.1:8000/startups/ranking-by-urat/', {
			method: 'get',
			headers: {
				Authorization: `Bearer ${cookies.get('Access')}`
			}
		});

		const data = await response.json();

		if (response.ok) {
			const mentor = await fetch('http://127.0.0.1:8000/users/?user_type=ME', {
				method: 'get',
				headers: {
					Authorization: `Bearer ${cookies.get('Access')}`
				}
			});

			const mentor_data = await mentor.json();

			if(mentor.ok) {
				return {
					startups: data.filter((d) => d.qualification_status === 2),
					user: locals.user,
					current,
					mentors: mentor_data.results
				}
			}
		}
	} else {
		redirect(302, '/');
	}
};
