// @ts-nocheck
import type { PageServerLoad } from './$types';

export const load = async ({ cookies }: Parameters<PageServerLoad>[0]) => {
	const response = await fetch('http://127.0.0.1:8000/startups/ranking-by-urat/', {
		method: 'get',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${cookies.get('Access')}`
		}
	});
	const data = await response.json();

	if (response.ok) {
		const mentor = await fetch('http://127.0.0.1:8000/users/?user_type=ME', {
			method: 'get',
			headers: {
				Authorization: `Bearer ${cookies.get('Access')}`
			}
		});

		const mentor_data = await mentor.json();
		return {
			applicants: data,
			mentors: mentor_data.results
		};
	}
};

export const actions = {
	default: async ({ request, cookies, fetch }) => {
		const formData = await request.formData();
		const startups: { startup_id: number; mentor_ids: number[] }[] = [];
		for (let i = 1; i <= 10; i++) {
			const s_id = parseInt(formData.get(`startup${i}Id`) as string);
			const m_id = parseInt(formData.get(`startup${i}Mentor`) as string);

			if (s_id && m_id) {
				startups.push({
					startup_id: s_id,
					mentor_ids: [m_id]
				});
			}
		}

		try {
			await Promise.all(
				startups.map(async (startup) => {
					await fetch(`http://127.0.0.1:8000/startups/${startup.startup_id}/approve-applicant/`, {
						method: 'post',
						headers: {
							'Content-type': 'application/json',
							Authorization: `Bearer ${cookies.get('Access')}`
						}
					});

					await fetch(`http://127.0.0.1:8000/startups/${startup.startup_id}/appoint-mentors/`, {
						method: 'post',
						headers: {
							'Content-type': 'application/json',
							Authorization: `Bearer ${cookies.get('Access')}`
						},
						body: JSON.stringify({
							mentor_ids: startup.mentor_ids
						})
					});
				})
			).then((values) => {
				console.log(values);
			});
		} catch (error) {
			console.log(error);
		}

		console.log(startups);
	}
};