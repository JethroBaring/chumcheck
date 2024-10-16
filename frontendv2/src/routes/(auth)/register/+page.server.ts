import { PUBLIC_API_URL } from '$env/dynamic/public';
import { z } from 'zod';
import type { PageServerLoad } from './$types';
import { message, setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';

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

		const { firstName, lastName, email, password, repeatPassword } = form.data;

		if (password !== repeatPassword) {
			return setError(form, 'repeatPassword', 'Password do not match');
		}

		const response = await fetch(`${PUBLIC_API_URL}/users/signup/`, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify({
				first_name: firstName,
				last_name: lastName,
				email: email,
				password: password,
				confirm_password: repeatPassword
			})
		});

		const data = await response.json();

		if (response.ok) {
			return message(form, { text: 'Account created successfully' });
		}
		console.log("WEW")
		return message(form, { text: data.message });
	}
};
