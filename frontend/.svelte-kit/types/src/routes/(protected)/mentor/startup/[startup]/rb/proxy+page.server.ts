// @ts-nocheck
import type { PageServerLoad } from '../rns/$types';
import { PUBLIC_API_URL } from '$env/static/public';

export const load = async ({ fetch, cookies, params }: Parameters<PageServerLoad>[0]) => {
	const response = await fetch(
		`${PUBLIC_API_URL}/startups/${params.startup}/allow-roadblocks/`,
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
			`${PUBLIC_API_URL}/tasks/roadblocks/?startup_id=${params.startup}`,
			{
				method: 'get',
				headers: {
					Authorization: `Bearer ${cookies.get('Access')}`
				}
			}
		);

		const rb_data = await roadblocks.json();

		if (roadblocks.ok) {
			const startup = await fetch(`${PUBLIC_API_URL}/startups/${params.startup}`, {
				method: 'get',
				headers: {
					Authorization: `Bearer ${cookies.get('Access')}`
				}
			});

			const s = await startup.json();
			s.members.push({
				user_id: s.user_id,
				first_name: s.leader_first_name,
				last_name: s.leader_last_name
			})
			if (startup.ok) {
				return {
					startup: s,
					allow: data,
					roadblocks: rb_data.results,
					startupId: params.startup,
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
				console.log(values);
			});
		} catch (error) {
			console.log(error);
		}
	}
};
