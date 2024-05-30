// @ts-nocheck
import type { LayoutServerLoad } from './$types';

export const load = async ({ params, cookies, url }: Parameters<LayoutServerLoad>[0]) => {
	console.log("url " + url.pathname)
	const path = url.pathname
	const current = path.split('/').pop();
	return {
		startupId: params.startup,
		token: cookies.get('Access'),
		cur: current
	};
};
