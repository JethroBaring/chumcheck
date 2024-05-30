// @ts-nocheck
import type { PageServerLoad } from './$types';

export const load = async ({ fetch, cookies, params }: Parameters<PageServerLoad>[0]) => {
	const readiness_level = await fetch(
		`http://127.0.0.1:8000/startup-readiness-levels/?startup_id=${params.startup}`,
		{
			method: 'get',
			headers: {
				Authorization: `Bearer ${cookies.get('Access')}`
			}
		}
	);

	const data = await readiness_level.json();

	if (readiness_level.ok) {
		return {
			readiness: data.results
		};
	}
};
