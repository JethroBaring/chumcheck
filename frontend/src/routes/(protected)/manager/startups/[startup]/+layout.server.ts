import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ params, cookies, url }) => {
	console.log('url ' + url.pathname);
	const path = url.pathname;
	const current = path.split('/').pop();

	const response = await fetch(`http://127.0.0.1:8000/startups/${params.startup}`, {
		method: 'get',
		headers: {
			Authorization: `Bearer ${cookies.get('Access')}`
		}
	});

	const data = await response.json();

	if (response.ok) {
		return {
			startup: data,
			startupId: params.startup,
			token: cookies.get('Access'),
			cur: current
		};
	}
};
