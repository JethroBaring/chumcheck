import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ params, cookies, url }) => {
	console.log("url " + url.pathname)
	const path = url.pathname
	const current = path.split('/').pop();
	return {
		startupId: params.startup,
		token: cookies.get('Access'),
		cur: current
	};
};
