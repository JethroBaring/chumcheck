// @ts-nocheck
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';

export const load = async ({ locals }: Parameters<PageServerLoad>[0]) => {
	console.log("test")
	if (!locals.user) {
		throw redirect(302, '/');
	}
};

export const actions = {
	default: ({ cookies }) => {
		cookies.set('Access', '', {
			path: '/',
			expires: new Date(0)
		});

		cookies.set('Refresh', '', {
			path: '/',
			expires: new Date(0)
		});

		throw redirect(302, '/');
	}
};
