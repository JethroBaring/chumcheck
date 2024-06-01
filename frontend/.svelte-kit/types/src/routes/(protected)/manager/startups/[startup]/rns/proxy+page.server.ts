// @ts-nocheck
import type { PageServerLoad } from '../rns/$types';

export const load = async ({ fetch, cookies, params }: Parameters<PageServerLoad>[0]) => {
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
			const readiness_levels = await fetch(
				'http://127.0.0.1:8000/readinesslevel/readiness-levels/',
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
					startupOd: params.startup,
					technology: r.results.filter((d) => d.readiness_type === 'Technology'),
					organizational: r.results.filter((d) => d.readiness_type === 'Organizational'),
					market: r.results.filter((d) => d.readiness_type === 'Market'),
					regulatory: r.results.filter((d) => d.readiness_type === 'Rregulatory'),
					acceptance: r.results.filter((d) => d.readiness_type === 'Acceptance'),
					investment: r.results.filter((d) => d.readiness_type === 'Invesment')
				};
			}
		}
	}
};
