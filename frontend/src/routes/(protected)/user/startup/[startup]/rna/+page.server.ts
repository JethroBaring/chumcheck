import type { PageServerLoad } from './$types';
import { PUBLIC_API_URL } from '$env/static/public';

export const load: PageServerLoad = async ({ params, cookies, fetch }) => {
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
					rna: rna_data.results,
					readiness: r_data.results
				};
			}
		}
};
