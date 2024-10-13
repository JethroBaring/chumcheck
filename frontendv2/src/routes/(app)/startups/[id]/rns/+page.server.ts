import type { PageServerLoad } from '../rns/$types';
import { PUBLIC_API_URL } from '$env/static/public';

export const load: PageServerLoad = async ({ fetch, cookies, params }) => {
	const response = await fetch(`${PUBLIC_API_URL}/startups/${params.id}/allow-tasks/`, {
		method: 'get',
		headers: {
			Authorization: `Bearer ${cookies.get('Access')}`
		}
	});

	const data = await response.json();

	if (response.ok) {
		const tasks = await fetch(`${PUBLIC_API_URL}/tasks/tasks/?startup_id=${params.id}`, {
			method: 'get',
			headers: {
				Authorization: `Bearer ${cookies.get('Access')}`
			}
		});

		const tasks_data = await tasks.json();

		if (tasks.ok) {
			const readiness_levels = await fetch(
				`${PUBLIC_API_URL}/readinesslevel/readiness-levels/`,
				{
					method: 'get',
					headers: {
						Authorization: `Bearer ${cookies.get('Access')}`
					}
				}
			);

			const r = await readiness_levels.json();

			if (readiness_levels.ok) {
				return {
					allow: data,
					tasks: tasks_data.results,
					startupOd: params.id,
					technology: r.results.filter((d) => d.readiness_type === 'Technology'),
					organizational: r.results.filter((d) => d.readiness_type === 'Organizational'),
					market: r.results.filter((d) => d.readiness_type === 'Market'),
					regulatory: r.results.filter((d) => d.readiness_type === 'Rregulatory'),
					acceptance: r.results.filter((d) => d.readiness_type === 'Acceptance'),
					investment: r.results.filter((d) => d.readiness_type === 'Invesment'),
					access: cookies.get('Access')
				};
			}
		}
	}
};
