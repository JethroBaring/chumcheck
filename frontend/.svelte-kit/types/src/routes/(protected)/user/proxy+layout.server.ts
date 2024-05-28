// @ts-nocheck
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = async ({ locals }: Parameters<LayoutServerLoad>[0]) => {
	if (!locals.user) {
		redirect(302, '/');
	}

	switch (locals.user.type) {
		case 'M':
			return redirect(302, '/manager');
		case 'ME':
			return redirect(302, '/mentor');
		case 'S':
			return {
				user: locals.user
			};
		default:
			redirect(302, '/');
	}
};
