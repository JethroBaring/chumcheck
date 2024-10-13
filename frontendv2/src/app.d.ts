// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			user: {
				id: number,
				role: 'startup' | 'mentor' | 'manager' | 'manager_as_mentor',
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
