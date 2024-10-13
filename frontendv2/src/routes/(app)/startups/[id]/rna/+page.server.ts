import { PUBLIC_API_URL } from '$env/static/public';
import { fetchWithAuth } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, fetch, params }) => {
	try {
		const [allowRNA, RNA, readiness] = await Promise.all([
			fetchWithAuth(`/startups/${params.id}/allow-rnas/`, cookies, fetch),
			fetchWithAuth(`/startup-rna/?startup_id=${params.id}`, cookies, fetch),
			fetchWithAuth(`/startup-readiness-levels/?startup_id=${params.id}`, cookies, fetch)
		]);

		const allowRNAData = await allowRNA.json();
		const rnaData = await RNA.json();
		const readinessData = await readiness.json();

		if (allowRNA.ok && RNA.ok && readiness.ok) {
			return {
				allow: allowRNAData,
				rna: rnaData.results,
				startupId: params.id,
				readiness: readinessData.results,
				access: cookies.get('Access')
			};
		} else {
			console.error('Error fetching data', {
				allowRNA: allowRNA.status,
				rna: RNA.status,
				readiness: readiness.status
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
        console.log(values)
      })
		} catch (error) {
      console.log(error)
    }
	}
};