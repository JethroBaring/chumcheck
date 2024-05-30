// @ts-nocheck
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = ({ locals }: Parameters<PageServerLoad>[0]) => {
	if (locals.user) {
		if (locals.user.type === 'S') {
			throw redirect(302, '/user');
		} else if (locals.user.type === 'M') {
			throw redirect(302, '/manager/dashboard/pending');
		} else {
			throw redirect(302, '/mentor');
		}
	}
};
