import type { LayoutServerLoad } from './$types';
import { PUBLIC_API_URL } from '$env/static/public';

export const load: LayoutServerLoad = async ({ params, cookies, url }) => {
	const current = url.pathname.split('/').pop();
	const response = await fetch(`${PUBLIC_API_URL}/startups/${params.startup}`, {
		method: 'get',
		headers: {
			Authorization: `Bearer ${cookies.get('Access')}`
		}
	});

	const data = await response.json();
	if (response.ok) {
		return {
			startupId: params.startup,
			token: cookies.get('Access'),
			current,
			startup: data
		};
	}
};
