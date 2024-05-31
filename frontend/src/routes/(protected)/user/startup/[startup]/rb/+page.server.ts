import type { PageServerLoad } from '../rns/$types';

export const load: PageServerLoad = async ({ fetch, cookies, params, locals }) => {
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
		const response = await fetch(`http://127.0.0.1:8000/startups/${params.startup}`, {
			method: 'get',
			headers: {
				Authorization: `Bearer ${cookies.get('Access')}`
			}
		});

		const s = await response.json();
			s.members.push({
				user_id: s.user_id,
				first_name: s.leader_first_name,
				last_name: s.leader_last_name
			})

		if (response.ok) {
			return {
				startup: s,
				roadblocks: rb_data.results,
				startupId: params.startup,
				userId: locals.user.id
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
