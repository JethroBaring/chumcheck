// @ts-nocheck
import type { LayoutServerLoad } from './$types';

export const load = async ({ params, cookies, url }: Parameters<LayoutServerLoad>[0]) => {
	const current = url.pathname.split('/').pop();
	return {
		startupId: params.startup,
		token: cookies.get('Access'),
		current
	};
};
