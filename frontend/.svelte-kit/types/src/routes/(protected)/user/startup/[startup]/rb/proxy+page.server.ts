// @ts-nocheck
import type { PageServerLoad } from '../rns/$types';

export const load = async ({ fetch, cookies, params }: Parameters<PageServerLoad>[0]) => {
	const response = await fetch(
		`http://127.0.0.1:8000/startups/${params.startup}/allow-roadblocks/`,
		{
			method: 'get',
			headers: {
				Authorization: `Bearer ${cookies.get('Access')}`
			}
		}
	);

	const data = await response.json();

	if (response.ok) {
		const roadblocks = await fetch(
			`http://127.0.0.1:8000/tasks/roadblocks/?startup_id=${params.startup}`,
			{
				method: 'get',
				headers: {
					Authorization: `Bearer ${cookies.get('Access')}`
				}
			}
		);

		const rb_data = await roadblocks.json();

		if (roadblocks.ok) {
			return {
				allow: data,
				roadblocks: rb_data.results,
				startupId: params.startup
			};
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
				console.log(values);
			});
		} catch (error) {
			console.log(error);
		}
	}
};
