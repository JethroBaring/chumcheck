// @ts-nocheck
import type { PageServerLoad } from './$types';

export const load = async ({ params, cookies, fetch }: Parameters<PageServerLoad>[0]) => {
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
					rna: rna_data.results,
					readiness: r_data.results
				};
			}
		}
};
