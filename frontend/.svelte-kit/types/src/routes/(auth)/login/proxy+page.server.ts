// @ts-nocheck
import { z } from 'zod';
import type { PageServerLoad } from './$types';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, redirect } from '@sveltejs/kit';

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string()
});

export const load = async () => {
	const form = await superValidate(zod(loginSchema));
	return {
		form
	};
};

export const actions = {
	default: async ({ fetch, request }) => {
		const form = await superValidate(request, zod(loginSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const response = await fetch('', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(form)
		});

		const data = await response.json();

		if (response.ok) {
			throw redirect(302, '/');
		}

		return message(form, { text: data.message });
	}
};
;null as any as PageServerLoad;