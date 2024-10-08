import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../rns/$types';
import { PUBLIC_API_URL } from '$env/static/public';

export const load: PageServerLoad = async ({ params, fetch, cookies }) => {
	const response = await fetch(`${PUBLIC_API_URL}/startups/${params.startup}/`, {
		method: 'get',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${cookies.get('Access')}`
		}
	});

	const data = await response.json();
	if (response.ok) {
		const rubrics = await fetch(`${PUBLIC_API_URL}/readinesslevel/readiness-levels/`, {
			method: 'get',
			headers: {
				Authorization: `Bearer ${cookies.get('Access')}`
			}
		});

		const rubrics2 = await fetch(`${PUBLIC_API_URL}/readinesslevel/readiness-levels/?page=2`, {
			method: 'get',
			headers: {
				Authorization: `Bearer ${cookies.get('Access')}`
			}
		});

		const haveScores = await fetch(
			`${PUBLIC_API_URL}/readiness-level-criterion-answers/?page_size=324&startup_id=${params.startup}`,
			{
				method: 'get',
				headers: {
					Authorization: `Bearer ${cookies.get('Access')}`
				}
			}
		);

		const readiness_level = await fetch(
			`${PUBLIC_API_URL}/startup-readiness-levels/?startup_id=${params.startup}`,
			{
				method: 'get',
				headers: {
					Authorization: `Bearer ${cookies.get('Access')}`
				}
			}
		);

		const rubrics_data = await rubrics.json();
		const rubrics2_data = await rubrics2.json();
		const scores_data = await haveScores.json();
		const readiness_data = await readiness_level.json();

		if (rubrics.ok && rubrics2.ok && haveScores.ok && readiness_level.ok) {
			return {
				info: data,
				questions: rubrics_data.results.concat(rubrics2_data.results),
				access: cookies.get('Access'),
				scores: scores_data.results,
				readiness: readiness_data.results
			};
		}
	}

	throw error(404);
};

export const actions = {
	default: async ({ request, fetch, params, cookies }) => {
		const formData = await request.formData();
		const types = [
			'technology',
			'market',
			'acceptance',
			'organizational',
			'regulatory',
			'investment'
		];

		const answers: { startup_id: number; criterion_id: number; score: number; remark: string }[] =
			[];

		const readinesslevels: { startup_id: number; readiness_level_id: number }[] = [];

		types.forEach((type) => {
			readinesslevels.push({
				startup_id: Number.parseInt(params.startup as string),
				readiness_level_id: parseInt(formData.get(`${type}ReadinessLevel`) as string)
			});
			for (let level = 1; level <= 9; level++) {
				for (let criteria = 1; criteria <= 6; criteria++) {
					answers.push({
						startup_id: Number.parseInt(params.startup as string),
						criterion_id: Number.parseInt(
							formData.get(`${type}Criteria${level}${criteria}`) as string
						),
						score: Number.parseInt(formData.get(`${type}${level}${criteria}`) as string),
						remark: formData.get(`${type}Remark${level}${criteria}`) as string
					});
				}
			}
		});
		try {
			const rubrics_scores = await fetch(
				`${PUBLIC_API_URL}/readiness-level-criterion-answers/bulk-create/`,
				{
					method: 'post',
					headers: {
						'Content-type': 'application/json',
						Authorization: `Bearer ${cookies.get('Access')}`
					},
					body: JSON.stringify({
						criterion_answers: answers
					})
				}
			);

			if (rubrics_scores.ok) {
				const levels = await fetch(`${PUBLIC_API_URL}/startup-readiness-levels/bulk-create/`, {
					method: 'post',
					headers: {
						'Content-type': 'application/json',
						Authorization: `Bearer ${cookies.get('Access')}`
					},
					body: JSON.stringify({
						startup_readiness_levels: readinesslevels
					})
				});

				if (levels.ok) {
					throw redirect(302, `/mentor/startups/qualified/${params.applicant}`);
				}
			}
		} catch (error) {
			console.log(error);
		}
	}
}
