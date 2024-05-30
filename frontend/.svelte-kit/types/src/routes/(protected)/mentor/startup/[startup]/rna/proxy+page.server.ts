// @ts-nocheck
import type { PageServerLoad } from '../rns/$types';

export const load = async ({ fetch, cookies, params }: Parameters<PageServerLoad>[0]) => {
	const response = await fetch(`http://127.0.0.1:8000/startups/${params.startup}/allow-rnas/`, {
		method: 'get',
		headers: {
			Authorization: `Bearer ${cookies.get('Access')}`
		}
	});

	const data = await response.json();

	if (response.ok) {
		const rna = await fetch(`http://127.0.0.1:8000/startup-rna/?startup_id=${params.startup}`, {
			method: 'get',
			headers: {
				Authorization: `Bearer ${cookies.get('Access')}`
			}
		});

		const rna_data = await rna.json();

		if (rna.ok) {
			const readiness = await fetch(
				`http://127.0.0.1:8000/startup-readiness-levels/?startup_id=${params.startup}`,
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
					readiness: r_data.results
				};
			}
		}
	}
};

export const actions = {
	default: async ({ request, cookies, params }) => {
		const formData = await request.formData();

		let readiness = [
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
					await fetch(`http://127.0.0.1:8000/startup-rna/`, {
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
