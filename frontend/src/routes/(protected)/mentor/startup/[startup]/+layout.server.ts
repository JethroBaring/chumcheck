import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ params, cookies }) => {
	return {
		startupId: params.startup,
		token: cookies.get('Access')
	};
};
