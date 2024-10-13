import { fetchWithAuth } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, fetch, params }) => {
	try {
		const [allowInitiatives, tasks] = await Promise.all([
			fetchWithAuth(`/startups/${params.id}/allow-initatives/`, cookies, fetch),
			fetchWithAuth(`/tasks/tasks/?startup_id=${params.id}`, cookies, fetch)
		]);

		const allowInitiativesData = await allowInitiatives.json();
		const tasksData = await tasks.json();

		if (allowInitiatives.ok && tasks.ok) {
			const tasks_ids = tasksData.results.map((d: any) => d.id);

			const initiativesResults = await Promise.all(
				tasks_ids.map(async (task: any) => {
					const response = await fetchWithAuth(
						`/tasks/initiatives/?task_id=${task}`,
						cookies,
						fetch
					);

					const data = await response.json();

					if (response.ok) {
						return data.results;
					}
				})
			).then((arrayOfArrays) => {
				// eslint-disable-next-line prefer-spread
				return [].concat(...arrayOfArrays);
			});

			return {
				allow: allowInitiativesData,
				tasks: tasksData.results,
				initiatives: initiativesResults,
				access: cookies.get('Access')
			};
		} else {
			console.error('Error fetching data', {
				allowStatus: allowInitiatives.status,
				tasksStatus: tasks.status,
			});
		}
	} catch (error) {
		console.error('Error during load:', error);
		return {
			applicants: [],
			mentors: [],
			rubricsApplicants: [],
			access: cookies.get('Access')
		};
	}
};
