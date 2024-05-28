// @ts-nocheck
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = async () => {
	redirect(302, '/manager/pending');
};

// import type { PageServerLoad } from './$types';

// export const load: PageServerLoad = async ({ url, cookies }) => {
// 	const query = url.searchParams.get('status');
// 	if (query === 'rated') {
// 		const response = await fetch('http://127.0.0.1:8000/startups/ranking-by-urat/', {
// 			method: 'get',
// 			headers: {
// 				'Content-Type': 'application/json',
// 				Authorization: `Bearer ${cookies.get('Access')}`
// 			}
// 		});
// 		console.log("hello world")
// 		const data = await response.json();

// 		if (response.ok) {
// 			const mentor = await fetch('http://127.0.0.1:8000/users/?user_type=ME', {
// 				method: 'get',
// 				headers: {
// 					Authorization: `Bearer ${cookies.get('Access')}`
// 				}
// 			});

// 			const mentor_data = await mentor.json();
// 			return {
// 				applicants: data,
// 				mentors: mentor_data.results,
//         query
// 			};
// 		}
// 	} else if (query === 'qualified') {
// 		const response = await fetch('http://127.0.0.1:8000/startups/ranking-by-rubrics/', {
// 			method: 'get',
// 			headers: {
// 				'Content-Type': 'application/json',
// 				Authorization: `Bearer ${cookies.get('Access')}`
// 			}
// 		});
// 		const data = await response.json();
// 		if (response.ok) {
// 			return {
// 				applicants: data,
//         query
// 			};
// 		}
// 	} else {
// 		const response = await fetch('http://127.0.0.1:8000/startups/ranking-by-urat/', {
// 			method: 'get',
// 			headers: {
// 				'Content-Type': 'application/json',
// 				Authorization: `Bearer ${cookies.get('Access')}`
// 			}
// 		});

// 		const data = await response.json();
// 		if (response.ok) {
// 			return {
// 				applicants: data,
//         query
// 			};
// 		}
// 	}
// };
;null as any as PageServerLoad;