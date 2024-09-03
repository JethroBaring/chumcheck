import type { PageServerLoad } from '../rns/$types';

export const load: PageServerLoad = async ({ fetch, cookies, params }) => {
	const response = await fetch(`http://127.0.0.1:8000/startups/${params.startup}/allow-tasks/`, {
		method: 'get',
		headers: {
			Authorization: `Bearer ${cookies.get('Access')}`
		}
	});

	const data = await response.json();

	if (response.ok) {
		const tasks = await fetch(`http://127.0.0.1:8000/tasks/tasks/?startup_id=${params.startup}`, {
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
