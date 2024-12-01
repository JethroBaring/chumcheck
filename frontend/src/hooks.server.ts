import { PUBLIC_API_URL } from '$env/static/public';
import { getRole } from '$lib/utils';
import type { Handle } from '@sveltejs/kit';
import { jwtVerify } from 'jose';

const setUser = async (event: any, resolve: any, access: any) => {
	try {
		const secret = new TextEncoder().encode(
			'django-insecure-vak*mz%99+#882*g*87x8$%!r=trnnqd)zh2)i$w51ra4cd&eg'
		);
		const { payload }: { payload: any } = await jwtVerify(access, secret);

		event.locals.user = {
			id: payload.user_id,
			role: getRole(payload.user_type) as 'Manager' | 'Mentor' | 'Startup' | 'Manager as Mentor',
			email: payload.email,
			firstName: payload.first_name,
			lastName: payload.last_name
		};
	} catch (error) {
		return await resolve(event);
	}
};

export const handle: Handle = async ({ event, resolve }) => {
	let access = event.cookies.get('Access');
	let refresh = event.cookies.get('Refresh');

	if (!access && !refresh) return await resolve(event);

	if (access) {
		try {
			const secret = new TextEncoder().encode(
				'django-insecure-vak*mz%99+#882*g*87x8$%!r=trnnqd)zh2)i$w51ra4cd&eg'
			);
			const { payload }: { payload: any } = await jwtVerify(access, secret);
	
			event.locals.user = {
				id: payload.user_id,
				role: getRole(payload.user_type) as 'Manager' | 'Mentor' | 'Startup' | 'Manager as Mentor',
				email: payload.email,
				firstName: payload.first_name,
				lastName: payload.last_name
			};
		} catch (error) {
			return await resolve(event);
		}
	} else if (refresh) {
		try {
			const response = await fetch(`${PUBLIC_API_URL}/tokens/refresh/`, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${refresh}`,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					refresh: refresh
				})
			});

			if (response.ok) {
				const data = await response.json();
				event.cookies.set('Access', data?.access, {
					path: '/',
					httpOnly: true,
					sameSite: 'strict',
					maxAge: 5 * 60
				});
				access = event.cookies.get('Access');

				try {
					const secret = new TextEncoder().encode(
						'django-insecure-vak*mz%99+#882*g*87x8$%!r=trnnqd)zh2)i$w51ra4cd&eg'
					);
					const { payload }: { payload: any } = await jwtVerify(access!, secret);
			
					event.locals.user = {
						id: payload.user_id,
						role: getRole(payload.user_type) as 'Manager' | 'Mentor' | 'Startup' | 'Manager as Mentor',
						email: payload.email,
						firstName: payload.first_name,
						lastName: payload.last_name
					};
				} catch (error) {
					return await resolve(event);
				}
			} else {
				console.error('Request failed:', response.status, response.statusText);
			}
		} catch (error) {
			return await resolve(event);
		}
	}
	return await resolve(event);
};
