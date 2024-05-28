// @ts-nocheck
import type { LayoutServerLoad } from './$types';

export const load = async ({ params, cookies }: Parameters<LayoutServerLoad>[0]) => {
	return {
		startupId: params.startup,
		token: cookies.get('Access')
	};
};
