import type { PageServerLoad } from '../rns/$types';
import { PUBLIC_API_URL } from '$env/static/public';

export const load: PageServerLoad = async ({ fetch, cookies, params }) => {
	const response = await fetch(`${PUBLIC_API_URL}/startups/${params.startup}/allow-rnas/`, {
		method: 'get',
		headers: {
			Authorization: `Bearer ${cookies.get('Access')}`
		}
	});

	const data = await response.json();

	if (response.ok) {
		const rna = await fetch(`${PUBLIC_API_URL}/startup-rna/?startup_id=${params.startup}`, {
			method: 'get',
			headers: {
				Authorization: `Bearer ${cookies.get('Access')}`
			}
		});

		const rna_data = await rna.json();

		if (rna.ok) {
			const readiness = await fetch(
				`${PUBLIC_API_URL}/startup-readiness-levels/?startup_id=${params.startup}`,
				{
					method: 'get',
					headers: {
						Authorization: `Bearer ${cookies.get('Access')}`
					}
				}
			);

			const r_data = await readiness.json();

			if (readiness.ok) {
				return {
					allow: data,
					rna: rna_data.results,
					startupId: params.startup,
					readiness: r_data.results,
					access: cookies.get('Access')
				};
			}
		}
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
              startup_id: params.startup,
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
