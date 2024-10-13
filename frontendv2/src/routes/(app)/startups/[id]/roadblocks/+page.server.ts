import { PUBLIC_API_URL } from '$env/static/public';
import { fetchWithAuth } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, fetch, params }) => {
	try {
		const [allowRoadblocks, roadblocks, startup] = await Promise.all([
			fetchWithAuth(`/startups/${params.id}/allow-roadblocks/`, cookies, fetch),
			fetchWithAuth(`/tasks/roadblocks/?startup_id=${params.id}`, cookies, fetch),
			fetchWithAuth(`/startups/${params.id}`, cookies, fetch)
		]);

		const allowRNAData = await allowRoadblocks.json();
		const rnaData = await roadblocks.json();
		const startupData = await startup.json();
    startupData.members.push({
      user_id: startupData.user_id,
      first_name: startupData.leader_first_name,
      last_name: startupData.leader_last_name
    });

		if (allowRoadblocks.ok && roadblocks.ok && startup.ok) {
			return {
				allow: allowRNAData,
				rna: rnaData.results,
				startupId: params.id,
				startup: startupData.results,
				access: cookies.get('Access')
			};
		} else {
			console.error('Error fetching data', {
				allowRoadblocks: allowRoadblocks.status,
				rna: roadblocks.status,
				startup: startup.status
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

export const actions = {
	default: async ({ request, cookies, params }) => {
		const formData = await request.formData();

		const readiness = [
			'Technology',
			'Market',
			'Acceptance',
			'Organizational',
			'Regulatory',
			'Investment'
		];

		try {
			await Promise.all(
				readiness.map(async (r) => {
					await fetch(`${PUBLIC_API_URL}/startup-rna/`, {
						method: 'post',
						headers: {
							'Content-type': 'application/json',
							Authorization: `Bearer ${cookies.get('Access')}`
						},
						body: JSON.stringify({
							startup_id: params.id,
							readiness_level_id: formData.get(`${r}`) as string,
							rna: formData.get(`${r}rna`) as string
						})
					});
				})
			).then((values) => {
				console.log(values);
			});
		} catch (error) {
			console.log(error);
		}
	}
};
