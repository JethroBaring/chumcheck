// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			user: {
				id: number,
				role: 'Manager' | 'Mentor' | 'Startup' | 'Manager as Mentor',
				email: string,
				firstName: string,
				lastName: string
			}
		}
		// interface Error {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
