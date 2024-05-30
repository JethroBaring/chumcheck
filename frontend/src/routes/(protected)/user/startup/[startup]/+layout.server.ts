import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ params, cookies, url }) => {
	const current = url.pathname.split('/').pop();
	return {
		startupId: params.startup,
		token: cookies.get('Access'),
		current
	};
};
