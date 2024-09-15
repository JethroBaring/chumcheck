import { PUBLIC_API_URL } from '$env/static/public';
import type { PageServerLoad } from '../rns/$types';

export const load: PageServerLoad = async ({ fetch, cookies, params }) => {
	const response = await fetch(`${PUBLIC_API_URL}/startups/${params.startup}/allow-tasks/`, {
		method: 'get',
		headers: {
			Authorization: `Bearer ${cookies.get('Access')}`
		}
	});

	const data = await response.json();

	if (response.ok) {
		const tasks = await fetch(`${PUBLIC_API_URL}/tasks/tasks/?startup_id=${params.startup}`, {
			method: 'get',
			headers: {
				Authorization: `Bearer ${cookies.get('Access')}`
			}
		});

		const tasks_data = await tasks.json();

		if (tasks.ok) {
			return {
				allow: data,
				tasks: tasks_data.results,
				startupOd: params.startup,
				access: cookies.get('Access')
			};
		}
	}
};
