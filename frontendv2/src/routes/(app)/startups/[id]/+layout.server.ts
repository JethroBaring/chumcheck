import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ params, url }) => {
	return {
		id: params.id,
    pathname: url.pathname.slice(1).split('/')[2]
	};
};