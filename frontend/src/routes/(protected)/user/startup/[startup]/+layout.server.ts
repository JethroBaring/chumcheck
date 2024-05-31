import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ params, cookies, url }) => {
	const current = url.pathname.split('/').pop();
	const response = await fetch(`http://127.0.0.1:8000/startups/${params.startup}`, {
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
