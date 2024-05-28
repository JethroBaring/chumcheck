// @ts-nocheck
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = async ({ locals }: Parameters<LayoutServerLoad>[0]) => {
	if (!locals.user) {
		redirect(302, '/');
	}

	switch (locals.user.type) {
		case 'ME':
			return redirect(302, '/mentor');
		case 'S':
			return redirect(302, '/user');
		case 'M':
			return {
				user: locals.user
			};
		default:
			redirect(302, '/');
	}
};
