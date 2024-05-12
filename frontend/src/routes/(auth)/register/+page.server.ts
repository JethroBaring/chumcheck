import { z } from 'zod';
import type { PageServerLoad } from './$types';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, redirect } from '@sveltejs/kit';

const registerSchema = z.object({
	firstName: z.string(),
	lastName: z.string(),
	email: z.string().email(),
	password: z.string().min(8),
	repeatPassword: z.string().min(8)
});

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(registerSchema));
	return {
		form
	};
};

export const actions = {
	default: async ({ fetch, request }) => {
		const form = await superValidate(request, zod(registerSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		if (form.data.password !== form.data.repeatPassword) {
			return message(form, { text: 'Password do not match' });
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
