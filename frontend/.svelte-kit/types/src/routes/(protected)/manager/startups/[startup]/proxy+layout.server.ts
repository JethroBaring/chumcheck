// @ts-nocheck
import type { LayoutServerLoad } from './$types';
import { PUBLIC_API_URL } from '$env/static/public';

export const load = async ({ params, cookies, url }: Parameters<LayoutServerLoad>[0]) => {
	console.log('url ' + url.pathname);
	const path = url.pathname;
	const current = path.split('/').pop();

	const response = await fetch(`${PUBLIC_API_URL}/startups/${params.startup}`, {
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
